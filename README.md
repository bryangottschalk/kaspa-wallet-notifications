# kaspa-wallet-notifications

A NodeJS application to query the Kaspa blockchain and notify the designated wallet holder that their transactions have been updated via Discord notifications

### Software requirements
Make sure NodeJS and the yarn package manager are installed on your machine. <br/> <br/>
https://nodejs.org/en/ <br/>
https://classic.yarnpkg.com/lang/en/docs/install

### Setup 

Create a `.env` file with the populated contents of `.env.sample` to get started. 

You will have to create a Discord bot to get the `DISCORD_BOT_TOKEN`/ API key, and create a channel for your wallet notifications to be written to - which you can right click to get the value of `DISCORD_CHANNEL_ID`.

To start the application, install dependencies via `yarn install`, then `yarn dev` to run the server. If all of the `.env` file parameters are populated correctly, you should see some logs related to your KAS balance in your console. If a transaction occurs that changes your balance, your discord channel should receive a message saying so.

![image](https://user-images.githubusercontent.com/25968605/205376748-f4b58de5-a459-411b-84c2-a618f231bce9.png)

![image](https://user-images.githubusercontent.com/25968605/205376629-7907980a-2590-44de-916a-b59add08a2f4.png)

