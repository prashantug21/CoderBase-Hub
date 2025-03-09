export type LeetCodeData={
    handle: string | null;
    easy: number | null;
    medium: number | null;
    hard: number | null;
    total: number | null;
    currentRating: number | null;
    maxRating:number | null;
    contestHistory: {
        rating: number | null;
        contestName: string | null;
        date: string | null;
    }[];
}

export type CodeforcesData={
    handle: string | null;
    easy: number | null;
    medium: number | null;
    hard: number | null;
    total: number | null;
    currentRating: number | null;
    maxRating:number | null;
    contestHistory: {
        rating: number | null;
        contestName: string | null;
        date: string | null;
    }[];
}

export type CodeChefData={
    handle: string | null;
    currentRating: number | null;
    maxRating:number | null;
    contestHistory: {
        rating: number | null;
        contestName: string | null;
        date: string | null;
    }[];
}

export type GFGData={
    handle: string | null;
    easy: number | null;
    medium: number | null;
    hard: number | null;
    total: number | null;
}

export type UserData={  
    leetcodeHandle: string | null;
    codeforcesHandle: string | null;
    codechefHandle: string | null;
    gfgHandle: string | null;
}