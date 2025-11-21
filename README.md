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
- 今後の拡張計画（Deep/Main Track への発展を含む）

---

## Setup Guide（ローカル開発環境）

プロダクト本体のコードを壊さずに安全にセットアップするための最小限の手順です。node_modules などの大容量ディレクトリは Git 管理外 (.gitignore) になっているため、以下のコマンドを順番に実行してください。


1. 最新のコードを取得
git clone <your-repo-url> drp
cd drp

2. 既存の node_modules を削除（もし含まれていた場合）
rm -rf node_modules

3. 依存関係をクリーンに再インストール
npm install

4. 動作確認
npm run dev


git status を実行して node_modules/, .next/, .vercel/ などが表示されなければ .gitignore が正しく効いています。もし過去に node_modules がコミットされている場合は、git rm -r --cached node_modules && git commit -m "Remove node_modules from repo" を実行して履歴から除外してください（デプロイ設定には影響しません）。

---

## 0. プロジェクト概要

プロジェクト名: Dynamic Receipt Passport (DRP)
テーマ: 「レシート・スタンプ・マップ・会計」の統合パスポート
対象トラック: Beginner Track（XRPL Testnet を用いた入門者向けプロダクト）

使用技術:
- Next.js 16 (App Router / Turbopack 対応、async params 仕様に対応)
- Tailwind CSS
- XRPL JavaScript SDK（Testnet）
- Node.js ベースの簡易 XRPL スクリプト
- localStorage によるクライアントサイド保存

DRP は、XRPL Commons Residency in Paris をスターターケースとしつつ、将来的には Paris / Tokyo / Osaka / London / New York など、XRPL 決済が利用可能な世界中の都市へ拡張することを前提に設計しています。

---

## 1. プロジェクトの背景と目的（WHY）

### 1-1. 解決したい課題

海外生活や長期滞在において、以下のような課題が繰り返し発生します。

- 紙レシートが破れる・紛失する・文字が薄くなってしまう
- 仕事の経費とプライベートの支出が混在し、整理に時間がかかる
- スタンプカードが店舗ごと・国ごとにばらばらに増えていく
- 「どこで・何をしたか」という軌跡が、後から振り返りにくい

DRP は、これらを XRPL と Dynamic NFT の組み合わせで解決しようとする試みです。

### 1-2. パリ Residency を起点にする理由

XRPL Hackathon OSAKA 2025 では、XRPL Commons によるパリ 3 ヶ月のプログラムが大きな一つのゴールになっています。

- 審査員や関係者にとって「パリでの生活」という具体的なイメージが共有されている
- パリは、レシートと税務処理のルールが複雑で、記録・整理のニーズが強い
- XRPL Commons Residency 参加者は、日常的に XRP 決済スポットを利用する可能性が高い

本プロジェクトでは「パリで実際に使える」ことを起点にしつつ、他都市への展開を前提とした設計を行っています。

### 1-3. レシートを「成長する NFT」へ変換する

従来は捨ててしまうだけの紙レシートを、次のような価値へ変換します。

- 旅の履歴としての記録
- 会計・税務処理に使えるデータ
- 店舗とのロイヤリティ・スタンプ情報
- XRPL 上のトランザクションとの紐づけ

これらを 1 枚の Dynamic NFT のメタデータとして蓄積していくことにより、「使えば使うほど育っていくパスポート」として設計しています。

---

## 2. 想定ユーザーとユースケース

### 2-1. 想定ユーザー

- XRPL Commons Residency in Paris 参加者
- 海外旅行者（短期〜中長期滞在）
- 出張で海外を訪れるビジネスパーソン
- XRP 決済対応店舗の利用者

### 2-2. 代表的な利用シナリオ（パリ 3 ヶ月滞在）

1. 日々の飲食・移動・ショッピングのレシートを DRP に記録する
2. 地図上で、自分の生活圏や訪問スポットが可視化される
3. 月末や帰国時に CSV/PDF で会計データをエクスポート
4. Dynamic NFT パスポート上で滞在履歴の可視化
5. 購入登録時に XRPL 送金（Testnet）を選択 → TX がパスポートへ反映

### 2-3. 世界への展開

都市情報をレイヤーとして管理することで、以下のような展開を想定しています。

- Paris
- Tokyo
- Osaka
- London
- New York
- その他 XRPL 決済スポットの多い都市

---

### 3. 機能概要

本プロジェクトは、以下の機能群で構成されています。

