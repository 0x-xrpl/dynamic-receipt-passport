"use client";

import * as GemWallet from "@gemwallet/api";

type WalletSuccess = { success: true; address: string };
type WalletError = { success: false; error: string };
export type WalletResult = WalletSuccess | WalletError;

const gemwalletApi = GemWallet as Record<string, any>;

function extractAddress(payload: any): string | null {
  if (!payload) return null;
  if (typeof payload === "string") return payload;

  const directAddress = payload.address ?? payload.classicAddress;
  if (typeof directAddress === "string") return directAddress;

  const nestedResult = payload.result || payload.response || payload.data;
  if (nestedResult) {
    const nestedAddress = nestedResult.address ?? nestedResult.classicAddress ?? nestedResult.publicAddress;
    if (typeof nestedAddress === "string") return nestedAddress;
  }

  return null;
}

export async function detectGemWallet(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    const isInstalledFn = gemwalletApi.isInstalled as (() => Promise<boolean | string>) | undefined;
    if (typeof isInstalledFn === "function") {
      const installed = await isInstalledFn();
      return Boolean(installed);
    }
  } catch {
    // ignore detection error and fallback to window checks
  }

  return typeof (window as any).gemwallet !== "undefined" || typeof (window as any).gemWallet !== "undefined";
}

export async function getAddress(): Promise<WalletResult> {
  const installed = await detectGemWallet();
  if (!installed) {
    return { success: false, error: "GemWallet is not installed." };
  }

  try {
    const getAddressFn = gemwalletApi.getAddress as (() => Promise<unknown>) | undefined;
    if (typeof getAddressFn !== "function") {
      return { success: false, error: "GemWallet getAddress() is unavailable." };
    }

    const response = await getAddressFn();
    const address = extractAddress(response);

    if (address) {
      return { success: true, address };
    }

    return { success: false, error: "Unable to retrieve wallet address from GemWallet." };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown GemWallet error.";
    return { success: false, error: message };
  }
}

export async function connect(): Promise<WalletResult> {
  const installed = await detectGemWallet();
  if (!installed) {
    return { success: false, error: "GemWallet is not installed." };
  }

  try {
    const connectFn = gemwalletApi.connect as (() => Promise<unknown>) | undefined;
    const openSignInFn = gemwalletApi.openSignIn as (() => Promise<unknown>) | undefined;

    if (typeof connectFn === "function") {
      await connectFn();
    } else if (typeof openSignInFn === "function") {
      await openSignInFn();
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to connect to GemWallet.";
    return { success: false, error: message };
  }

  return getAddress();
}
