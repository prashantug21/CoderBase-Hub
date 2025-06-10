import sql from '@/config/database';
import { NextRequest, NextResponse } from 'next/server';

function convertTimestampToDate(timestamp:number) {
    if (!timestamp || isNaN(timestamp)) return "Invalid Date";
    if (timestamp < 10000000000) {
        timestamp *= 1000;
    }
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const {handle}=await req.json();
    const res=await sql`SELECT handles.* FROM handles JOIN users ON handles.id = users.id WHERE users.username = ${handle}`;
    if (res.length === 0) {
      return NextResponse.json({ message: 'User handle not found' }, { status: 404 });
    }
    const urls = [
      `https://codechef-api.vercel.app/${res[0].codechef}`,
      `https://codeforces.com/api/user.status?handle=${res[0].codeforces}`,
      `https://codeforces.com/api/user.rating?handle=${res[0].codeforces}`,
      `https://www.geeksforgeeks.org/gfg-assets/_next/data/FYklEAyXivT1T8T9JuA9B/user/${res[0].gfg}.json`
    ];
    
    const leetcodeUrl = "https://leetcode.com/graphql/";
    
    const leetcodeQuery = {
      operationName: "combinedUserInfo",
      query: `
        query combinedUserInfo($username: String!) {
          userContestRankingHistory(username: $username) {
            attended
            rating
            contest {
              title
              startTime
            }
          }
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                count
              }
            }
          }
        }
      `,
      variables: { username: res[0].leetcode || "" }
    };


     const [codechef,codeforces0,codeforces,gfg,leetcode] = await Promise.all([
      ...urls.map(url => fetch(url).then(res => res.json()).catch(() => ({}))),
      fetch(leetcodeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leetcodeQuery)
      }).then(res => res.json())
    ]);
    let codechefdata,codeforcesdata,gfgdata,leetcodedata;
    if(codechef.success===false){
      codechefdata={
        status:"error",
        message:"User not found"
      }
    }else{
      codechefdata={
        status:"ok",
        currentRating:codechef.currentRating,
        maxRating:codechef.highestRating,
        contestHistory:codechef.ratingData.map((item: any) => ({
          rating:Number(item.rating),
          contestName:item.name,
          date:convertTimestampToDate(Date.parse(item.end_date)),
        }))
      }
    }
    let maxRating=0,easy=0,medium=0,hard=0;
    

    if(codeforces.status==="OK"){
      codeforces0.result.forEach((item: any) => {
        if(item.verdict==="OK"){
          if(item.problem.rating<=1000){
            easy+=1
          }else if(item.problem.rating<=1600){
            medium+=1
          }else{
            hard+=1
          }
        }
      })
      codeforces.result.forEach((item: any) => {
        if(item.newRating>maxRating){
          maxRating=item.newRating
        }
      })
      codeforcesdata={
        status:"ok",
        currentRating:codeforces.result[codeforces.result.length-1].newRating,
        contestHistory:codeforces.result.map((item: any) =>{
          return ({
            rating:Number(item.newRating),
            contestName:item.contestName,
            date:convertTimestampToDate(item.ratingUpdateTimeSeconds),
          })
        }),
        maxRating:maxRating,
        easy:easy,
        medium:medium,
        hard:hard,
        total:easy+medium+hard
        
      }
    }else{
      codeforcesdata={
        status:"error",
        message:"User not found"
      }
    }
    maxRating=0;
    if(gfg.pageProps?.userHandle!==undefined){
      gfgdata={
        status:"ok",
        easy:Object.keys(gfg.pageProps.userSubmissionsInfo.Easy).length+Object.keys(gfg.pageProps.userSubmissionsInfo.Basic).length,
        medium:Object.keys(gfg.pageProps.userSubmissionsInfo.Medium).length,
        hard:Object.keys(gfg.pageProps.userSubmissionsInfo.Hard).length,
        total:Object.keys(gfg.pageProps.userSubmissionsInfo.Easy).length+Object.keys(gfg.pageProps.userSubmissionsInfo.Basic).length+Object.keys(gfg.pageProps.userSubmissionsInfo.Medium).length+Object.keys(gfg.pageProps.userSubmissionsInfo.Hard).length,
      }
    }else{
      gfgdata={
        status:"error",
        message:"User not found"
      }
    }
    maxRating=0;
    

    if(leetcode?.data!==undefined){
      leetcode.data.userContestRankingHistory.map((item: any) => {
        if(item.attended){
          if(item.rating>maxRating){
            maxRating=item.rating
          }
        }
      })
      leetcodedata={
        status:"ok",
        easy:leetcode.data.matchedUser.submitStats.acSubmissionNum[1].count,
        medium:leetcode.data.matchedUser.submitStats.acSubmissionNum[2].count,
        hard:leetcode.data.matchedUser.submitStats.acSubmissionNum[3].count,
        total:leetcode.data.matchedUser.submitStats.acSubmissionNum[0].count,
        currentRating:leetcode.data.userContestRankingHistory[leetcode.data.userContestRankingHistory.length-1].rating,
        maxRating:maxRating,
        contestHistory:leetcode.data.userContestRankingHistory.filter((item: any) => item.attended).map((item: any) => ({
          rating:Number(item.rating),
          contestName:item.contest.title,
          date:convertTimestampToDate(item.contest.startTime)
        })),
      }
    }else{
      leetcodedata={
        status:"error",
        message:"User not found"
      }
    }
    return NextResponse.json([codechefdata,codeforcesdata,gfgdata,leetcodedata,{leetcode:res[0].leetcode,codechef:res[0].codechef,codeforces:res[0].codeforces,gfg:res[0].gfg}], { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