1. 購入記録の登録・閲覧（タイムライン表示）
2. 店舗ごとのスタンプカード（簡易ロイヤリティ）
3. Dynamic NFT パスポートビュー
4. マップ表示（購入履歴と XRPL 決済スポット）
5. 会計用エクスポート（CSV / 印刷ビュー）
6. XRPL Testnet との連携（TX Hash 表示、将来的な NFT 連携を想定）
7. XRPL Testnet を用いた LVL1 パスポートミント（GemWallet 連携）

---

### 3-1. 購入記録と XRPL アンカー

登録データ例:

- 店名
- 金額
- VAT（消費税相当）
- カテゴリ（飲食・交通・宿泊など）
- 位置情報（任意）
- タイムスタンプ
- XRPL のトランザクションハッシュ（Testnet）

Beginner Track の観点からは、

- XRPL Testnet を利用した送金・メモ書き込み
- TX Hash を画面上で確認できる

といった「XRPL の基本的な利用」を丁寧に実装することを目標としています。

【実装部分詳細】

/api/xrpl/tx/[hash]  
→ Next.js 16 の async params を用いて安定化、Explorer リンクも生成

/api/xrpl/send  
→ XRPL wrapper（server.ts）経由で送信、TX Hash を UI と Receipt に保存

Add Purchase  
→ Live XRPL Status Row、送信ロック、Explorer 直リンクなどデモ向け UI を搭載

---

### 3-2. Dynamic NFT（成長ロジック）

NFT メタデータ想定値:

- totalPurchases（購入件数）
- totalAmount（総額）
- visitedCities（訪問都市数）
- visitedStores（訪問店舗数）
- stampCount（スタンプ合計数）

MVP ではローカル計算のみ。将来的に XRPL メタデータと同期予定。

---

### 3-3. スタンプカード

- 店舗ごとに stampCount を加算
- 達成時は UI で強調
- 将来的には店舗ごとに NFT 内ページを持てる構造を想定

---

### 3-4. マップ

Leaflet.js 等を使用して以下を可視化:

- 自身の購入履歴 → 青ピン
- XRPL 決済対応店 → 他色ピン

ピンをクリックすると詳細が表示される。

---

### 3-5. AI による分類・レポート

- 店名・メモからカテゴリ自動推定
- VAT 推定
- 円グラフ・棒グラフによるレポート
- Claude / OpenAI API 前提アーキテクチャ

---

### 3-6. エクスポート機能

- CSV 出力
- 印刷ビュー → ブラウザ PDF

---

## 4. 画面構成

主要画面:

- **Home / Timeline**  
  DEMO / Email login / Wallet connect / Testnet Mint（4 CTA）

- **Add Purchase**  
  XRPL 連携の基本操作をまとめた画面

- **Passport**  
  DEMO(LVL3) / Testnet(LVL1)

- **Map**

- **Export**

- **Settings**

---

## 5. 技術構成

### 5-1. フロントエンド

- Next.js 16（App Router）
- TypeScript
- Tailwind CSS
- 状態管理: React Context or Zustand
- 保存: localStorage

### 5-2. XRPL 連携

- xrpl.js（Testnet）
- ウォレット生成 / 送金 / TX取得
- Memo 埋め込みの設計（MVP は部分実装）
- GemWallet 連携:
  - @gemwallet/api ヘルパー
  - WalletContext
  - Connect / Mint / Explorer 連携
  - ボタンが “押せない” 状態を作らずデモを止めない設計

### 5-3. Node.js スクリプト（補助）

- wallet 生成
- test 送金
- TX 確認

Hackathon 参加者向けの最小サンプル。

---

## 6. セットアップ手順

### 6-1. 前提条件

- Node.js 18+
- npm or yarn
- Git

### 6-2. ソースコード取得


git clone https://github.com/0x-xrpl/dynamic-receipt-passport.git
cd dynamic-receipt-passport


### 6-3. 依存インストール


npm install


### 6-4. 開発サーバー起動


npm run dev


http://localhost:3000 を開くと動作確認できます。

---

## 7. 公開（Vercel）

Live demo:  
https://dynamic-receipt-passport.vercel.app/

手順:

- GitHub を Vercel と連携
- リポジトリをインポート
- 自動ビルド＆デプロイ
- 公開 URL 発行

Next.js 標準設定で動作 → 特別な設定不要。

---

## 8. ディレクトリ構成（例）

