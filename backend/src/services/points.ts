import { User, IUser } from '../models/User';
import { Quest } from '../models/Quest';
import { getRedisClient, syncUserToRedis, getTopGlobal } from './leaderboard';
import { io } from '../server';

// Badge thresholds
const BADGE_THRESHOLDS: Record<number, string> = {
  100: 'First Step',
  300: 'Tree Friend',
  600: 'Eco Champion',
};

export const awardPointsForProof = async (
  userUid: string,
  questId: string
): Promise<IUser> => {
  // Lookup quest XP
  const quest = await Quest.findById(questId);
  if (!quest) throw new Error('Quest not found');

  // Find or create user
  let user = await User.findOne({ uid: userUid });
  if (!user) {
    user = new User({
      uid: userUid,
      name: 'Anonymous',
      email: userUid,
      xp: 0,
      badges: [],
      streak: 0,
    });
  }

  // Atomically increment XP
  user.xp += quest.xp;

  // Check badge thresholds and add new badges
  for (const [threshold, badgeName] of Object.entries(BADGE_THRESHOLDS)) {
    if (user.xp >= parseInt(threshold) && !user.badges.includes(badgeName)) {
      user.badges.push(badgeName);
    }
  }

  // Update streak
  const now = new Date();
  if (user.lastCompletedAt) {
    const lastDate = new Date(user.lastCompletedAt);
    const dayDiff = Math.floor(
      (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (dayDiff === 1) {
      // Completed yesterday, increment streak
      user.streak += 1;
    } else if (dayDiff > 1) {
      // Broken streak, reset
      user.streak = 1;
    }
    // dayDiff === 0 means same day, no change to streak
  } else {
    user.streak = 1;
  }

  user.lastCompletedAt = now;

  // Save user
  await user.save();

  // Sync to Redis leaderboards
  await syncUserToRedis(userUid, user.xp, user.city);

  // Emit socket event with top 10 snapshot
  const topGlobal = await getTopGlobal(10);
  io.emit('leaderboard:update', { leaderboard: topGlobal });

  console.log(`Awarded ${quest.xp} XP to ${userUid}`);
  return user;
};
