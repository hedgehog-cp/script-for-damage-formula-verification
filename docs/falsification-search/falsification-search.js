/**
 * 反証可能火力探索 — アプリケーションロジック。
 *
 * 目的:
 *   確度を向上したい補正関数A(x)と、それに対する近似関数B(x)という2つの補正パイプラインを
 *   組み立て、初期値 x (最低保証火力・表示火力・表示雷装・反復変数 i・改修効果・共通補正の分岐)
 *   のあらゆる組み合わせを網羅的に試行して A(x) と B(x) が一致しない反証可能火力x(反例)を探す。
 *   探索対象は式そのものではなく、式に投入する引数 x を構成する各パラメータの組み合わせである。
 *
 * 依存ファイル:
 *   search-core.js — NODE_TYPES/STAR_FORMULAS等、Web Worker(search-worker.js)と
 *   共有する計算ロジック。index.htmlでこのファイルより先に読み込む必要がある
 *   (詳細はsearch-core.js冒頭のコメント参照)。
 *
 * 構成 (各セクション見出しの番号は本ファイル内の見出しコメントに対応):
 *   0.  ユーティリティ             — escapeHtml 等、他セクションから横断的に使う小関数
 *   1.  マスターデータ・状態定義   — 補正ステップ種別のUI定義(NODE_TYPES_UI)、
 *                                    種別<option>生成(nodeTypeOptionsHtml)、
 *                                    パイプラインの状態(AppState)。計算ロジックの
 *                                    NODE_TYPES/STAR_FORMULASはsearch-core.jsで定義している。
 *   1b. Undo (Ctrl+Z)
 *   2.  初期化                     — ページロード時の初期描画、セクション折りたたみ、
 *                                    改修計算関数候補チェックボックスの描画(renderFormulas)
 *   3.  パイプライン描画           — AppState.items を実際のDOMへ変換する
 *   4.  D&D                        — ドラッグ&ドロップによる並び替え
 *   5.  データ操作関数             — ノード/共通行の追加・更新・削除
 *   6.  探索・計算ロジック         — 反例探索の本体 (executeSearch/runSearchParallel)。
 *                                    実際の計算(applyPipeline等)はsearch-core.jsを
 *                                    Web Worker(search-worker.js)経由で並列実行する。
 *   7.  結果表示                   — 結果テーブルの描画・ソート・TSVコピー
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
// STAR_FORMULAS の定義本体は search-core.js を参照(ファイル先頭コメント参照)。

/**
 * 補正ステップの種別ごとのUI関心事(<select>の選択肢ラベル、種別変更時の
 * デフォルトパラメータ、パラメータ入力欄のHTML)を1箇所に集約したレジストリ。
 * 計算ロジック(apply)は search-core.js の NODE_TYPES(Web Workerとも共有)に
 * ある。キー(linear/softcap/floor)は両者で対応させてあり、ノード1件分の
 * 種別を扱う際は基本的に NODE_TYPES_UI[type] と NODE_TYPES[type] の両方を
 * (必要な方だけ)参照することになる。
 *
 * - label:    <select>の選択肢に表示する文字列。
 * - defaults: 種別変更時にリセットするパラメータ (a/b や cap) を返す。
 * - paramsUI: パラメータ入力欄のHTML断片を返す (getParamsUI から呼ばれる)。
 *
 * @type {Record<string, {
 *   label: string,
 *   defaults: () => object,
 *   paramsUI: (node: object, onChangeStr: string) => string,
 * }>}
 */
const NODE_TYPES_UI = {
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
  },
  softcap: {
    label: "f(x)=softcap(x)",
    defaults: () => ({ cap: 220 }),
    paramsUI: (node, onChangeStr) => `
      <label class="flex items-center gap-1 text-xs whitespace-nowrap"><span class="text-gray-500">cap:</span>
        <input type="number" step="1" value="${node.cap !== undefined ? node.cap : 220}" class="sheet-input steppable w-16 text-left font-mono rounded" onchange="${onChangeStr}, 'cap', parseFloat(this.value) || 0)">
      </label>
    `,
  },
  floor: {
    label: "f(x)=floor(x)",
    defaults: () => ({}),
    paramsUI: () => "",
  },
};

/**
 * NODE_TYPES_UI の全種別を <option> タグの並びとして返す。
 * 個別ノードカードの種別セレクトと、共通行候補の種別セレクトの両方から
 * 呼ばれる (以前はこの2箇所に同じ3つの<option>がそのまま重複して書かれていた)。
 *
 * @param {string} selectedType - 現在選択中の種別キー ('linear' 等)。
 * @returns {string} <option>タグを連結したHTML文字列。
 */
