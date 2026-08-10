/**
 * 反証可能火力探索 — アプリケーションロジック。
 *
 * 目的:
 *   確度を向上したい補正関数A(x)と、それに対する近似関数B(x)という2つの補正パイプラインを
 *   組み立て、初期値 x (最低保証火力・表示火力・表示雷装・反復変数 i・改修効果・共通補正の分岐)
 *   のあらゆる組み合わせを網羅的に試行して A(x) と B(x) が一致しない反証可能火力x(反例)を探す。
 *   探索対象は式そのものではなく、式に投入する引数 x を構成する各パラメータの組み合わせである。
 *
 * 参照:
 *   ../docs/要約.md — 開発経緯と、AI(Gemini/Claude)による過去の誤対応の記録。
 *
 * 構成 (各セクション見出しの番号は本ファイル内の見出しコメントに対応):
 *   0.  ユーティリティ             — escapeHtml 等、他セクションから横断的に使う小関数
 *   1.  マスターデータ・状態定義   — NODE_TYPES(補正種別レジストリ)、改修計算関数候補、
 *                                    パイプラインの状態(AppState)
 *   1b. Undo (Ctrl+Z)
 *   2.  初期化                     — ページロード時の初期描画、セクション折りたたみ
 *   3.  パイプライン描画           — AppState.items を実際のDOMへ変換する
 *   4.  D&D                        — ドラッグ&ドロップによる並び替え
 *   5.  データ操作関数             — ノード/共通行の追加・更新・削除
 *   6.  探索・計算ロジック         — 反例探索の本体 (executeSearch/runSearch 等)。
 *                                    applyPipeline(x, steps) が「xにパイプラインを
 *                                    適用した結果」を返す中核関数。
 *   7.  結果表示                   — 結果テーブルの描画・ソート・TSVコピー
 *   8.  グラフ描画 (無効化)        — A(x)/B(x)の折れ線グラフ。「交戦形態補正」以外の
 *                                    共通行を新規追加した際にグラフへ正しく反映されない
 *                                    不具合が見つかり、修正コストに見合わないと判断して
 *                                    コメントアウトで無効化した(詳細は8節冒頭のコメント)。
 */

// === 0. ユーティリティ ===

/**
 * 文字列をHTML属性値として安全に埋め込めるようエスケープする。
 *
 * ノード名・候補名などのユーザー入力はテンプレートリテラルで
 * `value="${...}"` のようにHTML属性値へ直接埋め込んでいるため、
 * 未エスケープのまま `"` や `<` を含む文字列を入力すると
 * 属性やタグの構造が壊れて画面が正しく描画されなくなる不具合があった。
 * ユーザー入力をHTML属性値へ埋め込む箇所では必ずこの関数を通すこと。
 *
 * @param {*} str - エスケープ対象の値 (文字列以外は String() で文字列化される)。
 * @returns {string} HTML属性値として安全な文字列。
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// === 1. マスターデータ・状態定義 ===

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
 * @type {Array<{ id: string, label: string, fn: (star: number) => number }>}
 */
const STAR_FORMULAS = [
  { id: "f_1", label: "1.0√★", fn: (s) => 1.0 * Math.sqrt(s) },
  { id: "f_2", label: "1.5√★", fn: (s) => 1.5 * Math.sqrt(s) },
  { id: "f_3", label: "0.75√★", fn: (s) => 0.75 * Math.sqrt(s) },
  { id: "f_4", label: "0.2★", fn: (s) => 0.2 * s },
  { id: "f_5", label: "0.3★", fn: (s) => 0.3 * s },
];

/**
 * 補正ステップの種別ごとの振る舞いを1箇所に集約したレジストリ。
 *
 * 【リファクタリング】以前は種別(linear/softcap/floor)ごとの分岐が、
 * ①<select>の選択肢, ②getParamsUIのパラメータ入力欄, ③applyFnの計算式,
 * ④updateNodeType/updateCandの種別変更時デフォルト値リセット、という4箇所に
 * 分散していた。新しい種別(例: 将来の防御力用の補正)を追加する際に4箇所を
 * 漏れなく直す必要があり、修正漏れの温床になっていたため、1つのオブジェクトに
 * まとめた。新しい種別を追加する場合はこのオブジェクトに1エントリ足すだけでよい。
 *
 * - label:    <select>の選択肢に表示する文字列。
 * - defaults: 種別変更時にリセットするパラメータ (a/b や cap) を返す。
 * - paramsUI: パラメータ入力欄のHTML断片を返す (getParamsUI から呼ばれる)。
 * - apply:    値 x にこの補正を適用した結果を返す (applyFn から呼ばれる)。
 *
 * @type {Record<string, {
 *   label: string,
 *   defaults: () => object,
 *   paramsUI: (node: object, onChangeStr: string) => string,
 *   apply: (x: number, node: object) => number,
 * }>}
 */
const NODE_TYPES = {
  linear: {
    label: "f(x)=x+a+b",
    defaults: () => ({ a: 0, b: 0 }),
    paramsUI: (node, onChangeStr) => `
      <label class="flex items-center gap-1 text-xs whitespace-nowrap"><span class="text-gray-500">a:</span>
        <input type="number" step="0.0001" value="${node.a !== undefined ? node.a : 1}" class="sheet-input steppable w-24 text-left font-mono rounded" onchange="${onChangeStr}, 'a', parseFloat(this.value) || 0)">
      </label>
      <label class="flex items-center gap-1 text-xs whitespace-nowrap"><span class="text-gray-500">b:</span>
        <input type="number" step="0.0001" value="${node.b || 0}" class="sheet-input steppable w-24 text-left font-mono rounded" onchange="${onChangeStr}, 'b', parseFloat(this.value) || 0)">
      </label>
    `,
    // 補正は乗算(ax+b)ではなく、ゲーム実装(x+=a; x+=b)に合わせた加算(x+a+b)として計算する。
    apply: (x, node) => x + (node.a || 0) + (node.b || 0),
  },
  softcap: {
    label: "f(x)=softcap(x)",
    defaults: () => ({ cap: 220 }),
    paramsUI: (node, onChangeStr) => `
      <label class="flex items-center gap-1 text-xs whitespace-nowrap"><span class="text-gray-500">cap:</span>
        <input type="number" step="1" value="${node.cap !== undefined ? node.cap : 220}" class="sheet-input steppable w-16 text-left font-mono rounded" onchange="${onChangeStr}, 'cap', parseFloat(this.value) || 0)">
      </label>
    `,
    apply: (x, node) =>
      x > (node.cap || 0) ? node.cap + Math.sqrt(x - node.cap) : x,
  },
  floor: {
    label: "f(x)=floor(x)",
    defaults: () => ({}),
    paramsUI: () => "",
    apply: (x) => Math.floor(x),
  },
};

/**
 * NODE_TYPES の全種別を <option> タグの並びとして返す。
 * 個別ノードカードの種別セレクトと、共通行候補の種別セレクトの両方から
 * 呼ばれる (以前はこの2箇所に同じ3つの<option>がそのまま重複して書かれていた)。
 *
 * @param {string} selectedType - 現在選択中の種別キー ('linear' 等)。
 * @returns {string} <option>タグを連結したHTML文字列。
 */
function nodeTypeOptionsHtml(selectedType) {
  return Object.entries(NODE_TYPES)
    .map(
      ([key, def]) =>
        `<option value="${key}" ${key === selectedType ? "selected" : ""}>${def.label}</option>`,
    )
    .join("");
}

/**
 * アプリケーション全体の状態。
 *
 * items: パイプラインを構成する要素の配列。配列の並び順がそのまま適用順序になる。
 *   - kind: 'node'   個別ステップ。col ('a' | 'b') で補正関数A/近似関数Bどちらに属するかを持つ。
 *   - kind: 'common' 共通行。candidates (複数の候補関数) を持ち、A列・B列の両方に
 *                    同一のタイミングで同一の候補関数が適用される。
 *   各要素の type は 'linear' (f(x)=x+a+b) | 'softcap' (f(x)=softcap(x)) | 'floor' (f(x)=floor(x))。
 *
 * draggedId: D&Dで現在ドラッグ中の要素のid (ドラッグしていなければ null)。
 * results:   直近の executeSearch() で見つかった、A(x)≠B(x) となる反例の一覧。
 * sort:      results を表示する際のソート状態。配列の先頭が第1キー、以降は
 *            Shift+クリックで追加された第2キー以降のタイブレーカー
 *            (詳細は setSort() 参照)。
 *
 * @type {{
 *   items: Array<object>,
 *   draggedId: string|null,
 *   results: Array<object>,
 *   sort: Array<{ col: string, asc: boolean }>
 * }}
 */
