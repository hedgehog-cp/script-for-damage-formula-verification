/**
 * 反証可能火力探索 — メインスレッドとWeb Worker(search-worker.js)の両方から
 * 共有される計算ロジック。
 *
 * 総当たり探索(runSearchParallel、falsification-search.js参照)は複数の
 * Web Workerに分割して並列実行するが、Workerはメインスレッドの関数・クロージャを
 * 直接参照できない(postMessageで運べるのは構造化複製可能なデータのみで、
 * 関数は複製できない)。そのため NODE_TYPES/STAR_FORMULAS のように apply/fn 等の
 * 関数を値として持つ定義や、それらに依存する計算関数は、メインスレッド用ファイル
 * (falsification-search.js)とワーカー用ファイル(search-worker.js)の双方から
 * 同一の実体を読み込めるよう、この独立したファイルに切り出してある。
 *
 * 読み込み方法:
 *   - メインスレッド: index.html で <script src="search-core.js"> を
 *     falsification-search.js より先に読み込み、以下の定義をグローバル変数・
 *     グローバル関数として共有する。
 *   - Worker: search-worker.js の先頭で importScripts('search-core.js') する
 *     (Workerには <script> タグの代わりにこの仕組みを使う)。
 */

/**
 * 改修計算関数候補。
 *
 * 各候補は「改修値★を1つ受け取り、その改修値による加算量を返す関数」を表す。
 * 「改修計算関数は提示された選択肢候補のみから構成する」という制約に従い、
 * この5候補 (1.0√★, 1.5√★, 0.75√★, 0.2★, 0.3★) 以外を独自に追加してはならない。
 *
 * 以前はラベルをLaTeX ($1.0\sqrt{\star}$ 等) で持ちMathJaxで描画していたが、
 * 実際の「★」の文字がどこにも使われておらず、
 * 「MathJax等の描画処理は必要最小限に留める」という方針にも反していたため、
 * 最初からプレーンテキスト（★を含む）として保持するように変更した。
 *
 * applied は「実際に★値を代入した計算式」を人が読める記法(例: "1*sqrt(1)")で
 * 返す関数で、結果テーブルの「改修効果式」列の表示(buildStarBonuses()参照)に使う。
 *
 * @type {Array<{ id: string, label: string, fn: (star: number) => number, applied: (star: number) => string }>}
 */
const STAR_FORMULAS = [
  {
    id: "f_1",
    label: "1.0√★",
    fn: (s) => 1.0 * Math.sqrt(s),
    applied: (s) => `1*sqrt(${s})`,
  },
  {
    id: "f_2",
    label: "1.5√★",
    fn: (s) => 1.5 * Math.sqrt(s),
    applied: (s) => `1.5*sqrt(${s})`,
  },
  {
    id: "f_3",
    label: "0.75√★",
    fn: (s) => 0.75 * Math.sqrt(s),
    applied: (s) => `0.75*sqrt(${s})`,
  },
  {
    id: "f_4",
    label: "0.2★",
    fn: (s) => 0.2 * s,
    applied: (s) => `0.2*${s}`,
  },
  {
    id: "f_5",
    label: "0.3★",
    fn: (s) => 0.3 * s,
    applied: (s) => `0.3*${s}`,
  },
];

/**
 * 改修計算関数のid配列から、対応する STAR_FORMULAS のサブセットを解決する。
 * 存在しないid(該当なし)は結果から除外する。
 *
 * postMessageでは関数を含む STAR_FORMULAS そのものではなくid配列だけを
 * メインスレッド↔Worker間でやり取りするため、双方がこの関数で同じ手順で
 * 復元できるようにしてある。
 *
 * @param {string[]} formulaIds - 選択中の改修計算関数のid配列。
 * @returns {Array<{id:string,label:string,fn:Function,applied:Function}>}
 */
function resolveFormulas(formulaIds) {
  return formulaIds
    .map((id) => STAR_FORMULAS.find((f) => f.id === id))
    .filter((f) => !!f);
}

