type Ignore = {
  // ダメージ0を出力しないならばtrue
  readonly damage0: boolean;
  // クリティカル0を出力しないならばtrue
  readonly critical0: boolean;
};

type Select = {
  // 砲撃種別
  // 砲撃種別がこの値のデータのみ出力する. ただし, -1のときこの限りではない.
  readonly attackKind: number;
};

type ImportCSVSettings = {
  readonly id: string;
  readonly encoding: string;
  readonly ignore: Ignore;
  readonly select: Select;
};

// このclassは単に名前空間を成すのみ
class ImportCSV {
  public static main(): void {
    const file = ImportCSV.searchLastUpdatedCSVFile();
    ImportCSV.displaySettingsWindow(file);
  }

  private static searchLastUpdatedCSVFile(): GoogleAppsScript.Drive.File | null {
    const files = DriveApp.searchFiles(`mimeType = "${MimeType.CSV}"`);

    // これより昔のデータはあるはずがない.
    let latestDate = new Date("2013/4/23 00:00:00");
    let latestFile: GoogleAppsScript.Drive.File | null = null;

    while (files.hasNext()) {
      const file = files.next();
      const lastUpdated = new Date(file.getLastUpdated().getTime());
      if (lastUpdated > latestDate) {
        latestDate = lastUpdated;
        latestFile = file;
      }
    }

    return latestFile;
  }

  private static displaySettingsWindow(
    file: GoogleAppsScript.Drive.File | null
  ) {
    const path = "src/custom-menu/";
    const filename = "import-csv-index";
    const template = HtmlService.createTemplateFromFile(path + filename);
    template.filename = file?.getName() || "FILE IS NOT FOUND";
    template.update = file?.getLastUpdated().toLocaleString() || "";
    template.id = file?.getId() || "";

    const html = template.evaluate().setWidth(350).setHeight(400);
    const title = "CSV インポート";
    SpreadsheetApp.getUi().showModalDialog(html, title);

    // ${filename}が表示される.
    // <form>の子要素である<input type="submit" /* 略 */>のボタンが押下されると,
    // このボタンに紐づく, HTMLに直接書いたmain関数が呼ばれる.
    // このmain関数が実行されると, ImportCSV_import(settings); が実行される.
  }

  public static importCSV(settings: ImportCSVSettings): void {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("input");
    if (!sheet) return;

    const file = DriveApp.getFileById(settings.id);
    if (!file) return;

    const csv = ImportCSV.parse(file, settings.encoding);
    if (!csv || !csv[0]) return;

    const filtered = ImportCSV.filter(csv, settings.ignore);
    if (!filtered || !filtered[0]) return;

    const selected = ImportCSV.select(filtered, settings.select);
    if (!selected || !selected[0]) return;

    const I2 = { row: 2, column: 9 };
    const rows = selected.length;
    const columns = selected[0].length;
    sheet.getRange(I2.row, I2.column, rows, columns).setValues(selected);
  }

  private static parse(
    file: GoogleAppsScript.Drive.File,
    from: string
  ): string[][] {
    const text: string =
      from === "UTF-8"
        ? file.getBlob().getDataAsString("UTF-8")
        : file.getBlob().getDataAsString(from);
    return Utilities.parseCsv(text, ",");
  }

  private static filter(csv: string[][], ignore: Ignore): string[][] | null {
    // ヘッダを外す
    const header: string[] | undefined = csv.shift();
    if (!header) return null;

    const damage: number = header.findIndex((e) => e === "ダメージ");
    const critical: number = header.findIndex((e) => e === "クリティカル");

    const filtered = csv.filter((row) => {
      return !(
        (ignore.damage0 ? row[damage] == "0" : false) ||
        (ignore.critical0 ? row[critical] == "0" : false)
      );
    });

    // ヘッダを先頭に付け直す
    filtered.unshift(header);
    return filtered;
  }

  private static select(csv: string[][], select: Select): string[][] | null {
    if (select.attackKind == -1) return csv;

    // ヘッダを外す
    const header: string[] | undefined = csv.shift();
    if (!header) return null;

    const kind: number = header.findIndex((e) => e === "砲撃種別");

    const selected = csv.filter((row) => {
      return Number(row[kind]) == select.attackKind;
    });

    // ヘッダを先頭に付け直す
    selected.unshift(header);
    return selected;
  }
}

/**
 * HTMLのmain関数の "google.script.run.importCSV_import(settings);" から呼ぶために
 * グローバルに公開する必要がある.
 * @param { ImportCSVSettings } settings ユーザが入力した設定
 */
function ImportCSV_import(settings: ImportCSVSettings): void {
  ImportCSV.importCSV(settings);
}
