import axios, { AxiosResponse } from 'axios';

const EXCHANGE_URL: string = config.exchange.url;
const STABLE_COIN = 'USDT';

export const getPrice = async (asset: TAsset): Promise<number> => {
  const res: AxiosResponse = await axios.get(
    `${EXCHANGE_URL}/ticker/price?symbol=${asset + STABLE_COIN}`
  );
  const response: TResponses['tickerPrice'] = res.data;

  const price = Number(Number(response.price).toFixed(2));
  return price;
};

export const getBestOrder = async (asset: TAsset): Promise<TBestOrder> => {
  const res: AxiosResponse = await axios.get(
    `${EXCHANGE_URL}/ticker/bookTicker?symbol=${asset + STABLE_COIN}`
  );
  const response: TResponses['bookTicker'] = res.data;

  const spread: TBestOrder = {
    bid: {
      price: response.bidPrice,
      qty: response.bidQty
    },
    ask: {
      price: response.askPrice,
      qty: response.askQty
    }
  };
  return spread;
};

export const getOrderBook = async (asset: TAsset, limit: number): Promise<TOrderBook> => {
  const res: AxiosResponse = await axios.get(
    `${EXCHANGE_URL}/depth?symbol=${asset + STABLE_COIN}&limit=${limit}`
  );
  const response: TResponses['orderBook'] = res.data;

  let orderBook: TOrderBook = { bids: [], asks: [] };
  for (let index = 0; index < response.bids.length; index++) {
    const bid: [string, string] = response.bids[index];
    const ask: [string, string] = response.asks[index];

    orderBook.bids.push({
      price: bid[0],
      qty: bid[1]
    });
    orderBook.asks.push({
      price: ask[0],
      qty: ask[1]
    });
  }
  return orderBook;
};

export const getServerTime = async (): Promise<TServerTime> => {
  const res: AxiosResponse = await axios.get(`${EXCHANGE_URL}/time`);
  const response: TResponses['time'] = res.data;

  const time = response.serverTime;
  return time;
};
