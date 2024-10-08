import axios from 'axios';

interface CodeforcesData {
  handle: string;
  total: number;
  easy: number;
  medium: number;
  hard: number;
  rating: number;
  history: any[];
}

const codeforces = async (handle: string): Promise<CodeforcesData | string> => {
  const problemURL = `https://codeforces.com/api/user.status?handle=${handle}`;
  const ratingURL = `https://codeforces.com/api/user.rating?handle=${handle}`;

  try {
    // Handle both requests concurrently using Promise.all
    const [problemResponse, ratingResponse] = await Promise.all([
      axios.get(problemURL),
      axios.get(ratingURL),
    ]);
    // console.log(problemResponse.data)
    // Check if both responses are successful
    if (problemResponse.data.status === 'OK' && ratingResponse.data.status === 'OK') {
      // Filter solved problems with verdict "OK"
      const solvedProblems = problemResponse.data.result.filter(
        (problem: any) => problem.verdict === 'OK'
      );
      let easy = 0,
        medium = 0,
        hard = 0;

      solvedProblems.forEach((problem: any) => {
        if (problem.problem.rating <= 1000) {
          easy++;
        } else if (problem.problem.rating <= 1600) {
          medium++;
        } else {
          hard++;
        }
      });

      const combinedData: CodeforcesData = {
        handle: handle,
        total: solvedProblems.length,
        easy: easy,
        medium: medium,
        hard: hard,
        rating: ratingResponse.data.result[ratingResponse.data.result.length - 1].newRating,
        history: ratingResponse.data.result,
      };

      return combinedData;
    } else {
      return 'User not found';
    }
  } catch (error: any) {
    console.error('Error fetching data from Codeforces:');
    return 'Error fetching data';
  }
};

export default codeforces;
