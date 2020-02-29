import { Message } from 'discord.js';

class BotResponse {
  private response: Message;
  // private code: boolean;

  constructor(message: Message) {
    this.response = message;
    // this.code = code;
  }

  public general(response: string) {
    this.response.channel.send(response, {
      code: false
    });
  }

  public direct(response: string) {
    this.response.reply(response, {
      code: false
    });
  }
}

export default BotResponse;
