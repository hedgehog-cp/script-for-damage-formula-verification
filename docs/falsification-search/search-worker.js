/**
 * 総当たり探索の並列実行を担うWeb Worker。
 *
 * メインスレッド(falsification-search.js の runSearchParallel())は反復変数
 * i∈[0,N] の範囲を navigator.hardwareConcurrency 個のWorkerへ連続区間に
 * 分割して割り当て、各Workerが担当区間を独立に計算して結果配列を返す。
 * 複数のWorkerが同時に実行されることで、単一スレッドでの同期ループに比べて
 * 複数CPUコアを実際に使った計算時間の短縮が期待できる。
 *
 * 実際の計算ループ(computeSearchResults)はメインスレッド側の非Worker
 * フォールバック経路(file://で直接開いた場合など、Workerが使えない環境向け)
 * とも共有しているため search-core.js に切り出してあり、importScripts() で
 * 読み込む(Workerには<script>タグの代わりにこの仕組みを使う。また
 * Workerはメインスレッドの関数・クロージャを直接参照できないため、
 * postMessageで運べない関数はここで自前に読み込み直す必要がある)。
 */
importScripts("search-core.js");

self.onmessage = (e) => {
  const { items, iStart, iEnd, S, base, fp, tp, formulaIds } = e.data;
  const selectedFns = resolveFormulas(formulaIds);
  const results = computeSearchResults(
    items,
    iStart,
    iEnd,
    S,
    base,
    fp,
    tp,
    selectedFns,
  );
  self.postMessage({ results });
};
