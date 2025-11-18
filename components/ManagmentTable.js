'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { authAPI } from '@/lib/api'
import toast from 'react-hot-toast'

export default function ManagmentTable({
  refreshTrigger,
  searchQuery,
  onCountChange,
}) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [refreshTrigger, searchQuery])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const params = {}
      if (searchQuery && searchQuery.trim() !== '') {
        params.search = searchQuery.trim()
      }
      const response = await authAPI.getAllUsers(params)
      const usersData = response.data.data.users
      setUsers(usersData)

      // Pass count to parent component
      if (onCountChange) {
        onCountChange(usersData?.length)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Failed to load users')
      if (onCountChange) {
        onCountChange(0)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow mt-6 border border-[#0000003D] p-8 text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-2 text-gray-600">Loading users...</p>
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow mt-6 border border-[#0000003D] p-8 text-center">
        <p className="text-gray-600">
          No users found. Create your first user to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow mt-6 border border-[#0000003D] p-2">
      {/* ---------- Desktop Table ---------- */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#0000003D] text-left">
              <th className="py-3 px-3 font-semibold">#</th>
              <th className="py-3 px-3 font-semibold">User Name</th>
              <th className="py-3 px-3 font-semibold">Access</th>
              <th className="py-3 px-3 font-semibold">Last Active</th>
              <th className="py-3 px-3 font-semibold">Date Added</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-b border-[#0000003D] hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="py-2 px-3">{index + 1}</td>

                {/* Profile */}
                <td className="py-2 px-3">
                  <Link href={`/AdminPages/UserDetailPage?id=${user.id}`}>
                    <div className="flex items-center gap-3 pt-3 cursor-pointer hover:opacity-80 transition-opacity">
                      <div className="w-11 h-11 rounded-full border border-[#1F2A44] p-0.5 bg-blue-500 flex items-center justify-center text-white font-bold">
                        {user.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {user.userName}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </Link>
                </td>

                {/* Access Tags */}
                <td className="py-2 px-3 text-[#00000099]">
                  <button
                    className={`btn shadow-none btn-sm mr-1 border-2 rounded-full ${
                      user.role === 'ADMIN'
                        ? 'text-[#4192FD] border-[#4192FD] bg-[#E1E7FF]'
                        : 'text-[#976DBC] border-[#B29EF1] bg-[#E1D5F1]'
                    }`}
                  >
                    {user.role}
                  </button>
                </td>

                <td className="py-2 px-3 text-[#00000099]">
                  {new Date(user.updatedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                </td>
                <td className="py-2 px-3">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Mobile Card Layout ---------- */}
      <div className="sm:hidden flex flex-col gap-3">
        {users.map((user, index) => (
          <div
            key={user.id}
            className="border border-[#0000003D] rounded-lg p-3 shadow-sm bg-white"
          >
            {/* Profile */}
            <Link href={`/AdminPages/UserDetailPage?id=${user.id}`}>
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 rounded-full border border-[#1F2A44] p-0.5 bg-blue-500 flex items-center justify-center text-white font-bold">
                  {user.userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{user.userName}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </Link>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                className={`text-xs px-3 py-1 border rounded-full ${
                  user.role === 'ADMIN'
                    ? 'text-[#4192FD] border-[#4192FD] bg-[#E1E7FF]'
                    : 'text-[#976DBC] border-[#B29EF1] bg-[#E1D5F1]'
                }`}
              >
                {user.role}
              </button>
            </div>

            {/* Other Info */}
            <p className="text-sm text-[#00000099] mt-2">
              Last Active:{' '}
              {new Date(user.updatedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })}
            </p>
            <p className="text-sm text-[#00000099]">
              Date Added:{' '}
              {new Date(user.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })}
            </p>

            <div className="flex justify-between mt-2">
              <p className="text-sm font-medium">#{index + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
