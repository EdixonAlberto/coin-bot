import Bot from './Bot';

const bot = new Bot({
  prefix: '$',
  token: config.discordToken
});

bot.start();
