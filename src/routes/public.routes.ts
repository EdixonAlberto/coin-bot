import axios from 'axios';

const BINANCE_URL = 'https://api.binance.com/api/v3';
const STABLE_COIN = 'USDT';

export const getPrice = async (asset: string): Promise<number> => {
  const res = await axios.get(
    `${BINANCE_URL}/ticker/price?symbol=${asset + STABLE_COIN}`
  );
  const price: string = Number(res.data.price).toFixed(2);
  return Number(price);
};

export const getOrderBook = async (
  asset: string,
  limit: number
): Promise<TResponses['orderBook']> => {
  const res = await axios.get(
    `${BINANCE_URL}/depth?symbol=${asset + STABLE_COIN}&limit=${limit}`
  );
  const orderBook: TResponses['orderBook'] = res.data;
  return {
    bids: orderBook.bids,
    asks: orderBook.asks
  };
};