/**
 * 補正ステップの種別ごとの計算ロジックを1箇所に集約したレジストリ。
 * apply(値xにこの補正を適用した結果を返す。applyFnから呼ばれる)のみを持つ。
 *
 * 【リファクタリング】以前は種別(linear/softcap/floor)ごとの分岐が、
 * ①<select>の選択肢, ②getParamsUIのパラメータ入力欄, ③applyFnの計算式,
 * ④updateNodeType/updateCandの種別変更時デフォルト値リセット、という4箇所に
 * 分散していた。新しい種別を追加する際に4箇所を漏れなく直す必要があり、
 * 修正漏れの温床になっていたため、当初は label/defaults/paramsUI/apply を
 * 1つのオブジェクトにまとめていた。
 *
 * 【修正履歴】その後、メインスレッドとWeb Workerの双方から使う計算ロジックを
 * この search-core.js に切り出した際、NODE_TYPES をこのオブジェクトごと
 * そのまま移設していた。しかし label/defaults/paramsUI はメインスレッド側の
 * DOM描画(<select>の選択肢、パラメータ入力欄のHTML、種別変更時のリセット)
 * にしか使われない純粋なUI関心事で、Workerからは一度も参照されない
 * (Workerが必要とするのは apply だけ)。ファイル冒頭のコメントで
 * 「Web Workerと共有する計算ロジック」とスコープを明言しているにもかかわらず
 * UI専用のコードが紛れ込んでいたため、apply のみをここに残し、
 * label/defaults/paramsUI は falsification-search.js の NODE_TYPES_UI へ
 * 分離した(型・種別キーは両者で対応させてあるので、UI側の呼び出し元は
 * NODE_TYPES_UI[type] を見ればよい)。
 *
 * @type {Record<string, { apply: (x: number, node: object) => number }>}
 */
const NODE_TYPES = {
  linear: {
    // 補正は乗算(ax+b)ではなく、ゲーム実装(x+=a; x+=b)に合わせた加算(x+a+b)として計算する。
    apply: (x, node) => x + (node.a || 0) + (node.b || 0),
  },
  softcap: {
    apply: (x, node) =>
      x > (node.cap || 0) ? node.cap + Math.sqrt(x - node.cap) : x,
  },
  floor: {
    apply: (x) => Math.floor(x),
  },
};

/**
 * 汎用的な重複組み合わせ(multiset combination)の列挙。「改修スロットに割り当てる
 * 選択肢」を、要素の型を問わず arr から k 個(重複あり・順序なし)選ぶ全パターンを返す。
 * 返す組み合わせの総数は必ず H(n,k) = C(n+k-1, k) (n = arr.length) に一致する。
 *
 * 改修スロットは互いに区別されず(順序を持たない)、かつ同じ選択肢を複数スロットに
 * 重複して選べる(例: S=2 で 同じ選択肢を2スロットとも選ぶ、という組み合わせも有効)。
 * そのため候補配列から k個を選ぶ際、通常の組み合わせ(重複なし)ではなく
 * 「同じ要素を選び直してよい」重複組み合わせで列挙する必要がある。
 *
 * 呼び出し側(buildStarBonuses())では、arr に「(改修計算関数, ★値)のペア」を渡すことで、
 * 「スロットごとに異なる改修計算関数を使う」パターンも含めて列挙している
 * (以前は arr に★値そのものを渡し、関数は外側のループで固定していたため、
 * スロットごとに異なる関数を使うパターンが探索から漏れる不具合があった)。
 *
 * 実装は「先頭要素をもう一度選ぶ(同じ配列に留まる)」か「先頭要素を諦めて
 * 残りの配列に進む」かの二択を再帰的に試す標準的な重複組み合わせ列挙法。
 *
 * @template T
 * @param {T[]} arr - 選択候補の配列。
 * @param {number} k - 選ぶ個数 (改修スロット数 S)。
 * @returns {T[][]} 長さkの組み合わせの配列。要素数は必ず C(arr.length+k-1, k)。
 */
function getStarCombinations(arr, k) {
  if (k === 0) return [[]];
  if (arr.length === 0) return [];
  const [first, ...rest] = arr;
  // 先頭要素を(再度)選んで残りk-1個を同じ配列からさらに選ぶ → 重複を許す枝
  const withFirstAgain = getStarCombinations(arr, k - 1).map((c) => [
    first,
    ...c,
  ]);
  // 先頭要素はもう選ばず、残りの配列から選ぶ枝
  const withoutFirst = getStarCombinations(rest, k);
  return [...withFirstAgain, ...withoutFirst];
}

