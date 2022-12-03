# kaspa-wallet-notifications

TypeScript NodeJS application to query the Kaspa blockchain's public REST server and notify the designated wallet holder that their balance has changed via Discord text channel notifications

### Software requirements

Make sure NodeJS and the Yarn package manager are installed on your machine.
https://nodejs.org/en/
https://classic.yarnpkg.com/lang/en/docs/install

### Discord requirements

- Your own Discord server
- A text channel created within your server for your bot to write to (you will need the ID from this which you can get from turning on the developer setting in Discord then right clicking the channel)
- A Discord application and bot created at https://discord.com/developers/applications - I called mine kaspa-wallet-notifications

### Setup

Create a `.env` file and copy/paste the contents of `.env.sample` into it to get started.
The intention is for you to populate `KASPA_WALLET_ADDRESS`, `DISCORD_BOT_TOKEN`, and `DISCORD_CHANNEL_ID` with your own values.

`DISCORD_BOT_TOKEN` is the token from your application at https://discord.com/developers/applications -> your app in the Bot tab.
`DISCORD_CHANNEL_ID` requires right clicking the text channel you intend to use your bot and copying the ID.

### Starting the Application

`yarn install` to install dependencies
`yarn dev` to run the server

If all of the `.env` file parameters are populated correctly, you should see logs related to your KAS balance in your console. If a transaction occurs that changes your balance, your Discord channel should receive a message saying so. If that amount matches the current block reward, the app will assume you've solo mined a block and will give that detail.

![image](https://user-images.githubusercontent.com/25968605/205409623-421c088b-7617-48cd-a34b-12d30c445767.png)

![image](https://user-images.githubusercontent.com/25968605/205423190-cce93614-71f1-4c25-8383-bcd71b4e625c.png)
