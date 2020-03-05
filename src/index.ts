import Bot from './Bot';

const bot = new Bot({
  prefix: '$',
  token: config.token
});

bot.start();
