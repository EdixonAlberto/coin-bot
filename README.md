# <p style="display: inline; font-size: 29px;"><img src="./docs/coin-bot-avatar-v1.png" alt="coin-bot-avatar" width="60"> CoinBot</p>

[![Linkedin: https://linkedin.com/in/edixonalberto](https://img.shields.io/badge/author-EdixonAlberto-purple.svg)](https://linkedin.com/in/edixonalberto)
[![MIT license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE.md)
![GitHub](https://img.shields.io/github/followers/EdixonAlberto.svg?label=Follow&style=social)

Discord bot to manager cryptocurrencies in binance exchange.

### Get Started

Crete file `development.env` in folder: `/.env` and add el environment: **DISCORD_TOKEN**.

```sh
cp .env/template.env .env/development.env
```

Install dependencies and start.

```sh
yarn install

yarn run start:dev # to develop

yarn run start:prod # to production
```

The command and `yarn start` is reserved to heroku.

The bot command list in discord can be found [HERE](./src/enumerations.ts).

### Screenshots

![image](./docs/chat-discord.png)
