import BotResponse from '../modules/BotResponse';
import Utils from '../modules/Utils';
import { getOrderBook, getPrice } from '../routes';
import { colorsList } from '../enumerations';
import Alarm from '../modules/Alarm';

/* CONFIG */
const DEFAULT_LIMIT: number = 5;
const DECIMAL_QTY: number = 2;
const HIGH_QTY: number = 0.1;
const DEFAULT_ASSET: string = 'BTC';

export const price = async (content: TContent, response: BotResponse): Promise<void> => {
  const asset = (content.params[0] || DEFAULT_ASSET).toUpperCase() as TAsset;

  try {
    const exchangePrice = await getPrice(asset);

    response.general(`Precio del ${asset} = **${exchangePrice} $**`);
  } catch (error) {
    console.error('>> ERROR-PRICE ->', error.response?.data);
  }
};

export const alarm = async (content: TContent, response: BotResponse): Promise<void> => {
  const action: string | undefined = content.params.shift(); // deleting from firts parameter

  switch (action) {
    case 'create':
      const alarm = new Alarm(content.params, response);
      const newAlarm = await alarm.create();

      if (newAlarm) {
        const alarmSaved = (await global.store.add('alarms', newAlarm)) as
          | TAlarm[]
          | undefined;

        if (alarmSaved) {
          const alarmsTable = Alarm.alarm2embed(alarmSaved);

          response.embeded({
            header: 'ALARMA',
            title: 'Alarma Creada',
            detail: alarmsTable,
            color: colorsList.ok
          });
        }
      }
      break;

    case 'list':
      const alarms = global.store.index('alarms') as TAlarm[] | undefined;

      if (alarms?.length) {
        const alarmsTable = Alarm.alarm2embed(alarms);

        response.embeded({
          header: 'ALARMA',
          title: 'Lista de Alarmas Creadas',
          detail: alarmsTable
        });
      } else {
        response.embeded({
          header: 'ALARMA',
          title: '',
          detail: 'La lista de alarmas está vacía'
        });
      }
      break;

    case 'update':
      break;

    case 'delete':
      const alarmID = content.params[0] as string;

      if (alarmID === 'all') {
        // FIXME: no se eliminan todas las alarmas
        // const alarms = global.store.index('alarms') as TAlarm[] | undefined;
        // if (alarms?.length) {
        //   alarms.map(async (alarm: TAlarm) => {
        //     const result = (await global.store.destroy('alarms', {
        //       id: alarm.id
        //     })) as TAlarm[] | undefined;
        //     console.log(result?.[0]?.id);
        //   });
        //   response.embeded({
        //     header: 'ALARMA',
        //     title: '',
        //     detail: 'Se eliminaron todas las alarmas',
        //     color: colorsList.ok
        //   });
        // }
      } else {
        const alarmDeleted = (await global.store.destroy('alarms', {
          id: alarmID
        })) as TAlarm[] | undefined;

        if (alarmDeleted) {
          const alarmsTable = Alarm.alarm2embed(alarmDeleted);

          if (alarmDeleted?.length) {
            response.embeded({
              header: 'ALARMA',
              title: `Alarma Eliminada`,
              detail: alarmsTable,
              color: colorsList.ok
            });
          } else {
            response.embeded({
              header: 'ALARMA',
              title: '',
              detail: 'La lista de alarmas está vacía',
              color: colorsList.error
            });
          }
        }
      }
      break;
    default:
      response.embeded({
        header: 'ALARM',
        title: 'Error al establecer la alarma',
        detail:
          'Ninguna acción establecida\n' +
          'Lista de acciones: `create`, `list`, `update`, `delete`',
        color: colorsList.error
      });
      break;
  }
};

export const orderbook = async (
  content: TContent,
  response: BotResponse
): Promise<void> => {
  const asset = (content.params[0] || DEFAULT_ASSET).toUpperCase() as TAsset;
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
      color: colorsList.error
    });
  } catch (error) {
    console.error('>> ERROR-ORDERBOOK ->', error.response?.data);
  }
};
