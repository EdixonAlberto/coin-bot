import Utils from './Utils';
// import { getServerTime } from '../routes';

class DataForRequest {
  public static async prepare(recvWindow: number = 5000): Promise<TDataRequest> {
    const timestamp = Utils.Time.current(true).unix; // TODO: Mejorar esto, detectando si el reloj esta sincronizado
    const query = Utils.General.makeQueryString({ recvWindow, timestamp });
    const secret = config.exchange.account.secretKey;
    const signature = Utils.Security.signature(secret, query);
    const apiKey = config.exchange.account.apiKey;

    return {
      recvWindow,
      timestamp,
      signature,
      apiKey
    };
  }
}

export default DataForRequest;
