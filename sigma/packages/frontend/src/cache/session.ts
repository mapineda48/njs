import RequestPromise from "api/RequestPromise";

export default class CacheInStorage {
  constructor(
    protected namespace: string,
    protected storage = sessionStorage
  ) {}

  getAsync<T>(key: string, cb: () => RequestPromise<T>): RequestPromise<T>;
  getAsync<T>(key: string, cb: () => Promise<T>) {
    const current = this.getItem<T>(key);

    if (current) {
      return current;
    }

    const prom = cb();

    prom.then((value: any) => this.setItem(key, value));

    return prom;
  }

  removeItem(key: string) {
    this.storage.removeItem(this.getFullKey(key));
  }

  getItem<T>(key: string): T | null {
    const json = this.storage.getItem(this.getFullKey(key));

    if (!json) {
      return null;
    }

    return JSON.parse(json);
  }

  setItem(key: string, value: any) {
    this.storage.setItem(this.getFullKey(key), JSON.stringify(value));
  }

  exists(key: string) {
    return this.getItem(key) !== null;
  }

  protected getFullKey(key: string) {
    return this.namespace + ":" + key;
  }
}
