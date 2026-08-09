/**
 * 行サイズ変更画面をモーダルダイアログで表示します.
 *
 * @OnlyCurrentDoc
 */
function showAdjustRowSizeDialog(): void {
  const dir = "custom-menu/";
  const fname = "adjust-row-size-index";
  const html = HtmlService.createHtmlOutputFromFile(dir + fname)
    .setWidth(400)
    .setHeight(350);

  SpreadsheetApp.getUi().showModalDialog(html, "行サイズを調整する");
}

/**
 * 指定されたシートの行サイズを変更します.
 *
 * @param { string[] } targets 対象シート名
 * @param { number } size 目標の行数
 *
 * @OnlyCurrentDoc
 */
function adjustRowSize(targets: string[], size: number): void {
  const MIN = 3;
  const MAX = 10000;

  if (!Number.isInteger(size) || size <= MIN || size >= MAX) {
    throw new Error(
      `行サイズは${MIN}より大きく、${MAX}未満の自然数を指定してください.`,
    );
  }

  const sheets = SpreadsheetApp.getActiveSpreadsheet()
    .getSheets()
    .filter((sheet) => targets.includes(sheet.getName()));

  for (const sheet of sheets) {
    const currentSize = sheet.getMaxRows();
    const diff = size - currentSize;

    if (diff > 0) {
      sheet.insertRowsAfter(currentSize, diff);
    } else if (diff < 0) {
      sheet.deleteRows(size + 1, -diff);
    }
  }
}
