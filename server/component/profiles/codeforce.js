const axios = require("axios");

const codeforces = async (handle) => {
    const problemURL = `https://codeforces.com/api/user.status?handle=${handle}`;
    const ratingURL = `https://codeforces.com/api/user.rating?handle=${handle}`;

    try {
        // Use Promise.all to handle both requests concurrently
        const [problemResponse, ratingResponse] = await Promise.all([
            axios.get(problemURL),
            axios.get(ratingURL)
        ]);

        // Check if both responses are successful
        if (problemResponse.data.status === "OK" && ratingResponse.data.status === "OK") {
            // Filter the problems with verdict "OK"
            const solvedProblems = problemResponse.data.result.filter(problem => problem.verdict === "OK");
            let easy=0,medium=0,hard=0;
            solvedProblems.forEach(problem => {
                if(problem.problem.rating <=1000){
                    easy++;
                }else if(problem.problem.rating <= 1600){
                    medium++;
                }else{
                    hard++;
                }
            })
            const combinedData = {
                totalProblemSolved: solvedProblems.length,
                easySolved: easy,
                mediumSolved: medium,
                hardSolved: hard,
                ratingHistory: ratingResponse.data.result
            };

            return combinedData;
        } else {
            return "User not found";
        }
    } catch (error) {
        console.error("Error fetching data from Codeforces:", error);
        return "Error fetching data";
    }
};

module.exports =  codeforces ;
