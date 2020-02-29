import Bot from './Bot';
import config from './config';

const bot = new Bot({
  prefix: '$',
  token: config.token
});

bot.start();
