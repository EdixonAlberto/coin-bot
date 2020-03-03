import { Message } from 'discord.js';

class BotResponse {
  private response: Message;

  constructor(message: Message) {
    this.response = message;
  }

  public general(response: string): void {
    this.response.channel.send(response, {
      code: false
    });
  }

  public direct(response: string): void {
    this.response.reply(response, {
      code: false
    });
  }
}

export default BotResponse;
