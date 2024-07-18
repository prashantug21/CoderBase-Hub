const { LeetCode } = require('leetcode-query');

const leetcode = async (handle) => {
    const leetcode1 = new LeetCode();

    try {
        const userInfo = await leetcode1.user(handle);
        if (!userInfo.matchedUser) {
            throw new Error('User not found');
        }

        const userContestData = await leetcode1.user_contest_info(handle);
        const contestData = userContestData.userContestRankingHistory.filter(contest => contest.attended);

        return {
            ...userInfo,
            userContestRankingHistory: contestData,
        };
    } catch (error) {
        console.error('Error fetching LeetCode data:', error.message);
        throw new Error('Error fetching LeetCode data');
    }
};

module.exports =  leetcode;
