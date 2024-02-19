import { readFile, writeFile } from "node:fs/promises";
import {
  Connection,
  Keypair,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import {
  balanceLogger,
  generateKeypairs,
  getWalletsBalance,
} from "./helpers/wallet.helpers";
import __dirname from "./utils/__dirname";
import { tWallet } from "./types/wallet.types";

const WALLET_DB_PATH = __dirname(import.meta.url, "balance.json");

async function createWallet(): Promise<tWallet[]> {
  const walletData = await readFile(WALLET_DB_PATH, { encoding: "utf-8" });

  try {
    let wallet = JSON.parse(walletData);
    if (wallet && wallet?.length === 0) throw new Error("No wallet data!");
    console.log("\x1b[36m%s\x1b[0m", "  There are already wallets");
    console.log("\n");

    return wallet;
  } catch {
    const wallet = [];
    wallet.push(generateKeypairs());
    wallet.push(generateKeypairs());
    await writeFile(WALLET_DB_PATH, JSON.stringify([]), { flag: "w" });
    await writeFile(WALLET_DB_PATH, JSON.stringify(wallet), { flag: "w" });
    console.log(
      "\x1b[36m%s\x1b[0m",
      "  Two wallets are created successfully: \n    - Sender\n    - Recipient"
    );
    console.log("\n");
    return wallet;
  }
}

async function doAirdrop(
  connection: Connection,
  publicKey: PublicKey,
  amount: number = 1
): Promise<void> {
  publicKey = new PublicKey(publicKey);
  const signature = await connection.requestAirdrop(
    publicKey,
    amount * LAMPORTS_PER_SOL
  );
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();
  await connection.confirmTransaction(
    {
      blockhash,
      lastValidBlockHeight,
      signature,
    },
    "finalized"
  );
}

async function transfer(
  connection: Connection,
  senderPrivateKey: Uint8Array,
  recipientPublicKey: PublicKey,
  amount: number
): Promise<string> {
  recipientPublicKey = new PublicKey(recipientPublicKey);
  let rawSecretKey = new Uint8Array(Object.values(senderPrivateKey));
  const senderKeypair = Keypair.fromSecretKey(rawSecretKey);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: senderKeypair.publicKey,
      toPubkey: recipientPublicKey,
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeypair,
  ]);

  return signature;
}

async function main() {
  const wallet = await createWallet();
  const sender = wallet[0];
  const recipient = wallet[1];

  const connection = new Connection("http://localhost:8899");

  const { senderBalance, recBalance } = await getWalletsBalance(
    connection,
    sender.publicKey,
    recipient.publicKey
  );
  balanceLogger(senderBalance, recBalance);

  console.log("\n");
  console.log("  \x1b[36m%s\x1b[0m", `Airdrops are being processed....`);
  console.log("\n");

  await doAirdrop(connection, sender.publicKey, 5)
    .then(async () => {
      await doAirdrop(connection, recipient.publicKey, 2).then(async () => {
        const { senderBalance, recBalance } = await getWalletsBalance(
          connection,
          sender.publicKey,
          recipient.publicKey
        );
        balanceLogger(senderBalance, recBalance);
      });
    })
    .then(async () => {
      console.log("\n");
      console.log(
        "  \x1b[36m%s\x1b[0m",
        `Transfering 3 SOL from Sender wallet to Recipient wallet:`
      );
      console.log("\n");

      await transfer(
        connection,
        sender.privateKey,
        recipient.publicKey,
        3
      ).then(async (signature) => {
        console.log("  \x1b[36m%s\x1b[0m", `Transfer signature: ${signature}`);
        console.log("\n");

        const { senderBalance, recBalance } = await getWalletsBalance(
          connection,
          sender.publicKey,
          recipient.publicKey
        );
        balanceLogger(senderBalance, recBalance);
      });
    });
}

main().catch(console.error);
