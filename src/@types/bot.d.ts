type TContent = {
  prefix: string;
  command: import('../enumerations').commandsList;
  params: Array<string>;
  message: () => import('discord.js').Message;
};

type TAsset = 'BTC';

type TOptions = {
  prefix: string;
  token: string;
};

type TConfig = {
  nodeEnv: string;
  token: string;
  alarmInterval: number;
};

type TEmbed = {
  header: string;
  title: string;
  detail: string;
  footer?: string;
  color?: string;
};

/***************************************** DECLARATIONS *********************************/

declare namespace NodeJS {
  interface Global {
    config: TConfig;
  }
}
