# Dynamic Receipt Passport (DRP)

XRPL × AI Hackathon OSAKA 2025

Live demo (Vercel)

https://dynamic-receipt-passport.vercel.app/

Dynamic Receipt Passport（以下 DRP）は、XRP が利用できる世界中の都市での「レシート・スタンプ・旅の軌跡・会計データ」を、1 枚の Dynamic NFT パスポートに統合して管理することを目的とした Web アプリケーションです。

- プロジェクトの背景とコンセプト
- 想定ユーザーとユースケース
- 機能仕様と画面構成
- XRPL 連携の設計方針
- 実装技術とセットアップ手順
- Testnet パスポートミント（GemWallet 連携）の実装概要
- 今後の拡張計画（Deep/Main Track への発展を含む）

---

## Setup Guide（ローカル開発環境）

プロダクト本体のコードを壊さずに安全にセットアップするための最小限の手順です。`node_modules` などの大容量ディレクトリは Git 管理外 (`.gitignore`) になっているため、以下のコマンドを順番に実行してください。


# 1. 最新のコードを取得
git clone <your-repo-url> drp
cd drp

# 2. 既存の node_modules を削除（もし含まれていた場合）
rm -rf node_modules

# 3. 依存関係をクリーンに再インストール
npm install

# 4. 動作確認
npm run dev
git status を実行して node_modules/, .next/, .vercel/ などが表示されなければ .gitignore が正しく効いています。もし過去に node_modules がコミットされている場合は、git rm -r --cached node_modules && git commit -m "Remove node_modules from repo" を実行して履歴から除外してください（デプロイ設定には影響しません）。

0. プロジェクト概要
プロジェクト名: Dynamic Receipt Passport (DRP)

テーマ: 「レシート・スタンプ・マップ・会計」の統合パスポート

対象トラック: Beginner Track（XRPL Testnet を用いた入門者向けプロダクト）

使用技術:

Next.js 16 (App Router / Turbopack 対応、async params 仕様に対応)

Tailwind CSS

XRPL JavaScript SDK（Testnet）

Node.js ベースの簡易 XRPL スクリプト

localStorage によるクライアントサイド保存

DRP は、XRPL Commons Residency in Paris をスターターケースとしつつ、将来的には Paris / Tokyo / Osaka / London / New York など、XRPL 決済が利用可能な世界中の都市へ拡張することを前提に設計しています。

1. プロジェクトの背景と目的（WHY）
1-1. 解決したい課題
海外生活や長期滞在において、以下のような課題が繰り返し発生します。

紙レシートが破れる・紛失する・文字が薄くなってしまう

仕事の経費とプライベートの支出が混在し、整理に時間がかかる

スタンプカードが店舗ごと・国ごとにばらばらに増えていく

「どこで・何をしたか」という軌跡が、後から振り返りにくい

DRP は、これらを XRPL と Dynamic NFT の組み合わせで解決しようとする試みです。

1-2. パリ Residency を起点にする理由
XRPL Hackathon OSAKA 2025 では、XRPL Commons によるパリ 3 ヶ月のプログラムが大きな一つのゴールになっています。

審査員や関係者にとって「パリでの生活」という具体的なイメージが共有されている

パリは、レシートと税務処理のルールが複雑で、記録・整理のニーズが強い

XRPL Commons Residency 参加者は、日常的に XRP 決済スポットを利用する可能性が高い

そのため、本プロジェクトでは「パリで実際に使える」ことを起点にしつつ、他都市への展開を前提とした設計を行っています。

1-3. レシートを「成長する NFT」へ変換する
従来は捨ててしまうだけの紙レシートを、次のような価値へ変換します。

旅の履歴としての記録

会計・税務処理に使えるデータ

店舗とのロイヤリティ・スタンプ情報

XRPL 上のトランザクションとの紐づけ

これらを 1 枚の Dynamic NFT のメタデータとして蓄積していくことにより、「使えば使うほど育っていくパスポート」として設計しています。

