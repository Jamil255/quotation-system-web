'use client'
import { useRef, useState } from 'react'
import SidebarProfile from '../../components/SidebarProfile'
import ProtectedRoute from '../../components/ProtectedRoute'
import { useAuth } from '@/context/AuthContext'
import { authAPI } from '@/lib/api'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const fileInputRef = useRef(null)
  const { user, setUser } = useAuth()
  const [formData, setFormData] = useState({
    userName: user?.userName || '',
    address: user?.address || '',
    email: user?.email || '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleChange = (e) => {
    console.log(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await authAPI.updateProfile(formData)
      const updatedUser = response.data.data

      // Update user in context and localStorage
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))

      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Update error:', error)
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <SidebarProfile />
        <div className="md:ml-64 flex-1 p-8">
          <div className="max-w-4xl mx-aut p-10">
            {/* Profile Section */}
            <div className="flex items-start mb-8">
              <div className="w-28 h-28 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold border border-[#1F2A44] p-0.5">
                {user?.userName?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="ml-2 mt-5 inline-block">
                <button
                  type="button"
                  onClick={handleClick}
                  className="text-[#008CFF] text-sm border border-[#008CFF] p-2 rounded-lg cursor-pointer hover:bg-[#008CFF] hover:text-white"
                >
                  Upload new photo
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleChange}
                  className="hidden" // hide default input
                />

                <p className="text-xs text-[#00000099] mt-1">
                  At least 800x800 px recommended.
                  <br /> JPG or PNG is allowed.
                </p>
              </div>
            </div>

            {/* Form Fields */}
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
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border border-[#0000003D] rounded px-3 py-2"
                  required
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
                  placeholder="Enter your address"
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

              {/* Save Button */}
              <div className="col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#008CFF] text-white py-2 rounded-lg hover:bg-[#0183ec] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
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
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
