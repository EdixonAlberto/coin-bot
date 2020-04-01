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
  fieldType: 'row' | 'column';
};

type TDataRequest = {
  recvWindow: number;
  timestamp: number;
  signature: string;
  apiKey: string;
};

type TActive = {
  exchangePrice: number;
};

type TSign = '>' | '=' | '<';

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {
    config: TConfig;
    store: import('../database/lowdbApi').default;
  }
}
