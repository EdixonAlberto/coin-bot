type TResponses = {
  tickerPrice: {
    symbol: string;
    price: string;
  };
  bookTicker: {
    symbol: string;
    bidPrice: string;
    bidQty: string;
    askPrice: string;
    askQty: string;
  };
  orderBook: {
    lastUpdateId: number;
    bids: Array<[string, string]>;
    asks: Array<[string, string]>;
  };
  time: {
    serverTime: number;
  };
};

type TOrderBook = {
  bids: Array<TBestOrder['bid']>;
  asks: Array<TBestOrder['ask']>;
};

type TBestOrder = {
  bid: {
    price: string;
    qty: string;
  };
  ask: {
    price: string;
    qty: string;
  };
};

type TServerTime = number;
