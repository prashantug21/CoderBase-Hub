"use client"
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';

export default function page() {
    const context = useContext(UserContext);
    const data=context?.userData;
    const [handles, setHandles] = useState({ leetcode: (data?.leetdata?.handle || ""), codechef: (data?.codechefdata?.handle || ""), codeforces: (data?.codeforcesdata?.handle || ""), gfg: (data?.gfgdata?.handle || "") });
    const router=useRouter();
    useEffect(() => {
      if (!data?.userid) {
        router.push('/login');
      }
    }, [data, router]);

    useEffect(() => {
        if(data){
            setHandles({
                leetcode: data?.leetdata?.handle || "",
                codechef: data?.codechefdata?.handle || "",
                codeforces: data?.codeforcesdata?.handle || "",
                gfg: data?.gfgdata?.handle || ""
            });
        }
    },[data])
    async function submitEvent(){
        console.log(handles)
        const res = await fetch("/api/editform", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(handles),
        });

        if (res.ok) {
            toast.success("Profile updated successfully");
            setHandles({ leetcode: "", codechef: "", codeforces: "", gfg: "" });
            window.location.href = "/";
        }else{
            toast.error("Something went wrong");
        }

    }

    return (
        <>
            <div className="max-w-2xl bg-white w-11/12 m-7 p-4 py-11 text-center rounded-2xl">
                <h1 className="md:text-6xl text-4xl">Edit Profile</h1>
                <form className="flex m-8 flex-col gap-7 text-left">
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="LeetCode"
                            value={handles.leetcode}
                            name="leetcode"
                            onChange={(e) => setHandles({ ...handles, leetcode: e.target.value })}
                            className="text-3xl p-3 outline-none border-gray-800 border-2 rounded-lg placeholder:text-gray-600 w-full"
                            autoComplete="off"
                        />
                    </div>
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="CodeChef"
                            value={handles.codechef}
                            name="codechef"
                            onChange={(e) => setHandles({ ...handles, codechef: e.target.value })}
                            className="text-3xl p-3 outline-none border-gray-800 border-2 rounded-lg placeholder:text-gray-600 w-full"
                            autoComplete="off"
                        />
                    </div>
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="CodeForces"
                            value={handles.codeforces}
                            name="codeforces"
                            onChange={(e) => setHandles({ ...handles, codeforces: e.target.value })}
                            className="text-3xl p-3 outline-none border-gray-800 border-2 rounded-lg placeholder:text-gray-600 w-full"
                            autoComplete="off"
                        />
                    </div>
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="Gfg"
                            value={handles.gfg}
                            name="gfg"
                            onChange={(e) => setHandles({ ...handles, gfg: e.target.value })}
                            className="text-3xl p-3 outline-none border-gray-800 border-2 rounded-lg placeholder:text-gray-600 w-full"
                            autoComplete="off"
                        />
                    </div>
                    <button
              className="text-lg font-bold bg-transparent border-4 px-4 py-2 w-48 my-5 rounded-3xl border-cyan-400 text-cyan-400 shadow-cyan-300 shadow-md hover:bg-cyan-400 hover:text-gray-900"
              onClick={(e) => {
                e.preventDefault();
                submitEvent();
              }}
            >
              Submit
            </button>
                </form>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
        </>
    )
}
