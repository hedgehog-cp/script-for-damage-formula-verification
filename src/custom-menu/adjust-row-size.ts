/**
 * 関数中に定義したシート名と一致するシートの行サイズを変更します.  
 * このシート名はハードコーディングしています.
 * @OnlyCurrentDoc
 */
function adjustRowSize(): void {
  const target = ["input", "calc", "invCalc", "attacker"];
  const MIN = 3;
  const MAX = 10000;
  const text =
    `シート${target.join(", ")}の行サイズを変更します.` +
    "\n目標の行サイズを半角の自然数で入力してください." +
    `\n${MIN}以上または${MAX}以上の場合は変更しません.`;
  const ui = SpreadsheetApp.getUi();

  // FIXME: ここでEscキーを押下するなどにより, 入力画面が破棄されるとエラーが発生する.
  const result = ui.prompt(text, ui.ButtonSet.OK_CANCEL);

  if (result.getSelectedButton() === ui.Button.OK) {
    const size = Number(result.getResponseText());
    if (!size || size <= MIN || size >= MAX) return;

    const sheets = SpreadsheetApp.getActiveSpreadsheet()
      .getSheets()
      .filter((v) => target.includes(v.getName()));
    for (const sheet of sheets) {
      const diff = size - sheet.getMaxRows();
      if (diff > 0) {
        sheet.insertRowsAfter(sheet.getMaxRows(), diff);
      } else if (diff < 0) {
        sheet.deleteRows(size + 1, -diff);
      } else if (diff === 0) {
        continue;
      }
    }
  }
}
