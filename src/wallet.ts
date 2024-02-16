import fs from "node:fs/promises";
import {
  Connection,
  Keypair,
  SystemProgram,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  startAndConnect,
  getAccounts,
  Cleanup,
} from "solana-test-validator-js";

import __dirname from "./utils/__dirname";
import { tWallet } from "./types/wallet.types";

const WALLET_BALANCE = __dirname(import.meta.url, "balance.json");

async function createWallet(): Promise<tWallet[]> {
  const walletFileHandler = await fs.open(WALLET_BALANCE);
  const walletData = await walletFileHandler.read();

  try {
    const wallet = JSON.parse(walletData.toString());

    if (wallet?.length === 0) throw new Error("No wallet, now creating!");

    return wallet;
  } catch (error) {
    console.log(error.message);

    const keypair = Keypair.generate();
    const newWallet = {
      publicKey: keypair.publicKey.toBase58(),
      privateKey: keypair.secretKey,
    };
    const wallet = [];

    wallet.push(newWallet);

    await walletFileHandler.writeFile(
      WALLET_BALANCE,
      JSON.stringify(wallet),
      ""
    );

    walletFileHandler.writeFile(WALLET_BALANCE, "Hey there!", function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });

    return wallet;
  }
}
console.log("----");

console.log(await createWallet());
