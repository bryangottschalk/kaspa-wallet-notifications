import express, { Request, Response } from 'express';
import { Client, GatewayIntentBits, Partials, TextChannel } from 'discord.js';
import { pollWalletAddress } from './poll-wallet-address';

const PORT = process.env.PORT || 8080;
const app = express();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

// Create the bot
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Channel]
});

let channel: TextChannel;

try {
  client.login(DISCORD_BOT_TOKEN);
} catch (err) {
  console.log(`Error logging in with Discord token: ${err}`);
}

client.on('ready', (client): void => {
  channel = client.channels.cache.get(
    DISCORD_CHANNEL_ID as string
  ) as TextChannel;
  if (channel) {
    pollWalletAddress(channel);
  } else {
    console.log(
      `Error getting Discord channel. Is your DISCORD_CHANNEL_ID correct?`
    );
  }
});

app.get('/', (req: Request, res: Response): void => {
  res.send(`Listening for wallet address updates...`);
});

app.listen(PORT, (): void => {
  console.log(`app running on port ${PORT}`);
});
