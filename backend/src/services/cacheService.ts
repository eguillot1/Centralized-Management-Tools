import Redis from 'ioredis';

// Redis client (optional - falls back to in-memory cache if Redis is not available)
let redis: Redis | null = null;

try {
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  redis = new Redis(redisUrl, {
    maxRetriesPerRequest: 1,
    retryStrategy: () => null, // Don't retry on connection failure
  });
  
  redis.on('error', () => {
    console.log('Redis connection failed, using in-memory cache');
    redis = null;
  });
} catch {
  console.log('Redis not available, using in-memory cache');
}

// In-memory cache fallback
const memoryCache = new Map<string, { value: string; expiry: number }>();

export const cacheService = {
  async get<T>(key: string): Promise<T | null> {
    try {
      if (redis) {
        const value = await redis.get(key);
        return value ? JSON.parse(value) : null;
      }
      
      // Memory cache fallback
      const cached = memoryCache.get(key);
      if (cached && cached.expiry > Date.now()) {
        return JSON.parse(cached.value);
      }
      memoryCache.delete(key);
      return null;
    } catch {
      return null;
    }
  },

  async set(key: string, value: unknown, ttlSeconds = 300): Promise<void> {
    try {
      const stringValue = JSON.stringify(value);
      
      if (redis) {
        await redis.setex(key, ttlSeconds, stringValue);
      } else {
        // Memory cache fallback
        memoryCache.set(key, {
          value: stringValue,
          expiry: Date.now() + ttlSeconds * 1000,
        });
      }
    } catch {
      // Silently fail on cache errors
    }
  },

  async delete(key: string): Promise<void> {
    try {
      if (redis) {
        await redis.del(key);
      } else {
        memoryCache.delete(key);
      }
    } catch {
      // Silently fail on cache errors
    }
  },

  async invalidatePattern(pattern: string): Promise<void> {
    try {
      if (redis) {
        const keys = await redis.keys(pattern);
        if (keys.length > 0) {
          await redis.del(...keys);
        }
      } else {
        // Memory cache pattern invalidation
        for (const key of memoryCache.keys()) {
          if (key.includes(pattern.replace('*', ''))) {
            memoryCache.delete(key);
          }
        }
      }
    } catch {
      // Silently fail on cache errors
    }
  },
};
