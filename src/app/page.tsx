'use client'
import Link from 'next/link'

export default function Page() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <div className="max-w-2xl w-full flex flex-col items-center gap-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center">
          Welcome to <span className="text-blue-600">CoderHub</span>
        </h1>
        <p className="text-lg text-gray-700 text-center">
          Track and showcase your competitive programming profiles across multiple platforms.<br />
          View stats, contest history, and more!
        </p>
        <div className="w-full flex flex-col md:flex-row gap-4 justify-center items-center">
          <input
            type="text"
            placeholder="Search username..."
            className="input w-full md:w-80 border-2 border-black rounded-lg px-4 py-2"
            onKeyDown={e => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                window.location.href = `/profile/${e.currentTarget.value.trim()}`
              }
            }}
          />
          <button
            onClick={() => {
              const input = document.querySelector<HTMLInputElement>('input[type="text"]');
              if (input && input.value.trim()) {
                window.location.href = `/profile/${input.value.trim()}`
              }
            }}
          >
            <span className="button_top">Search</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-6 justify-center mt-8">
          <PlatformIcon name="LeetCode" url="https://leetcode.com" />
          <PlatformIcon name="Codeforces" url="https://codeforces.com" />
          <PlatformIcon name="CodeChef" url="https://codechef.com" />
          <PlatformIcon name="GeeksforGeeks" url="https://geeksforgeeks.org" />
        </div>
        <div className="mt-8">
          <Link href="/edit" className="underline text-blue-600 hover:text-blue-800 font-medium">
            Edit your profile &rarr;
          </Link>
        </div>
      </div>
    </main>
  )
}

function PlatformIcon({ name, url }: { name: string, url: string }) {
  // You can replace these with SVGs or images as needed
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
      <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-black bg-gray-100 group-hover:bg-gray-200 transition">
        <span className="text-xl font-bold">{name[0]}</span>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-700">{name}</span>
    </a>
  )
}