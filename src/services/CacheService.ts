export class CacheService {
  private cache: Map<string, any> = new Map();

  public get(key: string) {
    return this.cache.get(key);
  }

  public set(key: string, value: any) {
    this.cache.set(key, value);
  }
}
