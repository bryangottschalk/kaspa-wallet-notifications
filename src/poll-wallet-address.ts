import axios, { AxiosResponse } from 'axios';
import { sendDiscordChannelMessage } from './helpers';
import { TextChannel } from 'discord.js';

const KASPA_PUBLIC_API = 'https://api.kaspa.org';
const FIVE_MINUTES = 300000;
const KASPA_WALLET_ADDRESS = process.env.KASPA_WALLET_ADDRESS;

const setIntervalImmediately = (func: Function, interval: number) => {
  func();
  return setInterval(func, interval);
};

export const pollWalletAddress = async (channel: TextChannel) => {
  let cachedBalanceInKAS: number = 0;
  setIntervalImmediately(async () => {
    try {
      console.log('querying wallet...');
      const {
        data: { balance }
      }: AxiosResponse<{ balance: number }> = await axios.get(
        `${KASPA_PUBLIC_API}/addresses/${KASPA_WALLET_ADDRESS}/balance`
      );

      const { data: blockReward }: AxiosResponse<string> = await axios.get(
        `${KASPA_PUBLIC_API}/info/blockreward?stringOnly=true`
      );
      const roundedBlockReward: number = Math.round(Number(blockReward));

      const currentBalanceInKAS = balance / 100000000;
      const CURRENT_BALANCE_MSG = `Current KAS balance: ${currentBalanceInKAS}`;
      console.log(CURRENT_BALANCE_MSG);

      if (
        cachedBalanceInKAS !== 0 &&
        cachedBalanceInKAS !== currentBalanceInKAS
      ) {
        const differenceInKAS = currentBalanceInKAS - cachedBalanceInKAS;
        const roundedDifferenceInKAS = Math.round(differenceInKAS);
        const TRANSACTION_OCCURED_MSG = `${
          roundedDifferenceInKAS === roundedBlockReward
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
  }, FIVE_MINUTES);
};
