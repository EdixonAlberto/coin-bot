import BotResponse from '../modules/BotResponse';
import { getPrice } from '../routes';
import { commandsList } from '../enumerations';

const ALARM_INTERVAL: number = config.alarmInterval; // Interval in second

const priceResponse = (asset: string, price: number, res: BotResponse): void => {
  res.general(`Precio del ${asset} = **${price}** $`);
};

export const price = async (content: TContent, response: BotResponse): Promise<void> => {
  if (content.command === commandsList.price) {
    try {
      let asset: string = content.params[0];
      asset = (asset || 'btc').toUpperCase();

      const priceNow: number = await getPrice(asset);

      response.general(`Precio del ${asset} = **${priceNow}** $`);
    } catch (error) {
      console.log('>> PRICE -> ' + error);
    }
  }
};

export const alarm = async (content: TContent, response: BotResponse): Promise<void> => {
  // TODO: Validar multiples alarmas llevando un registro de las mismas en una DB
  if (content.command === commandsList.alarm) {
    const ecuation: Array<string> = content.params;

    const asset: string = ecuation[0].toUpperCase();
    const sign: string = ecuation[1];
    const price: number = Number(ecuation[2]);

    let exchangePrice: number = await getPrice(asset);
    console.log('Price = ' + exchangePrice);

    const priceMonitor = setInterval(async () => {
      exchangePrice = await getPrice(asset);
      console.log('Price = ' + exchangePrice);

      switch (sign) {
        case '>':
          if (exchangePrice >= price) {
            priceResponse(asset, price, response);
            clearInterval(priceMonitor);
          }
          break;

        case '=':
          if (exchangePrice == price) {
            priceResponse(asset, price, response);
            clearInterval(priceMonitor);
          }
          break;

        case '<':
          if (exchangePrice <= price) {
            priceResponse(asset, price, response);
            clearInterval(priceMonitor);
          }
          break;
      }
    }, ALARM_INTERVAL);

    response.general(`OK yo te aviso! 👍`);
  }
};
