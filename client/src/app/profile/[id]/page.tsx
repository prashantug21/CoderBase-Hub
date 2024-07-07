"use client";
import { CiLocationOn } from "react-icons/ci";
import { CiGlobe } from "react-icons/ci";
import { FaGraduationCap } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { CiLinkedin } from "react-icons/ci";
import { FaGithubAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import axios from "axios";
import "../../css/profile.css";
import { colors } from "@mui/material";

const StyledText = styled("text")(({ theme }) => ({
  fill: "white",
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 40,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + 50 + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function Page({ params }: { params: { id: string } }) {
  const [leetdata, setLeetData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             const result = await leetcode_u(params.id);
  //             console.log(result);
  //             setLeetData(result);
  //             setLoading(false);
  //         } catch (error: any) {
  //             setError(error);
  //             // console.log(error);
  //             console.log("adf")
  //             setLoading(false);
  //         }
  //     };
  //     fetchData();
  // }, [params.id]);

  // if(loading){
  //     return <div>loading</div>
  // }
  const data = [
    { label: "Easy", value: 80, color: "green" },
    { label: "Medium", value: 80, color: "orange" },
    { label: "Hard", value: 80, color: "red" },
  ];

  return (
    <div className="max-w-7xl flex w-full my-8 text-slate-400 m-4">
      <div className="flex w-full justify-between">
        <div className="flex flex-col bg-slate-700  p-4 gap-3">
          <div className="flex">
            <div>profile image</div>
            <div className="flex flex-col">
              <span className="text-2xl">Prashant Yadav</span>
              <span>@karneel</span>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <CiLocationOn /> location
          </div>
          <div className="flex gap-1 items-center">
            <FaGraduationCap /> education
          </div>
          <div className="flex gap-1 items-center">
            <TfiEmail /> Email
          </div>
          <div className="flex gap-1 items-center">
            <CiGlobe /> website
          </div>
          <div className="flex gap-1 items-center">
            <CiLinkedin /> linkedin
          </div>
          <div className="flex gap-1 items-center">
            <FaGithubAlt /> github
          </div>
        </div>
        <div className="flex bg-slate-700 p-10 gap-8 overflow-visible">
          <PieChart
            series={[
              {
                innerRadius: 70,
                data: data,
                cx: 100,
                cornerRadius: 10,
                paddingAngle: 1,
                outerRadius: 80,
              },
            ]}
            height={200}
            width={200}
            slotProps={{ legend: { hidden: true } }}
            className="m-0 p-0"
          >
            <PieCenterLabel>200</PieCenterLabel>
          </PieChart>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col bg-slate-950 p-2 rounded-md w-20 justify-center items-center">
              <div className="text-green-600">Easy</div> <div>120</div>
            </div>
            <div className="flex flex-col bg-slate-950 p-2 rounded-md w-20 justify-center items-center">
              <div className="text-amber-500">Medium</div> <div>120</div>
            </div>
            <div className="flex flex-col bg-slate-950 p-2 rounded-md w-20 justify-center items-center">
              <div className="text-red-600">Hard</div> <div>120</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 justify-between w-4/12">
          <div className="flex gap-5 ">
            <div className="p-10 w-52 bg-slate-700 py-12 flex flex-col items-center">
              <div>Leetcode</div>
              <div>80</div>
            </div>
            <div className="p-10 w-52 bg-slate-700 py-12 flex flex-col items-center">
              <div>Leetcode</div>
              <div>80</div>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="bg-slate-700 w-52 p-10 py-12 flex flex-col items-center">
              <div>Leetcode</div>
              <div>80</div>
            </div>
            <div className="bg-slate-700 w-52 p-10 py-12 flex flex-col items-center">
              <div>Leetcode</div>
              <div>80</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
