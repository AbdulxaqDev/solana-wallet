# Solana wallets task

---

## English

Creating and Managing Wallets, requirements:

The following commands in the wallet.ts/.js file should perform the specified operations. 👇

You must create a wallet on Solana with the new command and save the wallet information in the wallet.json file in the same file.

At the same time, the balance of the created wallet should be recorded in the json file.

With the airdrop [X] command, X amount or by default 1 LEFT airdrop will be made.

The balance must be checked for the wallet created in the previous step with the balance command.

The transfer [otherPublicKey][Amount] command must transfer the value entered in the Amount parameter to the wallet address entered in the otherPublicKey parameter, and the result of the transaction should be written on the screen.

This transfer must be made from the wallet address you created in the previous steps.

---

## Turkish

Wallet Oluşturma ve Yönetme:

wallet.ts/.js dosyasında aşağıdaki komutlar belirtilen işlemleri yapmalıdır. 👇

new komutu ile Solana üzerinde bir cüzdan oluşturup, cüzdan bilgileri aynı dosyadaki wallet.json dosyasına kaydedilmelidir.

Aynı zamanda oluşturulan cüzdanın json dosyasında bakiyesi de kaydedilmelidir.

airdrop [X] komutu ile X kadar ya da varsayılan olarak 1 SOL airdrop yapılacak.

balance komutu ile önceki adımda oluşturulan cüzdan için bakiye kontrolü yapılmalıdır.

transer [otherPublicKey][Amount] komutu otherPublicKey parametresine girilen cüzdan adresine Amount parametresine girilen değer kadar transfer yapması gerekli ve işlem sonucu ekrana yazılmalıdır.

Bu transfer önceki adımlarda oluşturduğun cüzdan adresinden yapılmalıdır.

---

## Description of this app.

This app build on Solana blockchain technology, with library of [@solana/web3.js](https://www.npmjs.com/package/@solana/web3.js)

The main funcitonalities of this app are:

- Create two wallets to carry so operation on them, Sender and Recepient walltes. Their data will be saved in <code>src/balance.json</code> file and will be used from there.
- Logs balances, initially they will be 0
- Will do Airdrops to wallets 5 SOL and 2 SOL to Sender and Recipient wallets respectively.
- Logs again balances of wallets.
- Finally, do transaction from Snder wallet to Recipient wallet by 3 SOL

So, to run this app you must have installed the solana CLI to your device. If you do not have it yet, refer to this [Install the Solana CLI](https://docs.solanalabs.com/cli/install) guide.

After having the solana in your device, just run the following command in terminal:

```bash
$   solana-test-validator
```

This runs solana on <code>http://localhost:8899</code> by default.

Now, need to install the necessery dependencies and rnu the app with following commands:

On development mode, it relodes the app automatiacally, you can play around with code and do so changes, and see the results on terminal immidiatly:

```bash
$   npm run start:dev
```

On production mode, webpack build a <code>public/bundle.cjs</code> and the nodejs run that production ready built file :

```bash
$   npm run start:prod
```

Just to build the app, run:

```bash
$   npm run build
```

Just to run this command to run build budle:

```bash
$   npm start
```

The outcome will be like following:

![alt text](<images/Screenshot 2024-02-19 at 18.08.56.png>)
