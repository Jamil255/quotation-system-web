import UserSidebarProfile from '../../components/UserSidebarProfile'
import ProtectedRoute from '../../components/ProtectedRoute'
import { useAuth } from '@/context/AuthContext'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <UserSidebarProfile />
        <div className="md:ml-64 flex-1 p-8">
          <div className="max-w-4xl mx-aut p-10">
            {/* Profile Section */}
            <div className="flex items-start mb-8">
              <div className="w-28 h-28 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold border border-[#1F2A44] p-0.5">
                {user?.userName?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="ml-4 mt-5">
                <h2 className="text-2xl font-bold">{user?.userName}</h2>
                <p className="text-gray-500">{user?.role}</p>
              </div>
            </div>

            {/* Form Fields */}
            <form className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={user?.userName || ''}
                  readOnly
                  className="w-full border border-[#0000003D] rounded px-3 py-2 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  className="w-full border border-[#0000003D] rounded px-3 py-2 bg-gray-50"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={user?.address || 'Not provided'}
                  readOnly
                  className="w-full border border-[#0000003D] rounded px-3 py-2 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={user?.role || ''}
                  readOnly
                  className="w-full border border-[#0000003D] rounded px-3 py-2 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={user?.company?.name || ''}
                  readOnly
                  className="w-full border border-[#0000003D] rounded px-3 py-2 bg-gray-50"
                />
              </div>
            </form>

            {/* Info */}
            <div className="mt-8">
              <p className="text-sm text-gray-500 text-center">
                Profile information is read-only. Contact admin to make changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
