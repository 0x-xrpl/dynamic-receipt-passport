/**
 * Bridge helpers to reuse the existing XRPL logic that lives under /legacy-xrpl.
 * The adapter keeps the client + wallet in module scope so all UI hooks can call it.
 */

type LegacyCoreModule = typeof import("../../legacy-xrpl/scripts/xrpl-core.js");

let coreModulePromise: Promise<LegacyCoreModule> | null = null;
let activeClient: any | null = null;
let activeWallet: any | null = null;

async function loadCore(): Promise<LegacyCoreModule> {
  if (!coreModulePromise) {
    coreModulePromise = import("../../legacy-xrpl/scripts/xrpl-core.js");
  }
  return coreModulePromise;
}

async function ensureClient() {
  if (activeClient) return activeClient;
  const core = await loadCore();
  activeClient = await core.connectClient();
  return activeClient;
}

async function ensureWallet() {
  const client = await ensureClient();
  if (activeWallet) return { client, wallet: activeWallet };
  const core = await loadCore();
  activeWallet = await core.createFundedWallet(client);
  return { client, wallet: activeWallet };
}

export async function connectWallet() {
  const { wallet } = await ensureWallet();
  return {
    address: wallet.address as string,
    seed: wallet.seed as string,
  };
}

export async function disconnectWallet() {
  if (!activeClient) return;
  const core = await loadCore();
  await core.disconnectClient(activeClient);
  activeClient = null;
  activeWallet = null;
}

export async function getAccountInfo(address?: string) {
  const { client, wallet } = await ensureWallet();
  const account = address || wallet.address;
  const response = await client.request({
    command: "account_info",
    account,
    ledger_index: "validated",
  });
  return response.result;
}

export async function getTransactionHistory(limit = 8, address?: string) {
  const { client, wallet } = await ensureWallet();
  const account = address || wallet.address;
  const response = await client.request({
    command: "account_tx",
    account,
    limit,
  });
  return response.result?.transactions ?? [];
}

export async function sendXrp(destination: string, amountXrp: number) {
  if (!destination || !amountXrp) {
    throw new Error("Destination and amount are required");
  }
  const { client, wallet } = await ensureWallet();
  const core = await loadCore();
  const result = await core.sendXrpPayment(client, wallet, destination, amountXrp.toString());
  return result;
}
