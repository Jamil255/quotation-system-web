/* eslint-disable react-hooks/immutability */
import { useState, useEffect, useRef } from 'react'
import { useNotification } from '@/context/NotificationContext'
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from '@/context/AuthContext'

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead } = useNotification()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  console.log('Notifications in Bell:', notifications)

  // Click Outside to Close
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownRef])

  const handleNotificationClick = (notif) => {
    if (!notif.is_seen) {
      markAsRead(notif.id)
    }
    // Always navigate to Notification page
    const isAdmin = user?.role === 'ADMIN'
    window.location.href = isAdmin
      ? '/AdminPages/Notification'
      : '/UserPages/Notification'
  }

  return (
    // 'relative' zaroori hai taake dropdown iske neeche aaye
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* --- BUTTON START --- */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none transition duration-200"
      >
        {/* Bell Icon SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>

        {/* Red Badge (Sirf tab dikhe jab count > 0) */}
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white border-2 border-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      {/* --- BUTTON END --- */}

      {/* --- DROPDOWN LIST START --- */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
            <h3 className="text-sm font-bold text-gray-800">Notifications</h3>
            <span className="text-xs font-medium bg-gray-200 px-2 py-1 rounded text-gray-600">
              {unreadCount} New
            </span>
          </div>

          {/* List Items */}
          <div className="max-h-[350px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-gray-500">No notifications yet.</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`block px-4 py-3 cursor-pointer border-b border-gray-50 transition-colors hover:bg-gray-50
                    ${!notif.is_seen ? 'bg-blue-50/50' : 'bg-white'}
                  `}
                >
                  <div className="flex justify-between items-start">
                    <p
                      className={`text-sm ${
                        !notif.is_seen
                          ? 'font-bold text-gray-900'
                          : 'font-medium text-gray-700'
                      }`}
                    >
                      {notif.title}
                    </p>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                      {/* Agar date-fns install nahi hai to niche wali line uncomment karein */}
                      {/* {new Date(notif.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} */}

                      {/* Agar date-fns install hai: */}
                      {notif.created_at
                        ? formatDistanceToNow(new Date(notif.created_at), {
                            addSuffix: true,
                          })
                        : ''}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                    {notif.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      {/* --- DROPDOWN LIST END --- */}
    </div>
  )
}
