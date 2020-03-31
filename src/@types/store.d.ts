type TStore = {
  alarmList: Array<TAlarm | any>;
  settings: Array<TSetting>;
};

type TAlarm = {
  id: string;
  price: number;
  createDate: string;
};

type TSetting = {
  key: string;
  value: string | number;
};

type TStoreObjects = TAlarm | TSetting;

type TStoreFields = 'alarmList' | 'settings';
