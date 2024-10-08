import { LeetCode } from 'leetcode-query';

interface LeetCodeData {
  handle: string;
  easy: number;
  medium: number;
  hard: number;
  total: number;
  rating: number;
  history: any[];
}

const leetcode = async (handle: string): Promise<LeetCodeData | string> => {
  const leetcodeClient = new LeetCode();

  try {
    // Fetch user information
    const userInfo = await leetcodeClient.user(handle);

    if (!userInfo.matchedUser) {
      return 'User not found';
    }

    const matchedUser = userInfo.matchedUser;

    // Fetch user's contest data
    const userContestData = await leetcodeClient.user_contest_info(handle);
    const contestData = userContestData.userContestRankingHistory.filter(
      (contest: any) => contest.attended
    );

    // Return structured data
    return {
      handle,
      easy: matchedUser.submitStats.acSubmissionNum[1].count,
      medium: matchedUser.submitStats.acSubmissionNum[2].count,
      hard: matchedUser.submitStats.acSubmissionNum[3].count,
      total: matchedUser.submitStats.acSubmissionNum[0].count,
      rating: contestData[contestData.length - 1].rating,
      history: contestData,
    };
  } catch (error: any) {
    console.error('Error fetching LeetCode data:', error.message);
    throw new Error('Error fetching LeetCode data');
  }
};

export default leetcode;
