# Selenium でのブラウザ自動操縦サンプル

## セットアップ

- node, npm をインストールする
- ルートディレクトリにて npm install を実行する

## Chrome プロファイルの設定

- src/profilePath.ts.example をコピーし、.example を抜いて同ディレクトリに配置する
- Chrome を起動し、普段利用しているアカウントであることを確認する
- アドレスバーに、chrome://version/ と入力し、開く
- プロフィールパスに書かれたパスをコピーする
- 先ほど配置した profilePaths.ts の中に、プロフィールパスを書き込み、保存する

## 使い方

- src/main.ts に処理を記述する
- ルートディレクトリにて npm run selenium を実行する
