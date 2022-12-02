import { TextChannel } from 'discord.js';

export const sendDiscordChannelMessage = (
  channel: TextChannel,
  msg: string
): void => {
  try {
    channel.send(msg);
  } catch (err) {
    const ERROR_MSG = `Error occured when sending message to Discord channel: ${err}`;
    console.log(ERROR_MSG);
  }
};
