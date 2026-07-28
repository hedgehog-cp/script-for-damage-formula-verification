/**
 * スプレッドシートのオープンをトリガとして, メニューバーにカスタムメニューを追加します.
 * @OnlyCurrentDoc
 */
function onOpen(event: GoogleAppsScript.Events.SheetsOnOpen): void {
  const spreadsheet = event.source;
  const subMenus: { name: string; functionName: string }[] = [
    { name: "目次作成", functionName: "createIndex" },
    { name: "行サイズを調整する", functionName: "adjustRowSize" },
  ];

  spreadsheet.addMenu("スクリプト", subMenus);
}
