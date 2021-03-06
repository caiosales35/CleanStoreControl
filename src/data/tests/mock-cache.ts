import { CacheStore } from "@/data/protocols/cache";
import { SavePurchases } from "@/domain/usecases/save-purchases";

const maxAgeInDays = 3;

export const getCacheExpirationDate = (timestamp: Date): Date => {
  const maxCacheAge = new Date(timestamp);
  maxCacheAge.setDate(maxCacheAge.getDate() - maxAgeInDays);
  return maxCacheAge;
};

export class CacheStoreSpy implements CacheStore {
  deleteKey = "";
  insertKey = "";
  fetchKey = "";
  insertValues: SavePurchases.Params[] = [];
  fetchResult: any;
  actions: CacheStoreSpy.Action[] = [];

  fetch(key: string): any {
    this.fetchKey = key;
    this.actions.push(CacheStoreSpy.Action.fetch);
    return this.fetchResult;
  }
  delete(key: string): void {
    this.deleteKey = key;
    this.actions.push(CacheStoreSpy.Action.delete);
  }
  insert(key: string, value: any): void {
    this.insertKey = key;
    this.insertValues = value;
    this.actions.push(CacheStoreSpy.Action.insert);
  }
  replace(key: string, value: any): void {
    this.delete(key);
    this.insert(key, value);
  }

  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.delete);
      throw new Error();
    });
  }
  simulateInsertError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "insert").mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.insert);
      throw new Error();
    });
  }
  simulateFetchError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "fetch").mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.fetch);
      throw new Error();
    });
  }
}

export namespace CacheStoreSpy {
  export enum Action {
    delete,
    insert,
    fetch,
  }
}
