# xrpl-hackathon-base

XRPL Testnet を使ったシンプルな Node.js プロジェクトです。  
ウォレット生成、XRP 送金、トランザクション確認など、XRPL の基礎操作をローカルで試せます。

---

## 🧩 プロジェクト構成

```
xrpl-hackathon-base/
├── package.json
├── README.md
└── scripts/
    ├── xrpl-core.js     ← Testnet 接続・切断、共通ヘルパー
    ├── xrpl-test.js     ← ウォレット生成テスト
    ├── send-xrp.js      ← 10 XRP 送金サンプル
    └── check-tx.js      ← トランザクション結果確認
```

---

## 🚀 セットアップ（ローカル PC）

**⚠️注意：ChatGPT Codex 上では npm を実行しないでください。ローカル PC でのみ実行してください。**

```bash
# リポジトリをクローン
git clone <your-repo-url> xrpl-hackathon-base
cd xrpl-hackathon-base

# 依存パッケージをインストール
npm install
```

`npm install` を実行すると、`xrpl` など必要な依存関係が自動的にセットアップされます。

---

## 🛠️ 共通ヘルパー
- `scripts/xrpl-core.js` に、Testnet への接続/切断、faucet 付きウォレット生成、XRP 送金のヘルパーを用意しています。
- 他のスクリプトはこのモジュールを再利用する構成です。

---

## 🧪 1. ウォレット生成テスト

```bash
npm run xrpltest
```
- Testnet へ接続し、新しいウォレットを作成して残高を表示します。

---

## 💸 2. 10 XRP 送金デモ

```bash
npm run send:xrp
```
- faucet で資金を入れた送金元ウォレットから、生成した宛先ウォレットへ 10 XRP を送金し、TX ハッシュを出力します。

---

## 🔍 3. トランザクション状態確認

```bash
npm run check:tx -- <TX_HASH>
```
- `<TX_HASH>` には検証したいトランザクションハッシュを指定します。
- 実行すると XRPL Testnet に接続し、`tx` コマンドの結果を JSON で表示します。

---

## 💾 Codex からファイルをダウンロードする手順
ChatGPT Codex の Web インターフェースで、左側に「Files」一覧だけがあり、`More options` や `Download ZIP` が表示されない場合の手順です。

### `package.json` を保存する
1. 左側の「Files」リストで **package.json** をクリックして開く。
2. エディタ内をクリックし、`Ctrl + A`（macOS は `⌘ + A`）で全選択し、続けて `Ctrl + C`（`⌘ + C`）でコピーする。
3. ローカルのテキストエディタで新規ファイル `package.json` を作成し、貼り付けて保存する。

### `scripts/xrpl-test.js` を保存する
1. 左側の「Files」リストで **scripts** フォルダを開き、**xrpl-test.js** をクリックして開く。
2. エディタ内をクリックし、`Ctrl + A`（macOS は `⌘ + A`）で全選択し、`Ctrl + C`（`⌘ + C`）でコピーする。
3. ローカルで `scripts` というフォルダを作成し、その中に `xrpl-test.js` を新規作成して貼り付け、保存する。

### 補足
- ブラウザでの操作だけで完了します。追加メニューや ZIP ダウンロード機能は不要です。
- `Create PR` ボタンはコード変更の共有・提案用であり、ファイルをローカルに保存する用途ではありません。

## DRP core helpers (scripts/drp-core.js)

This project also includes a small "Dynamic Receipt Passport (DRP)" core module.

- `createEmptyPassport(ownerWallet, favoriteCity?)`
  - Create a new passport state object for a given XRPL wallet.
- `addPurchaseToPassport(passport, purchase)`
  - Add one purchase record and update totals, stamps, visited cities, and level.
- `computeLevel(passport)`
  - Simple level logic based on total purchases and number of cities.

In the full DRP app, these helpers can be reused from a Next.js API route or
server-side function to keep the XRPL logic (`xrpl-core.js`) and the passport
logic (`drp-core.js`) clearly separated.