// import uuid from 'unique-string';

namespace Utils {
  class Time {}

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
}

export default Utils;
