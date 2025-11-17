// scripts/xrpl-core.js
import xrpl from "xrpl"

/**
 * XRPL Testnet 用の共通ヘルパー
 * - クライアント接続 / 切断
 * - テストネット用ウォレット生成 + faucet で資金追加
 * - XRP 支払い
 */

const TESTNET_WSS = "wss://s.altnet.rippletest.net:51233"

export async function connectClient() {
  const client = new xrpl.Client(TESTNET_WSS)
  console.log("🛰  Connecting to XRPL Testnet...")
  await client.connect()
  console.log("✅ Connected to XRPL Testnet")
  return client
}

export async function disconnectClient(client) {
  if (!client) return
  await client.disconnect()
  console.log("🔌 Disconnected from XRPL Testnet")
}

/**
 * テストネット用ウォレットを生成し、faucet から資金を追加
 */
export async function createFundedWallet(client) {
  console.log("🔑 Creating and funding a new Testnet wallet...")
  // xrpl.js v4 以降には Testnet 用の簡易 fundWallet ヘルパーがあります
  const { wallet, balance } = await client.fundWallet()
  console.log("   Address:", wallet.address)
  console.log("   Seed   :", wallet.seed)
  console.log("   Balance:", balance, "XRP (funded by Testnet faucet)")
  return wallet
}

/**
 * XRP 支払い（シンプルな Payment トランザクション）
 */
export async function sendXrpPayment(client, senderWallet, destination, amountXrp) {
  console.log(`💸 Sending ${amountXrp} XRP from ${senderWallet.address} to ${destination}...`)

  const prepared = await client.autofill({
    TransactionType: "Payment",
    Account: senderWallet.address,
    Amount: xrpl.xrpToDrops(amountXrp),
    Destination: destination,
  })

  const signed = senderWallet.sign(prepared)
  console.log("   Submitting transaction...")
  const result = await client.submitAndWait(signed.tx_blob)

  console.log("   Result:", result.result.meta.TransactionResult)
  console.log("   TX Hash:", result.result.hash)

  return result.result
}