"use client";
import { useContext } from "react";
import "../css/navbar.css";
import Link from "next/link";
import { UserContext } from "../context/UserContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { autocompleteClasses } from "@mui/material";
// import Cookies from "js-cookie"; // You might need to install this package

export default function Navbar() {
  const context = useContext(UserContext);
  const data = context?.userData;
  const router = useRouter();


  const handleLogout =async () => {
    // Remove the JWT cooki
    const res =await fetch("/api/logout", {
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    // Redirect to the main page
    window.location.href="/";

    // Optionally, you can reload the page to reset the state
    router.refresh();
  };
  if(data?.msg){
    return (      <div className="w-full h-full fixed inset-0 flex items-center justify-center bg-neutral-900 text-neutral-100">
      <div className="text-2xl">Loading...</div>
    </div>)
  }

  return (
    <div className="py-4 px-2 md:px-8 w-full flex flex-row justify-between items-center gap-6 bg-neutral-900 text-neutral-100" id="navbar_container">
      <Link href="/" className="font-bold md:text-3xl text-xl ">
        Home
      </Link>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          {!data.userid ? (
            <>
              <Link href="/login" className="text-lg font-bold bg-transparent border-4 px-4 py-2 rounded-3xl border-cyan-400 text-cyan-400 shadow-cyan-300 shadow-md hover:bg-cyan-400 hover:text-gray-900">
                Login
              </Link>
              <span className="text-5xl">|</span>
              <Link href="/signup" className="text-lg font-bold bg-transparent border-4 px-4 py-2 rounded-3xl border-cyan-400 text-cyan-400 shadow-cyan-300 shadow-md hover:bg-cyan-400 hover:text-gray-900">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link href={`/profile/${data.userid}`} className="md:text-lg text-base font-bold bg-transparent border-4 px-4 py-2 rounded-3xl border-cyan-400 text-cyan-400 shadow-cyan-300 shadow-md hover:bg-cyan-400 hover:text-gray-900">
                {data.userid}
              </Link> <span className="text-5xl">|</span>
              <button onClick={handleLogout} className="md:text-lg text-base font-bold bg-transparent border-4 px-4 py-2 rounded-3xl border-red-500 text-red-500 shadow-red-400 shadow-md hover:bg-red-500 hover:text-gray-900">
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
