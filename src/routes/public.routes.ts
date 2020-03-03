import axios from 'axios';

export const getPrice = async (asset: string): Promise<number> => {
  const res = await axios.get(
    `https://api.binance.com/api/v3/ticker/price?symbol=${asset}USDT`
  );
  const price = Number(res.data.price).toFixed(2);
  return Number(price);
};
