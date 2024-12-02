# 【Todo-Appの環境構築】

このリポジトリを起動するために、<br />
以下の手順に沿って環境構築を行って下さい。

## 1. 【リポジトリをクローン】
以下のコマンドを実行してください：

```bash
git clone https://github.com/ogawa-shotaro/Todo-App.git
cd Todo-App
git checkout feature/frontend-signup
```

## 2. 【パッケージをインストール】
以下のコマンドを実行してください：

```bash
npm install
```

## 2. 3. バックエンド環境の設定
バックエンドディレクトリに移動し、環境変数ファイルを設定します。
以下のコマンドを実行してください：

```bash
cd backend
cp .env.example .env
```

内容を以下のように設定します：

```bash
DATABASE_URL="postgresql://ogawa:ogawa777@localhost:5433/todo?schema=public"<br />
JWT_SECRET="mysecretkey"
```

