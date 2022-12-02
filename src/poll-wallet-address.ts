import axios, { AxiosResponse } from 'axios';
import { sendDiscordChannelMessage } from './helpers';
import { TextChannel } from 'discord.js';

const FIVE_MINUTES = 300000;
const KASPA_WALLET_ADDRESS = process.env.KASPA_WALLET_ADDRESS;

const queryForTransaction = async (channel: TextChannel) => {
  let cachedBalanceInKAS: number = 0;
  console.log('querying wallet...');

  try {
    const {
      data: { balance }
    }: AxiosResponse<{ balance: number }> = await axios.get(
      `https://api.kaspa.org/addresses/${KASPA_WALLET_ADDRESS}/balance`
    );
    const { data: blockReward }: AxiosResponse<string> = await axios.get(
      `https://api.kaspa.org/info/blockreward?stringOnly=true`
    );
    const currentBalanceInKAS = balance / 100000000;
    const CURRENT_BALANCE_MSG = `Current KAS balance: ${currentBalanceInKAS}`;
    console.log(CURRENT_BALANCE_MSG);

    if (
      cachedBalanceInKAS !== 0 &&
      cachedBalanceInKAS !== currentBalanceInKAS
    ) {
      const differenceInKAS: number = currentBalanceInKAS - cachedBalanceInKAS;
      const TRANSACTION_OCCURED_MSG = `${
        differenceInKAS === Number(blockReward)
          ? 'Block mined!'
          : 'Transaction occurred!'
      }  Wallet balance modified by a difference in ${differenceInKAS} KAS.`;
      console.log(TRANSACTION_OCCURED_MSG);

      sendDiscordChannelMessage(channel, TRANSACTION_OCCURED_MSG);
      sendDiscordChannelMessage(channel, CURRENT_BALANCE_MSG);
    }
    cachedBalanceInKAS = currentBalanceInKAS;
  } catch (err) {
    const ERROR_MSG = `Error occured when querying wallet address: ${err}`;
    console.log(ERROR_MSG);
  }
};

export const pollWalletAddress = (channel: TextChannel): void => {
  queryForTransaction(channel);
  console.log(
    `checking wallet for transactions every ${Math.floor(
      FIVE_MINUTES / 1000 / 60
    )} minutes...`
  );
  setInterval(async () => {
    queryForTransaction(channel);
  }, FIVE_MINUTES);
};
