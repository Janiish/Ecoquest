import { createClient, RedisClientType } from 'redis';

let redis: RedisClientType;

export const initRedis = async (redisUrl: string) => {
  redis = createClient({ url: redisUrl });
  await redis.connect();
  console.log('Redis connected');
  return redis;
};

export const getRedisClient = () => redis;

export interface RankedUser {
  uid: string;
  xp: number;
  rank: number;
}

// Sync user XP to global and city leaderboards (sorted sets)
export const syncUserToRedis = async (
  userUid: string,
  xp: number,
  city?: string
): Promise<void> => {
  if (!redis) throw new Error('Redis not initialized');

  // Update global leaderboard (sorted set by XP descending)
  await redis.zAdd('leaderboard:global', {
    score: xp,
    value: userUid,
  });

  // Update city leaderboard if city provided
  if (city) {
    await redis.zAdd(`leaderboard:city:${city}`, {
      score: xp,
      value: userUid,
    });
  }
};

// Get top N users from global leaderboard (highest XP first)
export const getTopGlobal = async (limit = 10): Promise<RankedUser[]> => {
  if (!redis) throw new Error('Redis not initialized');

  // Use zRangeWithScores with REV option for descending order
  const users = await redis.zRangeWithScores('leaderboard:global', 0, limit - 1, {
    REV: true, // Highest scores first
  });

  return users.map((item, idx) => ({
    uid: item.value,
    xp: item.score,
    rank: idx + 1,
  }));
};

// Get top N users from city leaderboard
export const getTopLocal = async (city: string, limit = 10): Promise<RankedUser[]> => {
  if (!redis) throw new Error('Redis not initialized');

  // Use zRangeWithScores with REV option for descending order
  const users = await redis.zRangeWithScores(`leaderboard:city:${city}`, 0, limit - 1, {
    REV: true,
  });

  return users.map((item, idx) => ({
    uid: item.value,
    xp: item.score,
    rank: idx + 1,
  }));
};
