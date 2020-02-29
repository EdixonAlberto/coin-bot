import axios from 'axios';
import { Message } from 'discord.js';
import { commandsList } from 'enumerations';
import Response from 'modules/BotResponse';

export const ip = async (data: Message['content'], response: Response) => {
  if (data === commandsList.ip) {
    try {
      const res = await axios.get('https://ipinfo.io');
      const ipinfo: ipinfo = res.data;
      response.general(`Esta es tu ip pública: ${ipinfo.ip}`);
    } catch (error) {
      console.error(error);
    }
  }
};

export const date = (data: any) => {};
