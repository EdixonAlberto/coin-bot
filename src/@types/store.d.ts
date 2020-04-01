type TStore = {
  alarms: Array<TAlarm | any>;
  settings: Array<TSetting>;
};

type TAlarm = {
  id: string;
  asset: TAsset;
  sign: TSign;
  price: number;
  createDate: string;
};

type TSetting = {
  key: string;
  value: string | number;
};

type TStoreObjects = TAlarm | TSetting;

type TStoreFields = 'alarms' | 'settings';
