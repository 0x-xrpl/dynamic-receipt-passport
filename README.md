🏆 Dynamic Receipt Passport（DRP）
XRPL × AI Hackathon

この README は、以下すべてを 1 つにまとめた “README” です：

🟦 XRPL Testnet 操作用の Node.js 基礎スクリプト（ウォレット生成・送金・TX確認）

🟪 DRP アプリ本体の要件定義（Next.js + XRPL + AI + Dynamic NFT）

🟥 Claude Code / GitHub / Vercel にそのまま貼れる構成

0. 📌 プロジェクト概要（High-level Summary）
プロジェクト名：Dynamic Receipt Passport（DRP）
一文コンセプト（グローバル版）

XRP が使える世界中の街での 買い物・旅・スタンプ・会計記録 を
1 枚の Dynamic NFT パスポート に統合するアプリ。

XRPL Commons Residency in Paris を スターターケース としつつ、
「パリ → 東京 → 大阪 → ロンドン → NYC」へ広がる世界的 XRPL 標準を目指す。

1. ❓ WHY（作る理由）
1-1. 海外生活の「支出のカオス」を解決する

紙レシートが破れる、紛失する、薄くなる

仕事の経費と個人支出が混ざって管理不能

スタンプカードが国・店舗ごとにバラバラ

行った場所の “軌跡” がマップに残らない

➡ DRP はこれらをすべて 1 枚の NFT パスポートで管理できる。

1-2. パリ Residency を起点にする戦略的理由

Hackathon Osaka の賞に「XRPL Commons パリ3ヶ月」がある

審査員の頭に “パリ滞在” という明確な文脈が存在する

➡ 「パリで実際に使える」＋「世界へ拡張できる」
という設計が最も響く。

1-3. レシートを “価値あるデジタル資産” へ変換

従来：捨てる紙
未来：旅・購買履歴・ロイヤリティのすべてが刻まれた Dynamic NFT

1-4. 店舗と XRPL コミュニティにとってもメリット大

XRP 決済店として自動マップ掲載

スタンプカードを NFT 内ページとして統合

リピーター創出が自動化

➡ ユーザー／店舗／XRPL の三方よし。

2. 🎯 ターゲットユーザー & 利用シーン
2-1. ユーザータイプ

Paris Residency 参加者

海外旅行者

出張ユーザー

XRP 決済対応店の利用者

2-2. 「パリでの3ヶ月」を想定した例

毎日の食事・移動・買い物を DRP に記録

マップで自分の生活圏が可視化

帰国後に CSV/PDF で経費提出

NFT パスポートで滞在の全履歴が見える

2-3. パリ → 世界拡張

Paris

Tokyo

Osaka

London

NYC

Singapore / Lisbon ...

➡ 都市追加は OpenStreetMap の Layer を増やすだけで実装可能。

3. 🧠 コアコンセプト
✔ Dynamic Receipt Passport（DRP）とは？

購入記録

スタンプカード

マップ

会計データ
→ すべてが 1 枚の Dynamic NFT に統合され、成長していく “パスポート”

4. 🔧 機能仕様（詳細）
4-1. 購入記録 & XRPL アンカー

記録データ例：

店名

金額

VAT

カテゴリ

位置情報

タイムスタンプ

XRPL 書き込み（Beginner Trackで重要）：

Payment / Memo に購入 ID を書き込む

ページ上で TX Hash を確認

4-2. Dynamic NFT（成長ロジック）

NFT 内のメタデータ：

totalPurchases

totalAmount

visitedCities

visitedStores

stampCount

NFT が自動成長していく：

購入件数：レベルアップ

都市数：パスポート背景に世界地図模様

店舗スタンプ：アイコン追加

（MVP ではローカル計算で OK、将来 XRPL 書き込み可能）

4-3. スタンプカード

店舗単位：

visits

stampCount

達成すると UI が発光・色変化

NFT の「ページ」として統合。

4-4. マップ（Leaflet.js）

ピン表示：

自分の購入履歴 → 青

XRPL 決済店 → 緑

ピンをタップすると詳細パネル表示。

4-5. AI 分類・集計

店名やメモからカテゴリ推定

VAT（国ごとに推定）

支出の円グラフ・棒グラフ生成

（Claude/OpenAI API を追加で使える設計）

4-6. Export（会計提出用）

CSV 出力：

Date / Store / Category / Amount / VAT / TX Hash / City …

PDF 出力：

window.print() + Print CSS

4-7. 通知

スタンプ達成

新店舗訪問

返品期限通知（任意）

MVP は Toast ベースで十分。

5. 🖥 画面構成（UI）

Home / Timeline

Add Purchase

Passport（Dynamic NFT）

Map

Export

Settings

6. 🏗 技術構成（Next.js / XRPL）
Framework

Next.js 14（App Router）

TypeScript

Tailwind CSS

XRPL JS SDK（Testnet）

State

Zustand または React Context

Storage

MVP：localStorage

将来：Supabase / SQLite / API Routes

Beginner Track 得点ポイント

Testnet ウォレット発行

NFT ミント（1 回）

購入ごとに XRPL 書き込み（Memo）

TX Hash を UI で表示

7. 🎤 デモ台本（2分30秒）

0:00 — 導入
「DRP は世界中で使えるレシートパスポートです。」

0:30 — 問題提起
「レシート紛失・経費混在・スタンプ散乱 — 全部バラバラ。」

1:00 — 解決策
「Dynamic NFT × マップ × 会計 × XRPL × AI で統合管理します。」

1:30 — デモ

購入追加 → AIカテゴリ化

XRPL書き込み & TX Hash表示

マップで軌跡表示

スタンプ増加 → NFTレベルアップ

CSV/PDF エクスポート

2:30 — まとめ
「パリから始まり、世界の XRPL都市へ拡大します。」

8. 💬 Claude Code 用・最初の一文（英語）
You are an expert XRPL + AI full-stack engineer.
Please implement the following “Dynamic Receipt Passport (DRP)” app
using Next.js (TypeScript) + Tailwind CSS + xrpl.js on Testnet.
Follow all functional requirements strictly.
If something is ambiguous, choose the simplest option that still looks good for a demo.

9. 🟦 付録：XRPL 基礎 Node.js プロジェクト
xrpl-hackathon-base/
├── package.json
├── README.md
└── scripts/
    ├── xrpl-core.js
    ├── xrpl-test.js
    ├── send-xrp.js
    └── check-tx.js

🚀 インストール
npm install

① ウォレット生成
npm run xrpltest

② 10 XRP 送金
npm run send:xrp

③ 取引確認
npm run check:tx -- <TX_HASH>

10. 🟥 付録：DRP Core Helpers（drp-core.js）
createEmptyPassport(ownerWallet, favoriteCity?)
addPurchaseToPassport(passport, purchase)
computeLevel(passport)


Next.js API Routes から再利用可能。