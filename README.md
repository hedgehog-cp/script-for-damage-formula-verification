# ダメージ検証用スクリプト

ダメージ検証用スプレのためのGoogle Apps Script (GAS)

## 開発

### Node.jsをインストールする

```shell
sudo apt install nodejs
```

### このディレクトリに移動する

```shell
cd /PATH/TO/THIS-DIRECTORY
```

### パッケージを取得する

```shell
npm init --yes
npm install --save-dev @types/google-apps-script
npm install --save-dev @types/google-apps-script-oauth2
```

### TypeScriptをインストールする

```shell
npm install --save-dev typescript @types/node
```

`tsconfig.json`の生成が必要であれば次も実行してください.

```shell
npx tsc --init
```

### claspをインストールする

```shell
sudo npm install -g @google/clasp
```

### Googleアカウントでログインする

```shell
clasp login
```

### GASプロジェクトを新規作成する

既に作成している場合は, この操作は不要です.

```shell
clasp create
```

`sheet`を選択する.

### コードを書く

```ts
"use strict";
```

#### spreadsheetから受け取る引数の型

題は以下のように振る舞います.

- 単一の空白は, `string`
- 単一の文字列は, `string`
- 単一の数値は, `number`
- 配列は, その中身にかかわらず`string`を要素型とする配列

`number[]`や`number[][]`で受け取らないようにしてください.

#### `@customfunction`と`@OnlyCurrentDoc`

suctom functionすなわちspreadsheetの数式エディタにて呼び出す関数に`@customfunction`JsDocタグを付加すると, 数式エディタで補完等が有効になります.  

```ts
/**
 * @customfunction ここに関数の簡単な説明
 */
function foo(args: any): any { /* do something */ }
```

実行するスクリプトが他のdocumentにアクセスしないとき, `@OnlyCurrentDoc`JsDocタグを付加すると権限の承認が簡略されます.  

```ts
/**
 * @OnlyCurrentDoc
 */
function bar(args: any): any { /* do something */ }
```

#### 命名規則

`api_mst_*`のために, snake_caseを用います.

### 静的検査をする

TypeScriptの恩恵を受けるために, 静的検査をします.
ここでエラーがあっても`clasp push`は通りますが, エラーを解決してください.
distディレクトリ等への, Javascriptファイルの生成は不要です.

```shell
npx tsc
```

### デプロイメントをする

プロジェクトディレクトリ直下に`.clasp.json`が必要です. 適切に書き換えてください.

```json
{
    "rootDir": "/PATH/TO/script-for-damage-formula-verification",
    "scriptId": "GOOGLE APPS SCRIPT ID",
    "parentId":["PARENT SPREADSHEET ID"]
}
```

次を実行すると, `src/`以下の`*.ts`ファイルを`*.js`に変換し, これを`.clasp.json`の`"scriptId"`プロパティに紐づいたプロジェクトにアップロードします.

```shell
clasp push
```

[!NOTE]
> `Error retrieving access token: Error: invalid_grant`

このようなエラーが出た場合は, 次を試行してください.

```shell
clasp login
```

`npx tsc && clasp push`をすると, 静的検査を行いこれに合格したとき続けてアップロードします.

### 参考

- [https://github.com/google/clasp/blob/master/docs/typescript.md](https://github.com/google/clasp/blob/master/docs/typescript.md)
- [https://developers.google.com/apps-script/guides/sheets/functions](https://developers.google.com/apps-script/guides/sheets/functions)
- [https://developers.google.com/apps-script/guides/services/authorization](https://developers.google.com/apps-script/guides/services/authorization)