2. 想定ユーザーとユースケース
2-1. 想定ユーザー
XRPL Commons Residency in Paris 参加者

海外旅行者（短期〜中長期滞在）

出張で海外を訪れるビジネスパーソン

XRP 決済対応店舗の利用者

2-2. 代表的な利用シナリオ（パリ 3 ヶ月滞在）
日々の飲食・移動・ショッピングのレシートを DRP に記録する

地図上で、自分の生活圏や訪問スポットが可視化される

月末や帰国時に、CSV/PDF で会計データをエクスポートし、経費精算や確定申告に利用する

Dynamic NFT パスポート上で、自分の滞在履歴や訪問都市数などが「成長」として視覚化される

購入登録時に XRPL 送金（Testnet）を選択すると、その場でトランザクションが送信され、パスポートにオンチェーン記録として反映されます。送信後は Explorer での確認リンクも利用可能です。

2-3. 世界への展開
都市情報をレイヤーとして管理することで、以下のような展開を想定しています。

Paris

Tokyo

Osaka

London

New York

その他 XRPL 決済スポットの多い都市

都市の追加は、Map レイヤーと設定の追加で対応できるよう設計を行っています。

3. 機能概要
本プロジェクトは、以下の機能群で構成されています。

購入記録の登録・閲覧（タイムライン表示）

店舗ごとのスタンプカード（簡易ロイヤリティ）

Dynamic NFT パスポートビュー

マップ表示（購入履歴と XRPL 決済スポット）

会計用エクスポート（CSV / 印刷ビュー）

XRPL Testnet との連携（TX Hash 表示、将来的な NFT 連携を想定）

XRPL Testnet を用いた LVL1 パスポートミント（GemWallet 連携）

それぞれの詳細は以下の通りです。

3-1. 購入記録と XRPL アンカー
登録データ例:

店名

金額

VAT（消費税相当）

カテゴリ（飲食・交通・宿泊など）

位置情報（任意）

タイムスタンプ

XRPL のトランザクションハッシュ（Testnet）

Beginner Track の観点からは、

XRPL Testnet を利用した送金・メモ書き込み

TX Hash を画面上で確認できる

といった「XRPL の基本的な利用」を丁寧に実装することを目標としています。

【実装部分詳細】
本アプリは、Next.js 16 の App Router 新仕様にあわせて XRPL 連携部分を実装しています。

/api/xrpl/tx/[hash]
Next.js 16 の async params を用いてトランザクション取得を安定化
→ Testnet Explorer へのリンクも自動生成

/api/xrpl/send
XRPL Testnet wrapper（src/lib/xrpl/server.ts）を通じて送信
→ 送金後に TX Hash が UI に反映され、Receipt に保存される

Add Purchase 画面
Live XRPL Status Row／送信ロック／Explorer リンクを搭載し、初心者でも XRPL フローが理解しやすい構成にしています。

3-2. Dynamic NFT（成長ロジック）
NFT のメタデータとして、次のような値を想定しています。

totalPurchases（購入件数）

totalAmount（総額）

visitedCities（訪問都市数）

visitedStores（訪問店舗数）

stampCount（スタンプ合計数）

MVP 段階ではローカルでの計算・表示にとどめ、今後 XRPL 上の NFT メタデータとして同期する方向性を見据えています。

3-3. スタンプカード
店舗単位で、簡易的なスタンプカード機能を実装します。

店舗ごとに stampCount をカウント

一定数に達した場合、UI 上でわかりやすく達成を表示

将来的には、店舗側が NFT 内ページとして独自デザインを提供できる形を想定

3-4. マップ
Leaflet.js（または Next.js で扱いやすいマップライブラリ）を利用し、地図上で以下を表示します。

自身の購入履歴 → 青系ピン

XRPL 決済対応店舗 → 別色ピン（将来的に外部データソースと連携）

ピンをクリックすると購入詳細や店舗情報が表示されます。

