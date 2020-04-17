import BotResponse from '../modules/BotResponse';
import Alarm from '../modules/Alarm';
import { colorsList } from '../enumerations';

/* CONFIG */
const ALARM_INTERVAL: number = config.alarmInterval; // Interval in second

export const alarmMonitor = (response: BotResponse) => {
  setInterval(() => {
    const alarms = global.store.index('alarms') as TAlarm[];

    if (alarms.length > 0) {
      alarms.forEach(async (alarm: TAlarm) => {
        const alarmActived = await Alarm.checkActivation(alarm);

        if (alarmActived) {
          response.direct(''); // TODO: Mension directa al autor del msj (provicional)

          response.embeded({
            header: 'ALARMA',
            title: `Alarma ${'id'} activada`,
            detail: `Precio del ${alarm.asset} = **${alarmActived.exchangePrice} $**`,
            color: colorsList.ok
          });
        }
      });
    }
  }, ALARM_INTERVAL);
};
