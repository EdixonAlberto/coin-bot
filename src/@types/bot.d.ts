type TContent = {
  prefix: string;
  command: import('../enumerations').commandsList;
  params: Array<string>;
  message: () => import('discord.js').Message;
};

type TOptions = {
  prefix: string;
  token: string;
};

type TConfig = {
  // Configuration environments
  discordToken: string;
  alarmInterval: number;
  exchange: {
    url: string;
    account: {
      apiKey: string;
      secretKey: string;
    };
  };
  // Configuration internal
  modeDebug: boolean;
  defaultAsset: TAsset;
  decimalQty: {
    asset: number;
    fiat: number;
  };
};

type TEmbed = {
  header: string;
  title: string;
  detail: string | TTable;
  footer?: string;
  color?: string;
};

type TTable = Array<TField>;

type TField = {
  title: string;
  content: string;
};

type TDataRequest = {
  recvWindow: number;
  timestamp: number;
  signature: string;
  apiKey: string;
};

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {
    config: TConfig;
  }
}
