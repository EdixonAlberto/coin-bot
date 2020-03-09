import axios from 'axios';

const BINANCE_URL = 'https://api.binance.com/api/v3';
const STABLE_COIN = 'USDT';

export const getPrice = async (asset: string): Promise<number> => {
  const res = await axios.get(
    `${BINANCE_URL}/ticker/price?symbol=${asset + STABLE_COIN}`
  );
  const response: TResponses['tickerPrice'] = res.data;

  const price = Number(Number(response.price).toFixed(2));
  return price;
};

export const getBestOrder = async (asset: string): Promise<TBestOrder> => {
  const res = await axios.get(
    `${BINANCE_URL}/ticker/bookTicker?symbol=${asset + STABLE_COIN}`
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

export const getOrderBook = async (asset: string, limit: number): Promise<TOrderBook> => {
  const res = await axios.get(
    `${BINANCE_URL}/depth?symbol=${asset + STABLE_COIN}&limit=${limit}`
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
