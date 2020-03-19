import { commandsList } from '../enumerations';
import BotResponse from '../modules/BotResponse';
import Utils from '../modules/Utils';
import { getOrderBook, getPrice } from '../routes';

/* CONFIG */
const ALARM_INTERVAL: number = config.alarmInterval; // Interval in second
const DEFAULT_LIMIT: number = 5;
const DECIMAL_QTY: number = 2;
const HIGH_QTY: number = 0.1;

export const price = async (content: TContent, response: BotResponse): Promise<void> => {
  if (content.command === commandsList.price) {
    try {
      const asset = (content.params[0] || 'btc').toUpperCase() as TAsset;

      const exchangePrice: number = await getPrice(asset);

      response.general(`Precio del ${asset} = **${exchangePrice} $**`);
    } catch (error) {
      console.error(`>> ERROR-${content.command.toUpperCase()} -> ${error}`);
    }
  }
};

export const alarm = async (content: TContent, response: BotResponse): Promise<void> => {
  // TODO: Validar multiples alarmas llevando un registro de las mismas en una DB
  if (content.command === commandsList.alarm) {
    const ecuation: Array<string> = content.params;
    const sign: string = ecuation[1];

    if (['>', '=', '<'].includes(sign)) {
      const asset: string = ecuation[0].toUpperCase();
      const price: number = Number(ecuation[2]);
      let alarmaActive: boolean = false;

      try {
        let exchangePrice: number = await getPrice(asset);
        if (config.modeDebug) console.log('Price = ' + exchangePrice);

        // TODO: abstraer price monitor
        const priceMonitor = setInterval(async () => {
          exchangePrice = await getPrice(asset);
          if (config.modeDebug) console.log('Price = ' + exchangePrice);

          switch (sign) {
            case '>':
              if (exchangePrice >= price) alarmaActive = true;
              break;

            case '=':
              if (exchangePrice == price) alarmaActive = true;
              break;

            case '<':
              if (exchangePrice <= price) alarmaActive = true;
              break;
          }

          if (alarmaActive) {
            response.direct(''); // TODO: Mension directa al autor del msj (provicional)

            response.embeded({
              header: 'ALARMA',
              title: `Alarma ${'id'} activada`,
              detail: `Precio del ${asset} = **${exchangePrice} $**`,
              color: 'green'
            });
            clearInterval(priceMonitor);
          }
        }, ALARM_INTERVAL);
      } catch (error) {
        console.error(`>> ERROR-${content.command.toUpperCase()} -> ${error}`);
      }
      // TODO: Cambiar por un id corto que indentifique la alarma activada
      // y guardarla usando redux
      response.general(`OK yo te aviso! 👍`);
    } else {
      response.embeded({
        header: 'ALARM',
        title: 'Signo Incorrecto',
        detail: `Solo los siguientes signos de comparación estan disponible: \`>, =, <\``,
        color: '0xff0000'
      });
    }
  }
};

export const orderbook = async (
  content: TContent,
  response: BotResponse
): Promise<void> => {
  if (content.command === commandsList.orderbook) {
    const asset: string = (content.params[0] || 'btc').toUpperCase();
    const limit: number = Number(content.params[1] || DEFAULT_LIMIT);

    try {
      const orderbook: TOrderBook = await getOrderBook(asset, limit);

      let bestOrderBid = '';
      let bestOrderAsk = '';

      ['bids', 'asks'].map((_bestOrder: string) => {
        const bestOrder = _bestOrder as 'bids' | 'asks';
        const bestOrderList = orderbook[bestOrder];

        for (let index = 0; index < bestOrderList.length; index++) {
          let price: string = bestOrderList[index].price;
          price = Utils.Float.convert(price, DECIMAL_QTY);

          let qty: string = bestOrderList[index].qty;
          qty = Number(qty) >= HIGH_QTY ? `__${qty}__` : qty;

          const formatPriceQty: string = `${price} $ - ${qty} ${asset}\n`;

          if (bestOrder === 'bids') bestOrderBid += formatPriceQty;
          else bestOrderAsk += formatPriceQty;
        }
      });

      const fieldType: TField['fieldType'] = 'column';

      response.embeded({
        header: 'ORDERBOOK',
        title: `Los mejores precio/cantidad en el libro de ordenes para ${asset}`,
        detail: [
          {
            title: 'Bids',
            content: bestOrderBid,
            fieldType
          },
          {
            title: 'Asks',
            content: bestOrderAsk,
            fieldType
          }
        ],
        color: '#FF5733'
      });
    } catch (error) {
      console.error(`>> ERROR-${content.command.toUpperCase()} -> ${error}`);
    }
  }
};
