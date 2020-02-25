import axios from 'axios';
import { Message } from 'discord.js';
import config from './config';
import { comands } from './enumerations';

export default async function ControllerCommand(message: Message) {
  console.log('>> ' + message.content);

  const words = message.content.split(' ');
  const content = {
    prefix: message.content.substr(0, 1),
    comand: message.content.substr(1, words[0].length - 1),
    param: words[1]
  };

  if (content.prefix === config.prefix) {
    switch (content.comand) {
      case comands.ping:
        message.channel.send('🚀 pong');
        break;

      case comands.date:
        const date = new Date();
        message.channel.send(
          date.getUTCDate() + '/' + date.getDay() + '/' + date.getFullYear()
        );
        break;

      case comands.ip:
        try {
          const res = await axios.get('https://ipinfo.io');
          const ipinfo: ipinfo = res.data;

          message.reply(`Esta es tu ip pública: ${ipinfo.ip}`, {
            code: true
          });
        } catch (error) {
          console.error(error);
        }

        break;

      case comands.price:
        const coin = content.param.toUpperCase();
        console.log(coin);

        try {
          const res = await axios.get(
            `https://api.binance.com/api/v3/ticker/price?symbol=${coin}USDT`
          );
          const price = Number(res.data.price).toFixed(2);
          message.channel.send(`Precio del ${coin}: ${price}$`, {
            code: true
          });
        } catch (error) {
          console.error(error);
        }
        break;

      case comands.clean:
        const messages = await message.channel.fetchMessages();
        await message.channel.bulkDelete(messages);
        break;

      default:
        message.channel.send('Comand Incorrect 😝');
        break;
    }
  }
}