let AppState = {
  items: [
    {
      id: "n1",
      kind: "node",
      col: "a",
      type: "linear",
      name: "基本補正",
      a: 1.0,
      b: 0,
    },
    {
      id: "n2",
      kind: "node",
      col: "b",
      type: "linear",
      name: "基本補正",
      a: 1.0,
      b: 0,
    },
    {
      id: "c1",
      kind: "common",
      name: "交戦形態補正",
      candidates: [
        { type: "linear", name: "T字有利", a: 1.2, b: 0 },
        { type: "linear", name: "同航戦", a: 1.0, b: 0 },
        { type: "linear", name: "反航戦", a: 0.8, b: 0 },
        { type: "linear", name: "T字不利", a: 0.6, b: 0 },
      ],
    },
    {
      id: "n3",
      kind: "node",
      col: "a",
      type: "softcap",
      name: "ソフトキャップ補正",
      cap: 220,
    },
    {
      id: "n4",
      kind: "node",
      col: "b",
      type: "softcap",
      name: "ソフトキャップ補正",
      cap: 220,
    },
    { id: "n5", kind: "node", col: "a", type: "floor", name: "切り捨て補正" },
    { id: "n6", kind: "node", col: "b", type: "floor", name: "切り捨て補正" },
  ],
  draggedId: null,
  results: [],
  sort: [{ col: "x", asc: true }],
};

// === 1b. Undo (Ctrl+Z) ===
// AppState.items を変更する操作の直前に pushHistory() を呼び、変更前のスナップショットを積んでおく。
// Ctrl+Z (Mac は Cmd+Z) でスタックから1つ戻す。

/** @type {string[]} pushHistory() が積む AppState.items のJSONスナップショット履歴。 */
let undoStack = [];
/** @type {number} undoStack に保持する最大件数。これを超えた古い履歴から破棄する。 */
const UNDO_LIMIT = 50;

/**
 * AppState.items を変更する操作の直前に呼び出し、変更前の状態を undoStack に積む。
 * データを変更する関数 (updateItem, addNode, removeItem 等) は、
 * 実際に AppState.items を書き換える前に必ずこれを呼ぶこと。
 */
function pushHistory() {
  undoStack.push(JSON.stringify(AppState.items));
  if (undoStack.length > UNDO_LIMIT) undoStack.shift();
}

/**
 * undoStack から直前のスナップショットを1つ取り出し、AppState.items を復元して再描画する。
 * 履歴が空の場合は何もしない。
 */
function undo() {
  if (undoStack.length === 0) return;
  AppState.items = JSON.parse(undoStack.pop());
  renderPipeline();
  updateEstimates();
}

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === "z") {
    e.preventDefault();
    undo();
  }
});

// === 2. 初期化 ===

/** ページ読み込み完了時に、改修効果チェックボックス・パイプライン・概算件数・結果テーブルの初期描画を行う。 */
window.onload = () => {
  renderFormulas();
  renderPipeline();
  updateEstimates();
  // 探索結果セクション(3)は常時表示のため、まだ一度も探索を実行していない
  // 段階でも見出し行と「不一致はありませんでした」の空状態を表示しておく。
  renderTable();
};

/**
 * 各セクションの折りたたみ/展開を切り替える。
 * bodyId で指定した要素の hidden クラスをトグルし、対応するシェブロンアイコン
 * (id は bodyId の末尾 "Body" を "Chevron" に置き換えたもの) の向きを合わせて更新する。
 * セクション見出し行の onclick から呼び出される。
 *
 * @param {string} bodyId - 折りたたみ対象のコンテンツ要素のid。
 */
function toggleSection(bodyId) {
  const body = document.getElementById(bodyId);
  if (!body) return;
  const collapsed = body.classList.toggle("hidden");
  const chevron = document.getElementById(bodyId.replace("Body", "Chevron"));
  if (chevron) chevron.textContent = collapsed ? "▶" : "▼";
}

/**
 * STAR_FORMULAS の各候補をチェックボックスとして #formulaCheckboxes に描画する。
 * 初期表示では改修計算関数候補は全てチェック済みにする(一部だけ既定でONにする理由がないため)。
 */
function renderFormulas() {
  const container = document.getElementById("formulaCheckboxes");
  container.innerHTML = STAR_FORMULAS.map(
    (f) => `
    <label class="flex items-center gap-1 cursor-pointer bg-white px-2 py-1 sheet-border rounded hover:bg-gray-50 whitespace-nowrap">
      <input type="checkbox" value="${f.id}" class="formula-cb" checked onchange="updateEstimates()">
      <span class="text-xs">${f.label}</span>
    </label>
  `,
  ).join("");
}

// === 3. パイプライン描画 (改行なしレイアウト) ===

/**
 * AppState.items の内容に基づき #pipelineContainer を再構築する。
 *
 * items を先頭から走査し、'common' はそのまま1行として描画、
 * 連続する 'node' はまとめて1つの2カラム(A列/B列)セクションとして描画する
 * (=common行の間に挟まれた node の並びが、パイプライン上での見た目のグループになる)。
 * 補正関数A/近似関数Bの構成が完全一致しているかどうかの警告は、常時バナー表示ではなく
 * 探索実行時のトースト通知に変更したため、ここでは呼び出さない(executeSearch()参照)。
 *
 * 【廃止履歴】以前は末尾で refreshGraph() を呼び、グラフ(8節、現在は無効化)の
 * 候補選択プルダウンと描画を最新stateと一致させていたが、グラフ機能自体を
 * コメントアウトしたため、この呼び出しも合わせて無効化してある。
 */
function renderPipeline() {
  const container = document.getElementById("pipelineContainer");
  container.innerHTML = "";

  let i = 0;
  while (i < AppState.items.length) {
    const item = AppState.items[i];

    if (item.kind === "common") {
      container.appendChild(createCommonDOM(item));
      i++;
    } else {
      const group = [];
      while (i < AppState.items.length && AppState.items[i].kind === "node") {
        group.push(AppState.items[i]);
        i++;
      }
      container.appendChild(createNodeSectionDOM(group));
    }
  }

  // refreshGraph(); // グラフ機能は無効化済み(8節参照)。
}

/**
 * 連続する 'node' 要素の集まりを、A列/B列の2カラムDOMにまとめて生成する。
 *
 * @param {Array<object>} nodes - 連続する node 要素 (col='a' と col='b' が混在してよい)。
 * @returns {HTMLElement} A列/B列2カラムのセクション要素。
 */
function createNodeSectionDOM(nodes) {
  // section / colA / colB はレイアウト用の入れ物であり、それ自体が
  // 独立した「補正ステップ」ではないため sheet-border は付けない
  // (node card 自体の枠線と二重・三重に重なって「枠線が多い」状態になっていたため)。
  // A列/B列の区別は背景色(bg-form-a/30, bg-form-b/30)だけで表現する。
  //
  // 【修正履歴】以前は section 自身と colA/colB の双方に p-1 を付けていたため、
  // カード(node card)の右端がこの2重のpaddingぶん(8px)内側に寄り、
  // 共通行(commonWrapper、こちらは自身のp-2のみで枠線が直接パイプライン全幅まで
  // 達する)の右端より個別カードの右端が短く見える不具合があった。
  // section/colA/colBのpaddingを撤廃し、カードの枠線が共通行の枠線と同じ
  // 外側の境界(パイプライン全幅)まで届くようにして揃えている。
  const section = document.createElement("div");
  section.className = "grid grid-cols-2 gap-2 bg-white/40 rounded";

  const nodesA = nodes.filter((n) => n.col === "a");
  const nodesB = nodes.filter((n) => n.col === "b");

  const colA = document.createElement("div");
  // min-w-0: grid内でこのカラムがカード(改行なし)の内容幅ぶん強制的に広がってレイアウトが壊れるのを防ぐ。
  // overflow-x-auto: それでも入りきらない場合はページ全体でなくこのカラム内だけで横スクロールさせる。
  colA.className =
    "flex flex-col gap-1.5 min-h-[40px] min-w-0 overflow-x-auto bg-form-a/30 rounded";
  colA.setAttribute("data-col", "a");
  colA.ondragover = (e) => onContainerDragOver(e);
  colA.ondrop = (e) => onContainerDrop(e, "a");

  nodesA.forEach((node) => colA.appendChild(createNodeDOM(node)));

  const colB = document.createElement("div");
  colB.className =
    "flex flex-col gap-1.5 min-h-[40px] min-w-0 overflow-x-auto bg-form-b/30 rounded";
  colB.setAttribute("data-col", "b");
  colB.ondragover = (e) => onContainerDragOver(e);
  colB.ondrop = (e) => onContainerDrop(e, "b");

  nodesB.forEach((node) => colB.appendChild(createNodeDOM(node)));

  section.appendChild(colA);
  section.appendChild(colB);
  return section;
}

