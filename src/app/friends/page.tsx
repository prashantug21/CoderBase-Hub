"use client";
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';


export default function FriendsPage() {
    const context = useContext(UserContext);
    const friendsData = context?.userData?.friends || [];
    const [friends, setFriends] = useState(friendsData);
    // const context=useContext(UserContext);
    const data=context?.userData;
    const router = useRouter();
    useEffect(() => {
      if (!data?.userid) {
        router.push('/login');
      }
    }, [data, router]);

    useEffect(() => {
        if (friendsData.length > 0) {
            setFriends(friendsData);
        }
    }, [friendsData]);

    const handleInputChange = (index:any, event:any) => {
        const { name, value } = event.target;
        const updatedFriends = [...friends];
        updatedFriends[index] = { ...updatedFriends[index], [name]: value };
        setFriends(updatedFriends);
    };

    const addFriend = () => {
        setFriends([...friends, { name: "", leetcode: "", codechef: "", codeforces: "", gfg: "" }]);
    };

    const deleteFriend = (index:any) => {
        const updatedFriends = [...friends];
        updatedFriends.splice(index, 1); // Remove the friend from the array
        setFriends(updatedFriends);
    };

    const submitAllFriendsData = async () => {
        const res = await fetch("/api/editfriend", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(friends),
        });

        if (res.ok) {
            toast.success("Friends' profiles updated successfully");
        } else {
            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <div className="max-w-6xl bg-white w-11/12 m-7 p-4 py-11 text-center rounded-2xl">
                <h1 className="md:text-6xl text-3xl">Edit Friends</h1>
                <div className='overflow-scroll'>
                <table className="w-full table-auto border-collapse  ">
                    <thead>
                        <tr>
                            <th className="p-2 border-b-2 min-w-32">Friend Name</th>
                            <th className="p-2 border-b-2  min-w-32">LeetCode</th>
                            <th className="p-2 border-b-2  min-w-32">CodeChef</th>
                            <th className="p-2 border-b-2  min-w-32">CodeForces</th>
                            <th className="p-2 border-b-2  min-w-32">Gfg</th>
                            <th className="p-2 border-b-2  min-w-32">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {friends.map((friend:any, index:any) => (
                            <tr key={index}>
                                <td className="p-2 border-b-2">
                                    <input
                                        type="text"
                                        placeholder="Friend Name"
                                        value={friend.name || ""}
                                        name="name"
                                        onChange={(e) => handleInputChange(index, e)}
                                        className="text-lg p-2 outline-none border-gray-800 border-2 rounded-lg placeholder:text-gray-600 w-full"
                                    />
                                </td>
                                <td className="p-2 border-b-2">
                                    <input
                                        type="text"
                                        placeholder="LeetCode"
                                        value={friend.leetcode || ""}
                                        name="leetcode"
                                        onChange={(e) => handleInputChange(index, e)}
                                        className="text-lg p-2 outline-none border-gray-800 border-2 rounded-lg placeholder:text-gray-600 w-full"
                                    />
                                </td>
                                <td className="p-2 border-b-2">
                                    <input
                                        type="text"
                                        placeholder="CodeChef"
                                        value={friend.codechef || ""}
                                        name="codechef"
                                        onChange={(e) => handleInputChange(index, e)}
                                        className="text-lg p-2 outline-none border-gray-800 border-2 rounded-lg placeholder:text-gray-600 w-full"
                                    />
                                </td>
                                <td className="p-2 border-b-2">
                                    <input
                                        type="text"
                                        placeholder="CodeForces"
                                        value={friend.codeforces || ""}
                                        name="codeforces"
                                        onChange={(e) => handleInputChange(index, e)}
                                        className="text-lg p-2 outline-none border-gray-800 border-2 rounded-lg placeholder:text-gray-600 w-full"
                                    />
                                </td>
                                <td className="p-2 border-b-2">
                                    <input
                                        type="text"
                                        placeholder="Gfg"
                                        value={friend.gfg || ""}
                                        name="gfg"
                                        onChange={(e) => handleInputChange(index, e)}
                                        className="text-lg p-2 outline-none border-gray-800 border-2 rounded-lg placeholder:text-gray-600 w-full"
                                    />
                                </td>
                                <td className="p-2 border-b-2">
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => deleteFriend(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                <button
                    className="text-lg font-bold bg-transparent border-4 px-4 py-2 w-48 my-5 rounded-3xl border-green-400 text-green-400 shadow-green-300 shadow-md hover:bg-green-400 hover:text-gray-900"
                    onClick={addFriend}
                >
                    Add Friend
                </button>
                <button
                    className="text-lg font-bold bg-transparent border-4 px-4 py-2 w-48 my-5 rounded-3xl border-cyan-400 text-cyan-400 shadow-cyan-300 shadow-md hover:bg-cyan-400 hover:text-gray-900"
                    onClick={submitAllFriendsData}
                >
                    Submit All
                </button>
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
    );
}