3-5. AI による分類・レポート
店名やメモから、支出カテゴリを推定

VAT の推定や、簡単な会計レポート（円グラフ・棒グラフ）を生成

Claude / OpenAI API などの利用を想定したアーキテクチャとしています

3-6. エクスポート機能
CSV 形式でエクスポート（Date / Store / Category / Amount / VAT / TX Hash / City など）

印刷ビュー用の画面を用意し、ブラウザの印刷機能から PDF 出力が可能

3-7. XRPL Testnet パスポートミント（GemWallet 連携）
Beginner Track の最終デモとして、Testnet 上での LVL1 パスポートミントフロー を実装しています。

ブラウザ拡張ウォレット GemWallet を利用して XRPL Testnet に接続

DRP 内の UI から Connect → Mint → Passport View までを一気通貫で体験可能

Mint 結果は Testnet Explorer へのリンクとともに確認でき、
パスポートビューには NFToken ID / Tx Hash / Wallet Address などの情報が反映されます

このフローにより、レシートや旅の記録というコンセプトと、実際の On-chain NFT ミントを結びつけた「使って育てるパスポート」の基礎を提示しています。

4. 画面構成
想定している主要画面は以下の通りです。

Home / Timeline
登録済みの購入履歴と、簡易ダッシュボードを表示。
Hackathon デモでは、以下の 4 つの CTA を備えたメインエントリとしても機能します。

DEMO MODE (TEST LOGIN)
→ サンプルデータを用いた LVL3 パスポート／タイムラインデモへ遷移

START WITH EMAIL
→ 既存のメールベース認証フローへ

CONNECT WALLET (TESTNET)
→ GemWallet を用いて XRPL Testnet ウォレットを接続（何度でも再接続可能）

MINT MY PASSPORT (TESTNET)
→ Testnet 用のパスポートミント画面（/passport/new）へ遷移

Add Purchase
XRPL 送金モードでは、TX Hash プレビュー、送信ロック、Live Status Row、Explorer への直接リンクなど XRPL デモに必要な UI を統合

Passport
Dynamic NFT パスポートビュー。成長の可視化を行う。

DEMO モード: サンプルデータを用いた LVL3 パスポート（/passport）

Testnet モード: LVL1 パスポート（/passport/new, /passport/my）

/passport/new でパスポート名とウォレットを指定して Mint

/passport/my でミント済みパスポートの詳細と Testnet Explorer リンクを表示

Map
購入スポットと XRPL 決済スポットを表示

Export
日付範囲を指定した集計・CSV 出力・印刷ビュー

Settings
通貨単位、言語、XRPL 接続設定など（MVP では一部のみ）

5. 技術構成
5-1. フロントエンド
Next.js 16（App Router）

TypeScript

Tailwind CSS

状態管理: React Context または Zustand

保存: localStorage（MVP）

5-2. XRPL 連携
XRPL JavaScript SDK（xrpl.js）

Testnet を利用した以下の機能

ウォレット生成

テスト送金

トランザクションの取得

購入 ID を XRPL の Memo に埋め込む設計（MVP では一部をサンプル実装）

GemWallet との統合（Testnet パスポートミント用）

Beginner Track のデモ用に、ブラウザ拡張ウォレット GemWallet を利用したクライアントサイド連携も行っています。

@gemwallet/api を用いたウォレット接続ヘルパー（src/lib/wallet.ts）

React Context によるグローバルウォレット状態（src/context/wallet-context.tsx）

connected: boolean

address: string | null

connect(): Promise<void>

Home 画面からの「CONNECT WALLET (TESTNET)」ボタンで GemWallet と接続

/passport/new から NFTokenMint（XLS-20）トランザクションを Testnet に送信

buildTestnetTxUrl(hash) / buildTestnetAccountUrl(address) による Explorer 連携（src/lib/xrpl.ts）