/**
 * 個別ノード1件分のカードDOMを生成する。
 * 名称入力欄の値は escapeHtml() を通し、名称にダブルクォート等が含まれても
 * HTML構造が壊れないようにしている。
 *
 * レイアウトは2段構成:
 *   1行目(見出し行): ドラッグハンドル + 名称入力(残り幅に伸縮) + 削除[x]ボタン
 *   2行目(設定行):   種別セレクト + パラメータ入力(a/b または cap)
 * 【変更履歴】以前は名称・種別・パラメータ・削除ボタンを1行に詰め込んでいたが、
 * 名称欄が固定幅(w-36)で種別セレクトやパラメータと幅を奪い合うため、
 * ウィンドウ幅が1400px未満(一般的なノートPC等)だとカード単位の横スクロールが
 * 常態化し、削除[x]ボタンが列の外にはみ出して見切れる不具合があった。
 * ユーザー指示によりこの2段構成に変更し、名称入力欄を固定幅から可変幅(flex-1)にした。
 * 各行内では引き続き折り返さない(1行の横並び)という制約は行単位で維持している。
 *
 * @param {object} node - AppState.items 中の kind:'node' 要素。
 * @returns {HTMLElement} ノードカード要素。
 */
function createNodeDOM(node) {
  const el = document.createElement("div");
  const isA = node.col === "a";
  const bgColor = isA ? "bg-form-a" : "bg-form-b";

  // ノードカード自体が「1つの補正ステップ」を表す最小単位なので、枠線(sheet-border)はここに1回だけ付ける。
  el.className = `sheet-border p-1.5 ${bgColor} flex flex-col gap-1 relative transition-all rounded shadow-sm`;
  el.setAttribute("data-id", node.id);

  el.ondragover = (e) => onElementDragOver(e, node.id);
  el.ondragleave = (e) => clearIndicators();
  el.ondrop = (e) => onElementDrop(e, node.id);

  // パラメータ欄(a/b や cap)は type='floor' の場合は空文字列になる。
  // 空でも従来はこの後の bg-white/80 の枠だけが描画され、ダッシュのような
  // 空ボックスの残骸として見えてしまっていたため、内容がある場合のみ枠ごと描画する。
  const paramsHtml = getParamsUI(node);

  el.innerHTML = `
    <div class="flex items-center justify-between gap-1.5">
      <div class="flex items-center gap-1.5 flex-1 min-w-0">
        <span class="drag-handle text-gray-600 hover:text-black font-bold shrink-0" draggable="true" ondragstart="onDragStart(event, '${node.id}')" title="ドラッグして挿入移動">⠿</span>
        <input type="text" value="${escapeHtml(node.name || "")}" placeholder="名称" class="sheet-input bg-transparent text-black font-bold text-xs px-1 py-0.5 rounded focus:outline-none flex-1 min-w-0" onchange="updateItem('${node.id}', 'name', this.value)">
      </div>
      <button onclick="removeItem('${node.id}')" class="text-gray-400 hover:text-red-600 text-lg leading-none font-bold px-1 shrink-0" title="削除">&times;</button>
    </div>
    <div class="flex items-center gap-2 flex-nowrap whitespace-nowrap">
      <select onchange="updateNodeType('${node.id}', this.value)" class="sheet-input bg-white font-mono text-xs px-1 py-0.5 rounded border border-gray-300 focus:outline-none cursor-pointer shrink-0">
        ${nodeTypeOptionsHtml(node.type)}
      </select>
      ${paramsHtml ? `<div class="flex items-center gap-2 bg-white/80 px-2 py-0.5 rounded flex-nowrap shrink-0">${paramsHtml}</div>` : ""}
    </div>
  `;
  return el;
}

/**
 * 共通行1件分(見出し行 + 候補関数リスト)のカードDOMを生成する。
 * 共通行の名称・各候補の名称はいずれも escapeHtml() を通す。
 *
 * @param {object} item - AppState.items 中の kind:'common' 要素。
 * @returns {HTMLElement} 共通行カード要素。
 */
function createCommonDOM(item) {
  // 共通行ラッパー(1回)と各候補行(1回)の2段構成に留め、
  // node card 側と同様に枠線の入れ子を最小限にする。
  const wrapper = document.createElement("div");
  wrapper.className =
    "bg-emp-4 sheet-border p-2 my-1 transition-all rounded shadow-sm w-full min-w-0";
  wrapper.setAttribute("data-id", item.id);

  wrapper.ondragover = (e) => onElementDragOver(e, item.id);
  wrapper.ondragleave = (e) => clearIndicators();
  wrapper.ondrop = (e) => onElementDrop(e, item.id);

  const candsHtml = item.candidates
    .map(
      (c, i) => `
    <div class="flex items-center gap-2 sheet-border p-1 rounded shadow-sm flex-nowrap whitespace-nowrap w-full min-w-0 overflow-x-auto">
      <input type="text" value="${escapeHtml(c.name || "")}" placeholder="候補名" class="sheet-input text-black w-28 text-xs px-1 py-0.5 rounded" onchange="updateCand('${item.id}', ${i}, 'name', this.value)">
      <select onchange="updateCand('${item.id}', ${i}, 'type', this.value)" class="sheet-input text-xs px-1 py-0.5 rounded font-mono">
        ${nodeTypeOptionsHtml(c.type)}
      </select>
      <div class="flex items-center gap-1 flex-nowrap">
        ${getParamsUI(c, item.id, i)}
      </div>
      <button onclick="removeCand('${item.id}', ${i})" class="text-gray-400 hover:text-red-600 text-lg font-bold ml-auto px-1 leading-none" title="削除">&times;</button>
    </div>
  `,
    )
    .join("");

  wrapper.innerHTML = `
    <div class="flex justify-between items-center border-b border-yellow-300 pb-1 mb-1.5">
      <div class="font-bold flex items-center gap-2">
        <span class="drag-handle text-gray-700 hover:text-black font-bold" draggable="true" ondragstart="onDragStart(event, '${item.id}')" title="共通行の移動">⠿</span>
        <input type="text" value="${escapeHtml(item.name || "")}" class="sheet-input bg-transparent text-black font-bold w-36 text-xs px-1" onchange="updateItem('${item.id}', 'name', this.value)">
      </div>
      <div class="flex gap-2 items-center">
        <button onclick="addCand('${item.id}')" class="text-xs text-black bg-white/70 px-2 py-0.5 sheet-border rounded hover:opacity-80 transition">+ 候補を追加</button>
        <button onclick="removeItem('${item.id}')" class="text-gray-400 hover:text-red-600 text-lg leading-none font-bold px-1 shrink-0" title="削除">&times;</button>
      </div>
    </div>
    <!-- 縦並びレイアウトに変更 -->
    <div class="flex flex-col gap-1.5 w-full">
      ${candsHtml}
    </div>
  `;
  return wrapper;
}

/**
 * ノード(または共通行の候補)の種別(type)に応じたパラメータ入力欄のHTML断片を返す。
 * 実体は NODE_TYPES[node.type].paramsUI() への委譲。種別ごとのUIを個別に
 * 分岐させず1箇所(NODE_TYPES)にまとめてあるので、ここでは呼び出すだけでよい。
 *
 * @param {object} node - type/a/b/cap を持つノードまたは候補オブジェクト。
 * @param {?string} [parentId] - 共通行の候補の場合、その共通行のid。個別ノードの場合は null。
 * @param {?number} [candIdx] - 共通行の候補の場合、その候補のインデックス。個別ノードの場合は null。
 * @returns {string} パラメータ入力欄のHTML文字列。
 */
function getParamsUI(node, parentId = null, candIdx = null) {
  const onChangeStr =
    parentId !== null
      ? `updateCand('${parentId}', ${candIdx}`
      : `updateItem('${node.id}'`;

  const def = NODE_TYPES[node.type];
  return def ? def.paramsUI(node, onChangeStr) : "";
}

// === 4. D&D ===
//
// 【重要な仕様】個別ノードはA列/B列の間を移動できない(列を越えた移動は禁止)。
// ※以前は「A列とB列の間でのノードの移動も可能」という仕様だったことがあるが、
//   これはGeminiによる誤記であり、ユーザーの指示によりこの版から禁止仕様とした。
//   個別ノードは常に「自分がもともと属している列の中」でのみ並び替えができる。
//
// 挿入ラインインジケーター(#dropIndicatorLine)は、ドロップ先要素自体の
// border を書き換えるのではなく、position:fixed の専用要素を都度
// リサイズ・再配置して重ねる方式にしている
// (旧実装は border-top/bottom を直接付け替えていたため、
//   要素のボックスサイズが変わってガタつく不具合があった)。

/**
 * 挿入ラインインジケーター(#dropIndicatorLine)を指定した位置・幅で表示する。
 *
 * @param {number} top - viewport基準のY座標(px)。
 * @param {number} left - viewport基準のX座標(px)。
 * @param {number} width - ラインの幅(px)。
 */
function showIndicatorLine(top, left, width) {
  const line = document.getElementById("dropIndicatorLine");
  if (!line) return;
  line.style.top = `${top}px`;
  line.style.left = `${left}px`;
  line.style.width = `${width}px`;
  line.style.display = "block";
}

/** 挿入ラインインジケーターを非表示にする。 */
function clearIndicators() {
  const line = document.getElementById("dropIndicatorLine");
  if (line) line.style.display = "none";
}

/**
 * ドラッグ開始時のハンドラ。AppState.draggedId にドラッグ対象のidを記録する。
 *
 * @param {DragEvent} e
 * @param {string} id - ドラッグ対象要素(node または common)のid。
 */
