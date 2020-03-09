import { Message, MessageEmbed } from 'discord.js';

class BotResponse {
  private response: Message;

  constructor(message: Message) {
    this.response = message;
  }

  public embeded({ header, title, detail, footer = '', color = '' }: TEmbed): void {
    const embed = new MessageEmbed();
    embed
      .setAuthor(header)
      .setTitle(title)
      .setFooter(footer)
      .setColor(color);

    if (typeof detail === 'string') embed.setDescription(detail);
    else {
      const fields = detail.map((field: TField) => {
        return {
          name: field.title,
          value: field.content,
          inline: true
        };
      });
      embed.addFields(fields);
    }
    this.response.channel.send(embed);
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
