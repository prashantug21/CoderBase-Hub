'use client'
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from "recharts";
import Loader from "@/app/Components/Loader";

const Page = () => {
    const { username } = useParams<{ username: string }>();
    const query = useQuery({
        queryKey: ["user", username],
        queryFn: async () => {
            const res = await fetch(`/api/userdata`, {
                method: "POST",
                body: JSON.stringify({ handle: username }),
            })
            return res.json();
        }
    })
    const [index, setIndex] = useState(0);

    const chartConfig = {
        rating: {
            label: "Rating",
            color: "#000000",
        },
    } satisfies ChartConfig
    if (query.isLoading) return <><Loader /></>;
    if (query.isError) return <div className='w-full flex justify-center items-center h-screen'>Error: {(query.error as unknown as Error).message}</div>;
    if (!query.data || query.data.length === 0) return <div className='w-full flex justify-center items-center h-screen'>No data found</div>;

    // Safely check platform data before rendering
    const gfgData = query.data[2]?.status === "ok" ? query.data[2] : { easy: 0, medium: 0, hard: 0, total: 0 };
    const codeforcesData = query.data[1]?.status === "ok" ? query.data[1] : { easy: 0, medium: 0, hard: 0, total: 0 };
    const leetcodeData = query.data[3]?.status === "ok" ? query.data[3] : { easy: 0, medium: 0, hard: 0, total: 0 };

    // Platforms for chart display
    const platforms = [
        { name: "CodeChef", index: 0, data: query.data[0] },
        { name: "Codeforces", index: 1, data: query.data[1] },
        { name: "Leetcode", index: 3, data: query.data[3] }
    ].filter(platform => platform.data?.status === "ok");

    // Safely handle rating chart data
    const currentPlatform = platforms.find(p => p.index === index) || platforms[0];
    const chartData = currentPlatform?.data?.contestHistory || [];
    const currentRating = currentPlatform?.data?.currentRating ? Math.round(currentPlatform.data.currentRating) : "-";
    const maxRating = currentPlatform?.data?.maxRating ? Math.round(currentPlatform.data.maxRating) : "-";

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <div className="w-full grid lg:flex lg:justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                <Card className={`w-full md:max-w-sm  shadow-[8px_8px_0px_0px_rgba(0,0,0)] rounded-2xl border-2 border-black`}>
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-center">
                            Geeksforgeeks Stats
                            {query.data[2]?.status === "error" && <span className="text-sm text-red-500 block mt-1">(Profile not found)</span>}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 justify-items-center gap-4 ">
                            <p className="text-lg font-semibold easy">Easy: {gfgData.easy}</p>
                            <p className="text-lg font-semibold medium">Medium: {gfgData.medium}</p>
                            <p className="text-lg font-semibold hard">Hard: {gfgData.hard}</p>
                            <p className="text-lg font-semibold total">Total: {gfgData.total}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className={`w-full md:max-w-sm p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0)] rounded-2xl border-2 border-black`}>
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-center">
                            Codeforces Stats
                            {query.data[1]?.status === "error" && <span className="text-sm text-red-500 block mt-1">(Profile not found)</span>}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="">
                        <div className="grid grid-cols-2 justify-items-center gap-4">
                            <p className="text-lg font-semibold easy">Easy: {codeforcesData.easy}</p>
                            <p className="text-lg font-semibold medium">Medium: {codeforcesData.medium}</p>
                            <p className="text-lg font-semibold hard">Hard: {codeforcesData.hard}</p>
                            <p className="text-lg font-semibold total">Total: {codeforcesData.total}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className={`w-full md:max-w-sm md:col-span-2 lg:col-span-1 lg:max-w-sm p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0)] rounded-2xl border-2 border-black`}>
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-center">
                            Leetcode Stats
                            {query.data[3]?.status === "error" && <span className="text-sm text-red-500 block mt-1">(Profile not found)</span>}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="">
                        <div className="grid grid-cols-2 justify-items-center gap-4">
                            <p className="text-lg font-semibold easy">Easy: {leetcodeData.easy}</p>
                            <p className="text-lg font-semibold medium">Medium: {leetcodeData.medium}</p>
                            <p className="text-lg font-semibold hard">Hard: {leetcodeData.hard}</p>
                            <p className="text-lg font-semibold total">Total: {leetcodeData.total}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="w-full py-8">
                {platforms.length > 0 ? (
                    <Card className={`w-full p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0)] rounded-2xl border-2 border-black h-full`}>
                        <CardHeader>
                            <CardTitle className="flex flex-col gap-2 ">
                                <div className="flex gap-2 overflow-x-auto scrollbar-hidden py-2">
                                    {platforms.map((platform) => (
                                        <button key={platform.name}>
                                            <span
                                                className={`button_top ${index === platform.index ? 'bg-gray-200' : ''}`}
                                                onClick={() => setIndex(platform.index)}
                                            >
                                                {platform.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-blue-500 font-semibold">Current Rating: {currentRating}</span>
                                    <span className="text-green-500 font-semibold">Max Rating: {maxRating}</span>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {chartData.length > 0 ? (
                                <ChartContainer config={chartConfig} className="aspect-auto h-[300px]">
                                    <LineChart
                                        accessibilityLayer
                                        className="max-h-fit"
                                        data={chartData}
                                        margin={{ left: 12, right: 12 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="date"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) => value.slice(5)} // Show MM-DD
                                        />
                                        <Tooltip
                                            cursor={false}
                                            content={({ payload }) => {
                                                if (!payload || payload.length === 0) return null;
                                                const { rating, contestName } = payload[0].payload;
                                                return (
                                                    <div className="bg-white p-2 rounded-md shadow-md">
                                                        <p className="font-semibold">{contestName}</p>
                                                        <p className="font-bold">Rating: {Math.round(rating)}</p>
                                                    </div>
                                                );
                                            }}
                                        />
                                        <Line
                                            dataKey="rating"
                                            stroke="#000000"
                                            strokeWidth={2}
                                            dot={{ fill: "#000000", r: 2 }}
                                        />
                                    </LineChart>
                                </ChartContainer>
                            ) : (
                                <div className="flex justify-center items-center h-[300px]">
                                    <p className="text-gray-500">No contest history available</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="w-full p-4 shadow-md rounded-lg border border-gray-200">
                        <div className="flex justify-center items-center h-[300px]">
                            <p className="text-gray-500">No platform data available for rating chart</p>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default Page