function onDragStart(e, id) {
  e.stopPropagation();
  AppState.draggedId = id;
  e.dataTransfer.effectAllowed = "move";
}

/**
 * ドラッグ中の要素が他の要素上を通過した際のハンドラ。
 * ドロップ可否の判定と、挿入ライン(showIndicatorLine)の位置・幅の計算を行う。
 *
 * 列を越えた個別ノードの移動は禁止のため、その場合は e.preventDefault() を呼ばずに
 * ブラウザ標準の「ここにはドロップできない」表示に任せ、drop イベントも発生させない。
 *
 * @param {DragEvent} e
 * @param {string} targetId - ドラッグ中の要素がホバーしている対象要素のid。
 */
function onElementDragOver(e, targetId) {
  if (!AppState.draggedId || AppState.draggedId === targetId) return;

  const draggedItem = AppState.items.find((it) => it.id === AppState.draggedId);
  const targetItem = AppState.items.find((it) => it.id === targetId);
  if (!draggedItem || !targetItem) return;

  // 個別ノード同士で列(A/B)が異なる場合は移動禁止。
  // preventDefault を呼ばないことで、ブラウザ標準の
  // 「ここにはドロップできない」動作に任せ、drop イベントも発生させない。
  if (
    draggedItem.kind === "node" &&
    targetItem.kind === "node" &&
    draggedItem.col !== targetItem.col
  ) {
    clearIndicators();
    return;
  }

  e.preventDefault();
  e.stopPropagation();

  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const midY = rect.top + rect.height / 2;
  const insertBefore = e.clientY < midY;
  const top = insertBefore ? rect.top : rect.bottom;

  let left, width;

  if (draggedItem.kind === "common") {
    // 共通行の移動は常にパイプライン全幅(A列・B列を横断)で挿入される。
    const pipelineRect = document
      .getElementById("pipelineContainer")
      .getBoundingClientRect();
    left = pipelineRect.left;
    width = pipelineRect.width;
  } else if (targetItem.kind === "common") {
    // 個別ノードは列を越えられないため、共通行の上でホバーしても
    // 自分の列側の半分にだけ挿入ラインを表示する(カーソル位置には依存しない)。
    width = rect.width / 2;
    left = draggedItem.col === "a" ? rect.left : rect.left + width;
  } else {
    // 個別ノード同士(同じ列)の場合は、その列のカード幅のみに収める。
    left = rect.left;
    width = rect.width;
  }

  showIndicatorLine(top, left, width);
}

/**
 * ドロップ時のハンドラ。AppState.items 内でドラッグ対象を取り除き、
 * ドロップ位置(targetId の前後)へ挿入し直すことで並び替えを実現する。
 * スワップ(位置の交換)ではなく、常にインサート(割り込み挿入)動作である。
 *
 * @param {DragEvent} e
 * @param {string} targetId - ドロップ先要素のid。
 */
function onElementDrop(e, targetId) {
  if (!AppState.draggedId || AppState.draggedId === targetId) return;

  const draggedItem = AppState.items.find((it) => it.id === AppState.draggedId);
  const targetItem = AppState.items.find((it) => it.id === targetId);
  if (!draggedItem || !targetItem) return;

  // dragover 側で既に弾いているはずだが、ドロップ時にも念のため列越え移動を禁止する。
  if (
    draggedItem.kind === "node" &&
    targetItem.kind === "node" &&
    draggedItem.col !== targetItem.col
  ) {
    clearIndicators();
    return;
  }

  e.preventDefault();
  e.stopPropagation();
  clearIndicators();

  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const insertAfter = e.clientY >= rect.top + rect.height / 2;

  const dragIdx = AppState.items.findIndex(
    (it) => it.id === AppState.draggedId,
  );
  if (dragIdx < 0) return;

  pushHistory();

  // 列(col)は一切変更しない。個別ノードは常に自分の列の中だけで並び替わる。
  AppState.items.splice(dragIdx, 1);

  let newIdx = AppState.items.findIndex((it) => it.id === targetId);
  if (newIdx < 0) newIdx = AppState.items.length;
  if (insertAfter) newIdx++;

  AppState.items.splice(newIdx, 0, draggedItem);
  AppState.draggedId = null;

  renderPipeline();
}

/**
 * A列/B列の背景(カードが無い領域)上をドラッグ中に通過した際のハンドラ。
 * ドロップを許可するために e.preventDefault() のみ行う。
 *
 * @param {DragEvent} e
 */
function onContainerDragOver(e) {
  if (!AppState.draggedId) return;
  e.preventDefault();
}

/**
 * A列/B列の背景(カードが無い領域)へドロップした際のハンドラ。
 * 列を越えた移動を禁止しているため、ここでは col を変更しない
 * (カード同士の並び替え自体は onElementDrop 側で行う)。
 *
 * @param {DragEvent} e
 * @param {'a'|'b'} targetCol - ドロップ先の列。
 */
function onContainerDrop(e, targetCol) {
  if (!AppState.draggedId) return;
  e.preventDefault();
  e.stopPropagation();
  clearIndicators();

  AppState.draggedId = null;
  renderPipeline();
}

// === 5. データ操作関数 ===

/**
 * id で指定した item (node または common) の任意のプロパティを更新する。
 *
 * 【廃止履歴】以前はここで updateGraph() を呼び、renderPipeline() を伴わない
 * 軽量な更新でも a/b/cap 等パラメータ値の変更がグラフ(8節、現在は無効化)に
 * 反映されるようにしていたが、グラフ機能自体をコメントアウトしたため、
 * この呼び出しも合わせて無効化してある。
 *
 * @param {string} id - 更新対象の item id。
 * @param {string} key - 更新するプロパティ名 (例: 'name')。
 * @param {*} val - 新しい値。
 */
function updateItem(id, key, val) {
  const item = AppState.items.find((i) => i.id === id);
  if (item) {
    pushHistory();
    item[key] = val;
    // updateGraph(); // グラフ機能は無効化済み(8節参照)。
  }
}

/**
 * 個別ノードの種別(type)を変更し、種別ごとの既定パラメータへリセットする。
 *
 * @param {string} id - 対象ノードのid。
 * @param {'linear'|'softcap'|'floor'} type - 変更後の種別。
 */
function updateNodeType(id, type) {
  const item = AppState.items.find((i) => i.id === id);
  if (item && item.kind === "node") {
    pushHistory();
    item.type = type;
    Object.assign(item, NODE_TYPES[type].defaults());
    renderPipeline();
  }
}

/**
 * id で指定した item (node または common) をパイプラインから削除する。
 *
 * @param {string} id - 削除対象の item id。
 */
function removeItem(id) {
  pushHistory();
  AppState.items = AppState.items.filter((i) => i.id !== id);
  renderPipeline();
}

/**
 * 個別ノード用の一意なidを発行する ('n_'接頭辞+タイムスタンプ+乱数4桁)。
 * addNode() と duplicateAtoB() の双方で必要なため切り出している。
 *
 * @returns {string} 新規ノードid。
 */
function generateNodeId() {
  return "n_" + Date.now() + Math.random().toString(36).substr(2, 4);
}

/**
 * 指定した列に、既定値(linear, a=0, b=0)の新規個別ノードを追加する。
 *
 * @param {'a'|'b'} col - 追加先の列。
 */
function addNode(col) {
  pushHistory();
  AppState.items.push({
    id: generateNodeId(),
    kind: "node",
    col: col,
    type: "linear",
    name: "新規補正",
    a: 0,
    b: 0,
  });
  renderPipeline();
}

/** 候補を1件持つ新規共通行をパイプライン末尾に追加する。 */
function addCommonRow() {
  pushHistory();
  AppState.items.push({
    id: "c_" + Date.now(),
    kind: "common",
    name: "新規共通補正",
    candidates: [{ type: "linear", name: "通常", a: 0, b: 0 }],
  });
  renderPipeline();
}

/**
 * 補正関数A列の個別ステップを、同じ並び順のまま近似関数B列へ複製する。
 * 既存のB列ステップは複製前に削除し、A列の内容(名称・種別・パラメータ)で置き換える。
 * A(x)とB(x)の差分を1ステップずつ確認したい場合などに、
 * まずA列と全く同じB列を作ってから少しずつ変更していく用途を想定している。
 */
function duplicateAtoB() {
  pushHistory();

  AppState.items = AppState.items.filter(
    (it) => !(it.kind === "node" && it.col === "b"),
  );

  const currentItems = AppState.items.slice();
  let offset = 0;
  currentItems.forEach((item, idx) => {
    if (item.kind === "node" && item.col === "a") {
      const copy = {
        ...item,
        id: generateNodeId(),
        col: "b",
      };
      AppState.items.splice(idx + 1 + offset, 0, copy);
      offset++;
    }
  });

  renderPipeline();
}

