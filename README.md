# 【本番環境】

## 【使用技術】
- VPC
- ECS（Fargate）
- RDS（PostgreSQL）
- ALB
- Route53
- AWS Systems Manager Parameter Store

## 1.【ドメイン取得・DNS設定】
ドメインを取得し、AWS上にDNSサーバー(Route53)を作成する。<br />
取得した独自ドメインをここで管理・紐付けます。

## 2.【ACMの設定】
HTTPS通信行えるように、証明書を北部バージニアで作成します。  
ドメイン所有権を確認するため、Route53にCNAMEレコードを追加します。

## 3.【VPC構成】
ALB、ECS用にパブリックサブネット、RDS用にプライベートサブネットを作成する。

## 4.【RDS構築】
ローカルで使用していたPostgreSQLをAmazonRDSへ変更する。

## 5.【ECS on Fargate構成】<br />
・クラスターを作成し、Fargateを選択。<br />
・タスク定義では、起動タイプをFargateにし、コンテナイメージを追加する。<br />
・サービスを作成し、ALBと紐付ける。<br />

## 6.【Parameter StoreでDB接続情報を管理】
・ＤＢの接続情報は、Systems Manager Parameter　Storeから取得する。

## 7.【セキュリティ設計】
最小権限の原則に基づき、通信経路は以下のようする。<br />
インターネット経由でALB（HTTP / HTTPS）へアクセス→ALBがターゲットグループを通じてECSコンテナへリクエストを転送
→コンテナはアプリケーション処理を実行し、RDSへ接続→コンテナはALBからのアクセスのみ許可、RDSはECSからの通信のみを許可とする。<br />

※設計意図として、インバウンド・アウトバウンドを明確に制限することで、不要なアクセス経路を遮断しています。









