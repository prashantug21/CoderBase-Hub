import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken'; // Using jwt for token verification
import sql from '@/config/database'; // Adjust the path accordingly
import { current } from '@reduxjs/toolkit';


interface UserProfile {
  userid: number; // Adjust type according to your database schema
  username: string;
  friends: string; // Change to appropriate type if needed
  leetdata?: any; // Define more specific types based on leetcode return structure
  codechefdata?: any; // Define more specific types based on codechef return structure
  codeforcesdata?: any; // Define more specific types based on codeforces return structure
  gfgdata?: any; // Define more specific types based on GFG return structure
}



export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const {handle}=await req.json();
    const urls = [
      `https://codechef-api.vercel.app/${handle}`,
      `https://codeforces.com/api/user.status?handle=${handle}`,
      `https://codeforces.com/api/user.rating?handle=${handle}`,
      `https://www.geeksforgeeks.org/gfg-assets/_next/data/-MBGrWa6UiS9evIlTHcyG/user/${handle}.json`
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
      variables: { username: handle }
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
        maxRating:codechef.maxRating,
        contestHistory:codechef.ratingData.map((item: any) => ({
          rating:item.rating,
          contestName:item.name,
          date:Date.parse(item.end_date),
        }))
      }
    }
    let maxRating=0,easy=0,medium=0,hard=0;
    

    if(codeforces.status==="OK"){
      codeforces0.result.forEach((item: any) => {
        if(item.verdict==="OK"){
          if(item.problem.rating>maxRating){
            maxRating=item.problem.rating
          }
          if(item.problem.rating<=1000){
            easy+=1
          }else if(item.problem.rating<=1600){
            medium+=1
          }else{
            hard+=1
          }
        }
      })
      codeforcesdata={
        status:"ok",
        currentRating:codeforces.result[codeforces.result.length-1].newRating,
        contestHistory:codeforces.result.map((item: any) =>{
          return ({
            rating:item.newRating,
            contestName:item.contestName,
            date:item.ratingUpdateTimeSeconds,
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

    if(leetcode?.error===undefined){
      leetcodedata={
        status:"ok",
        easy:leetcode.data.matchedUser.submitStats.acSubmissionNum[1].count,
        medium:leetcode.data.matchedUser.submitStats.acSubmissionNum[2].count,
        hard:leetcode.data.matchedUser.submitStats.acSubmissionNum[3].count,
        total:leetcode.data.matchedUser.submitStats.acSubmissionNum[0].count,
        rating:leetcode.data.userContestRankingHistory[leetcode.data.userContestRankingHistory.length-1].rating,
        contestHistory:leetcode.data.userContestRankingHistory.filter((item: any) => item.attended).map((item: any) => ({
          rating:item.rating,
          contestName:item.contest.title,
          date:item.contest.startTime
        })),
      }
    }else{
      leetcodedata={
        status:"error",
        message:"User not found"
      }
    }
    return NextResponse.json([codechefdata,codeforcesdata,gfgdata,leetcodedata], { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
