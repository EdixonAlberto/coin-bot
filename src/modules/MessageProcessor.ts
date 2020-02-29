import { Message } from 'discord.js';

class MessageProcessor {
  private _content: any;

  constructor(message: Message) {
    this._content = {};
    this.contentExtract(message);
  }

  contentExtract(message: Message) {
    const words = message.content.split(' ');
    const prefixComand: string = words.shift() || '';

    this._content = {
      prefix: message.content.substr(0, 1),
      comand: prefixComand.substr(1),
      params: words
    };
  }

  public get content() {
    return this._content;
  }
}

export default MessageProcessor;
