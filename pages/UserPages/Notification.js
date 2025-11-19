import UserSidebarProfile from '@/components/UserSidebarProfile'
import { EllipsisVertical } from 'lucide-react'
import React from 'react'
import { useNotification } from '@/context/NotificationContext'
import { formatDistanceToNow } from 'date-fns'
import ProtectedRoute from '@/components/ProtectedRoute'

const Notification = () => {
  const { notifications, markAsRead } = useNotification()

  const handleNotificationClick = (notif) => {
    if (!notif.is_seen) {
      markAsRead(notif.id)
    }
  }

  return (
    <ProtectedRoute>
      <div>
        <div className="flex min-h-screen">
          <UserSidebarProfile />
          <div className="md:ml-64 flex-1 p-8 overflow-y-auto h-150">
            <div>
              <h1 className="text-center font-medium text-xl">Notifications</h1>
            </div>
            <div>
              <p className="text-[#00000099]">
                You have{' '}
                <span className="text-[#008CFF] text-sm">
                  {notifications.filter((n) => !n.is_seen).length} New
                </span>{' '}
                notifications
              </p>
            </div>
            <div className="my-4">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No notifications yet.</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className={`flex justify-between gap-3 mb-6 my-1 shadow p-3 rounded-xl cursor-pointer transition-colors hover:bg-gray-50 ${
                      !notif.is_seen
                        ? 'bg-blue-50/50 border-l-4 border-blue-500'
                        : 'bg-white'
                    }`}
                  >
                    <div className="flex justify-between gap-2">
                      <div className="w-14 h-14 rounded-full">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK9rGgm8OgAUlFDmVnVGkQxGBTfXJmPIXqQ0NJQ2myr-o6RjdFUxzRC3IgJcsKP6FizULs-F97sdgbxoFaAhM3WSfQgvRhSc2KZv1cqn8fvw&s=10"
                          alt="img"
                          className="w-13 h-13 rounded-full border border-[#1F2A44] p-0.5"
                        />
                      </div>
                      <div className="mt-2 flex-1">
                        <h2
                          className={`font-semibold text-gray-800 ${
                            !notif.is_seen ? 'font-bold' : ''
                          }`}
                        >
                          {notif.title}
                          <span className="text-[#00000099] text-sm font-normal ml-2">
                            {notif.message}
                          </span>
                        </h2>
                        <p className="text-xs text-[#00000099]">
                          {notif.created_at
                            ? formatDistanceToNow(new Date(notif.created_at), {
                                addSuffix: true,
                              })
                            : 'Just now'}
                        </p>
                      </div>
                    </div>
                    <EllipsisVertical
                      className="mt-4"
                      onClick={(e) => {
                        e.stopPropagation()
                        document.getElementById('my_modal_2').showModal()
                      }}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <dialog id="my_modal_2" className="modal">
          <div className=" modal-box w-30 overflow-hidden bg-transparent shadow-none">
            <button className="btn bg-white text-black border-none">
              Delete
            </button>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </ProtectedRoute>
  )
}

export default Notification
