'use client'
import { useAuth } from '@/context/AuthContext'
import API from '@/pages/Config/api'
import {
  User,
  Settings,
  Bell,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  ChevronDown,
  PanelsTopLeft,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SidebarProfile() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [open, setOpen] = useState(false) // mobile toggle

  const isActive = (path) => pathname === path

  // Logout function
  const handleLogout = async () => {
    try {
      await API.post('/api/auth/logout')
      router.push('/')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  const menuItems = [
    { name: 'My Profile', icon: User, href: '/AdminPages/ProfilePage' },
    { name: 'Notifications', icon: Bell, href: '/AdminPages/Notification' },
    { name: 'FAQ', icon: HelpCircle, href: '/AdminPages/FAQ' },
    { name: 'About App', icon: Info, href: '/AdminPages/About' },
  ]

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 text-[#008CFF] z-50"
      >
        <PanelsTopLeft />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-[#00000014] shadow p-5 flex flex-col justify-between 
          transform duration-300 z-40
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Top Section */}
        <div>
          {/* Profile */}
          <Link href={'/AdminPages/Dashboard'}>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK9rGgm8OgAUlFDmVnVGkQxGBTfXJmPIXqQ0NJQ2myr-o6RjdFUxzRC3IgJcsKP6FizULs-F97sdgbxoFaAhM3WSfQgvRhSc2KZv1cqn8fvw&s=10"
                className="w-12 h-12 rounded-full border border-[#1F2A44] p-0.5"
              />
              <div>
                <h2 className="font-semibold text-gray-800">
                  {user?.userName}
                </h2>
                <p className="text-xs text-[#00000099]">{user?.email}</p>
              </div>
            </div>
          </Link>

          {/* Menu */}
          <nav className="space-y-2">
            {menuItems.map((item, i) => {
              const Icon = item.icon
              const active = isActive(item.href)

              return (
                <Link
                  key={i}
                  href={item.href}
                  className={`flex justify-between items-center p-2 rounded border-b border-gray-100 
                    ${
                      active
                        ? 'text-[#008CFF] bg-blue-50'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-[#008CFF]'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </div>

                  {/* Arrow change on active */}
                  {active ? (
                    <ChevronRight className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Logout */}
        <Link
          href={'/'}
          className="flex items-center gap-2 text-red-500 p-2 rounded hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" /> Logout
        </Link>
      </div>
    </>
  )
}
