"use client";
import { Avatar } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import "../../css/profile.css";
import { UserContext } from "../../context/UserContext";
import Link from "next/link";
import { LineChart } from '@mui/x-charts/LineChart';
import { useRouter } from "next/navigation";

const StyledText = styled("text")(({ theme }) => ({
  fill: "white",
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 40,
}));
// const labelValue = typeof children === "number" && isNaN(children) ? "N/A" : children;

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + 50 + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}
function formatDate(timestamp: number): string {
  // console.log(timestamp);
  if (isNaN(timestamp)) {
    console.log(timestamp);
    return "";
  }
  const dateObj = new Date(timestamp * 1000); // Convert from seconds to milliseconds
  const month   = dateObj.getUTCMonth() + 1; // months from 1-12
const day     = dateObj.getUTCDate();
const year    = dateObj.getUTCFullYear();

const newDate = year + "/" + month + "/" + day;
  // if(isNaN(dateString)){console.log(dateString);} 
  // console.log(dateString);
  return newDate; // Extract "YYYY-MM-DD" from ISO string
}
function formatDate1(timestamp: Date): string {
  // console.log(timestamp);
  // if (isNaN(timestamp)) {
  //   console.log(timestamp);
  //   return "";
  // }
  const dateObj = timestamp; // Convert from seconds to milliseconds
  const month   = dateObj.getUTCMonth() + 1; // months from 1-12
const day     = dateObj.getUTCDate();
const year    = dateObj.getUTCFullYear();

const newDate = year + "/" + month + "/" + day;
  return newDate; 
}

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [userId, setUserId] = useState("")
  const [name, setName] = useState("");
  const [leetcode, setLeetcode] = useState({ handle: "", total: 0, easy: 0, medium: 0, hard: 0, rating: 0, xaxis: [], yaxis: [], xLabel: [] })
  const [codeforces, setCodeforces] = useState({ handle: "", total: 0, easy: 0, medium: 0, hard: 0, rating: 0, xaxis: [], yaxis: [], xLabel: [] })
  const [codechef, setCodechef] = useState({ handle: "", rating: 0, xaxis: [], yaxis: [], xLabel: [] })
  const [gfg, setGfg] = useState({ handle: "", easy: 0, medium: 0, hard: 0 })
  const graph = [
    { label: "Easy", value: (isNaN(leetcode.easy) ? 0 : leetcode.easy) + (isNaN(codeforces.easy) ? 0 : codeforces.easy) + (isNaN(gfg.easy) ? 0 : gfg.easy), color: "green" },
    { label: "Medium", value: (isNaN(leetcode.medium) ? 0 : leetcode.medium) + (isNaN(codeforces.medium) ? 0 : codeforces.medium) + (isNaN(gfg.medium) ? 0 : gfg.medium), color: "orange" },
    { label: "Hard", value: (isNaN(leetcode.hard) ? 0 : leetcode.hard) + (isNaN(codeforces.hard) ? 0 : codeforces.hard) + (isNaN(gfg.hard) ? 0 : gfg.hard), color: "red" },
  ];
  const leetcodegraph = [
    { label: "Easy", value: (isNaN(leetcode.easy) ? 0 : leetcode.easy), color: "green" },
    { label: "Medium", value: (isNaN(leetcode.medium) ? 0 : leetcode.medium), color: "orange" },
    { label: "Hard", value: (isNaN(leetcode.hard) ? 0 : leetcode.hard), color: "red" },
  ]

  const codeforcesgraph = [
    { label: "Easy", value: (isNaN(codeforces.easy) ? 0 : codeforces.easy), color: "green" },
    { label: "Medium", value: (isNaN(codeforces.medium) ? 0 : codeforces.medium), color: "orange" },
    { label: "Hard", value: (isNaN(codeforces.hard) ? 0 : codeforces.hard), color: "red" },
  ]

  const gfggraph = [
    { label: "Easy", value: (isNaN(gfg.easy) ? 0 : gfg.easy), color: "green" },
    { label: "Medium", value: (isNaN(gfg.medium) ? 0 : gfg.medium), color: "orange" },
    { label: "Hard", value: (isNaN(gfg.hard) ? 0 : gfg.hard), color: "red" },
  ]

  const context = useContext(UserContext)
  const data = context?.userData;
  useEffect(() => {
    setUserId(data?.userid || "");
    setName(data?.username || "");
    if (data?.leetdata) {
      const leetcodeData = data.leetdata;
      const history = leetcodeData.history || [];
      console.log("Leetcode");
      const xaxis = history.map((item: any) => {
        
        return formatDate(item.contest.startTime);
      });
      const yaxis = history.map((item: any) => {
        return Math.round(item.rating);
      });
      const xLabel = history.map((item: any) => item.contest.title);
      console.log(xaxis)
      setLeetcode({
        handle: data?.leetdata?.handle || "",
        total: data?.leetdata?.total || 0,
        easy: data?.leetdata?.easy || 0,
        medium: data?.leetdata?.medium || 0,
        hard: data?.leetdata?.hard || 0,
        rating: data?.leetdata?.rating || 0,
        xaxis: xaxis,
        yaxis: yaxis,
        xLabel: xLabel
      });
    }
    if (data?.codeforcesdata) {
      console.log("codeforces")
      const history = data.codeforcesdata.history || [];
      const xaxis = history.map((item: any) => { return formatDate(item.ratingUpdateTimeSeconds); }); // example
      const yaxis = history.map((item: any) => item.newRating); // example
      const xLabel = history.map((item: any) => item.contestName);
      console.log(xaxis)
      setCodeforces({
        handle: data?.codeforcesdata?.handle || "",
        total: data?.codeforcesdata?.total || 0,
        easy: data?.codeforcesdata?.easy || 0,
        medium: data?.codeforcesdata?.medium || 0,
        hard: data?.codeforcesdata?.hard || 0,
        rating: data?.codeforcesdata?.rating || 0,
        xaxis: xaxis,
        yaxis: yaxis,
        xLabel: xLabel
      });
      // console.log(codeforces.xaxis)
    }
    if (data?.codechefdata) {
      console.log("codechef")

      const history = data.codechefdata.history || [];
      const xaxis = history.map((item: any) => formatDate1(new Date(item.end_date))); // example
      const yaxis = history.map((item: any) => item.rating); // example
      const xLabel = history.map((item: any) => item.name);  // example
      console.log(xaxis)
      setCodechef({
        handle: data?.codechefdata?.handle || "",
        rating: data?.codechefdata?.rating || 0,
        xaxis: xaxis,
        yaxis: yaxis,
        xLabel: xLabel
      });
      // console.log(codechef.xaxis)
    }


    setGfg({
      handle: data?.gfgdata?.handle || "",
      easy: data?.gfgdata?.easy || 0,
      medium: data?.gfgdata?.medium || 0,
      hard: data?.gfgdata?.hard || 0,
    });
  }, [data]);

  useEffect(() => {
    if (!data?.userid) {
      router.push('/login');
    }
  }, [data, router]);



  return (
    <div className="max-w-7xl flex flex-col gap-12 w-full my-8 text-stone-100 m-4 text-lg">
      {/* <div className="flex w-full justify-center"> */}
      <div className="flex gap-8 flex-col lg:flex-row items-center justify-center">
        <div className="flex flex-col bg-slate-700  p-6 gap-3 w-11/12 lg:w-6/12">
          <div className="flex items-center">
            <div className="m-4"><Avatar>{(name?.charAt(0) || "A")}</Avatar></div>
            <div className="flex flex-col">
              <span className="text-2xl">{name}</span>
              <span>@{userId}</span>
            </div>
          </div>
          <div className="flex flex-col ">
            <Link href={`https://leetcode.com/${leetcode.handle}/`} target="_blank">Leetcode</Link>
            <Link href={`https://www.codechef.com/users/${codechef.handle}`} target="_blank">CodeChef</Link>
            <Link href={`https://codeforces.com/profile/${codeforces.handle}`} target="_blank">Codeforces</Link>
            <Link href={`https://auth.geeksforgeeks.org/user/${gfg.handle}/profile`} target="_blank">GeeksForGeeks</Link>
          </div>
          <Link href="/editform" className="text-lg font-bold bg-transparent border-4 px-4 py-2 text-center rounded-3xl border-cyan-400 text-cyan-400 shadow-cyan-300 shadow-md hover:bg-cyan-400 hover:text-gray-900">Edit Usernames</Link>
        </div>
        <div className="flex flex-col w-11/12 lg:w-full">
          <div className="flex bg-slate-700 p-10 gap-8 overflow-visible">
            <PieChart
              series={[
                {
                  innerRadius: 70,
                  data: graph,
                  cx: 100,
                  cornerRadius: 0,
                  paddingAngle: 0,
                  outerRadius: 80,
                },
              ]}
              height={200}
              width={200}
              slotProps={{ legend: { hidden: true } }}
              className="m-0 p-0"
            >
              <PieCenterLabel>{leetcode.easy + codeforces.easy + gfg.easy + leetcode.medium + codeforces.medium + gfg.medium + leetcode.hard + codeforces.hard + gfg.hard}</PieCenterLabel>
            </PieChart>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col bg-slate-950 p-2 rounded-md w-20 justify-center items-center">
                <div className="text-green-600">Easy</div> <div>{leetcode.easy + codeforces.easy + gfg.easy}</div>
              </div>
              <div className="flex flex-col bg-slate-950 p-2 rounded-md w-20 justify-center items-center">
                <div className="text-amber-500">Medium</div> <div>{leetcode.medium + codeforces.medium + gfg.medium}</div>
              </div>
              <div className="flex flex-col bg-slate-950 p-2 rounded-md w-20 justify-center items-center">
                <div className="text-red-600">Hard</div> <div>{leetcode.hard + codeforces.hard + gfg.hard}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-8 justify-center items-center flex-col lg:flex-row">
        <div className="flex flex-col bg-slate-700 lg:w-4/12 p-6 gap-3 w-11/12">
          <div>LeetCode</div>
          <div className="flex flex-col gap-3 justify-center items-center">
            <PieChart
              series={[
                {
                  innerRadius: 70,
                  data: leetcodegraph,
                  cx: 100,
                  cornerRadius: 0,
                  paddingAngle: 0,
                  outerRadius: 80,
                },
              ]}
              height={200}
              width={200}
              slotProps={{ legend: { hidden: true } }}
              className="m-0 p-0"
            >
              <PieCenterLabel>{leetcode.easy + leetcode.medium + leetcode.hard}</PieCenterLabel>
            </PieChart>
            <div className="flex gap-3 justify-around w-full">
              <div className="flex flex-col bg-slate-950 p-2 rounded-md w-20 justify-center items-center">
                <div className="text-green-600">Easy</div> <div>{leetcode.easy}</div>
              </div>
              <div className="flex flex-col bg-slate-950 p-2 rounded-md w-20 justify-center items-center">
                <div className="text-amber-500">Medium</div> <div>{leetcode.medium}</div>
              </div>
              <div className="flex flex-col bg-slate-950 p-2 rounded-md w-20 justify-center items-center">
                <div className="text-red-600">Hard</div> <div>{leetcode.hard}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-slate-700 lg:w-4/12 p-6 gap-3 w-11/12">
          <div>Codeforces</div>
          <div className="flex flex-col gap-3 justify-center items-center">
            <PieChart
              series={[
                {
                  innerRadius: 70,
                  data: codeforcesgraph,
                  cx: 100,
                  cornerRadius: 0,
                  paddingAngle: 0,
                  outerRadius: 80,
                },
              ]}
              height={200}
              width={200}
              slotProps={{ legend: { hidden: true } }}
              className="m-0 p-0"
            >
              <PieCenterLabel>{codeforces.easy + codeforces.medium + codeforces.hard}</PieCenterLabel>
            </PieChart>
            <div className="flex gap-3 justify-around w-full">
              <div className="flex flex-col bg-slate-950 p-2 rounded-md w-20 justify-center items-center">
                <div className="text-green-600">Easy</div> <div>{codeforces.easy}</div>
              </div>
              <div className="flex flex-col bg-slate-950 p-2 rounded-md w-20 justify-center items-center">
                <div className="text-amber-500">Medium</div> <div>{codeforces.medium}</div>
              </div>
              <div className="flex flex-col bg-slate-950 p-2 rounded-md w-20 justify-center items-center">
                <div className="text-red-600">Hard</div> <div>{codeforces.hard}</div>
              </div>
            </div>
          </div>
        </div><div className="flex flex-col bg-slate-700 lg:w-4/12 p-6 gap-3 w-11/12">
          <div>Geeksforgeeks</div>
          <div className="flex flex-col gap-3 justify-center items-center">
            <PieChart
              series={[
                {
                  innerRadius: 70,
                  data: gfggraph,
                  cx: 100,
                  cornerRadius: 0,
                  paddingAngle: 0,
                  outerRadius: 80,
                },
              ]}
              height={200}
              width={200}
              slotProps={{ legend: { hidden: true } }}
              className="m-0 p-0"
            >
              <PieCenterLabel>{gfg.easy + gfg.medium + gfg.hard}</PieCenterLabel>
            </PieChart>
            <div className="flex gap-3 justify-around w-full">
              <div className="flex flex-col bg-slate-950 p-2 rounded-md w-20 justify-center items-center">
                <div className="text-green-600">Easy</div> <div>{gfg.easy}</div>
              </div>
              <div className="flex flex-col bg-slate-950 p-2 rounded-md w-20 justify-center items-center">
                <div className="text-amber-500">Medium</div> <div>{gfg.medium}</div>
              </div>
              <div className="flex flex-col bg-slate-950 p-2 rounded-md w-20 justify-center items-center">
                <div className="text-red-600">Hard</div> <div>{gfg.hard}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {charts } */}
      <div className="flex flex-col gap-8 items-center justify-center">
        <div className="flex flex-col bg-slate-700 w-11/12 lg:w-full p-3 lg:p-6 gap-3">
          <div>LeetCode</div>
          <div className="flex flex-col gap-3 justify-center items-center">
            <LineChart height={400} series={[
              { data: leetcode.yaxis }
            ]}
              //hide x-axis
              xAxis={[{ data: leetcode.xaxis, scaleType: 'point' }]}
              sx={{
                //change left yAxis label styles
               "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                strokeWidth:"0.4",
                fill:"#d1e0e0"
               },
               // change all labels fontFamily shown on both xAxis and yAxis
               "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                   fontFamily: "Roboto",
                },
                // change bottom label styles
                "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                    strokeWidth:"0.4",
                    fill:"#d1e0e0"
                 },
                  // bottomAxis Line Styles
                 "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                  stroke:"#d1e0e0",
                  strokeWidth:0.4
                 },
                 // leftAxis Line Styles
                 "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                  stroke:"#d1e0e0",
                  strokeWidth:0.4
                 }
              }} />
          </div>
        </div>
        <div className="flex flex-col bg-slate-700 w-11/12 lg:w-full p-3 lg:p-6 gap-3">
          <div>Codeforces</div>
          <div className="flex flex-col gap-3 justify-center items-center">
            <LineChart height={400} series={[
              { data: codeforces.yaxis }
            ]}
              //hide x-axis
              xAxis={[{ data: codeforces.xaxis, scaleType: 'point' }]}
              sx={{
                //change left yAxis label styles
               "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                strokeWidth:"0.4",
                fill:"#d1e0e0"
               },
               // change all labels fontFamily shown on both xAxis and yAxis
               "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                   fontFamily: "Roboto",
                },
                // change bottom label styles
                "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                    strokeWidth:"0.4",
                    fill:"#d1e0e0"
                 },
                  // bottomAxis Line Styles
                 "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                  stroke:"#d1e0e0",
                  strokeWidth:0.4
                 },
                 // leftAxis Line Styles
                 "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                  stroke:"#d1e0e0",
                  strokeWidth:0.4
                 }
              }} />
          </div>
        </div>
        <div className="flex flex-col bg-slate-700 w-11/12 lg:w-full p-3 lg:p-6 gap-3">
          <div>CodeChef</div>
          <div className="flex flex-col gap-3 justify-center items-center">
            <LineChart height={400} series={[
              { data: codechef.yaxis }
            ]}
              //hide x-axis
              xAxis={[{ data: codechef.xaxis,scaleType: 'point' }]} 
              sx={{
                //change left yAxis label styles
               "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                strokeWidth:"0.4",
                fill:"#d1e0e0"
               },
               // change all labels fontFamily shown on both xAxis and yAxis
               "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                   fontFamily: "Roboto",
                },
                // change bottom label styles
                "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                    strokeWidth:"0.4",
                    fill:"#d1e0e0"
                 },
                  // bottomAxis Line Styles
                 "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                  stroke:"#d1e0e0",
                  strokeWidth:0.4
                 },
                 // leftAxis Line Styles
                 "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                  stroke:"#d1e0e0",
                  strokeWidth:0.4
                 }
              }} />
          </div>
        </div>
        <div className="flex flex-col bg-slate-700 w-full p-6 gap-3">
  <div className="text-3xl font-bold mb-4 flex w-full justify-between items-center">
    <div>Friends</div>
    <div>
      <Link
        href="/friends"
        className="text-lg font-bold bg-transparent border-4 px-4 py-2 text-center rounded-3xl border-cyan-400 text-cyan-400 shadow-cyan-300 shadow-md hover:bg-cyan-400 hover:text-gray-900"
      >
        Edit Friends
      </Link>
    </div>
  </div>
  <div className="overflow-x-auto">
    <table className="min-w-full text-left text-md text-slate-400">
      <thead className="bg-slate-800 text-slate-300">
        <tr>
          <th className="py-2 px-4">Friend</th>
          <th className="py-2 px-4">LeetCode</th>
          <th className="py-2 px-4">Codeforces</th>
          <th className="py-2 px-4">CodeChef</th>
          <th className="py-2 px-4">GeeksforGeeks</th>
        </tr>
      </thead>
      <tbody className="bg-slate-700">
        {context?.userData?.friends?.map((friend:any, index:any) => (
          <tr key={index} className="hover:bg-slate-600">
            <td className="py-2 px-4">{friend.name}</td>
            <td className="py-2 px-4">
              <Link
                href={`https://leetcode.com/${friend.leetcode}/`}
                target="_blank"
                className="text-cyan-400 hover:text-cyan-300"
              >
                {friend.leetcode || "N/A"}
              </Link>
            </td>
            <td className="py-2 px-4">
              <Link
                href={`https://codeforces.com/profile/${friend.codeforces}/`}
                target="_blank"
                className="text-cyan-400 hover:text-cyan-300"
              >
                {friend.codeforces || "N/A"}
              </Link>
            </td>
            <td className="py-2 px-4">
              <Link
                href={`https://www.codechef.com/users/${friend.codechef}/`}
                target="_blank"
                className="text-cyan-400 hover:text-cyan-300"
              >
                {friend.codechef || "N/A"}
              </Link>
            </td>
            <td className="py-2 px-4">
              <Link
                href={`https://auth.geeksforgeeks.org/user/${friend.gfg}/profile`}
                target="_blank"
                className="text-cyan-400 hover:text-cyan-300"
              >
                {friend.gfg || "N/A"}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
        
      </div>
    </div>
    // </div>
    // </div>
  );
}
