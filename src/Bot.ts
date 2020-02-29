import { Client, Message } from 'discord.js';
import * as Command from './commands';
import MessageProcessor from './modules/MessageProcessor';
import Response from './modules/BotResponse';

class Bot {
  private static client: Client;
  private static options: TOptions;

  constructor(options: TOptions) {
    Bot.options = options;
    Bot.client = new Client(); // TODO: agregar mas opciones de configuracion
    this.event();
  }

  public start() {
    Bot.client.login(Bot.options.token);
  }

  private event() {
    console.log('event');

    Bot.client.on('ready', () => console.log('CoinBot -> ON'));
    Bot.client.on('message', (message: Message) => {
      console.log('>> ' + message.content);

      const { content } = new MessageProcessor(message);
      const response = new Response(message);
      this.commands(content, response);
    });
  }

  private commands(content: any, response: Response) {
    console.log(content);
    if (content.prefix === Bot.options.prefix) {
      // Command.ip(content, response);
      // Command.date(content response);
      Command.price(content, response);
    } else {
      console.log('error');
    }
  }
}

export default Bot;
