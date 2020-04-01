import { LowdbAsync } from 'lowdb';

class LowdbApi {
  constructor(private db: LowdbAsync<TStore>) {
    this.db = db;
  }

  public index(path: TStoreFields): TStoreObjects[] | undefined {
    try {
      const result = this.db.get(path).value();
      return result;
    } catch (error) {
      console.error('>> ERROR-DB-INDEX ->', error.message);
    }
  }

  public show(path: TStoreFields, keys: TStoreObjects): TStoreObjects | undefined {
    try {
      // Se agrega un obj en particular, para que el metodo [find] no de error
      const result = this.db
        .get(path as 'alarms')
        .find(keys)
        .value();
      return result;
    } catch (error) {
      console.error('>> ERROR-DB-SHOW ->', error.message);
    }
  }

  public async add(
    path: TStoreFields,
    obj: TStoreObjects
  ): Promise<ArrayLike<TStoreObjects> | undefined> {
    try {
      const result = await this.db
        .get(path as 'alarms')
        .push(obj)
        .write();
      return result;
    } catch (error) {
      console.error('>> ERROR-DB-ADD ->', error.message);
    }
  }

  public update(path: TStoreFields, obj: object): void {
    try {
      // TODO:
    } catch (error) {
      console.error('>> ERROR-DB-UPDATE ->', error.message);
    }
  }

  public async destroy(
    path: TStoreFields,
    obj: object
  ): Promise<ArrayLike<TStoreObjects> | undefined> {
    try {
      const result = await this.db
        .get(path)
        .remove(obj)
        .write();
      return result;
    } catch (error) {
      console.error('>> ERROR-DB-DESTROY ->', error.message);
    }
  }
}

export default LowdbApi;
