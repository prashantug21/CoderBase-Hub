import { IoSearchOutline } from "react-icons/io5";
import "./css/home.css"
export default function Home() {
  return (
    <main className="w-full flex flex-col items-center my-4">
      <div className="text-7xl items-center my-4
      ">
        TRACK, ANALYZE AND <span className="text-cyan-400 p-0 m-0">CONNECT</span>
      </div>
      <div className="my-auto flex gap-3">
        <input
          type="text"
          placeholder="Profile id"
          className=" bg-transparent text-3xl py-2 px-4 max-w-2xl rounded-full w-96  border-b-4 outline-none p-0 border-cyan-400 hover:shadow-cyan-300"
          autoComplete="false"
          id="profile_search_input"
        />
        <button className="text-4xl bg-transparent border-4 px-2 py-2 rounded-3xl border-cyan-400 text-cyan-400 shadow-cyan-300 shadow-md hover:bg-cyan-400 hover:text-gray-900" >
        <IoSearchOutline />
        </button>
      </div>
    </main>
  );
}
