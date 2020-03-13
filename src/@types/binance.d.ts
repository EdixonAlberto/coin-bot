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
  account: {
    makerCommission: number;
    takerCommission: number;
    buyerCommission: number;
    sellerCommission: number;
    canTrade: boolean;
    canWithdraw: boolean;
    canDeposit: boolean;
    updateTime: boolean;
    accountType: TAccount;
    balances: Array<TBalance>;
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

type TBalance = {
  asset: TAsset;
  free: number;
  locked: string;
};

type TServerTime = number;

type TAsset = 'BTC' | 'ETH';

type TAccount = 'SPOT';
