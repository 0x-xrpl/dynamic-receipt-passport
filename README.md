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

プロダクト本体のコードを壊さずに安全にセットアップするための最小限の手順です。`node_modules` などの大容量ディレクトリは Git 管理外 (`.gitignore`) になっているため、以下のコマンドを順番に実行してください。

```bash
# 1. 最新のコードを取得
git clone <your-repo-url> drp
cd drp

# 2. 既存の node_modules を削除（もし含まれていた場合）
rm -rf node_modules

# 3. 依存関係をクリーンに再インストール
npm install

# 4. 動作確認
npm run dev
```

> `git status` を実行して `node_modules/`, `.next/`, `.vercel/` などが表示されなければ `.gitignore` が正しく効いています。もし過去に `node_modules` がコミットされている場合は、`git rm -r --cached node_modules && git commit -m "Remove node_modules from repo"` を実行して履歴から除外してください（デプロイ設定には影響しません）。


---


## 0. プロジェクト概要


- プロジェクト名: Dynamic Receipt Passport (DRP)

- テーマ: 「レシート・スタンプ・マップ・会計」の統合パスポート

- 対象トラック: Beginner Track（XRPL Testnet を用いた入門者向けプロダクト）

- 使用技術:

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


そのため、本プロジェクトでは「パリで実際に使える」ことを起点にしつつ、他都市への展開を前提とした設計を行っています。


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
3. 月末や帰国時に、CSV/PDF で会計データをエクスポートし、経費精算や確定申告に利用する  
4. Dynamic NFT パスポート上で、自分の滞在履歴や訪問都市数などが「成長」として視覚化される
5. 購入登録時に XRPL 送金（Testnet）を選択すると、その場でトランザクションが送信され、パスポートにオンチェーン記録として反映されます。送信後は Explorer での確認リンクも利用可能です。



### 2-3. 世界への展開


都市情報をレイヤーとして管理することで、以下のような展開を想定しています。


- Paris  
- Tokyo  
- Osaka  
- London  
- New York  
- その他 XRPL 決済スポットの多い都市


都市の追加は、Map レイヤーと設定の追加で対応できるよう設計を行っています。


---


## 3. 機能概要