/**
 * 改修値★の組み合わせ一覧(starBonuses)を構築する。
 *
 * 各要素は「その組み合わせでの改修効果の合計値(val)」と「内訳の表示ラベル
 * (label、例: "1*sqrt(1)+0.2*3")」を持つ。合計値のtoFixed()は保存時ではなく
 * 表示時(falsification-search.js の renderTable()/copyResultsAsTsv())に
 * 行うため、labelには合計値の文字列を含めない。
 *
 * 各スロットは「改修計算関数」と「★値」を独立に選べる(同じ探索パターン内で
 * スロットごとに異なる関数を使ってよい。例: スロット1は1.0√★の★1、
 * スロット2は0.2★の★3、を組み合わせた 1.0√1 + 0.2*3 のようなパターンも
 * 探索対象に含める)。そのため列挙する「1個の要素」は★の値そのものではなく
 * 「(関数, ★)のペア」とし、そのペアの集合からSスロット分の重複組み合わせを
 * 取る(スロット自体を区別しないため、順序を持たない多重集合として扱う)。
 *
 * @param {number} S - 改修スロット数。
 * @param {Array<{id:string,label:string,fn:Function,applied:Function}>} selectedFns
 *   選択中の改修計算関数(STAR_FORMULASのサブセット)。
 * @returns {Array<{val:number, label:string}>}
 */
function buildStarBonuses(S, selectedFns) {
  const starBonuses = [];
  if (S === 0) {
    starBonuses.push({ val: 0, label: "0" });
    return starBonuses;
  }

  const slotChoices = [];
  for (const fnObj of selectedFns) {
    for (let s = 0; s <= 10; s++) {
      slotChoices.push({ fnObj, star: s });
    }
  }
  const combos = getStarCombinations(slotChoices, S);

  for (const combo of combos) {
    const sum = combo.reduce(
      (acc, choice) => acc + choice.fnObj.fn(choice.star),
      0,
    );
    // 「1*sqrt(1)+0.2*3」のように、実際に★値を代入した計算式そのものを表示する。
    const label = combo
      .map((choice) => choice.fnObj.applied(choice.star))
      .join("+");
    starBonuses.push({ val: sum, label: label });
  }
  return starBonuses;
}

/**
 * 1つの補正ノードを値 x に適用した結果を返す。
 * 実体は NODE_TYPES[node.type].apply() への委譲。
 *
 * @param {number} x - 適用前の値。
 * @param {?object} node - 適用するノード (type/a/b/cap を持つ)。null の場合は x をそのまま返す。
 * @returns {number} 適用後の値。
 */
function applyFn(x, node) {
  if (!node) return x;
  const def = NODE_TYPES[node.type];
  return def ? def.apply(x, node) : x;
}

/**
 * パイプライン(適用順ノード列)を値 x に順番に適用した最終結果を返す。
 * generateExecutionPaths() が返す path.pathA / path.pathB を渡す想定。
 *
 * @param {number} x - パイプラインに投入する初期値。
 * @param {object[]} steps - 適用順に並んだノード列。
 * @returns {number} 全ステップ適用後の最終値。
 */
function applyPipeline(x, steps) {
  return steps.reduce((val, step) => applyFn(val, step), x);
}

/**
 * items(AppState.items相当のプレーンデータ配列)から、あり得る全ての
 * 「A列の適用順パス」と「B列の適用順パス」の組み合わせを再帰的に生成する。
 * 共通行は候補関数ごとに分岐し、共通行の位置に選ばれた候補関数はA列パス・
 * B列パスの両方の対応する位置に同一のものとして挿入・合成される。
 *
 * メインスレッドの AppState.items を直接読まず items を引数で受け取るのは、
 * この関数がWorker側(search-worker.jsから postMessage で渡された items)からも
 * 呼ばれるため(Workerはメインスレッドのグローバル変数 AppState を参照できない)。
 *
 * pathA/pathB/names はいずれも items のインデックス昇順(=パイプライン上の
 * 並び順)を維持する必要がある。呼び出し側で pathA/pathB を先頭から順に
 * applyFn() へ渡して合成するため、この順序を保証しないと実際に計算される
 * 合成関数の適用順序そのものが狂う。
 *
 * 【修正履歴】以前は再帰の末尾(idx+1以降=パイプライン上で自分より後ろの要素)を
 * 先に処理してから `[...s.pathA, item]` のように自分をその末尾へ追加していたため、
 * 生成される列が実際の並び順と逆転していた。linear型(加算)同士だけの区間では
 * 加算の可換性により結果が偶然一致するため気づきにくいが、softcap/floorは
 * 適用順序に依存する(可換ではない)ため、パイプラインの構成によっては
 * A(x)/B(x)の計算結果自体が誤っていた。`[item, ...s.pathA]` のように自分を
 * 先頭へ追加する形に修正し、常にインデックス昇順を維持するようにした。
 *
 * @param {object[]} items - AppState.items相当のパイプライン構成データ。
 * @param {number} [idx=0] - 走査中の items のインデックス (再帰用)。
 * @returns {Array<{ pathA: object[], pathB: object[], names: string[] }>}
 *   各要素が1つの「共通行の分岐パターン」を表す。pathA/pathB はその分岐での
 *   A列/B列それぞれの適用順(パイプライン上の並び順)ノード列、names は
 *   通過した共通行候補の名称列(こちらもパイプライン上の並び順)。
 */
