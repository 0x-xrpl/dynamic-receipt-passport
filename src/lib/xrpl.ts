"use client";

import type { MintNFTRequest } from "@gemwallet/api";

export const TESTNET_EXPLORER_BASE = "https://testnet.xrpl.org/transactions";
const DEFAULT_MINT_URI = "drp://passport/lvl1-placeholder";
const DEFAULT_MINT_FLAGS = 8; // tfTransferable
const DEFAULT_TAXON = 0;

function utf8ToHex(value: string) {
  const encoder = new TextEncoder();
  return Array.from(encoder.encode(value))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

export function buildTestnetTxUrl(txHash: string) {
  return `${TESTNET_EXPLORER_BASE}/${txHash}`;
}

export function buildTestnetAccountUrl(address: string) {
  return `https://testnet.xrpl.org/accounts/${address}`;
}

export function buildMintPayload({
  uri = DEFAULT_MINT_URI,
  taxon = DEFAULT_TAXON,
  flags = DEFAULT_MINT_FLAGS,
}: {
  uri?: string;
  taxon?: number;
  flags?: number;
} = {}): MintNFTRequest {
  return {
    NFTokenTaxon: taxon,
    URI: utf8ToHex(uri),
    flags,
  };
}

export type MintedPassport = {
  name: string;
  address: string;
  nfTokenId: string;
  mintHash: string;
  level: number;
};
