/**
 * スプレッドシートに実装されている数式をJSONとして保存します.
 *
 * 対象:
 * - 全シート
 * - 第3行に実際に存在する数式
 * - 数式と同じ列の第1行・第2行のラベル
 * - 数式セルのメモ
 *
 * 数式は改行・インデント・空白を含めて加工せず保存します.
 *
 * @OnlyCurrentDoc
 */
function exportFormulas(): void {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  const sheets = spreadsheet.getSheets();

  const outputSheets: {
    name: string;
    formulas: {
      cell: string;
      label1: string | number | boolean | null;
      label2: string | number | boolean | null;
      note: string | null;
      formula: string;
    }[];
  }[] = [];

  for (const sheet of sheets) {
    const lastColumn = sheet.getLastColumn();

    // データが存在しないシート.
    if (lastColumn === 0) {
      continue;
    }

    /*
     * 第1～3行を一括取得する.
     *
     * values:
     *   第1行・第2行のラベル取得に使用.
     *
     * formulas:
     *   第3行の数式取得に使用.
     *
     * notes:
     *   第1～3行のメモを取得するが,
     *   実際に使用するのは第3行だけ.
     */
    const range = sheet.getRange(1, 1, 3, lastColumn);

    const values = range.getValues();
    const formulas = range.getFormulas();
    const notes = range.getNotes();

    /*
     * 第1行・第2行の結合セルを取得する.
     *
     * 例えば A1:C1 が結合されている場合,
     * B3, C3 のラベル1としても A1 の値を使用する.
     */
    const mergedRanges = sheet.getRange(1, 1, 2, lastColumn).getMergedRanges();

    /*
     * 各列について,
     * 第1行・第2行のラベルを保持する.
     *
     * 初期値は「同じ列のセル」.
     */
    const labels1: (string | number | boolean | null)[] = values[0].map(
      (value) => value,
    );

    const labels2: (string | number | boolean | null)[] = values[1].map(
      (value) => value,
    );

    /*
     * 結合セルを考慮してラベルを補正する.
     */
    for (const mergedRange of mergedRanges) {
      const startRow = mergedRange.getRow();
      const startColumn = mergedRange.getColumn();
      const numRows = mergedRange.getNumRows();
      const numColumns = mergedRange.getNumColumns();

      /*
       * 第1行に存在する結合セル.
       */
      if (startRow === 1 && numRows >= 1) {
        const value = values[0][startColumn - 1];

        for (
          let column = startColumn;
          column < startColumn + numColumns;
          column++
        ) {
          labels1[column - 1] = value;
        }
      }

      /*
       * 第2行に存在する結合セル.
       */
      if (startRow === 2 && numRows >= 1) {
        const value = values[1][startColumn - 1];

        for (
          let column = startColumn;
          column < startColumn + numColumns;
          column++
        ) {
          labels2[column - 1] = value;
        }
      }
    }

    const outputFormulas: {
      cell: string;
      label1: string | number | boolean | null;
      label2: string | number | boolean | null;
      note: string | null;
      formula: string;
    }[] = [];

    /*
     * 第3行だけを走査する.
     *
     * getFormulas() は数式の存在するセルだけに
     * 数式文字列を返し, 通常の値の場合は "" を返す.
     *
     * ArrayFormulaによって複数列へ展開されていても,
     * 数式が実際に記述されているセルだけが対象になる.
     */
    for (let column = 0; column < lastColumn; column++) {
      const formula = formulas[2][column];

      if (formula === "") {
        continue;
      }

      outputFormulas.push({
        cell: sheet.getRange(3, column + 1).getA1Notation(),
        label1: labels1[column] ?? null,
        label2: labels2[column] ?? null,
        note: notes[2][column] === "" ? null : notes[2][column],
        formula,
      });
    }

    /*
     * 数式が1つもないシートは出力しない.
     */
    if (outputFormulas.length === 0) {
      continue;
    }

    outputSheets.push({
      name: sheet.getName(),
      formulas: outputFormulas,
    });
  }

  const output = {
    spreadsheet: {
      name: spreadsheet.getName(),
      sheets: outputSheets,
    },
  };

  /*
   * JSON.stringify() によって,
   * 数式中の改行・インデント等もJSONとして正しくエスケープされる.
   *
   * 数式そのものには加工を加えていない.
   */
  const json = JSON.stringify(output, null, 2);

  const fileName = `${spreadsheet.getName()}_formulas.json`;

  DriveApp.createFile(fileName, json, MimeType.PLAIN_TEXT);
}
