'use client'
import { useUser } from '@clerk/nextjs'
import React, { use, useEffect, useRef, useState } from 'react'
import Loader from '../Components/Loader'
import { redirect } from 'next/navigation'
import { useGetHandlesQuery } from '@/lib/requests/profileData'
import { RootState } from '@/lib/store'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setUserInfo } from '@/lib/slices/user'


const Page = () => {
    const { data, error, isLoading } = useGetHandlesQuery({});
    const { isSignedIn, user, isLoaded } = useUser()
    const dispatch = useAppDispatch();
    const userhandles=useAppSelector((state: RootState)=>state.user);
    useEffect(() => {
        if(isLoading){
            return;
        }
        if(data){
            dispatch(setUserInfo(data));
        }
        
    },[isLoading])
    if (!isLoaded) return <><Loader /></>
    if (!isSignedIn) {
        redirect('/sign-in')
    }
    if (isLoading) return <><Loader /></>;
    if (error) return <div className='w-full flex justify-center items-center h-screen bg-white'>Error: {(error as unknown as Error).message}</div>;



    const handleSubmit = () => {

    }
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 ">
            <div className="w-full max-w-md mx-auto bg-white p-4">
                <h1 className="text-3xl font-bold text-gray-900">Edit your profile</h1>
                <p className="mt-1 text-sm text-gray-600">
                    This information will be displayed publicly so be careful what you share.
                </p>
                <div className='flex flex-col space-y-4 mt-4'>
                    <label htmlFor="leetcodeUsername">LeetCode Username</label>
                    <div className="input-container w-full">
                        <input type="text" id="leetcodeUsername" className="input" placeholder="LeetCode Username" />
                    </div>
                    <label htmlFor="codeforcesUsername">Codeforces Username</label>
                    <div className="input-container w-full">
                        <input type="text" id="codeforcesUsername" className="input" placeholder="Codeforces Username" />
                    </div>
                    <label htmlFor="codechefUsername">CodeChef Username</label>
                    <div className="input-container w-full">
                        <input type="text" id="codechefUsername" className="input" placeholder="codechef Username" />
                    </div>
                    <label htmlFor="gfgUsername">GeeksForGeeks Username</label>
                    <div className="input-container w-full">
                        <input type="text" id="gfgUsername" className="input" placeholder="GeeksforGeeks Username" />
                    </div>
                    <div className="flex justify-center">
                        <button onClick={handleSubmit}>
                            <span className="button_top"> Save Changes </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
