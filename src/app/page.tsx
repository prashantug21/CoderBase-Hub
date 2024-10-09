"use client"
import Link from "next/link";
import "./css/home.css";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

export default function Home() {
  const context = useContext(UserContext);

  

  return (
    <main className="w-full flex flex-col p-8 items-center justify-center my-4 text-center  min-h-screen">
      <div className="lg:text-8xl md:text-6xl text-4xl font-bold text-white mb-8">
        TRACK, ANALYZE AND <span className="text-cyan-300">CONNECT</span>
      </div>
      <div className="max-w-3xl text-center text-white mb-12">
        <p className="text-lg mb-4">
          Welcome to our platform where you can track your progress, analyze your performance, and connect with others in the community. Explore the features we offer and make the most out of your experience.
        </p>
        <p className="text-lg mb-4">
          Get started by visiting the <Link href="/editform" className="text-cyan-300 font-bold">Edit Profile</Link> page to personalize your profile.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Link href={`${(context?.userData?.userid)?"/profile/"+context?.userData?.userid:"/login"}`} className="text-lg font-bold bg-transparent border-4 px-6 py-3 rounded-full border-white text-white shadow-lg hover:bg-white hover:text-teal-500 transition-colors">
          View Profile
        </Link>
        {/* <Link href="/login" className="text-lg font-bold bg-transparent border-4 px-6 py-3 rounded-full border-white text-white shadow-lg hover:bg-white hover:text-teal-500 transition-colors">
          Learn More
        </Link> */}
      </div>
    </main>
  );
}
