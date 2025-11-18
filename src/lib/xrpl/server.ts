import xrpl, { Client, Wallet, xrpToDrops } from "xrpl";

const TESTNET_WSS = "wss://s.altnet.rippletest.net:51233";

async function withClient<T>(handler: (client: Client) => Promise<T>) {
  const client = new xrpl.Client(TESTNET_WSS);
  await client.connect();
  try {
    return await handler(client);
  } finally {
    await client.disconnect();
  }
}

export async function createFundedWallet() {
  return withClient((client) => client.fundWallet());
}

export async function sendTestnetPayment({
  amountXrp,
  destination,
  memo,
  senderSeed,
}: {
  amountXrp: string;
  destination?: string;
  memo?: string;
  senderSeed?: string;
}) {
  return withClient(async (client) => {
    const sourceWallet = senderSeed ? Wallet.fromSeed(senderSeed) : (await client.fundWallet()).wallet;
    const targetWallet = destination ? { address: destination } : Wallet.generate();

    const prepared = await client.autofill({
      TransactionType: "Payment",
      Account: sourceWallet.address,
      Amount: xrpToDrops(amountXrp),
      Destination: targetWallet.address,
      Memos: memo
        ? [
            {
              Memo: {
                MemoType: Buffer.from("DRP", "utf8").toString("hex"),
                MemoData: Buffer.from(memo, "utf8").toString("hex"),
              },
            },
          ]
        : undefined,
    });

    const signed = sourceWallet.sign(prepared);
    const submission = await client.submitAndWait(signed.tx_blob);

    return {
      hash: submission.result.hash,
      explorerUrl: `https://testnet.xrpl.org/transactions/${submission.result.hash}`,
      destination: targetWallet.address,
    };
  });
}

export async function fetchTransaction(hash: string) {
  return withClient((client) =>
    client.request({
      command: "tx",
      transaction: hash,
      binary: false,
    }),
  );
}