dynamic-receipt-passport/
  ├── legacy-xrpl/              # XRPL Node.js 基礎スクリプト（サンプル）
  ├── public/                   # 画像・アイコンなどの静的ファイル
  ├── src/
  │   ├── app/                  # Next.js App Router 用エントリ
  │   │   ├── passport/         # パスポート関連ページ
  │   │   ├── api/
  │   │   │   └── xrpl/
  │   │   │       ├── send/     # 送金 API（Next.js 16対応）
  │   │   │       └── tx/[hash]/# トランザクション参照 API
  │   │   └── page.tsx          # Home / Timeline
  │   ├── components/           # UI コンポーネント
  │   ├── context/              # WalletProvider など
  │   ├── lib/
  │   │   ├── xrpl/
  │   │   │   └── server.ts     # XRPL Testnet wrapper（送信・取得）
  │   │   ├── wallet.ts         # GemWallet 連携ヘルパー
  │   │   ├── passport-store.ts # LVL1 パスポート保存ロジック
  │   │   └── xrpl.ts           # Explorer URL 生成など
  │   └── styles/               # Tailwind / グローバルスタイル
  ├── package.json
  ├── tsconfig.json
  ├── next.config.ts
  └── README.md                 # 本ファイル

---

## 9. 今後の拡張と発展

優先実装（Beginner Track）:

- XRPL Testnet の送金・TX確認
- 統合 UI
- Dynamic NFT プロトタイプ
- GemWallet 連携ミント

今後の発展:

- XRPL NFTメタデータ同期
- XRPL EVM / Xahau → Hooks / AMM によるロイヤリティ自動化
- 店舗ダッシュボード
- Multi-chain 対応

---

## 9-1. Web2 レイヤー（Email / ポイント）

DRP の重要レイヤー：

- Email だけで開始できる（Web2 として自然）
- Web2 ユーザーが段差なく XRPL へ入れる
- Wallet なしでポイントアプリのように使える
- 後から Wallet を接続して Web3 へ段階遷移

「段差のない Web2 → Web3 導線」を実現する根底思想。

---

## 9-2. XRP 還元・ホテル提携・コミュニティ共創

将来構想：

- レシート登録やスタンプ達成でポイント → XRP 還元
- 提携ホテルと連携し、パスポートランク特典
- XRP 決済店舗・ローカルビジネスとのコラボ
- Web2 の消費者 × Web3 の XRPファン の両軸で紡ぐプロジェクト

---

## 10. ライセンス

検討中（OSS 化を視野）

---

## 11. GemWallet 連携 & Testnet パスポートミント

### 11-1. Home 画面

- DEMO MODE
- START WITH EMAIL
- CONNECT WALLET (TESTNET)
- MINT MY PASSPORT (TESTNET)

connect():  
→ 接続後 Connected: rXXXX…YYYY  
→ 再接続は idempotent で何度でも可能

---

### 11-2. /passport/new（LVL1 Mint）

UI：

- パスポート名入力
- ステータス（未接続 / 接続済）
- CONNECT WALLET
- MINT MY PASSPORT

バリデーション：

- 未接続 → Connect first  
- 未入力 → Name required

Mint 処理：

- NFTokenMint（XLS-20）
- GemWallet mintNFT()
- NFToken ID / Tx Hash 取得
- localStorage 保存
- /passport/my に遷移

エラー時は適切なメッセージ、UIブロックなし。

---

### 11-3. /passport/my（LVL1 表示）

表示内容：

- パスポートカード（クレカ比率）
- LVL01
- パスポート名
- Wallet Hash ↗（Explorer）
- 統計（Passport name / Level / Address / NFTokenID）
- Mint Tx Hash（Explorerリンク）

パスポート不存在時：

- "No passport found"  
→ /passport/new への導線

---

### 11-4. リセット

/passport/my?reset=1  
→ localStorage の LVL1 パスポートを削除  
→ /passport/new へ強制遷移

---

## 11-4. デモ・開発用のリセット手順（再掲）

ハッカソンデモや開発時に、LVL1 パスポートを簡単にリセットできるように、

/passport/my?reset=1

にアクセスすると、

- localStorage の LVL1 パスポート情報（例: "drp:passport:lvl1"）をクリア  
- 自動的に /passport/new へリダイレクト  

という「隠しリセット機能」が動作します。

デモを何度でも問題のない状態から再実行できるようにするための仕組みです。