/**
 * 共通行内の指定した候補のプロパティを更新する。
 * key が 'type' の場合は種別ごとの既定パラメータへリセットしてから再描画する。
 *
 * @param {string} parentId - 対象の共通行のid。
 * @param {number} candIdx - 対象候補のインデックス。
 * @param {string} key - 更新するプロパティ名。
 * @param {*} val - 新しい値。
 */
function updateCand(parentId, candIdx, key, val) {
  const item = AppState.items.find((i) => i.id === parentId);
  if (item && item.kind === "common" && item.candidates[candIdx]) {
    pushHistory();
    if (key === "type") {
      item.candidates[candIdx].type = val;
      Object.assign(item.candidates[candIdx], NODE_TYPES[val].defaults());
      renderPipeline();
    } else {
      item.candidates[candIdx][key] = val;
      // updateGraph(); // グラフ機能は無効化済み(8節参照)。
    }
  }
}

/**
 * 共通行に既定値(linear, a=0, b=0)の新規候補を追加する。
 *
 * @param {string} parentId - 対象の共通行のid。
 */
function addCand(parentId) {
  const item = AppState.items.find((i) => i.id === parentId);
  if (item && item.kind === "common") {
    pushHistory();
    item.candidates.push({ type: "linear", name: "新規", a: 0, b: 0 });
    renderPipeline();
  }
}

/**
 * 共通行から指定インデックスの候補を削除する。
 *
 * @param {string} parentId - 対象の共通行のid。
 * @param {number} candIdx - 削除する候補のインデックス。
 */
function removeCand(parentId, candIdx) {
  const item = AppState.items.find((i) => i.id === parentId);
  if (item && item.kind === "common") {
    pushHistory();
    item.candidates.splice(candIdx, 1);
    renderPipeline();
  }
}

// === 6. 探索・計算ロジック ===

/**
 * 補正関数A列と近似関数B列の構成(ノード種別・パラメータ)が完全に一致しているかを判定する。
 * 一致している場合、探索しても差分は絶対に見つからない。
 *
 * 数式の代数的展開・単純化は行わず、
 * 各ステップの構成ノード種別および設定パラメータの直接比較のみで判定する。
 *
 * 【変更履歴】以前はこの関数自身が #warningAlert の表示/非表示を直接切り替えており、
 * パイプラインを編集するたびに常時バナー表示が更新される作りだった。
 * ユーザー指示により、警告は「探索実行ボタンをクリックした時」だけ alert() で
 * 伝える方式に変更したため、この関数は DOM操作を持たない純粋な判定関数
 * (真偽値を返すだけ)にした。呼び出し側(executeSearch())が判定結果を見て alert() を呼ぶ。
 *
 * @returns {boolean} 補正関数Aと近似関数Bの構成が完全に一致していれば true。
 */
function isIdenticalAB() {
  const extractColNodes = (col) => {
    return AppState.items
      .map((item) => {
        if (item.kind === "common")
          return {
            k: "common",
            c: item.candidates.map((c) => ({
              t: c.type,
              a: c.a,
              b: c.b,
              cap: c.cap,
            })),
          };
        if (item.col === col)
          return {
            k: "node",
            t: item.type,
            a: item.a,
            b: item.b,
            cap: item.cap,
          };
        return null;
      })
      .filter((x) => x !== null);
  };

  const strA = JSON.stringify(extractColNodes("a"));
  const strB = JSON.stringify(extractColNodes("b"));

  return strA === strB;
}

/**
 * 改修値★の全パターンを、「重複組み合わせ H(11,S)」として列挙する。
 *
 * 改修スロットは互いに区別されず(順序を持たない)、かつ同じ★値を複数スロットに
 * 重複して選べる(例: S=2 で ★5,★5 という組み合わせも有効)。そのため候補配列から
 * k個を選ぶ際、通常の組み合わせ(重複なし)ではなく「同じ要素を選び直してよい」
 * 重複組み合わせで列挙する必要がある。
 *
 * 【修正履歴】以前の実装 (getCombinations) は重複を許さない通常の組み合わせを
 * 返しており、updateEstimates() が表示する概算パターン数(重複組み合わせの件数)と
 * 実際にexecuteSearch()が生成するパターン数が一致しない不具合があった。
 * 本関数はその修正版で、返す組み合わせの総数は必ず H(11,S) = C(11+S-1, S) に一致する。
 *
 * 実装は「先頭要素をもう一度選ぶ(同じ配列に留まる)」か「先頭要素を諦めて
 * 残りの配列に進む」かの二択を再帰的に試す標準的な重複組み合わせ列挙法。
 *
 * @param {number[]} arr - 選択候補の配列 (例: [0,1,...,10] の★値)。
 * @param {number} k - 選ぶ個数 (改修スロット数 S)。
 * @returns {number[][]} 長さkの組み合わせの配列。要素数は必ず C(arr.length+k-1, k)。
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
 * 「1. 基本攻撃力」セクションの5入力欄(探索範囲N・改修スロット数S・最低保証火力・
 * 表示火力・表示雷装)を読み取って返す。updateEstimates() と executeSearch() の
 * 両方が同じ5つの getElementById(...).value 読み取りを重複して書いていたため
 * 切り出した(updateEstimatesはN・Sしか使わないが、呼び出し側で必要な分だけ
 * 分割代入すればよい)。
 *
 * @returns {{ N: number, S: number, base: number, fp: number, tp: number }}
 */
function readBaseInputs() {
  return {
    N: parseInt(document.getElementById("rangeN").value) || 0,
    S: parseInt(document.getElementById("slotS").value) || 0,
    base: parseInt(document.getElementById("baseVal").value) || 0,
    fp: parseInt(document.getElementById("fpVal").value) || 0,
    tp: parseInt(document.getElementById("tpVal").value) || 0,
  };
}

/**
 * 現在の入力値(N, S, 改修計算関数の選択状況, 共通行の候補数)から
 * 総探索パターン数を概算し、#estimateDisplay に表示する。
 *
 * 計算式は
 *   総パターン数 = (N+1) × 改修関数パターン数 × Π(共通行ごとの候補関数数)
 * であり、改修関数パターン数は「選択中の改修計算関数の数」×「重複組み合わせ H(11,S)」。
 */
