'use client'
import { PanelsTopLeft, Pentagon, UserPlus, Users, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()

  const isActive = (path) => pathname === path

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      await logout()
    }
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-sky-400 px-3 py-2 rounded"
        onClick={() => setOpen(!open)}
      >
        <PanelsTopLeft />
      </button>

      {/* FIXED SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-5 flex flex-col z-40 overflow-y-auto
          transform duration-300 
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="text-2xl mb-6">
          <svg
            width="29"
            height="41"
            viewBox="0 0 29 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block mr-3"
          >
            <path
              d="M13.1462 40.3303V33.4317C18.7591 33.4317 18.6299 29.5402 18.1875 27.5944H3.32896C0.144993 27.5944 -0.297824 22.5832 0.144394 19.8998H2.00231V17.5118H0.675654V15.1238H2.7983V17.2465H3.85962V14.3279H6.2476V17.2465H8.37024V15.6545H10.2276V13.5319H12.3502V15.1238H14.4728V16.7158H12.3502V19.3691H15.2688V17.2465H17.6568V19.8998H20.0448V14.5932H22.9634V16.7158H24.8207V15.1238H27.4741V17.5118H24.8207V19.8998H26.9434C29.2783 34.5461 18.7181 39.6227 13.1462 40.3303Z"
              fill="#008CFF"
            />
            <path
              d="M6.81568 12.2052H8.93833V14.3279H6.81568V12.2052Z"
              fill="#008CFF"
            />
            <path
              d="M12.1223 11.1439H14.2449V13.2665H12.1223V11.1439Z"
              fill="#008CFF"
            />
            <path
              d="M1.50907 10.0826H3.63171V12.2052H1.50907V10.0826Z"
              fill="#008CFF"
            />
            <path
              d="M15.3063 9.55191H17.4289V11.6746H15.3063V9.55191Z"
              fill="#008CFF"
            />
            <path
              d="M16.3676 12.7359H18.4902V14.8585H16.3676V12.7359Z"
              fill="#008CFF"
            />
            <path
              d="M0.447746 6.36794H2.57039V8.49058H0.447746V6.36794Z"
              fill="#008CFF"
            />
            <path
              d="M13.1836 6.8986H15.3063V9.02124H13.1836V6.8986Z"
              fill="#008CFF"
            />
            <path
              d="M4.69304 9.02124H6.81568V11.1439H4.69304V9.02124Z"
              fill="#008CFF"
            />
            <path
              d="M18.4902 8.49058H20.6129V10.6132H18.4902V8.49058Z"
              fill="#008CFF"
            />
            <path
              d="M6.28502 5.30661H8.40767V7.42926H6.28502V5.30661Z"
              fill="#008CFF"
            />
            <path
              d="M20.0822 4.77595H22.2049V6.8986H20.0822V4.77595Z"
              fill="#008CFF"
            />
            <path
              d="M15.8369 1.06132H17.9596V3.18397H15.8369V1.06132Z"
              fill="#008CFF"
            />
            <path d="M3.63171 0H5.75436V2.12265H3.63171V0Z" fill="#008CFF" />
            <path
              d="M9.46899 7.95992H11.5916V10.0826H9.46899V7.95992Z"
              fill="#008CFF"
            />
            <path
              d="M23.2662 7.42926H25.3888V9.55191H23.2662V7.42926Z"
              fill="#008CFF"
            />
            <path
              d="M25.9195 10.6132H28.0421V12.7359H25.9195V10.6132Z"
              fill="#008CFF"
            />
          </svg>
          SD Quotation
        </div>

        {/* Create Quotation */}
        <button className="bg-[#008CFF] text-white py-2 rounded mb-4 shadow hover:bg-[#0183ec]">
          <Link href="/invoice/invoice">+ Create Quotation</Link>
        </button>

        {/* Dashboard */}
        <Link
          href="/AdminPages/Dashboard"
          className={`block py-2 px-3 rounded mb-3  
            ${
              isActive('/AdminPages/Dashboard')
                ? 'bg-[#1C2730] text-white shadow'
                : 'text-black'
            }
          `}
        >
          <Pentagon size={16} className="inline-block mb-1" /> Dashboard
        </Link>

        {/* Nav Links */}
        <nav className="space-y-3">
          <Link
            href="/AdminPages/ClientPage"
            className={`block py-2 px-3 rounded 
              ${
                isActive('/AdminPages/ClientPage')
                  ? 'bg-[#1C2730] text-white shadow'
                  : 'text-black'
              }
            `}
          >
            <Users size={16} className="inline-block mb-1" /> Client List
          </Link>

          <Link
            href="/AdminPages/UserManagment"
            className={`block py-2 px-3 rounded 
              ${
                isActive('/AdminPages/UserManagment')
                  ? 'bg-[#1C2730] text-white shadow'
                  : 'text-black'
              }
            `}
          >
            <UserPlus size={16} className="inline-block mb-1" /> User Management
          </Link>
        </nav>

        {/* Profile & Logout */}
        <div className="mt-auto pt-6 space-y-3">
          <Link href="/AdminPages/ProfilePage">
            <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded">
              <div className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {user?.userName?.[0]?.toUpperCase() || 'A'}
              </div>
              <div>
                <p className="font-semibold">{user?.userName || 'Admin'}</p>
                <p className="text-sm text-gray-500">
                  {user?.company?.name || 'Business Owner'}
                </p>
              </div>
            </div>
          </Link>

          {/* <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 py-2 px-3 rounded text-red-600 hover:bg-red-50"
          >
            <LogOut size={16} />
            Logout
          </button> */}
        </div>
      </div>
    </>
  )
}
