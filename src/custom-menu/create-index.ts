/**
 * アクティブなシートの選択したセルに, HYPERLNK関数で列方向に目次を作成します.  
 * onOpen関数によってカスタムメニューに登録されおり, メニューバーより呼び出します.
 * @OnlyCurrentDoc
 */
function createIndex(): void {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();
  const range = sheet.getActiveRange();
  const sheets = spreadsheet.getSheets();
  const nameList = sheets.map((sheet) => sheet.getName());
  const gidList = sheets.map((sheet) => sheet.getSheetId());

  for (let i = 0; i < sheets.length; i++) {
    const formula = `=hyperlink(\n   "#gid=${gidList[i]}",\n   "${nameList[i]}"\n )`;
    if (range) {
      sheet
        .getRange(range.getRowIndex() + i, range.getColumn())
        .setFormula(formula);
    }
  }
}
