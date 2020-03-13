import { Client, Message } from 'discord.js';
import BotResponse from './modules/BotResponse';
import MessageProcessor from './modules/MessageProcessor';
import * as Command from './commands';
import { commandsList } from './enumerations';

class Bot {
  private static client: Client;
  private static options: TOptions;

  constructor(_options: TOptions) {
    Bot.options = _options;
    Bot.client = new Client(); // TODO: agregar mas opciones de configuracion
    this.event();
  }

  public start(): void {
    Bot.client.login(Bot.options.token);
  }

  private event(): void {
    Bot.client.on('ready', () => console.log('>> BOT -> OK'));
    Bot.client.on('message', (message: Message) => {
      const { content } = new MessageProcessor(message);
      const response: BotResponse = new BotResponse(message);
      this.commands(content, response);
    });
  }

  private commands(content: TContent, response: BotResponse): void {
    if (content.prefix === Bot.options.prefix) {
      if (config.modeDebug) console.log('>> CONTENT -> ' + JSON.stringify(content));

      if (commandsList[content.command]) {
        // Tools
        Command.ping(content, response);
        Command.date(content, response);
        Command.clean(content, response);

        // Coins
        Command.price(content, response);
        Command.alarm(content, response);
        Command.orderbook(content, response);

        // Account
        Command.balance(content, response);
      } else {
        response.general('Comando Incorrecto 😝');
        console.log('>> COMMAND -> Incorrect');
      }
    }
  }
}

export default Bot;
