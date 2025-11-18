import React from 'react'
import Link from 'next/link'
import { Bell, Search } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const userNavbar = () => {
  const { user } = useAuth()
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mx-1 my-3 border-b border-[#F8F8F8] pb-3 gap-3 md:gap-0">
        {/* Left heading */}
        <h1 className="text-xl font-medium pt-2 md:pt-4">User</h1>
        {/* Right section */}
        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-3 items-center">
          {/* Search Box */}
          <div className="input bg-transparent border border-[#0000003D] w-full md:w-80 rounded-lg text-sm font-medium flex items-center px-2">
            <Search className="text-[#00000099]" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none px-2 py-2"
            />
          </div>

          {/* Notification Button */}
          <button className="p-2 h-9 w-9 text-center bg-[#FBFAFA] border border-[#00000014] rounded-lg text-black hover:bg-[#d6d4d4]">
            <Link href="/UserPages/Notification">
              <Bell size={17} />
            </Link>
          </button>

          {/* Profile */}
          <Link href="/AdminPages/ProfilePage">
            <div className="flex items-center gap-2 md:gap-3">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK9rGgm8OgAUlFDmVnVGkQxGBTfXJmPIXqQ0NJQ2myr-o6RjdFUxzRC3IgJcsKP6FizULs-F97sdgbxoFaAhM3WSfQgvRhSc2KZv1cqn8fvw&s=10"
                alt="img"
                className="w-9 h-9 md:w-11 md:h-11 rounded-full border border-[#1F2A44] p-0.5"
              />

              {/* Hide on small screens */}
              <div className="hidden sm:block">
                <p className="font-semibold text-gray-800">{user?.userName}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default userNavbar
