import express, { Request, Response } from 'express';
import axios from 'axios';
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { Channel } from 'diagnostics_channel';

const PORT = process.env.PORT || 8080;
const app = express();

const TEN_SECONDS = 10000;
const KASPA_WALLET_ADDRESS = process.env.KASPA_WALLET_ADDRESS;
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_CHANNEL_ID: any = process.env.DISCORD_CHANNEL_ID;

let cachedBalanceInKAS = 0;

// Create the bot
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Channel]
});

let channel: Channel | any = null;

client.login(DISCORD_BOT_TOKEN);

client.on('ready', (client) => {
  channel = client.channels.cache.get(DISCORD_CHANNEL_ID);
});

setInterval(async () => {
  console.log('querying wallet...');

  const {
    data: { balance }
  } = await axios.get(
    `https://api.kaspa.org/addresses/${KASPA_WALLET_ADDRESS}/balance`
  );
  const currentBalanceInKAS = balance / 100000000;
  const CURRENT_BALANCE_MSG = `Current KAS balance: ${currentBalanceInKAS}`;
  console.log(CURRENT_BALANCE_MSG);

  if (cachedBalanceInKAS && cachedBalanceInKAS < currentBalanceInKAS) {
    const differenceInKAS = currentBalanceInKAS - cachedBalanceInKAS;
    const TRANSACTION_OCCURED_MSG = `Transaction occurred! Wallet balance modified by a difference in ${differenceInKAS} KAS.`;
    console.log(TRANSACTION_OCCURED_MSG);

    channel.send(TRANSACTION_OCCURED_MSG);
    channel.send(CURRENT_BALANCE_MSG);
  }
  cachedBalanceInKAS = currentBalanceInKAS;
}, TEN_SECONDS);

app.get('/', (req: Request, res: Response) => {
  res.send(
    `Listening for wallet address updates every ${TEN_SECONDS} seconds...`
  );
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
