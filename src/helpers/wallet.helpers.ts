import { Keypair } from "@solana/web3.js";
import { tWallet } from "src/types/wallet.types";

export function generateKeypairs(): tWallet {
  const keypair = Keypair.generate();
  return {
    publicKey: keypair.publicKey,
    privateKey: keypair.secretKey,
  };
}
