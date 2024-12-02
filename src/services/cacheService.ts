type CacheItem<T> = {
  data: T;
  timestamp: number;
};

class CacheService {
  private static instance: CacheService;
  private cache: Map<string, CacheItem<any>>;

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  set<T>(key: string, data: T, expirationMs: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + expirationMs,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.timestamp) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }
}

export const cacheService = CacheService.getInstance();