function nodeTypeOptionsHtml(selectedType) {
  return Object.entries(NODE_TYPES_UI)
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
 * page:      結果テーブルの現在の表示ページ(0始まり)。1ページあたりの件数は
 *            PAGE_SIZE (renderTable()参照)。新規探索の実行やソート変更時は
 *            0(先頭ページ)にリセットされる。
 *
 * @type {{
 *   items: Array<object>,
 *   draggedId: string|null,
 *   results: Array<object>,
 *   sort: Array<{ col: string, asc: boolean }>,
 *   page: number
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
  sort: [{ col: "baseX", asc: true }],
  page: 0,
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
 *
 * 探索実行中は何もしない。パイプライン編集UIそのものは setPipelineEditingLocked()
 * が pointer-events:none / disabled で無効化しているが、これはマウス操作・
 * フォーム部品の操作のみを防ぐものであり、キーボードショートカット(Ctrl+Z)は
 * ここで個別にガードする必要がある。「探索実行中かどうか」は#executeBtnの
 * disabled状態と常に一致する(executeSearch()参照)ため、別途フラグ変数は
 * 持たずここで直接参照する。
 */
function undo() {
  if (document.getElementById("executeBtn").disabled || undoStack.length === 0)
    return;
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
 * 実体は NODE_TYPES_UI[node.type].paramsUI() への委譲。種別ごとのUIを個別に
 * 分岐させず1箇所(NODE_TYPES_UI)にまとめてあるので、ここでは呼び出すだけでよい。
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

  const def = NODE_TYPES_UI[node.type];
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
 * @param {string} id - 更新対象の item id。
 * @param {string} key - 更新するプロパティ名 (例: 'name')。
 * @param {*} val - 新しい値。
 */
function updateItem(id, key, val) {
  const item = AppState.items.find((i) => i.id === id);
  if (item) {
    pushHistory();
    item[key] = val;
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
    Object.assign(item, NODE_TYPES_UI[type].defaults());
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
      Object.assign(item.candidates[candIdx], NODE_TYPES_UI[val].defaults());
      renderPipeline();
    } else {
      item.candidates[candIdx][key] = val;
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
 * である。改修関数パターン数は、各スロットが独立に「改修計算関数×★値」を選べる
 * (search-core.js の buildStarBonuses()参照)ことを踏まえ、選択中の関数数をF、
 * スロット数をSとして重複組み合わせ H(11F, S) で計算する(「1個の選択肢」が
 * 11通りの★値ではなく「関数×★値」の11F通りになるため)。
 *
 * 【修正履歴】以前はスロットごとに異なる改修計算関数を選べない実装
 * (F × H(11,S))になっており、例えば「1.0√★の★1」と「0.2★の★3」を
 * 混在させたパターンが探索から漏れていた。buildStarBonuses()側の修正に合わせて
 * ここの概算式も H(11F, S) に修正している。
 */
function updateEstimates() {
  const { N, S } = readBaseInputs();
  const fCheckedCount = document.querySelectorAll(".formula-cb:checked").length;

  let starPatterns = 1;
  if (S > 0 && fCheckedCount > 0) {
    // H(11F, S) = C(11F+S-1, S) を漸化式 h *= (11F+i-1)/i (i=1..S) で計算する。
    const n = 11 * fCheckedCount;
    let h = 1;
    for (let i = 1; i <= S; i++) h = (h * (n + i - 1)) / i;
    starPatterns = h;
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
}

/**
 * 探索の入力条件となるUI ── data-lock-during-search 属性を持つコンテナ
 * (現状は index.html の #section1Body と #pipelineSection の2つ。
 * 1節: 基本攻撃力の入力欄・改修計算関数チェックボックス。2節: 共通補正/
 * 補正の追加ボタン・複製ボタン・#pipelineContainer内のノード編集・D&D) ──
 * の有効/無効を切り替える。
 *
 * 【背景】以前(単一スレッドの同期実行)は探索の実行中はブラウザ自体が
 * ブロックされており、これらを編集する操作は物理的に不可能だった。
 * Web Worker化(runSearchParallel())で探索が非同期になり、実行中も画面の
 * 他の部分を操作できるようになったことで、探索実行中にこれらを編集すると
 * 「画面に表示されている入力条件」と「実際に探索された(これから表示される
 * 結果が対応する)入力条件」が食い違ってしまう問題が新たに生じた。
 * これを避けるため、探索実行中は編集不可にする。
 *
 * 【修正履歴】当初は #section2Body だけをロック対象にしていたが、
 * 「+ 共通補正を追加」ボタンが1節の外側(2節のヘッダー行)にあり
 * #section2Body に含まれていないこと、および1節の入力欄・改修計算関数
 * チェックボックス自体がロック対象に含まれていなかったことに気づかず、
 * 探索実行中でもこれらを操作できてしまっていた。#section1Body と
 * #pipelineSection をロック対象に加えて一旦解決したが、この時点では
 * ロック対象をJS側でid列挙するコード(このコメントの旧版参照)になっており、
 * これはまさに元の不具合(ロック対象の列挙漏れ)と同じ形の脆さを抱えていた
 * ── 将来、探索条件に影響する新しいUI要素をこの2つのコンテナの外側に
 * 追加すると、同じ穴が再発する。そのため「ロック対象かどうか」をJS側の
 * 固定リストではなくHTML側の data-lock-during-search 属性で宣言する形に
 * 改め、新しい要素を追加する側が対応するコンテナに属性を付けるだけで
 * 自動的にロック対象へ含まれるようにした。
 *
 * pointer-events:none はマウスでのクリック/ドラッグ操作しか防げない
 * (フォーカス済み、またはTabキーでフォーカス移動した input/select は
 * キーボードから編集できてしまう)ため、input/select/button/textarea
 * には別途 disabled 属性を設定する。これらの対象外(D&Dのドラッグハンドル
 * など)は pointer-events:none のみに頼る。また、キーボードショートカット
 * (Ctrl+Zのundo())は #executeBtn の disabled 状態を個別にチェックして
 * ガードしている(undo()参照)。
 *
 * @param {boolean} locked - true で編集不可にする。
 */
function setPipelineEditingLocked(locked) {
  document.querySelectorAll("[data-lock-during-search]").forEach((el) => {
    el.classList.toggle("opacity-60", locked);
    el.classList.toggle("pointer-events-none", locked);
    el.querySelectorAll("input, select, button, textarea").forEach(
      (control) => {
        control.disabled = locked;
      },
    );
  });
}

/**
 * 反例探索を開始する(executeSearch ボタンの onclick から呼ばれるエントリポイント)。
 *
 * 探索本体 (runSearchParallel) は N×改修組み合わせ×共通分岐×パス数 のネストした
 * ループで、件数によっては数百ms〜数秒かかる重い処理になる。ボタンを押しても
 * 「計算中なのか、固まっているのか、不一致0件で終わっただけなのか」が見た目上
 * 区別できない問題があったため、ここで先にボタンを「計算中…」表示・押下不可に
 * してから setTimeout(...,0) で1フレーム分処理を遅延させ、ブラウザに「計算中」
 * の表示を描画する猶予を与えたうえで実際の探索 (runSearchParallel) を実行する。
 * 完了時はボタンを元に戻し、結果件数バッジと「不一致はありませんでした」
 * メッセージを一瞬光らせる(flashSearchCompletion)ことで、結果が0件のまま
 * 変化しなくても「今回の実行はここまで完了した」ことが分かるようにしている
 * (alert によるモーダル通知は使わない)。
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

  // 表示桁数は入力欄のonchangeには反応させず、実行のこのタイミングでまとめて
  // 読み取る(displayDecimalsのJSDoc参照)。上限は入力欄自身のmax属性から
  // 読み取る(値をここに複製して二重管理にしない)。範囲外の値(キーボード
  // 直接入力はHTMLのmax属性による制限を受けない)をtoFixed()にそのまま渡すと
  // Number.prototype.toFixed() は引数が0〜100の範囲外だとRangeErrorを投げる
  // 仕様のため、ここで必ず0〜maxへクランプする。
  const decimalsEl = document.getElementById("displayDecimals");
  const decimalsInput = parseInt(decimalsEl.value);
  const decimalsMax = parseInt(decimalsEl.max);
  displayDecimals = Number.isFinite(decimalsInput)
    ? Math.min(Math.max(decimalsInput, 0), decimalsMax)
    : 5;

  const btn = document.getElementById("executeBtn");
  const originalLabel = btn.textContent;
  btn.disabled = true;
  btn.textContent = "計算中…";
  setPipelineEditingLocked(true);

  setTimeout(() => {
    runSearchParallel(N, S, base, fp, tp)
      .catch((err) => {
        console.error(err);
        alert(
          "探索中にエラーが発生しました。詳細はブラウザの開発者ツールのコンソールを確認してください。",
        );
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = originalLabel;
        setPipelineEditingLocked(false);
      });
  }, 0);
}

/**
 * total件(反復変数i=0〜total-1)の作業を、workerCount個の区間へできるだけ
 * 均等に分割する。
 *
 * 単純に Math.ceil(total/workerCount) 幅で区切ると割り切れない場合に
 * workerCount個より少ない区間しか生成されず、意図した並列度に届かない
 * (例: total=51, workerCount=16 だと ceil(51/16)=4幅の区間が13個しかできず
 * 16並列にならない)。そのため余り(remainder)分だけ先頭側の区間に1個ずつ
 * 多く割り振り、区間数が必ず workerCount 個になるようにする。
 *
 * @param {number} total - 分割対象の総件数。
 * @param {number} workerCount - 分割する区間数(=起動するWorker数)。
 * @returns {Array<{ iStart: number, iEnd: number }>} 各区間の [iStart, iEnd](両端含む)。
 */
function splitIntoChunks(total, workerCount) {
  const baseSize = Math.floor(total / workerCount);
  const remainder = total % workerCount;
  const chunks = [];
  let start = 0;
  for (let w = 0; w < workerCount; w++) {
    const size = baseSize + (w < remainder ? 1 : 0);
    chunks.push({ iStart: start, iEnd: start + size - 1 });
    start += size;
  }
  return chunks;
}

/**
 * 1つのWorker(search-worker.js)を起動し、担当区間(chunk)の探索結果を
 * 計算させて受け取る。成功・失敗いずれの場合もWorkerは必ず terminate() し、
 * リソース(スレッド)を残さないようにする。
 *
 * @param {{ iStart: number, iEnd: number }} chunk - このWorkerが担当するiの区間。
 * @param {object} payload - chunk以外の共通パラメータ(starBonuses/paths/base/fp/tp)。
 * @returns {Promise<object[]>} この区間で見つかった反例(A(x)≠B(x))の配列。
 */
function runWorkerChunk(chunk, payload) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("search-worker.js");
    worker.onmessage = (e) => {
      worker.terminate();
      resolve(e.data.results);
    };
    worker.onerror = (err) => {
      worker.terminate();
      reject(err);
    };
    worker.postMessage({ ...payload, iStart: chunk.iStart, iEnd: chunk.iEnd });
  });
}

/**
 * Web Workerでの並列実行が失敗した場合のフォールバック。メインスレッド上で
 * computeSearchResults() を1回呼び、範囲全体(0〜N)を一度に計算する。
 * 並列化されない(=単一コアのみ使用)以外はWorker経路と同じ結果を返す
 * (実際の計算ループはsearch-core.jsの同一関数を使うため、結果は完全に一致する)。
 *
 * @param {Array<{val:number, label:string}>} starBonuses - buildStarBonuses()の結果(runSearchParallel()で計算済み)。
 * @param {Array<{pathA:object[], pathB:object[], names:string[]}>} paths - generateExecutionPaths()の結果(同上)。
 * @param {number} N - 探索範囲(反復変数iの上限)。
 * @param {number} base - 最低保証火力|夜偵。
 * @param {number} fp - 表示火力。
 * @param {number} tp - 表示雷装。
 * @returns {object[]} 反例(A(x)≠B(x))の配列。
 */
function runSearchSequential(starBonuses, paths, N, base, fp, tp) {
  return computeSearchResults({
    starBonuses,
    paths,
    iStart: 0,
    iEnd: N,
    base,
    fp,
    tp,
  });
}

/**
 * chunk単位の結果配列(Worker経路)または単一の結果配列(フォールバック経路)を
 * AppState.results へ統合し、結果テーブルの描画・完了フィードバックまで行う。
 * runSearchParallel() の両経路(Worker並列/非並列フォールバック)から共通で呼ぶ。
 *
 * @param {object[][]} resultsPerChunk - 各区間(またはフォールバックの単一区間)の結果配列の配列。
 */
function mergeResultsAndRender(resultsPerChunk) {
  // Worker経路: Promise.all は各要素を「解決順」ではなく「渡した配列の順序」で
  // 返す仕様のため、resultsPerChunk は必ず chunks(=splitIntoChunksが返す
  // iStart昇順の区間列)と同じ順序になる。各chunk自身の内部ループもi昇順で
  // 結果を積んでいる(search-core.js の computeSearchResults 参照)。
  // フォールバック経路(runSearchSequential)も同様に単一のi昇順ループである。
  // したがって flat() した時点で全体が必ず baseX 昇順になっており、
  // 下で AppState.sort を baseX 昇順にリセットする値と既に一致しているため、
  // ここで改めて sortResults() を呼ぶ必要はない(以前は呼んでいたが、
  // この不変条件は暗黙の前提ではなく上記の理由により保証されているため、
  // 結果件数が多いほどコストが大きい冗長なO(n log n)処理を削除した)。
  //
  // デフォルトのソートキーを x(baseXに改修効果値を加えた値)ではなく
  // baseX にしているのはこの保証を成立させるため。x は同じi(baseX)の中でも
  // 改修値の組み合わせ(starBonuses、列挙順は合計値の大小と無関係)によって
  // 前後しうるため、xを既定ソートキーにすると上記の不変条件が崩れる。
  AppState.results = resultsPerChunk.flat();

  // 探索結果セクションは常時表示だが、折りたたまれている状態で実行された場合は
  // 結果が見えないままになってしまうため展開する。
  if (document.getElementById("resultsBody").classList.contains("hidden")) {
    toggleSection("resultsBody");
  }
  document.getElementById("resultCount").textContent =
    `${AppState.results.length.toLocaleString()} 件`;

  AppState.sort = [{ col: "baseX", asc: true }];
  AppState.page = 0;
  renderTable();

  // 件数が前回と同じ(0件のまま等)でも「今回の実行が完了した」ことが視覚的に
  // 分かるよう、結果件数バッジと「不一致はありませんでした」メッセージを
  // 一瞬だけ強調表示する。
  flashSearchCompletion();
}

/**
 * 反例探索の本体。可能な場合は複数のWeb Worker(search-worker.js)に分割して
 * 並列実行し、Workerが使えない環境ではメインスレッドでの逐次計算にフォールバックする。
 *
 * 初期値 x = 最低保証火力|夜偵 + 表示火力 + 表示雷装 + 反復変数i + 改修効果 を
 * あらゆる i (0〜N), 改修値の組み合わせ, 共通行の分岐パターンについて求め、
 * それぞれA列パス・B列パスを適用した結果 A(x), B(x) を比較する。
 * A(x) ≠ B(x) となった組み合わせのみを AppState.results に集約し、結果テーブルを描画する。
 *
 * 【並列化】この探索は反復変数 i (0〜N) が最も外側のループで、i ごとの計算は
 * 互いに独立している。以前は単一スレッドの同期ループで実行しており、
 * setTimeout(...,0) による1フレームの遅延は「計算中」表示を描画する猶予には
 * なっても計算自体は速くならず、実行中は画面(UI)が完全にブロックされたままだった。
 * そこで i の範囲を navigator.hardwareConcurrency (実行環境のCPU論理コア数)個の
 * 連続区間に分割し(splitIntoChunks)、区間ごとに1つのWorkerを起動して
 * 並列に計算させる(runWorkerChunk)ことで、複数CPUコアを実際に使って
 * 処理時間を短縮する。
 *
 * 【フォールバック】HTMLファイルを file:// で直接開いた場合、Chromium系
 * ブラウザはWorker生成そのものを拒否する。GitHub Pages等のHTTP(S)配信では
 * 問題なく並列化されるが、file://でのローカル動作確認でも探索機能自体は
 * 使えるよう、Worker側で何らかの失敗が起きた場合は単一コアでの逐次計算
 * (runSearchSequential)に自動でフォールバックする。
 *
 * このフォールバックは「事前にWorkerが使えるか判定してから分岐する」方式では
 * なく、「まず並列実行を試し、失敗したら逐次計算をやり直す」方式にしてある。
 * 以前は事前判定(テスト用のWorkerを1つ生成してみて例外の有無で判定)を
 * 行っていたが、file://下でのWorker生成失敗の起こり方はブラウザによって
 * 同期的な例外(SecurityError)だったり非同期的な失敗(Workerの生成自体は
 * 成功したように見えるが、スクリプトの読み込みが後から失敗する)だったりし、
 * 事前判定の同期的な try/catch だけでは検知できないケースがあった。
 * Promise.all(tasks) の失敗(どのタイミング・どんな理由であれ)を catch して
 * フォールバックする方式なら、失敗の起こり方に関わらず必ず検知できる。
 *
 * 【修正履歴】catch()は Promise.all(tasks) の直後にだけ挟んであり、
 * 後段の .then(mergeResultsAndRender) は catch の外に置いてある。以前は
 * .then(mergeResultsAndRender).catch(...) の順で、mergeResultsAndRender()
 * (結果統合・テーブル描画)側の不具合まで同じcatchで「Workerが使えない」と
 * 誤診断してしまい、結果件数が多いほど無視できないコストになる無駄な
 * 全件再計算を引き起こしていた。Worker失敗時のフォールバック結果を
 * (chunk単位の配列と同じ形の)配列として catch から返し、成功時・
 * フォールバック時のどちらも同じ .then(mergeResultsAndRender) を通す
 * ことで、mergeResultsAndRender() 自体の不具合はここで揉み消さず、
 * executeSearch() 側の最終catchへ正しく伝播するようにしている。
 *
 * NODE_TYPES.apply や STAR_FORMULAS.fn 等の関数は postMessage で複製できないため、
 * Workerには関数そのものではなく構造化複製可能なプレーンデータのみを渡す。
 * starBonuses(改修値の組み合わせ)とpaths(パイプラインの分岐パターン)は
 * iStart/iEndに依存せず全チャンク共通のため、ここで1回だけ計算してから
 * Workerへ渡す(computeSearchResults()のJSDoc参照。以前はWorker/フォールバック
 * 呼び出しのたびに内部で再計算しており、Worker数倍の無駄な計算になっていた)。
 *
 * @param {number} N - 探索範囲(反復変数iの上限)。
 * @param {number} S - 改修スロット数。
 * @param {number} base - 最低保証火力|夜偵。
 * @param {number} fp - 表示火力。
 * @param {number} tp - 表示雷装。
 * @returns {Promise<void>} 計算・結果統合・描画が完了したら解決する。
 */
function runSearchParallel(N, S, base, fp, tp) {
  const formulaIds = Array.from(
    document.querySelectorAll(".formula-cb:checked"),
  ).map((cb) => cb.value);
  const selectedFns = resolveFormulas(formulaIds);
  const starBonuses = buildStarBonuses(S, selectedFns);
  const paths = generateExecutionPaths(AppState.items);

  const total = N + 1;
  const workerCount = Math.max(
    1,
    Math.min(navigator.hardwareConcurrency || 4, total),
  );
  const chunks = splitIntoChunks(total, workerCount);
  const payload = { starBonuses, paths, base, fp, tp };

  const tasks = chunks.map((chunk) => runWorkerChunk(chunk, payload));

  // catch() は Promise.all(tasks) の直後にだけ挟む(理由はJSDoc参照)。
  return Promise.all(tasks)
    .catch((err) => {
      console.warn(
        "Web Workerでの並列探索に失敗したため、単一スレッドでの逐次計算にフォールバックします。",
        err,
      );
      return [runSearchSequential(starBonuses, paths, N, base, fp, tp)];
    })
    .then(mergeResultsAndRender);
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
 * 強調色は「総当たり探索を実行」ボタンと同じ bg-emp-2 に統一している
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
 * 結果テーブル・TSV出力で数値を丸める小数桁数。#displayDecimals入力欄の値を
 * 「探索実行ボタンを押した時」だけ読み取ってここに反映する(executeSearch()参照)。
 *
 * 【変更履歴】以前は入力欄のonchangeで即座にこの値を更新し再描画していたが、
 * renderTable()は結果ぶんのテーブルHTMLを丸ごと作り直すため、
 * 結果件数が多いと桁数を変えるだけで毎回重い再描画が走ってしまっていた。
 * 「桁数はどうせ実行時に見るものが決まればよい」という判断で、入力欄の変更には
 * 反応せず、次の探索実行時にまとめて反映する方式にした。
 * @type {number}
 */
let displayDecimals = 5;

/**
 * 結果テーブルの列定義。renderTable() (画面描画) と copyResultsAsTsv() (TSV出力) の
 * 両方から参照する唯一の定義元 (列を増減する場合はここだけ変更すればよい)。
 *
 * @type {Array<{ k: string, l: string }>}
 */
const RESULT_COLUMNS = [
  { k: "baseX", l: "最低保証火力+表示火力+表示雷装" },
  { k: "starLabel", l: "改修効果式" },
  { k: "starSum", l: "改修効果値" },
  { k: "x", l: "x" },
  { k: "pathName", l: "共通分岐" },
  { k: "resA", l: "A(x)" },
  { k: "resB", l: "B(x)" },
  { k: "diff", l: "A(x)-B(x)" },
];

/**
 * AppState.results を現在のソート状態 (AppState.sort、第1キーから順に比較) に従って
 * 破壊的に並べ替える。
 *
 * 【修正履歴】以前はこのソート処理を renderTable() の中に置いていたため、
 * ソート順が変わっていない「次へ/前へ」でのページ送り(changePage())でも
 * 呼び出すたびに結果全件をソートし直していた。ページングは1ページあたりの
 * 描画件数を減らして重さに対応するために導入したのに、肝心のソートが
 * 毎回O(n log n)で全件走ってしまっては効果が薄い。ソートは「結果が
 * 新しく確定した時」(mergeResultsAndRender())と「ソート条件そのものが
 * 変わった時」(setSort())だけ行えばよいため、この2箇所からだけ呼び、
 * renderTable()・changePage() 側は「既にソート済みの結果から現在の
 * ページ分を切り出して描画するだけ」の役割に限定した。
 */
function sortResults() {
  AppState.results.sort((a, b) => {
    for (const { col, asc } of AppState.sort) {
      const va = a[col];
      const vb = b[col];
      const cmp = typeof va === "string" ? va.localeCompare(vb) : va - vb;
      if (cmp !== 0) return asc ? cmp : -cmp;
    }
    return 0;
  });
}

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
  // 並び順が変わると各ページの内容も変わるため、閲覧中のページ番号を維持する
  // 意味がない。先頭ページ(0)に戻す。
  AppState.page = 0;
  sortResults();
  renderTable();
}

/**
 * 結果テーブルの1ページあたりの表示件数。
 *
 * 【修正履歴】以前は MAX_RENDERED_ROWS(20,000件)を上限に先頭からまとめて
 * 描画していたが、結果が数千〜数万件になるとDOMへの反映(tbody.innerHTMLの
 * 差し替え)自体が重く、ブラウザの反応が鈍くなる問題があった(さらに以前は
 * 上限そのものがなく、文字列がJSエンジンの最大文字列長を超えて
 * `RangeError: Invalid string length` で描画がクラッシュすることもあった)。
 * 「一度に見るのは現実的にも数百〜千件程度で十分」という判断で、1000件ずつの
 * ページ送りに変更した。
 *
 * 【修正履歴】その後、1000行表示時にウィンドウのリサイズが重い(1回のリサイズで
 * 約60〜70msのレイアウト再計算)という報告があり、実測したところコストは
 * 表示行数にほぼ比例していた(1000行→約65ms, 500行→約22ms, 200行→約8ms)。
 * table-layout:fixed(既存の対策)は列幅決定のO(行数)コストは解消するが、
 * 各行そのものの配置計算までは省略できない。content-visibility:auto
 * (画面外要素のレイアウトを省略する仕組み)も試したが、CDP経由の実測で
 * <table>の行(<tr>)には効果がないことを確認した(テーブルのレイアウト
 * アルゴリズムとの相性による既知の制限)。そのため表示件数を200件まで
 * 減らし、体感で滑らかな範囲(60fpsの目安である16ms/フレームを大きく
 * 下回る約8ms)に収めている。全件のデータ自体は AppState.results に
 * 残っており、「結果をTSVでコピー」からは引き続き全件
 * (ページ送りの影響を受けない)取得できる。
 *
 * @type {number}
 */
const PAGE_SIZE = 200;

/**
 * 結果テーブルの表示ページを相対的に切り替える(前へ/次へボタンのonclickから呼ばれる)。
 * ページ範囲外への移動は renderTable() 側でクランプされるため、ここでは
 * 単純に加算するだけでよい。
 *
 * @param {number} delta - 移動するページ数(前へ: -1、次へ: +1)。
 */
function changePage(delta) {
  AppState.page += delta;
  renderTable();
}

/**
 * AppState.results のうち現在のページ(AppState.page、PAGE_SIZE件単位)分だけを
 * #resultHeader / #resultBody に描画する。結果が0件の場合はその旨を表示する。
 *
 * ソート順の反映(AppState.results の並べ替え)はここでは行わない。
 * sortResults() のJSDoc参照。呼び出し側(setSort()/mergeResultsAndRender())が
 * 必要なタイミングで sortResults() を呼んでから renderTable() を呼ぶ前提。
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

  const total = AppState.results.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  // ソート変更・再検索以外(前へ/次への連打等)でもページ番号が範囲外にならないようクランプする。
  AppState.page = Math.min(Math.max(AppState.page, 0), totalPages - 1);

  const tbody = document.getElementById("resultBody");
  const prevBtn = document.getElementById("prevPageBtn");
  const nextBtn = document.getElementById("nextPageBtn");
  const rangeLabel = document.getElementById("paginationRange");

  if (total === 0) {
    tbody.innerHTML = `<tr><td id="noResultsMsg" colspan="${RESULT_COLUMNS.length}" class="text-center p-4 text-gray-500 transition-colors duration-150">不一致はありませんでした。</td></tr>`;
    rangeLabel.textContent = "0–0 / 全0件";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    return;
  }

  const startIdx = AppState.page * PAGE_SIZE;
  const endIdx = Math.min(startIdx + PAGE_SIZE, total);
  const rowsToRender = AppState.results.slice(startIdx, endIdx);

  // 巨大なテンプレートリテラルの += を毎回行うと中間文字列の再生成コストが
  // 積み重なるため、行ごとの文字列は配列に貯めて最後に1回だけ join する。
  //
  // r.pathName は共通行候補の名称(cand.name、ユーザーが自由入力できる文字列)を
  // 連結したものであり、他のフィールド(数値、または STAR_FORMULAS 由来の
  // 固定書式の starLabel)と異なりユーザー入力をそのまま含みうる。escapeHtml()
  // を通さず innerHTML に埋め込むとXSSになるため、ここで必ずエスケープする。
  const rowsHtml = rowsToRender.map((r) => {
    const diffClass =
      r.diff > 0 ? "text-red-700 bg-red-50" : "text-blue-700 bg-blue-50";
    return `
      <tr class="border-b border-gray-300 hover:bg-gray-50">
        <td class="p-2 border-r border-gray-300 font-mono whitespace-nowrap">${r.baseX}</td>
        <td class="p-2 border-r border-gray-300 text-gray-600 break-words">${r.starLabel}</td>
        <td class="p-2 border-r border-gray-300 font-mono whitespace-nowrap">${r.starSum.toFixed(displayDecimals)}</td>
        <td class="p-2 border-r border-gray-300 font-mono whitespace-nowrap">${r.x.toFixed(displayDecimals)}</td>
        <td class="p-2 border-r border-gray-300 break-words">${escapeHtml(r.pathName)}</td>
        <td class="p-2 border-r border-gray-300 font-mono font-bold text-blue-900 bg-blue-50/50 whitespace-nowrap">${r.resA.toFixed(displayDecimals)}</td>
        <td class="p-2 border-r border-gray-300 font-mono font-bold text-red-900 bg-red-50/50 whitespace-nowrap">${r.resB.toFixed(displayDecimals)}</td>
        <td class="p-2 border-r border-gray-300 font-mono font-bold ${diffClass} whitespace-nowrap">${r.diff > 0 ? "+" : ""}${r.diff.toFixed(displayDecimals)}</td>
      </tr>
    `;
  });

  tbody.innerHTML = rowsHtml.join("");
  rangeLabel.textContent = `${(startIdx + 1).toLocaleString()}–${endIdx.toLocaleString()} / 全${total.toLocaleString()}件`;
  prevBtn.disabled = AppState.page <= 0;
  nextBtn.disabled = AppState.page >= totalPages - 1;
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
 * テーブル表示と同じにする(数値は現在の displayDecimals で丸めて表示値と一致させる)。
 *
 * CSV(カンマ区切り)ではなくTSV(タブ区切り)にしているのは、「共通分岐」列
 * (r.pathName)がユーザーが自由入力した候補名(cand.name)を含み、その中に
 * カンマが使われる可能性があるため。CSVのままだと表計算ソフトに貼り付けた際に
 * 列がズレて見えることがあるが、タブ区切りなら貼り付け先で1セル=1フィールドとして
 * 素直に認識される。
 *
 * ゲーム内で個々の反例を再現・検証する際に、Excel等へ貼り付けて整理できるようにする。
 */
function copyResultsAsTsv() {
  const headerRow = RESULT_COLUMNS.map((c) => escapeTsvField(c.l)).join("\t");
  const dataRows = AppState.results.map((r) =>
    [
      r.baseX,
      r.starLabel,
      r.starSum.toFixed(displayDecimals),
      r.x.toFixed(displayDecimals),
      r.pathName,
      r.resA.toFixed(displayDecimals),
      r.resB.toFixed(displayDecimals),
      r.diff.toFixed(displayDecimals),
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
