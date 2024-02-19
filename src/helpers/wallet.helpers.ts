import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import { tWallet } from "src/types/wallet.types";

export function generateKeypairs(): tWallet {
  const keypair = Keypair.generate();
  return {
    publicKey: keypair.publicKey,
    privateKey: keypair.secretKey,
  };
}

export function balanceLogger(sender: number, recipient: number) {
  console.log(
    "  \x1b[36m%s\x1b[0m",
    `Sender wallet balance: ${sender} Lamport`
  );
  console.log(
    "  \x1b[36m%s\x1b[0m",
    `Recipient wallet balance: ${recipient} Lamport`
  );
}

export async function getWalletsBalance(
  connection: Connection,
  senderPubKey: PublicKey,
  recPubKey: PublicKey
): Promise<{ senderBalance: number; recBalance: number }> {
  senderPubKey = new PublicKey(senderPubKey);
  recPubKey = new PublicKey(recPubKey);
  return {
    senderBalance: await connection.getBalance(senderPubKey),
    recBalance: await connection.getBalance(recPubKey),
  };
}
