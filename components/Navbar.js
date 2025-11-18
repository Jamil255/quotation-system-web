'use client'
import React from 'react'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const Navbar = ({ title, dec }) => {
  const { user } = useAuth()
  return (
    <div className="w-full">
      <div
        className="
          flex justify-between items-center 
          mx-1 my-3 border-b border-[#F8F8F8]
          flex-wrap gap-3
        "
      >
        {/* LEFT TEXT */}
        <div className="min-w-[180px]">
          <h1 className="text-lg font-medium">{title}</h1>
          <p className="text-sm text-[#535862]">{dec}</p>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3">
          {/* Notification Button */}
          <button className="p-2 h-9 w-9 text-center bg-[#FBFAFA] border border-[#00000014] rounded-lg text-black hover:bg-[#d6d4d4]">
            <Link href="/AdminPages/Notification">
              <Bell size={17} />
            </Link>
          </button>

          {/* Profile */}
          <Link href="/AdminPages/ProfilePage">
            <div className="flex items-center gap-3">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK9rGgm8OgAUlFDmVnVGkQxGBTfXJmPIXqQ0NJQ2myr-o6RjdFUxzRC3IgJcsKP6FizULs-F97sdgbxoFaAhM3WSfQgvRhSc2KZv1cqn8fvw&s=10"
                alt="img"
                className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#1F2A44] p-0.5"
              />

              {/* Hide username on small screens */}
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

export default Navbar