エラー時はユーザー向けにわかりやすいメッセージを返しつつ、ボタンが「押せなくなる」状態を避けることで、ハッカソン当日のデモが中断されないよう設計しています。

5-3. Node.js スクリプト（補助）
リポジトリ内に、XRPL の基本操作を行うための Node.js スクリプト群を用意します。

ウォレット生成

テスト送金

トランザクション確認

これらは、Hackathon 参加者が XRPL Testnet に慣れるための「最小限のサンプル」として位置づけています。

6. セットアップ手順
以下はローカル環境での起動手順です。

6-1. 前提条件
Node.js 18 以降

npm または yarn

Git

6-2. ソースコード取得
bash
コードをコピーする
git clone https://github.com/0x-xrpl/dynamic-receipt-passport.git
cd dynamic-receipt-passport
6-3. 依存関係のインストール
bash
コードをコピーする
npm install
6-4. 開発サーバーの起動
以下のコマンドでローカル開発環境を起動できます。

bash
コードをコピーする
npm run dev
ブラウザで http://localhost:3000 を開くと、DRP の画面を確認できます。
開発中はこのローカル環境で UI、XRPL 連携、NFT 表示などの機能をそのまま動作確認できます。

7. 公開（Vercel を利用することを想定）
DRP は Next.js を基盤としているため、ローカル開発環境（npm run dev）でも本番同様の挙動を確認できます。

現在のデモ環境は Vercel 上で公開しています：

Live demo（Vercel）
https://dynamic-receipt-passport.vercel.app/

Vercel を利用した公開手順

GitHub アカウントを Vercel と連携する

このリポジトリ（0x-xrpl/dynamic-receipt-passport）を Vercel 上でインポートする

インポート後、自動的にビルドとデプロイが実行される

完了後に公開 URL が発行される（上記の Live demo）

Next.js の標準設定のままで問題なく動作するため、特別な設定は必要ありません。

8. ディレクトリ構成（例）
text
コードをコピーする
dynamic-receipt-passport/
  ├── legacy-xrpl/              # XRPL Node.js 基礎スクリプト（サンプル）
  ├── public/                   # 画像・アイコンなどの静的ファイル
  ├── src/
  │   ├── app/                  # Next.js App Router 用エントリ
  │   │   ├── page.tsx          # Home / Timeline（DEMO・Testnet エントリ）
  │   │   ├── passport/         # パスポート関連画面
  │   │   │   ├── page.tsx      # DEMO モード LVL3 パスポート（/passport）
  │   │   │   ├── new/          # Testnet LVL1 ミント画面（/passport/new）
  │   │   │   └── my/           # LVL1 パスポート表示（/passport/my）
  │   │   └── api/
  │   │       └── xrpl/
  │   │           ├── send/     # 送金 API（Next.js 16 対応）
  │   │           └── tx/[hash]/# トランザクション参照 API
  │   ├── components/           # UI コンポーネント
  │   ├── context/              # WalletProvider などのコンテキスト
  │   ├── lib/
  │   │   ├── xrpl/             # XRPL Testnet wrapper（送信・取得）
  │   │   │   └── server.ts
  │   │   ├── wallet.ts         # GemWallet 連携ヘルパー
  │   │   ├── passport-store.ts # LVL1 パスポートのローカル保存・読込
  │   │   └── xrpl.ts           # Testnet Explorer URL 生成などの共通処理
  │   └── styles/               # Tailwind / グローバルスタイル
  ├── package.json
  ├── tsconfig.json
  ├── next.config.ts
  └── README.md                 # 本ファイル
9. 今後の拡張と他トラックへの発展可能性
本プロジェクトは今回 Beginner Track 向けに、以下を優先して実装しています。

XRPL Testnet を使った基本的な送金・トランザクション確認

レシート・スタンプ・マップ・会計データの統合 UI

Dynamic NFT パスポートという概念のプロトタイプ

GemWallet と連携した LVL1 パスポート NFT の Testnet ミントフロー

