import { Message } from 'discord.js';
import { commandsList } from '../enumerations';
import BotResponse from '../modules/BotResponse';

export const ping = (content: TContent, response: BotResponse): void => {
  if (content.command === commandsList.ping) {
    response.general('Pong! 🏓');
  }
};

export const date = (content: TContent, response: BotResponse): void => {
  if (content.command === commandsList.date) {
    const date = new Date();
    response.general(date.getUTCDate() + '/' + date.getDay() + '/' + date.getFullYear());
  }
};

export const clean = async (content: TContent, response: BotResponse): Promise<void> => {
  // TODO: Verificar si se necesita una respuesta
  if (content.command === commandsList.clean) {
    try {
      const server: Message = content.message();
      const messages = await server.channel.messages.fetch();
      await server.channel.bulkDelete(messages);
    } catch (error) {
      console.error(`ERROR: ${content.command} >> ${error}`);
    }
  }
};

/* Boilerplate */
// export const /* functionName */ = async (
//     content: TContent,
//     response: BotResponse
//   ): Promise<void> => {
//     if (content.command === commandsList. /* command */) {
//       try {
//       } catch {

//       }
//     }
//   };
