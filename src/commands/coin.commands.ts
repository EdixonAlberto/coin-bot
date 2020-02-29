import BotResponse from '../modules/BotResponse';
import { getPrice } from '../routes';

export const price = async (content: TContent, response: BotResponse) => {
  let asset: string = content.params[0];
  asset = asset ? content.params[0].toUpperCase() : 'BTC';

  const priceNow: number = await getPrice(asset);

  response.general(`Precio del ${asset}: ${priceNow}$`);
};
