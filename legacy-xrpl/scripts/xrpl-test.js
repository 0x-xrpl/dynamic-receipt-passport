// scripts/xrpl-test.js

import xrpl from "xrpl"

/**
 * XRPL Testnet に接続して：
 * 1. ウォレットを新しく作る
 * 2. 残高を表示する（最初は0）
 * 3. 接続を切る
 */

async function main() {
  // ① クライアントを Testnet に接続
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
  console.log("Connecting to XRPL Testnet...")
  await client.connect()
  console.log("✅ Connected")

  // ② 新しいウォレットを作成
  const wallet = xrpl.Wallet.generate()
  console.log("🔑 New wallet generated:")
  console.log("Address:", wallet.address)
  console.log("Seed   :", wallet.seed)

  // ③ 残高を取得（最初はだいたい 0 XRP）
  try {
    const balance = await client.getXrpBalance(wallet.address)
    console.log("💰 Balance:", balance, "XRP")
  } catch (e) {
    console.log("💰 Balance: 0 XRP (まだ資金なし)")
  }

  // ④ 接続を切る
  await client.disconnect()
  console.log("🔌 Disconnected. Test script finished.")
}

main().catch((e) => {
  console.error("❌ Error in XRPL test:", e)
})