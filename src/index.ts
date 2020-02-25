import { Client, Message } from 'discord.js';
import config from './config';
import ControllerCommand from './ControllerCommand';

const bot = new Client();

bot.on('ready', () => {
  console.log('CoinBot -> ON');
});

bot.on('message', (message: Message) => {
  ControllerCommand(message);
});

bot.login(config.token);