function generateExecutionPaths(items, idx = 0) {
  if (idx >= items.length) return [{ pathA: [], pathB: [], names: [] }];

  const item = items[idx];
  const sub = generateExecutionPaths(items, idx + 1);
  const res = [];

  if (item.kind === "node") {
    for (const s of sub) {
      const newA = item.col === "a" ? [item, ...s.pathA] : s.pathA;
      const newB = item.col === "b" ? [item, ...s.pathB] : s.pathB;
      res.push({ pathA: newA, pathB: newB, names: s.names });
    }
  } else if (item.kind === "common") {
    if (item.candidates.length === 0) {
      for (const s of sub) res.push(s);
    } else {
      for (const cand of item.candidates) {
        for (const s of sub) {
          res.push({
            pathA: [cand, ...s.pathA],
            pathB: [cand, ...s.pathB],
            names: [cand.name || "-", ...s.names],
          });
        }
      }
    }
  }

  return res;
}

/**
 * 改修値の組み合わせ(starBonuses)とパイプラインの分岐パターン(paths)から、
 * 反復変数 i∈[iStart,iEnd] の範囲で A(x)≠B(x) となる反例を計算する。
 *
 * search-worker.js(Worker内)からも、Web Workerが使えない環境でのフォールバック
 * (falsification-search.js の runSearchParallel、file://で直接開いた場合など)
 * からも、この同一の実体を呼び出す。ループ本体を1箇所にまとめることで、
 * 並列(Worker)経路と非並列(フォールバック)経路の計算結果が食い違う心配がない。
 *
 * 【修正履歴】以前は items(パイプライン構成)・S・selectedFns を受け取り、
 * buildStarBonuses()/generateExecutionPaths() をこの関数の内部で呼んでいた。
 * これらはiStart/iEndに依存しないため、区間(chunk)ごとに1つずつ生成される
 * Worker全てが同一の starBonuses/paths を毎回ゼロから再計算しており、
 * Worker数倍の無駄な計算(改修値の重複組み合わせ列挙や共通行の分岐生成)が
 * 発生していた。呼び出し側(runSearchParallel())で1回だけ計算し、
 * その結果(構造化複製可能なプレーンデータ)をWorkerへ渡す形に変更した。
 *
 * @param {object} params
 * @param {Array<{val:number, label:string}>} params.starBonuses - buildStarBonuses()の結果。
 * @param {Array<{pathA:object[], pathB:object[], names:string[]}>} params.paths - generateExecutionPaths()の結果。
 * @param {number} params.iStart - 反復変数iの開始値(この値を含む)。
 * @param {number} params.iEnd - 反復変数iの終了値(この値を含む)。
 * @param {number} params.base - 最低保証火力|夜偵。
 * @param {number} params.fp - 表示火力。
 * @param {number} params.tp - 表示雷装。
 * @returns {object[]} 反例(baseX/starLabel/starSum/x/pathName/resA/resB/diff)の配列。
 */
function computeSearchResults({
  starBonuses,
  paths,
  iStart,
  iEnd,
  base,
  fp,
  tp,
}) {
  const results = [];
  for (let i = iStart; i <= iEnd; i++) {
    // baseX: 最低保証火力|夜偵 + 表示火力 + 表示雷装 + 反復変数i の合計(改修効果を
    // 含まない「基本攻撃力」部分)。結果テーブルの最左列に表示する。
    const baseX = base + fp + tp + i;

    for (const sb of starBonuses) {
      // x: baseX に改修効果値(sb.val)を加えた値。これが実際に A(x)/B(x) の
      // 引数として適用される「探索対象火力」そのもの。
      const x = baseX + sb.val;

      for (const path of paths) {
        const valA = applyPipeline(x, path.pathA);
        const valB = applyPipeline(x, path.pathB);

        if (Math.abs(valA - valB) > 1e-9) {
          results.push({
            baseX: baseX,
            starLabel: sb.label,
            starSum: sb.val,
            x: x,
            pathName: path.names.join(" / ") || "-",
            resA: valA,
            resB: valB,
            diff: valA - valB,
          });
        }
      }
    }
  }
  return results;
}
