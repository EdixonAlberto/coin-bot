import { Message } from 'discord.js';
import BotResponse from '../modules/BotResponse';

export const ping = (content: TContent, response: BotResponse): void => {
  response.general('Pong! 🏓');
};

export const date = (content: TContent, response: BotResponse): void => {
  const date = new Date();
  response.general(date.getUTCDate() + '/' + date.getDay() + '/' + date.getFullYear());
};

export const clean = async (content: TContent, response: BotResponse): Promise<void> => {
  const server: Message = content.message();
  const messages = await server.channel.messages.fetch();
  try {
    await server.channel.bulkDelete(messages);
    // TODO: Verificar si se necesita una respuesta
  } catch (error) {
    console.error(`>> ERROR-${content.command.toUpperCase()} -> ${error}`);
  }
};

export const setting = async (
  content: TContent,
  response: BotResponse
): Promise<void> => {
  try {
  } catch (error) {
    console.error(`>> ERROR-${content.command.toUpperCase()} -> ${error}`);
  }
};

/* Boilerplate */
// export const /* functionName */ = async (
//   content: TContent,
//   response: BotResponse
// ): Promise<void> => {
//   try {
//   } catch(error) {
//     console.error(`>> ERROR-${content.command.toUpperCase()} -> ${error}`);
//   }
// };
