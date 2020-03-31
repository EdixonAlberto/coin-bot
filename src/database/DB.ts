import low, { AdapterAsync, LowdbAsync } from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';
import LowdbApi from './lowDbApi';
import storeDefault from './store.default.json';

class DB {
  private adapter: AdapterAsync<TStore>;

  // TODO: estudiar las opciones de config para lowdb
  constructor({ file }: { file: string }) {
    this.adapter = new FileAsync(file);
  }

  private apiLoad(db: LowdbAsync<TStore>): LowdbApi {
    const api = new LowdbApi(db);
    return api;
  }

  public async create(): Promise<void> {
    try {
      const db = await low(this.adapter);
      const store: TStore = storeDefault;

      db.defaults(store).write(); // Adding store in file json
      global.store = this.apiLoad(db);

      if (config.modeDebug) console.log('>> DB -> OK');
    } catch (error) {
      console.log('>> DB ->', error);
    }
  }
}

export default DB;
