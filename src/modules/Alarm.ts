import BotResponse from './BotResponse';
import { getPrice } from '../routes';
import Utils from './Utils';
import { colorsList } from '../enumerations';

/* CONFIG */
const DEFAULT_ASSET: string = 'BTC';

class Alarm {
  private alarmData: TAlarm;

  constructor(private ecuation: Array<string>, private response: BotResponse) {
    this.alarmData = {
      id: '',
      asset: (ecuation[0] || DEFAULT_ASSET).toUpperCase() as TAsset,
      sign: ecuation[1] as TSign,
      price: Number(ecuation[2]),
      createDate: ''
    };
  }

  public static async checkActivation({
    asset,
    sign,
    price
  }: TAlarm): Promise<TActive | undefined> {
    const exchangePrice = await getPrice(asset);

    if (config.modeDebug) console.log('Price = ' + exchangePrice);
    let alarmActive: boolean = false;

    switch (sign) {
      case '>':
        if (exchangePrice >= price) alarmActive = true;
        break;

      case '=':
        if (exchangePrice == price) alarmActive = true;
        break;

      case '<':
        if (exchangePrice <= price) alarmActive = true;
        break;
    }

    if (alarmActive) return { exchangePrice };
  }

  public static alarm2embed(alarms: TAlarm[]): TTable {
    let rowId = '';
    let rowPrice = '';
    let rowDate = '';

    alarms.forEach((alarm: TAlarm) => {
      rowId += `${alarm.id}\n`;
      rowPrice += `${alarm.asset} ${alarm.sign} ${alarm.price}\n`;
      rowDate += `${alarm.createDate}\n`;
    });

    return [
      {
        title: 'ID',
        content: rowId,
        fieldType: 'column'
      },
      {
        title: 'Condición',
        content: rowPrice,
        fieldType: 'column'
      },
      {
        title: 'Fecha',
        content: rowDate,
        fieldType: 'column'
      }
    ];
  }

  public async create(): Promise<TAlarm | undefined> {
    try {
      if (['>', '=', '<'].includes(this.alarmData.sign)) {
        const alarmActived = await Alarm.checkActivation(this.alarmData);

        if (!alarmActived) {
          const alarms = global.store.index('alarms') as TAlarm[];
          const alarmFound = alarms?.find(
            (alarm: TAlarm) => alarm.price === this.alarmData.price
          );

          if (!alarmFound) {
            return {
              ...this.alarmData,
              id: Utils.Uuid.create('code'),
              createDate: Utils.Time.current().iso8601
            };
          } else {
            this.response.embeded({
              header: 'ALARMA',
              title: 'Error al activar la alarma',
              detail: `La alarma ya existe/n${alarmFound}`,
              color: colorsList.error
            });
          }
        } else {
          this.response.embeded({
            header: 'ALARMA',
            title: 'Error al activar la alarma',
            detail:
              'El precio introducido ya coincide con la condición\n' +
              `Precio del ${this.alarmData.asset} = **${alarmActived.exchangePrice} $**`,
            color: colorsList.error
          });
        }
      } else {
        this.response.embeded({
          header: 'ALARM',
          title: 'Signo Incorrecto',
          detail: `Signos de comparación disponibles: \`>, =, <\``,
          color: colorsList.error
        });
      }
    } catch (error) {
      console.error('>> ERROR-ALARM ->', error.message);
    }
  }
}

export default Alarm;
