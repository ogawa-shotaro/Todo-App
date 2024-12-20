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

## 3.【フロントエンド環境の設定】
フロントエンドの環境変数を設定します。

.env.localファイルを作成( .env.exampleファイルをコピー)します。<br />
フロントエンドディレクトリにいる事を確認し、<br />
以下のコマンドを実行してください：

```bash
cp .env.example .env.local
```

内容を以下のように設定します：

```bash
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## 4.【バックエンド環境の設定】
バックエンドディレクトリに移動し、環境変数を設定します。

.envファイルを作成( .env.exampleファイルをコピー)します。<br />
バックエンドディレクトリにいる事を確認し、<br />
以下のコマンドを実行してください：

```bash
cp .env.example .env
```

内容を以下のように設定します：

```bash
DATABASE_URL="postgresql://ogawa:ogawa777@localhost:5433/todo?schema=public"
JWT_SECRET="mysecretkey"

```

.env.testファイルを作成( .env.exampleファイルをコピー)します。<br />
バックエンドディレクトリにいる事を確認し、<br />
以下のコマンドを実行してください：

```bash
cp .env.example .env.test　
```

内容を以下のように設定します：

```bash
DATABASE_URL="postgresql://ogawa:ogawa777@localhost:5434/todo_test?schema=public"
JWT_SECRET="JWT_SECRET_TEST"

```

## 5.【Prismaの設定】
dockerを起動し、ローカルにDBを立ち上げます。<br />
docker-repositories(ターミナルをもう一つ用意)にいる事を確認し、dockerを起動します。<br />
以下のコマンドを実行してください：

起動コマンド
```bash
docker compose up

```

停止コマンド
```bash
docker compose down

```
バックエンドディレクトリにいる事を確認し、<br />
以下のコマンドを実行してください：

```bash
npx prisma generate

```

```bash
npx prisma migrate dev

```

```bash
npx dotenv -e .env.test -- npx prisma migrate dev

```

## 6.【起動コマンド】
dockerを起動し、ローカルにDBを立ち上げます。<br />
docker-repositories(ターミナルをもう一つ用意)にいる事を確認し、dockerを起動します。<br />
以下のコマンドを実行してください：

起動コマンド
```bash
docker compose up

```
停止コマンド
```bash
docker compose down

```

Todo-Appに移動し、アプリケーションを起動します。<br />
以下のコマンドを実行してください：

```bash
npm start

```

## 7.【テストコマンド（バックエンド）】
dockerを起動し、ローカルにDBを立ち上げます。<br />
docker-repositories(ターミナルをもう一つ用意)にいる事を確認し、dockerを起動します。<br />
以下のコマンドを実行してください：

起動コマンド
```bash
docker compose up

```

停止コマンド
```bash
docker compose down


```
結合テスト（単体テスト含む）は、<br />
以下のコマンドを実行してください：

```bash
npm run test:integration

```

単体テストは、<br />
以下のコマンドを実行してください：
```bash
npm run test:unit

```
