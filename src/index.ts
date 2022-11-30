import express, { Request, Response } from 'express';
import axios from 'axios';

const PORT = process.env.PORT || 8080;

const app = express();
const TEN_SECONDS = 10000;
const WALLET_ADDRESS =
  'kaspa%3Aqrkxtuedt9ru9kdwgpjvusp64upkcyt8vpmw7k52zj0qnsjj3qmsxj4r0grwx';
let cachedBalanceInKAS = 0;

setInterval(async () => {
  console.log('querying wallet...');

  const {
    data: { balance }
  } = await axios.get(
    `https://api.kaspa.org/addresses/${WALLET_ADDRESS}/balance`
  );
  const currentBalanceInKAS = balance / 100000000;
  console.log(`current KAS balance: ${currentBalanceInKAS}`);

  if (cachedBalanceInKAS && cachedBalanceInKAS < currentBalanceInKAS) {
    const differenceInKAS = currentBalanceInKAS - cachedBalanceInKAS;
    console.log(
      `transaction occurred! wallet balance modified by a difference in ${differenceInKAS} KAS.`
    );
  }
  cachedBalanceInKAS = currentBalanceInKAS;
}, TEN_SECONDS);

app.get('/', (req: Request, res: Response) => {
  res.send('Listening for your wallet address...');
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
