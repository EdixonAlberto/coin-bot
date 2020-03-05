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
  token: string;
  alarmInterval: number;
};

declare namespace NodeJS {
  interface Global {
    config: TConfig;
  }
}
