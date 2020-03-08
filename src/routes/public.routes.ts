import axios from 'axios';

const BINANCE_URL = 'https://api.binance.com/api/v3';
const STABLE_COIN = 'USDT';

export const getPrice = async (asset: string): Promise<number> => {
  const res = await axios.get(
    `${BINANCE_URL}/ticker/price?symbol=${asset + STABLE_COIN}`
  );
  const response: TResponses['tickerPrice'] = res.data;

  const price = Number(Number(response).toFixed(2));
  return price;
};

export const getSpread = async (asset: string): Promise<TSpread> => {
  const res = await axios.get(
    `${BINANCE_URL}/ticker/bookTicker?symbol=${asset + STABLE_COIN}`
  );
  const response: TResponses['bookTicker'] = res.data;

  const spread: TSpread = {
    bid: [response.bidPrice, response.bidQty],
    ask: [response.askPrice, response.askQty]
  };
  return spread;
};

export const getOrderBook = async (asset: string, limit: number): Promise<TOrderBook> => {
  const res = await axios.get(
    `${BINANCE_URL}/depth?symbol=${asset + STABLE_COIN}&limit=${limit}`
  );
  const response: TResponses['orderBook'] = res.data;

  const orderBook = {
    bids: response.bids,
    asks: response.asks
  };
  return orderBook;
};
