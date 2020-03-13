import axios, { AxiosResponse } from 'axios';

const EXCHANGE_URL = config.exchange.url;

/**
 * @description Account Information
 * @tutorial GET {BINANCE_URL}/account
 */
export const getAccount = async ({
  recvWindow,
  timestamp,
  signature,
  apiKey
}: TDataRequest): Promise<TResponses['account']> => {
  const res: AxiosResponse = await axios.get(`${EXCHANGE_URL}/account`, {
    params: {
      recvWindow,
      timestamp,
      signature
    },
    headers: {
      'X-MBX-APIKEY': apiKey
    }
  });
  const response: TResponses['account'] = res.data;

  return response;
};
