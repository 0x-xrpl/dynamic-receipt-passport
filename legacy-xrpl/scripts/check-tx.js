// scripts/check-tx.js

import { connectClient, disconnectClient } from "./xrpl-core.js";

/**
 * 引数で渡された TX Hash のステータスを調べる
 * 例:
 *   node scripts/check-tx.js <txhash>
 */

async function main() {
  const txHash = process.argv[2];

  if (!txHash) {
    console.error("❌ Error: TX hash を指定してください。");
    console.error("使い方: node scripts/check-tx.js <txhash>");
    process.exit(1);
  }

  const client = await connectClient();

  try {
    console.log("🔍 Checking transaction:", txHash);

    const result = await client.request({
      command: "tx",
      transaction: txHash,
      binary: false,
    });

    console.log("📄 Transaction Result:");
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.error("❌ Error checking TX:", e);
  } finally {
    await disconnectClient(client);
  }
}

main();