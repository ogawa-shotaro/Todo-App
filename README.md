# 【環境構築】

このリポジトリを起動する為に、<br />
以下の手順に沿って環境構築を行って下さい。

## 1.【リポジトリをクローン】
以下のコマンドを実行してください：

```bash
git clone https://github.com/ogawa-shotaro/Todo-App.git
cd Todo-App
git checkout feature/frontend-signup
```

## 2.【パッケージをインストール】
以下のコマンドを実行してください：

```bash
npm install
```

## 3.【バックエンド環境の設定】
バックエンドディレクトリに移動し、環境変数を設定します。

.envファイルを作成( .env.exampleファイルをコピー)します。<br />
以下のコマンドを実行してください：

```bash
cd backend
cp .env.example .env
```

内容を以下のように設定します：

```bash
DATABASE_URL="postgresql://ogawa:ogawa777@localhost:5433/todo?schema=public"
JWT_SECRET="mysecretkey"

```

.env.testファイルを作成( .env.exampleファイルをコピー)します。<br />
以下のコマンドを実行してください：

```bash
cp .env.example .env.test　
```

内容を以下のように設定します：

```bash
DATABASE_URL="postgresql://ogawa:ogawa777@localhost:5433/todo?schema=public"
JWT_SECRET="JWT_SECRET_TEST"

```

## 4.【Prismaの設定】
Prisma関連のコマンドを実行し、データベースを作成します。<br />
以下のコマンドを実行してください：

```bash
npx prisma generate
npx prisma migrate dev

```

## 5.【フロントエンド環境の設定】
フロントエンドディレクトリに移動し、環境変数を設定します。

.env.localファイルを作成します。<br />
以下のコマンドを実行してください：

```bash
cd .\frontend\
.env.localファイルを作成

```

内容を以下のように設定します：

```bash
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## 6.【起動コマンド】
dockerを起動し、ローカルにDBを立ち上げます。<br />
docker-repositoriesに移動し、dockerを起動します。<br />
以下のコマンドを実行してください：

```bash
cd ..\backend\docker-repositories\
docker compose -f docker-compose.yaml -f docker-compose.test.yml up

停止コマンド
docker compose -f docker-compose.yaml -f docker-compose.test.yml down

```

Todo-Appに移動し、アプリケーションを起動します。<br />
以下のコマンドを実行してください：

```bash
cd ../../
npm start

```

## 7.【テストコマンド】

```bash

```
























