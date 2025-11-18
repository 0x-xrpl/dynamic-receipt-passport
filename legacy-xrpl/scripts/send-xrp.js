// scripts/send-xrp.js

import { connectClient, disconnectClient } from "./xrpl-core.js";
import xrpl from "xrpl";

/**
 * 10 XRP を Testnet で送金するデモ
 * 1. Testnet に接続
 * 2. faucet 付きウォレット（送金元）を 1 つ作成
 * 3. 受取用ウォレットを 1 つ生成
 * 4. 送金元 → 受取先 に 10 XRP 送金
 * 5. TX ハッシュと Explorer URL を表示
 */
async function main() {
  console.log("🚀 Starting send-xrp demo...");

  const client = await connectClient();

  try {
    console.log("💰 Funding source wallet via faucet...");
    const funded = await client.fundWallet();
    const source = funded.wallet;

    console.log("   Source address:", source.address);

    console.log("🆕 Generating destination wallet...");
    const dest = xrpl.Wallet.generate();
    console.log("   Destination address:", dest.address);

    const payment = {
      TransactionType: "Payment",
      Account: source.address,
      Amount: xrpl.xrpToDrops("10"),
      Destination: dest.address,
    };

    console.log("📨 Submitting payment transaction...");
    const prepared = await client.autofill(payment);
    const signed = source.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    const tx = result.result;

    console.log("✅ Payment finished.");
    console.log("   TX Hash:", tx.hash);
    console.log("   Explorer (Testnet) URL:");
    console.log("   https://testnet.xrpl.org/transactions/" + tx.hash);
  } catch (e) {
    console.error("❌ Error in send-xrp demo:", e);
  } finally {
    await disconnectClient(client);
  }
}

main().catch((e) => {
  console.error("❌ Top-level error:", e);
});