# Discord Hook Debouncer

This utility is a concept tool to handle and group a constant stream of events

## Motivation

Discord API Imposes a limit on how many messages per second can be sent. Many event sources, can overload that limit (for example a GIT/SVN Hook)

To overcome this limitation I've built this small bot, that handles the events, and groups them in a single message

## Libraries

This project is written in Typescript, and takes advantage of the following libs:

* RxJs
* discord.js
* Express
* dotenv

## Requirements

* Node.js LTS (Tested with Node 14)
* A Discord BOT API [(basic tutorial here)](https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js)

## How To Use

In order to use this bot, you have to build it first

```bash
git clone https://github.com/Sherpard/discord-hook-debounce.git
npm install
npm run build
```

Once the project is built, you'll find the transpiled files on the `dist/` folder

After that, you need to set the required enviroment variables (.env file is supported)

```properties
BOT_TOKEN=Your-Secret-Bot-Token
GUILD_ID=The Guild where your bot is invited
CHANNEL=Name of the channel where the bot will publish
DEBOUNCE_DELAY= Delay in miliseconds until bot start processing received messages (Default 1000)
```

After this, you can run the bot directly with node

`node dist/index.js`
