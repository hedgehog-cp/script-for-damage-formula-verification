# ダメージ検証用スクリプト

[ダメージ検証用スプレ](https://drive.google.com/drive/folders/1J_tBagjdXl81d0onHqKf--H5hf0TGHnw?usp=sharing)のためのGoogle Apps Script (GAS)

- [ダメージ検証用スクリプト](#ダメージ検証用スクリプト)
  - [開発](#開発)
    - [コーディング規約](#コーディング規約)
    - [トラブルシューティング](#トラブルシューティング)
    - [参考](#参考)

## 開発

1. Node.jsをインストール

    nvmを使用します.

    ```shell
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
    ```

    シェルを再起動します.

    ```shell
    exec $SHELL
    ```

    Node.jsをインストールします.

    ```shell
    nvm install 22
    nvm use 22
    ```

2. このディレクトリに移動

    ```shell
    cd /PATH/TO/script-for-damage-formula-verification
    ```

3. TypeScriptをインストール

    ```shell
    npm init --yes
    npm install --save-dev typescript @types/node
    ```

4. パッケージを取得

    ```shell
    npm install --save-dev @types/google-apps-script
    npm install --save-dev @types/google-apps-script-oauth2
    ```

5. claspをインストール

    ```shell
    npm install -g @google/clasp
    ```

6. google アカウントでログイン

    ```shell
    clasp login
    ```

7. `.clasp.json`にpush先のGoogle spreadsheetとGASのIDを記述

    ```json
    {
        // https://docs.google.com/spreadsheets/d/***/edit
        "parentId": [
            "***"
        ],
        "rootDir": "dist",
        // https://script.google.com/u/0/home/projects/***/edit
        "scriptId": "***"
    }
    ```

8. `appsscript.json`を`dist`にコピー

9. コーディング

    [コーディング規約](#コーディング規約)

10. 静的検査をして合格すればpush

    ```shell
    npx tsc && clasp push
    ```

### コーディング規約

艦これAPIに合わせてsnake_caseを用います.
エントリーポイントとなるカスタム関数はグローバルに定義し, `@customfunction`をコメントします.
実行するスクリプトが他のdocumentにアクセスしないとき, `@OnlyCurrentDoc`をコメントすると権限の承認が簡略されます.  

```ts
namespace ns {
    /**
     * プログラミング開始の挨拶, その実装詳細.
     * @returns { string } "Hello, World!"
     */
    export function hello_world(): string {
        return "Hello, World!";
    }
}

/**
 * プログラミング開始の挨拶
 * @returns { string } "Hello, World!"
 * @customfunction エントリーポイント
 */
function hello_world(): string {
    return ns.hello_world();
}
```

spreadsheetから受け取る引数の型は, 以下のように振る舞います:

```ts
// 単一の値の場合
// 数値のみまたは文字列のみを受け取るならば, それぞれnumber, stringに限定して型注釈できます.
// エラー値はstring, NaNはnumberとなります.
type value = number | string;

// 配列の場合
// 1次元配列でも2次元配列でも, 2次元配列で受け取ります.
// 要素型は上記valueに倣います.
type values = value[][];
```

### トラブルシューティング

- 型が分からない

  `JSON.stringify`による確認を検討してください.

- `Error retrieving access token: Error: invalid_grant`

  次を試行してください.

  ```shell
  clasp login
  ```

### 参考

- [https://developers.google.com/apps-script/guides/sheets/functions](https://developers.google.com/apps-script/guides/sheets/functions)
- [https://developers.google.com/apps-script/guides/services/authorization](https://developers.google.com/apps-script/guides/services/authorization)