function updateEstimates() {
  const { N, S } = readBaseInputs();
  const fCheckedCount = document.querySelectorAll(".formula-cb:checked").length;

  let starPatterns = 1;
  if (S > 0 && fCheckedCount > 0) {
    // H(11, S) = C(11+S-1, S) を漸化式 h *= (11+i-1)/i (i=1..S) で計算する。
    let h = 1;
    for (let i = 1; i <= S; i++) h = (h * (11 + i - 1)) / i;
    starPatterns = fCheckedCount * h;
  } else if (S > 0 && fCheckedCount === 0) {
    starPatterns = 0;
  }

  let pathPatterns = 1;
  AppState.items.forEach((item) => {
    if (item.kind === "common")
      pathPatterns *= Math.max(1, item.candidates.length);
  });

  const total = (N + 1) * starPatterns * pathPatterns;
  document.getElementById("estimateDisplay").textContent =
    Math.round(total).toLocaleString();

  // 【廃止履歴】以前はここで updateGraph() を呼び、N・最低保証火力・表示火力・
  // 表示雷装の変更をグラフ(8節、現在は無効化)のx範囲へ反映していたが、
  // グラフ機能自体をコメントアウトしたため、この呼び出しも合わせて無効化してある。
  // updateGraph(); // グラフ機能は無効化済み(8節参照)。
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
 * 以前は runSearch() 内に
 *   for (const step of path.pathA) valA = applyFn(valA, step);
 * のようなループがA列・B列それぞれに書かれ重複していた。将来グラフ機能などで
 * 「与えたxに対するA(x)/B(x)を求める」処理を別の場所からも呼びたくなるため、
 * ここに切り出しておく。
 *
 * @param {number} x - パイプラインに投入する初期値。
 * @param {object[]} steps - 適用順に並んだノード列。
 * @returns {number} 全ステップ適用後の最終値。
 */
function applyPipeline(x, steps) {
  return steps.reduce((val, step) => applyFn(val, step), x);
}

/**
 * AppState.items から、あり得る全ての「A列の適用順パス」と「B列の適用順パス」の
 * 組み合わせを再帰的に生成する。共通行は候補関数ごとに分岐し、共通行の位置に
 * 選ばれた候補関数はA列パス・B列パスの両方の対応する位置に同一のものとして
 * 挿入・合成される。
 *
 * pathA/pathB/names はいずれも AppState.items のインデックス昇順(=パイプライン上の
 * 並び順)を維持する必要がある。executeSearch() 側で pathA/pathB を先頭から順に
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
 * @param {number} [idx=0] - 走査中の AppState.items のインデックス (再帰用)。
 * @returns {Array<{ pathA: object[], pathB: object[], names: string[] }>}
 *   各要素が1つの「共通行の分岐パターン」を表す。pathA/pathB はその分岐での
 *   A列/B列それぞれの適用順(パイプライン上の並び順)ノード列、names は
 *   通過した共通行候補の名称列(こちらもパイプライン上の並び順)。
 */
function generateExecutionPaths(idx = 0) {
  if (idx >= AppState.items.length)
    return [{ pathA: [], pathB: [], names: [] }];

  const item = AppState.items[idx];
  const sub = generateExecutionPaths(idx + 1);
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
 * 反例探索を開始する(executeSearch ボタンの onclick から呼ばれるエントリポイント)。
 *
 * 探索本体 (runSearch) は N×改修組み合わせ×共通分岐×パス数 のネストしたループで、
 * 件数によっては数百ms〜数秒かかる同期処理になる。JavaScriptは実行中は画面を
 * 再描画できないため、ボタンを押しても「計算中なのか、固まっているのか、
 * 不一致0件で終わっただけなのか」が見た目上区別できない問題があった。
 *
 * これを解決するため、ここで先にボタンを「計算中…」表示・押下不可にしてから
 * setTimeout(...,0) で1フレーム分処理を遅延させ、ブラウザに「計算中」の表示を
 * 描画する猶予を与えたうえで実際の探索 (runSearch) を実行する。
 * 完了時は runSearch 側でボタンを元に戻し、結果件数バッジと「不一致は
 * ありませんでした」メッセージを一瞬光らせる(flashSearchCompletion)ことで、
 * 結果が0件のまま変化しなくても「今回の実行はここまで完了した」ことが
 * 分かるようにしている(alert によるモーダル通知は使わない)。
 *
 * 補正関数Aと近似関数Bの構成が完全に一致している場合は、実行してもすべて差分ゼロになる
 * (=無意味な実行である)ことを alert() で伝える(同一性警告)。
 * これは実行前の確認事項であり、計算中/完了とは別軸の情報のためalertのままにしている。
 */
function executeSearch() {
  if (isIdenticalAB()) {
    alert(
      "⚠️ 警告: 補正関数Aと近似関数Bの構成が完全に一致しています。差分は検出されません。",
    );
  }

  const { N, S, base, fp, tp } = readBaseInputs();

  const estStr = document
    .getElementById("estimateDisplay")
    .textContent.replace(/,/g, "");
  if (parseInt(estStr) > 500000) {
    if (!confirm(`パターン数が膨大(${estStr}件)です。実行しますか?`)) return;
  }

  const btn = document.getElementById("executeBtn");
  const originalLabel = btn.textContent;
  btn.disabled = true;
  btn.textContent = "計算中…";

  setTimeout(() => {
    runSearch(N, S, base, fp, tp);
    btn.disabled = false;
    btn.textContent = originalLabel;
  }, 0);
}

/**
 * 反例探索の本体(重い同期ループ)。executeSearch() から setTimeout 経由で呼ばれる。
 *
 * 初期値 x = 最低保証火力|夜偵 + 表示火力 + 表示雷装 + 反復変数i + 改修効果 を
 * あらゆる i (0〜N), 改修値の組み合わせ, 共通行の分岐パターンについて求め、
 * それぞれA列パス・B列パスを適用した結果 A(x), B(x) を比較する。
 * A(x) ≠ B(x) となった組み合わせのみを AppState.results に集約し、結果テーブルを描画する。
 *
 * @param {number} N - 探索範囲(反復変数iの上限)。
 * @param {number} S - 改修スロット数。
 * @param {number} base - 最低保証火力|夜偵。
 * @param {number} fp - 表示火力。
 * @param {number} tp - 表示雷装。
 */
function runSearch(N, S, base, fp, tp) {
  const starBonuses = [];
  if (S === 0) {
    starBonuses.push({ val: 0, label: "0" });
  } else {
    const selectedFns = Array.from(
      document.querySelectorAll(".formula-cb:checked"),
    ).map((cb) => STAR_FORMULAS.find((f) => f.id === cb.value));
    // 改修値★の全組み合わせ(重複組み合わせ H(11,S))を列挙する。updateEstimates() の概算と
    // 同じ列挙方法(getStarCombinations)を使うことで、概算件数と実際の結果件数の整合性を保つ。
    const combos = getStarCombinations([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], S);

    for (const fnObj of selectedFns) {
      if (!fnObj) continue;
      for (const combo of combos) {
        const sum = combo.reduce((acc, s) => acc + fnObj.fn(s), 0);
        // STAR_FORMULAS のラベルは元々★を含むプレーンテキストなので、そのまま使う。
        starBonuses.push({
          val: sum,
          label: `${fnObj.label} [${combo.join(",")}] (+${sum.toFixed(2)})`,
        });
      }
    }
  }

  const paths = generateExecutionPaths();
  AppState.results = [];

  for (let i = 0; i <= N; i++) {
    // x: 最低保証火力|夜偵 + 表示火力 + 表示雷装 + 反復変数i の合計(改修効果を含まない
    // 「基本攻撃力」部分)。結果テーブルの最左列に表示する。
    const x = base + fp + tp + i;

    for (const sb of starBonuses) {
      const initX = x + sb.val;

      for (const path of paths) {
        const valA = applyPipeline(initX, path.pathA);
        const valB = applyPipeline(initX, path.pathB);

        if (Math.abs(valA - valB) > 1e-9) {
          AppState.results.push({
            x: x,
            starLabel: sb.label,
            pathName: path.names.join(" / ") || "-",
            resA: valA,
            resB: valB,
            diff: valA - valB,
          });
        }
      }
    }
  }

  // 探索結果セクションは常時表示だが、折りたたまれている状態で実行された場合は
  // 結果が見えないままになってしまうため展開する。
  if (document.getElementById("resultsBody").classList.contains("hidden")) {
    toggleSection("resultsBody");
  }
  document.getElementById("resultCount").textContent =
    `${AppState.results.length.toLocaleString()} 件`;

  AppState.sort = [{ col: "x", asc: true }];
  renderTable();

  // 件数が前回と同じ(0件のまま等)でも「今回の実行が完了した」ことが視覚的に
  // 分かるよう、結果件数バッジと「不一致はありませんでした」メッセージを
  // 一瞬だけ強調表示する。
  flashSearchCompletion();
}

/**
 * 要素のクラスを一瞬だけ入れ替えて元に戻す、汎用の「フラッシュ」演出。
 *
 * @param {?Element} el - 対象要素 (null の場合は何もしない。存在しない場合があるため)。
 * @param {string[]} addClasses - フラッシュ中に追加するクラス。
 * @param {string[]} removeClasses - フラッシュ中に取り除く(終了後に戻す)クラス。
 * @param {number} [durationMs=500] - フラッシュを維持する時間(ミリ秒)。
 */
function flashElement(el, addClasses, removeClasses, durationMs = 500) {
  if (!el) return;
  el.classList.remove(...removeClasses);
  el.classList.add(...addClasses);
  setTimeout(() => {
    el.classList.remove(...addClasses);
    el.classList.add(...removeClasses);
  }, durationMs);
}

/**
 * 探索完了時のフィードバック。結果件数バッジ(#resultCount)を一瞬強調色にし、
 * 結果0件の場合に表示される「不一致はありませんでした」(#noResultsMsg、
 * 0件でない場合はDOMに存在しないため flashElement 側で無視される)も同様に強調する。
 * 探索結果の件数が前回の実行と変わらない場合でも、
 * 「今回のクリックで探索が完了した」ことをユーザーに伝えるためのフィードバック。
 *
 * 強調色は「差分網羅探索を実行」ボタンと同じ bg-emp-2 に統一している
 * (Tailwind標準の green-600 等を使うと、既定の配色にない色が増えてしまい、
 * かつボタンと似て非なる緑が並んで紛らわしくなるため)。
 */
function flashSearchCompletion() {
  flashElement(
    document.getElementById("resultCount"),
    ["bg-emp-2"],
    ["bg-gray-800"],
  );
  flashElement(
    document.getElementById("noResultsMsg"),
    ["bg-emp-2", "font-bold"],
    [],
  );
}

// === 7. 結果表示 ===

/**
 * 結果テーブルの列定義。renderTable() (画面描画) と copyResultsAsTsv() (TSV出力) の
 * 両方から参照する唯一の定義元 (列を増減する場合はここだけ変更すればよい)。
 *
 * @type {Array<{ k: string, l: string }>}
 */
const RESULT_COLUMNS = [
  { k: "x", l: "x" },
  { k: "starLabel", l: "改修効果" },
  { k: "pathName", l: "共通分岐" },
  { k: "resA", l: "A(x)" },
  { k: "resB", l: "B(x)" },
  { k: "diff", l: "A(x)-B(x)" },
];

/**
 * 結果テーブルのソート列を切り替える。
 *
 * 通常クリック: その列だけを唯一のソートキーにする(既に唯一のキーであれば昇順/降順を反転)。
 * Shift+クリック: その列を第2キー以降として追加する(既に追加済みなら昇順/降順を反転)。
 * これにより「iでソートしつつ、同じiの中ではdiffでソート」のような複合ソートができる。
 *
 * @param {string} col - ソート対象の列キー (例: 'i', 'diff')。
 * @param {MouseEvent} [event] - クリックイベント (Shiftキー判定に使う)。
 */
function setSort(col, event) {
  const isShift = !!(event && event.shiftKey);
  const idx = AppState.sort.findIndex((s) => s.col === col);

  if (isShift) {
    if (idx === -1) {
      AppState.sort.push({ col, asc: true });
    } else {
      AppState.sort[idx].asc = !AppState.sort[idx].asc;
    }
  } else {
    if (idx === 0 && AppState.sort.length === 1) {
      AppState.sort[0].asc = !AppState.sort[0].asc;
    } else {
      AppState.sort = [{ col, asc: true }];
    }
  }
  renderTable();
}

/**
 * AppState.results を現在のソート状態 (AppState.sort、第1キーから順に比較) に従って
 * 並べ替え、#resultHeader / #resultBody に描画する。結果が0件の場合はその旨を表示する。
 */
function renderTable() {
  document.getElementById("resultHeader").innerHTML = RESULT_COLUMNS.map(
    (c) => {
      const sortIdx = AppState.sort.findIndex((s) => s.col === c.k);
      const active = sortIdx !== -1;
      const arrow = active ? (AppState.sort[sortIdx].asc ? "▲" : "▼") : "";
      // ソートキーが複数ある場合のみ優先順位の番号(1,2,...)を添える。
      const priority = active && AppState.sort.length > 1 ? sortIdx + 1 : "";
      return `
    <th class="p-2 border-r border-gray-400 cursor-pointer hover:bg-gray-300 select-none" onclick="setSort('${c.k}', event)" title="クリック: この列でソート / Shift+クリック: 第2キー以降として追加">
      <div class="flex justify-between items-center">
        <span>${c.l}</span>
        <span class="text-[10px]">${priority}${arrow}</span>
      </div>
    </th>
  `;
    },
  ).join("");

  const tbody = document.getElementById("resultBody");
  if (AppState.results.length === 0) {
    tbody.innerHTML = `<tr><td id="noResultsMsg" colspan="${RESULT_COLUMNS.length}" class="text-center p-4 text-gray-500 transition-colors duration-150">不一致はありませんでした。</td></tr>`;
    return;
  }

  AppState.results.sort((a, b) => {
    for (const { col, asc } of AppState.sort) {
      const va = a[col];
      const vb = b[col];
      const cmp = typeof va === "string" ? va.localeCompare(vb) : va - vb;
      if (cmp !== 0) return asc ? cmp : -cmp;
    }
    return 0;
  });

  let html = "";
  for (const r of AppState.results) {
    const diffClass =
      r.diff > 0 ? "text-red-700 bg-red-50" : "text-blue-700 bg-blue-50";
    html += `
      <tr class="border-b border-gray-300 hover:bg-gray-50">
        <td class="p-2 border-r border-gray-300 font-mono">${r.x}</td>
        <td class="p-2 border-r border-gray-300 text-gray-600">${r.starLabel}</td>
        <td class="p-2 border-r border-gray-300">${r.pathName}</td>
        <td class="p-2 border-r border-gray-300 font-mono font-bold text-blue-900 bg-blue-50/50">${r.resA.toFixed(2)}</td>
        <td class="p-2 border-r border-gray-300 font-mono font-bold text-red-900 bg-red-50/50">${r.resB.toFixed(2)}</td>
        <td class="p-2 border-r border-gray-300 font-mono font-bold ${diffClass}">${r.diff > 0 ? "+" : ""}${r.diff.toFixed(2)}</td>
      </tr>
    `;
  }
  tbody.innerHTML = html;
}

/**
 * TSV(タブ区切り)のフィールド値として安全な文字列にエスケープする。
 * タブ・ダブルクォート・改行のいずれかを含む場合はダブルクォートで囲み、
 * 内部のダブルクォートは2つ重ねてエスケープする(表計算ソフトの貼り付けが
 * 対応している囲み規則)。
 *
 * @param {*} value - エスケープ対象の値。
 * @returns {string} TSVフィールドとして安全な文字列。
 */
function escapeTsvField(value) {
  const str = String(value);
  if (/["\t\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * 現在の探索結果 (AppState.results、現在のソート順) をTSV形式に変換し、
 * クリップボードにコピーする。列構成は RESULT_COLUMNS / renderTable() の
 * テーブル表示と同じにする(数値は toFixed(2) で丸めて表示値と一致させる)。
 *
 * CSV(カンマ区切り)ではなくTSV(タブ区切り)にしているのは、「改修効果」列の値に
 * `[3,5]` のようにカンマを含むものがあり、CSVのままだと表計算ソフトに貼り付けた際に
 * 列がズレて見えることがあるため。タブ区切りなら貼り付け先で1セル=1フィールドとして
 * 素直に認識される。
 *
 * ゲーム内で個々の反例を再現・検証する際に、Excel等へ貼り付けて整理できるようにする。
 */
function copyResultsAsTsv() {
  const headerRow = RESULT_COLUMNS.map((c) => escapeTsvField(c.l)).join("\t");
  const dataRows = AppState.results.map((r) =>
    [
      r.x,
      r.starLabel,
      r.pathName,
      r.resA.toFixed(2),
      r.resB.toFixed(2),
      r.diff.toFixed(2),
    ]
      .map(escapeTsvField)
      .join("\t"),
  );
  const tsv = [headerRow, ...dataRows].join("\r\n");

  navigator.clipboard.writeText(tsv).then(
    () => {
      alert(
        `結果 ${AppState.results.length.toLocaleString()} 件をTSVとしてクリップボードにコピーしました。`,
      );
    },
    () => {
      alert(
        "クリップボードへのコピーに失敗しました。ブラウザの権限設定をご確認ください。",
      );
    },
  );
}

// === 8. グラフ描画 (無効化) ===
//
// 【廃止履歴】A(x)/B(x)をChart.jsで折れ線グラフ表示する機能を実装したが、
// 「交戦形態補正」以外の共通行(共通補正)を新規追加した場合に、その内容が
// グラフに正しく反映されない不具合が見つかった。原因調査・修正の手間が
// 見合わないとユーザーが判断したため、機能を撤去せず以下をまとめて
// コメントアウトして無効化した(復活させたい場合はここを参照)。
// あわせて index.html 側の Chart.js / chartjs-plugin-zoom の読み込みと
// セクション4のマークアップもコメントアウトしてある。
//
// // === 8. グラフ描画 ===
// //
// // A(x)・B(x)を、現在の基本攻撃力設定(最低保証火力+表示火力+表示雷装 〜 +探索範囲N)の
// // 範囲でxを連続的に動かした折れ線としてChart.jsで描画する。
// // 探索結果(AppState.results)は「改修値★や共通行の分岐をすべて総当たりした結果」だが、
// // グラフはあくまで「1つの共通行分岐の組み合わせ」を選んで、その上でxを連続的に動かした
// //ときにA(x)/B(x)がどう振る舞うかを見るためのものなので、探索結果とは独立している。
// // 改修効果(★)は、含めると x 1点につき改修パターン数ぶんの値ができてしまい単純な
// // 折れ線にならないため、グラフでは含めない(結果テーブルの「x」列と同じ、改修効果を
// // 除いた値をそのままグラフのxとして使う)。
//
// /**
//  * 共通行ごとに、グラフ計算で使う候補のインデックスを保持する。
//  * key: 共通行のid, value: 選択中の候補インデックス (未選択なら0番目扱い)。
//  * AppState.items のような「取り消し(Undo)対象のデータ」ではなく、
//  * グラフ描画のためだけのUI状態なので AppState の外に持つ。
//  *
//  * @type {Record<string, number>}
//  */
// let graphBranchSelection = {};
//
// /** @type {?Chart} 描画済みのChart.jsインスタンス。同一モードの間は破棄せず update() で使い回す。 */
// let abChart = null;
//
// /**
//  * グラフの表示モード。'ab' は A(x)/B(x) の2本線、'diff' は差分 A(x)-B(x) の1本線
//  * (y=0の基準線つき)。タブボタン(setGraphMode)で切り替える。
//  * @type {'ab'|'diff'}
//  */
// let graphMode = "ab";
//
// /** @type {?string} abChart が現在どちらのモードで構築されているか。モードが変わったら再構築が必要。 */
// let abChartMode = null;
//
// /**
//  * グラフの表示モードを切り替える(表示モードタブのonclickから呼ばれる)。
//  *
//  * @param {'ab'|'diff'} mode
//  */
// function setGraphMode(mode) {
//   graphMode = mode;
//   updateGraphModeButtons();
//   updateGraph();
// }
//
// /**
//  * 表示モードタブボタンの見た目(選択中/非選択)を graphMode に合わせて更新する。
//  * 選択中は「差分網羅探索を実行」ボタン等と同じ強調色(bg-emp-2)、
//  * 非選択は他の追加系ボタンと同じ bg-white/70 にする。
//  */
// function updateGraphModeButtons() {
//   const abBtn = document.getElementById("graphModeAbBtn");
//   const diffBtn = document.getElementById("graphModeDiffBtn");
//   const activate = (btn, active) => {
//     btn.classList.toggle("bg-emp-2", active);
//     btn.classList.toggle("font-bold", active);
//     btn.classList.toggle("bg-white/70", !active);
//   };
//   activate(abBtn, graphMode === "ab");
//   activate(diffBtn, graphMode === "diff");
// }
//
// /**
//  * 現在の AppState.items から、グラフ計算用の単一の(分岐しない)パスを構築する。
//  * generateExecutionPaths() は共通行の候補ごとに全組み合わせへ分岐するが、
//  * グラフは1本の折れ線として描くため、共通行では graphBranchSelection で
//  * 選択中の候補1つだけを採用する(候補が0件の共通行は何も適用しない=恒等関数)。
//  *
//  * @returns {{ pathA: object[], pathB: object[] }}
//  */
// function buildGraphPath() {
//   const pathA = [];
//   const pathB = [];
//   for (const item of AppState.items) {
//     if (item.kind === "node") {
//       (item.col === "a" ? pathA : pathB).push(item);
//     } else if (item.kind === "common" && item.candidates.length > 0) {
//       const idx = Math.min(
//         graphBranchSelection[item.id] || 0,
//         item.candidates.length - 1,
//       );
//       const cand = item.candidates[idx];
//       pathA.push(cand);
//       pathB.push(cand);
//     }
//   }
//   return { pathA, pathB };
// }
//
// /**
//  * 複数候補を持つ共通行ごとに、グラフ用の候補選択プルダウンを #graphBranchSelectors に描画する。
//  * 候補が1つ以下の共通行は選ぶ余地がないため表示しない。
//  * パイプラインの構成(共通行の追加・削除・候補の増減)が変わるたびに呼び直す必要がある。
//  */
// function renderGraphControls() {
//   const container = document.getElementById("graphBranchSelectors");
//   const commons = AppState.items.filter(
//     (item) => item.kind === "common" && item.candidates.length > 1,
//   );
//
//   container.innerHTML = commons
//     .map((item) => {
//       const selectedIdx = graphBranchSelection[item.id] || 0;
//       const options = item.candidates
//         .map(
//           (c, idx) =>
//             `<option value="${idx}" ${idx === selectedIdx ? "selected" : ""}>${escapeHtml(c.name || "(無名)")}</option>`,
//         )
//         .join("");
//       return `
//       <div class="flex flex-col">
//         <label class="text-xs text-gray-600 mb-1">${escapeHtml(item.name || "共通補正")}</label>
//         <select class="sheet-input rounded text-left" onchange="setGraphBranch('${item.id}', this.value)">
//           ${options}
//         </select>
//       </div>
//     `;
//     })
//     .join("");
// }
//
// /**
//  * グラフ計算に使う共通行の候補を変更する(候補選択プルダウンのonchangeから呼ばれる)。
//  *
//  * @param {string} commonId - 対象の共通行のid。
//  * @param {string} idxStr - 選択された候補のインデックス(文字列)。
//  */
// function setGraphBranch(commonId, idxStr) {
//   graphBranchSelection[commonId] = parseInt(idxStr) || 0;
//   updateGraph();
// }
//
// /** グラフの最大サンプリング点数。探索範囲Nが大きくても描画が重くならないよう間引く。 */
// const MAX_GRAPH_POINTS = 300;
//
// /**
//  * 現在の基本攻撃力設定とパイプライン構成から A(x)/B(x) を計算し、#abChart を再描画する。
//  *
//  * xの範囲は [最低保証火力+表示火力+表示雷装, 同+探索範囲N] (結果テーブルの「x」列と
//  * 同じ定義)。iは常に整数なのでxも本来1刻みの整数列だが、N+1点すべてを描画すると
//  * (Nが大きい場合)重くなるため、MAX_GRAPH_POINTS を超える場合は間引いてサンプリングする
//  * (末尾の点=xの最大値は間引かれても必ず含める)。
//  */
// function updateGraph() {
//   const { N, base, fp, tp } = readBaseInputs();
//   const xMin = base + fp + tp;
//   const totalPoints = N + 1;
//   const step = Math.max(1, Math.ceil(totalPoints / MAX_GRAPH_POINTS));
//
//   const { pathA, pathB } = buildGraphPath();
//   const labels = [];
//   const dataA = [];
//   const dataB = [];
//   const dataDiff = [];
//
//   const sample = (x) => {
//     const valA = applyPipeline(x, pathA);
//     const valB = applyPipeline(x, pathB);
//     labels.push(x);
//     dataA.push(valA);
//     dataB.push(valB);
//     dataDiff.push(valA - valB);
//   };
//
//   for (let i = 0; i <= N; i += step) sample(xMin + i);
//   // 間引きによってxの最大値(i=N)が含まれずに終わっている場合、最後に追加する。
//   if (labels[labels.length - 1] !== xMin + N) sample(xMin + N);
//
//   renderAbChart(labels, dataA, dataB, dataDiff);
// }
//
// /**
//  * #abChart(Chart.jsの折れ線グラフ)にデータを描画する。graphMode に応じて
//  * 「A(x)/B(x)の2本線」または「差分A(x)-B(x)の1本線(y=0の基準線つき)」を出し分ける。
//  *
//  * 同じモードのまま値だけ更新する場合はデータを差し替えて update() を呼ぶだけにする
//  * (毎回破棄・再生成すると描画がちらつく上、ズーム状態も失われるため)。
//  * モード自体が切り替わった場合は、データセットの本数・内容が変わるため
//  * 一度 destroy() してから作り直す。
//  *
//  * @param {number[]} labels - x軸に表示するxの値の配列。
//  * @param {number[]} dataA - 各xに対応するA(x)の値。
//  * @param {number[]} dataB - 各xに対応するB(x)の値。
//  * @param {number[]} dataDiff - 各xに対応する差分 A(x)-B(x) の値。
//  */
// function renderAbChart(labels, dataA, dataB, dataDiff) {
//   const needsRebuild = !abChart || abChartMode !== graphMode;
//
//   if (!needsRebuild) {
//     abChart.data.labels = labels;
//     if (graphMode === "ab") {
//       abChart.data.datasets[0].data = dataA;
//       abChart.data.datasets[1].data = dataB;
//     } else {
//       abChart.data.datasets[0].data = dataDiff;
//       abChart.data.datasets[1].data = labels.map(() => 0);
//     }
//     abChart.update();
//     return;
//   }
//
//   if (abChart) abChart.destroy();
//   abChartMode = graphMode;
//
//   const datasets =
//     graphMode === "ab"
//       ? [
//           {
//             label: "A(x)",
//             data: dataA,
//             borderColor: "#1e3a8a",
//             backgroundColor: "transparent",
//             borderWidth: 2,
//             pointRadius: 0,
//           },
//           {
//             label: "B(x)",
//             data: dataB,
//             borderColor: "#991b1b",
//             backgroundColor: "transparent",
//             borderWidth: 2,
//             pointRadius: 0,
//           },
//         ]
//       : [
//           {
//             label: "A(x)-B(x)",
//             data: dataDiff,
//             borderColor: "#6b21a8",
//             backgroundColor: "transparent",
//             borderWidth: 2,
//             pointRadius: 0,
//           },
//           {
//             // 差分0(=一致)の基準線。値を持つデータ系列ではなく参照線なので、
//             // 凡例フィルタで隠す必要はないが破線・細線・グレーにして主役の
//             // 差分ラインと区別する。
//             label: "y = 0",
//             data: labels.map(() => 0),
//             borderColor: "#9ca3af",
//             borderDash: [4, 4],
//             borderWidth: 1,
//             pointRadius: 0,
//           },
//         ];
//
//   const ctx = document.getElementById("abChart").getContext("2d");
//   abChart = new Chart(ctx, {
//     type: "line",
//     data: { labels: labels, datasets: datasets },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       animation: false,
//       scales: {
//         x: { title: { display: true, text: "x" } },
//         y: {
//           title: {
//             display: true,
//             text: graphMode === "ab" ? "y" : "A(x)-B(x)",
//           },
//         },
//       },
//       plugins: {
//         legend: { display: true },
//         // chartjs-plugin-zoom: ホイールでズーム、ドラッグでパン。
//         // x/y両軸とも対象(mode:'xy')にしているのは、softcapの折れ曲がり付近など
//         // 値の微妙な違いを見たい場面ではy軸方向の拡大も必要になるため。
//         zoom: {
//           zoom: {
//             wheel: { enabled: true },
//             pinch: { enabled: true },
//             mode: "xy",
//           },
//           pan: {
//             enabled: true,
//             mode: "xy",
//           },
//         },
//       },
//     },
//   });
// }
//
// /**
//  * パイプラインの構成が変わった(共通行の追加・削除・候補の増減など)場合に呼ぶ。
//  * 候補選択プルダウンの再生成とグラフの再計算の両方を行う。
//  * 値の変更だけ(a/b/cap等)で構成自体は変わらない場合は updateGraph() のみでよい。
//  */
// function refreshGraph() {
//   renderGraphControls();
//   updateGraphModeButtons();
//   updateGraph();
// }
