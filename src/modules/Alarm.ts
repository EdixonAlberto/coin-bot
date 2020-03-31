import BotResponse from './BotResponse';
import { getPrice } from '../routes';
import Utils from './Utils';
import { colorsList } from '../enumerations';

/* CONFIG */
const ALARM_INTERVAL: number = config.alarmInterval; // Interval in second
const DEFAULT_ASSET: string = 'BTC';

class Alarm {
  private sign: TSign;
  private asset: TAsset;
  private price: number;

  constructor(private ecuation: Array<string>, private response: BotResponse) {
    this.asset = (ecuation[0] || DEFAULT_ASSET).toUpperCase() as TAsset;
    this.sign = ecuation[1] as TSign;
    this.price = Number(ecuation[2]);
  }

  private async alarmActive(): Promise<TActive> {
    const exchangePrice = await getPrice(this.asset);

    if (config.modeDebug) console.log('Price = ' + exchangePrice);
    let alarmActive: boolean = false;

    switch (this.sign) {
      case '>':
        if (exchangePrice >= this.price) alarmActive = true;
        break;

      case '=':
        if (exchangePrice == this.price) alarmActive = true;
        break;

      case '<':
        if (exchangePrice <= this.price) alarmActive = true;
        break;
    }

    return {
      activated: alarmActive,
      exchangePrice
    };
  }

  public async create(): Promise<TAlarm | undefined> {
    try {
      if (['>', '=', '<'].includes(this.sign)) {
        const alarm: TActive = await this.alarmActive();

        if (alarm.activated) {
          this.response.embeded({
            header: 'ALARMA',
            title: 'Error al activar la alarma',
            detail:
              'El precio introducido ya coincide con la condición\n' +
              `Precio del ${this.asset} = **${alarm.exchangePrice} $**`,
            color: '#ED1C24'
          });
        } else {
          // TODO: abstraer price monitor

          const priceMonitor = setInterval(async () => {
            const alarm: TActive = await this.alarmActive();

            if (alarm.activated) {
              this.response.direct(''); // TODO: Mension directa al autor del msj (provicional)

              this.response.embeded({
                header: 'ALARMA',
                title: `Alarma ${'id'} activada`,
                detail: `Precio del ${this.asset} = **${alarm.exchangePrice} $**`,
                color: colorsList.ok
              });
              clearInterval(priceMonitor);
            }
          }, ALARM_INTERVAL);

          return {
            id: Utils.Uuid.create('code'),
            price: this.price,
            createDate: Utils.Time.current().utc
          };
        }
        // TODO: Cambiar por un id corto que indentifique la alarma activada
        // y guardarla usando redux
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

  // TODO: Creo que este metodo crea una abstraccion innesesaria
  public async list(): Promise<TAlarm[] | undefined> {
    try {
      const alarmList = (await global.store.index('alarmList')) as TAlarm[];
      return alarmList;
    } catch (error) {
      console.error('ERROR-ALARM-LIST ->', error.message);
    }
  }
}

export default Alarm;
