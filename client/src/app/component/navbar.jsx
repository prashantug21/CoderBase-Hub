"use client"
import "../css/navbar.css"
import Link from "next/link"
// import { useNavigate } from "react-router-dom"
// import { useAuth } from "../contexts/AuthContext"
// import { linkSync } from "fs"

export default function Navbar() {

    return (
        <div className="py-4 px-8 w-full flex flex-row justify-between gap-6 bg-neutral-900 text-neutral-100" id="navbar_container">
            <Link href="/">home image</Link>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 items-center">
                    {/* <Link href="/" className="text-2xl font-bold">Home</Link> */}
                    {/* <Link href="/potd" className="text-2xl font-bold hover:text-cyan-400 outline-none">POTD</Link>
                    <Link href="/contest" className="text-2xl font-bold hover:text-cyan-400 outline-none">Contests</Link> */}
                    <Link href="/login" className="text-lg font-bold bg-transparent border-4 px-4 py-2 rounded-3xl border-cyan-400 text-cyan-400 shadow-cyan-300 shadow-md hover:bg-cyan-400 hover:text-gray-900">Login</Link>
                    <span className="text-5xl">|</span>
                    <Link href="/signup" className="text-lg font-bold bg-transparent border-4 px-4 py-2 rounded-3xl border-cyan-400 text-cyan-400 shadow-cyan-300 shadow-md hover:bg-cyan-400 hover:text-gray-900">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}
