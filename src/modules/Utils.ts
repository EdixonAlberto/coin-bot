// import uuid from 'unique-string';
import { createHmac } from 'crypto';
import { getServerTime } from '../routes';

namespace Utils {
  export class Time {
    public static current(presicion: boolean = false) {
      const date: Date = new Date();

      let timeUnix: number = date.getTime();
      timeUnix = presicion ? timeUnix : Math.round(timeUnix / 1000);

      const currentTime = {
        unix: timeUnix,
        utc: date.toISOString()
      };

      return currentTime;
    }
  }

  // export class Uuid {
  //   public static create(type: 'code' | 'id') {
  //     const _uuid = uuid();
  //     const id = type === 'code' ? _uuid.substr(0, 6) : _uuid;

  //     return id;
  //   }
  // }

  export class Float {
    public static convert(nro: number | string, decimalsQty: number): string {
      const float: number = typeof nro === 'string' ? Number.parseFloat(nro) : nro;
      return float.toFixed(decimalsQty);
    }
  }

  export class Security {
    public static signature(secret: string, query: string): string {
      const signature = createHmac('sha256', secret)
        .update(query) // TODO: Esta variable deberia llamarce "query" o "data" ?
        .digest('hex');

      return signature;
    }
  }

  export class General {
    public static makeQueryString(queryObj: { [key: string]: string | number }): string {
      const valuesList: string[] = Object.keys(queryObj);

      const queryList: string[] | undefined = valuesList.reduce(
        (queryList: string[] = [], key: string) => {
          const queryValue = queryObj[key];

          if (queryValue !== undefined) {
            const param = `${key}=${encodeURIComponent(queryValue)}`;
            queryList.push(param);

            return queryList;
          }
        },
        []
      );

      const queryString = queryList?.join('&') || '';

      return queryString;
    }
  }
}

export default Utils;
