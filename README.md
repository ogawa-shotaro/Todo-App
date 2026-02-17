# 【概要】
このアプリは、タスクの作成・編集・削除・一覧表示ができるシンプルなTodo管理ツールです。

ローカル環境では、Dockerを使用してPostgreSQLデータベースを立ち上げ、アプリケーションを起動する手順を記載しています。

本番環境では、ローカルで動作確認したアプリケーションをDocker化し、AWS上にデプロイしています。

## 【使用技術】
- JavaScript
- TypeScript
- React / Next.js
- Node.js / Express
- PostgreSQL
- docker
- Jest（単体テスト / 結合テスト）

## 【機能一覧】
- Todoの新規作成（title, body）
- Todoの更新・削除
- Todoの一覧表示（ページネーション対応）
- 認証機能 / ログイン機能
- バリデーション・エラーハンドリング
- テストコードによる正常系・異常系の網羅

  

# 【環境構築】

このリポジトリを起動する為に、<br />
以下の手順に沿って環境構築を行って下さい。

## 1.【リポジトリをクローン】
以下のコマンドを実行してください：

```bash
git clone https://github.com/ogawa-shotaro/Todo-App.git
cd Todo-App
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

# 【本番環境】

※Dockerfileについては、現時点で構成が不明確(知識不足・学習不足による)な為、記載なし。<br>
※下記AWS構成は、学習用に別アプリで構築したものをベースにしています。

## 【使用技術】
- VPC
- ECS（Fargate）
- RDS（PostgreSQL）
- ALB
- Route53
- AWS Systems Manager Parameter Store

## 1.【Docker化】
現在のアプリケーションをDockerfileでビルドし、コンテナ化する。

## 2.【ドメイン取得・DNS設定】
ドメインを取得し、AWS上にDNSサーバー(Route53)を作成する。
取得した独自ドメインをここで管理・紐付けます。

## 3.【ACMの設定】
HTTPS通信行えるように、証明書を北部バージニアで作成します。  
ドメイン所有権を確認するため、Route53にCNAMEレコードを追加します。

## 4.【VPC構成】
ALB、ECS用にパブリックサブネット、RDS用にプライベートサブネットを作成する。

## 5.【RDS構築】
ローカルで使用していたPostgreSQLをAmazonRDSへ変更する。

## 6.【ECS on Fargate構成】
・クラスターを作成し、Fargateを選択。
・タスク定義では、起動タイプをFargateにし、コンテナイメージを追加する。
・サービスを作成し、ALBと紐付ける。

## 7.【Parameter StoreでDB接続情報を管理】
・ＤＢの接続情報は、Systems Manager Parameter　Storeから取得する。

## 8.【セキュリティ設計】
最小権限の原則に基づき、通信経路は以下のようする。<br>
インターネット経由でALB（HTTP / HTTPS）へアクセス→ALBがターゲットグループを通じてECSコンテナへリクエストを転送
→コンテナはアプリケーション処理を実行し、RDSへ接続→RDSはECSからの通信のみを許可<br>

※設計意図として、インバウンド・アウトバウンドを明確に制限することで、不要なアクセス経路を遮断しています。