今後、以下のような拡張により、Deep Track / Main Track レベルへの発展が可能だと考えています。

XRPL NFT 機能との直接連携（メタデータの同期）

XRPL EVM / Xahau の登場により、Hooks や AMM を統合したロイヤリティ処理の自動化

店舗側ダッシュボードの実装（スタンプ設計・キャンペーン設定）

複数チェーン・複数通貨への対応

AI による支出パターン分析やパーソナライズされた旅提案 など

10. ライセンス
検討中（ハッカソン終了後に OSS 化も視野に入れて検討します）

11. GemWallet 連携と Testnet パスポートミントフロー（実装メモ）
Hackathon OSAKA 2025 の最終デモに向けて、以下の Testnet パスポートミントフローを実装しています。

11-1. Home 画面とウォレット接続
Home（/）のメインカードから、以下を実行できます。

DEMO MODE (TEST LOGIN)

START WITH EMAIL

CONNECT WALLET (TESTNET)

MINT MY PASSPORT (TESTNET)

CONNECT WALLET (TESTNET) ボタンの挙動:

useWallet().connect() を呼び出し、GemWallet と XRPL Testnet を接続

接続後はラベルが 「CONNECTED ✓」 に変化

すぐ下に Connected: rXXXX...YYYY のような短縮アドレスを表示

接続済みでもボタンは常に有効で、何度でも再接続が可能（idempotent）

11-2. LVL1 パスポートの Mint フロー（/passport/new）
/passport/new は、Testnet 上で LVL1 パスポートをミントするための専用画面です。

パスポート名入力欄（例: 0x-xrpl）

ステータス表示:

未接続: Wallet not connected

接続済み: Connected: rXXXX...YYYY

ボタン構成:

CONNECT WALLET (TESTNET)

Home と同様に connect() を呼び出し、何度でも押せる設計

MINT MY PASSPORT

事前バリデーション:

ウォレット未接続 → 「Connect your GemWallet on XRPL Testnet first.」

パスポート名未入力 → 「Passport name is required.」

バリデーション通過後:

NFTokenMint（XLS-20）用のペイロードを組み立て

@gemwallet/api の mintNFT() を通じて XRPL Testnet に送信

成功時に NFToken ID と Tx Hash を取得

それらを含む LVL1 パスポート情報を localStorage に保存し、/passport/my に遷移

エラー時は、

GemWallet 未インストール

ユーザーがトランザクションをキャンセル

ネットワークエラーや RPC エラー

といったケースごとに、ユーザーが状況を理解できるメッセージを表示し、
ボタンが「押せなくなる」状態を避けるように実装しています。

11-3. LVL1 パスポートビュー（/passport/my）
/passport/my は、ミント済みパスポートを表示する画面です。

画面上部にクレジットカード比率のパスポートカードを表示

左上: DYNAMIC RECEIPT PASSPORT

右上: LVL 01

中央: パスポート名（例: 0x-xrpl）

右側ボタン: WALLET HASH ↗

https://testnet.xrpl.org/accounts/{address}（Testnet Explorer）を新規タブで開く

下部に統計カード:

Passport name / Level / XRPL address / NFTokenID

Mint Transaction:

フル Tx Hash

View on XRPL Testnet ↗ ボタン
→ https://testnet.xrpl.org/transactions/{hash} を開く

パスポート情報がまだ存在しない場合は、

「No passport found」といった空状態を表示し、

/passport/new への導線を用意しています。

11-4. デモ・開発用のリセット手順
ハッカソンデモや開発時に、LVL1 パスポートを簡単にリセットできるように、

text
コードをコピーする
/passport/my?reset=1
にアクセスした際に、

localStorage 上の LVL1 パスポート情報（例: "drp:passport:lvl1" キー）をクリア

自動的に /passport/new へリダイレクト

する「隠しリセット機能」を用意しています。
通常のユーザーには見えない形で、デモを何度でもきれいな状態からやり直すことができます。
