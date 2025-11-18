'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SidebarProfile from '../../components/SidebarProfile'
import ProtectedRoute from '../../components/ProtectedRoute'
import { authAPI } from '@/lib/api'
import toast from 'react-hot-toast'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function UserDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    userName: '',
    address: '',
  })

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true)
      const response = await authAPI.getUserById(id)
      const userData = response.data.data
      setUser(userData)
      setFormData({
        userName: userData.userName || '',
        address: userData.address || '',
      })
    } catch (error) {
      console.error('Error fetching user:', error)
      toast.error('Failed to load user details')
      router.push('/AdminPages/UserManagment')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchUserDetails()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await authAPI.updateUser(id, formData)
      const updatedUser = response.data.data
      setUser(updatedUser)
      toast.success('User updated successfully!')
    } catch (error) {
      console.error('Update error:', error)
      toast.error(error.response?.data?.message || 'Failed to update user')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <ProtectedRoute adminOnly>
        <div className="flex min-h-screen">
          <SidebarProfile />
          <div className="md:ml-64 flex-1 p-8 flex items-center justify-center">
            <div className="text-center">
              <span className="loading loading-spinner loading-lg"></span>
              <p className="mt-2 text-gray-600">Loading user details...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (!user) {
    return null
  }

  return (
    <ProtectedRoute adminOnly>
      <div className="flex min-h-screen">
        <SidebarProfile />
        <div className="md:ml-64 flex-1 p-8">
          <div className="max-w-4xl mx-auto p-10">
            {/* Back Button */}
            <Link href="/AdminPages/UserManagment">
              <button className="flex items-center gap-2 text-[#008CFF] mb-6 hover:underline">
                <ArrowLeft size={20} />
                Back to User Management
              </button>
            </Link>

            {/* Profile Section */}
            <div className="flex items-start mb-8">
              <div className="w-28 h-28 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold border border-[#1F2A44] p-0.5">
                {user?.userName?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="ml-6 mt-5">
                <h2 className="text-2xl font-bold text-gray-800">
                  {user?.userName}
                </h2>
                <p className="text-gray-600">{user?.email}</p>
                <div className="mt-2">
                  <span
                    className={`inline-block px-3 py-1 text-sm rounded-full ${
                      user?.role === 'ADMIN'
                        ? 'text-[#4192FD] border border-[#4192FD] bg-[#E1E7FF]'
                        : 'text-[#976DBC] border border-[#B29EF1] bg-[#E1D5F1]'
                    }`}
                  >
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>

            {/* User Details */}
            <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username *
                </label>
                <input
                  type="text"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                  className="w-full border border-[#0000003D] rounded px-3 py-2"
                  required
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
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full border border-[#0000003D] rounded px-3 py-2"
                  placeholder="Enter address"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Added
                </label>
                <input
                  type="text"
                  value={
                    user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: '2-digit',
                          year: 'numeric',
                        })
                      : ''
                  }
                  readOnly
                  className="w-full border border-[#0000003D] rounded px-3 py-2 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Active
                </label>
                <input
                  type="text"
                  value={
                    user?.updatedAt
                      ? new Date(user.updatedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: '2-digit',
                          year: 'numeric',
                        })
                      : ''
                  }
                  readOnly
                  className="w-full border border-[#0000003D] rounded px-3 py-2 bg-gray-50"
                />
              </div>

              {/* Save Button */}
              <div className="col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-[#008CFF] text-white py-2 rounded-lg hover:bg-[#0183ec] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="loading loading-spinner loading-sm"></span>
                      Saving...
                    </span>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>

            {/* Info Message */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-700">
                As an admin, you can edit username and address for any user in
                your company.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
