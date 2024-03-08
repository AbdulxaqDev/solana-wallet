import { PublicKey } from "@solana/web3.js";

export type tWallet = {
  publicKey: PublicKey;
  privateKey: Uint8Array;
};
