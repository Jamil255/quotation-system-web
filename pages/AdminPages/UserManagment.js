import ManagmentTable from '@/components/ManagmentTable'
import Navbar from '@/components/Navbar'
import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { Search } from 'lucide-react'
import ProtectedRoute from '@/components/ProtectedRoute'
import { authAPI } from '@/lib/api'
import toast from 'react-hot-toast'

const UserManagment = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    address: '',
    role: 'USER',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [userCount, setUserCount] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await authAPI.createUser(formData)
      toast.success('User created successfully!')
      setFormData({
        userName: '',
        email: '',
        password: '',
        address: '',
        role: 'USER',
      })
      document.getElementById('my_modal_2').close()
      // Trigger refresh of user list
      setRefreshTrigger((prev) => prev + 1)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create user')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute adminOnly>
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="md:ml-64 flex-1 p-4 md:p-8 pt-0">
          <Navbar
            title="User Managment"
            dec="Manage and track all your client"
          />

          {/*TOP SECTION */}
          <div className="flex flex-wrap justify-between gap-3 mt-2">
            {/* LEFT TEXT */}
            <div className="flex gap-2 items-center ml-1">
              <p className="font-medium">All Users</p>
              <p className="text-[#9B9B9B]">{userCount}</p>
            </div>

            {/* RIGHT SEARCH + ADD BUTTON */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Search */}
              <div className="input bg-transparent border border-[#0000003D] w-full sm:w-60 md:w-80 rounded-lg text-sm font-medium flex items-center gap-2 px-2">
                <Search className="text-[#00000099]" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="flex-1 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Add User Button */}
              <button
                className="btn rounded-lg bg-[#1C2730] text-white px-4 py-2"
                onClick={() =>
                  document.getElementById('my_modal_2').showModal()
                }
              >
                + Add User
              </button>
            </div>
          </div>

          <ManagmentTable
            refreshTrigger={refreshTrigger}
            searchQuery={searchQuery}
            onCountChange={setUserCount}
          />
        </main>

        {/*MODAL */}
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box bg-white w-90 max-w-sm">
            <h3 className="font-bold text-lg mb-4">Add New User</h3>

            <form onSubmit={handleSubmit}>
              <label className="m-1">User Name *</label>
              <input
                type="text"
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
                className="bg-transparent border border-gray-400 input m-1 w-full"
                placeholder="Enter User Name"
                required
              />

              <label className="m-1">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-transparent border border-gray-400 input m-1 w-full"
                placeholder="Enter Email"
                required
              />

              <label className="m-1">Address *</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="bg-transparent border border-gray-400 input m-1 w-full"
                placeholder="Enter Address"
                required
              />

              <label className="m-1">Password *</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="bg-transparent border border-gray-400 input m-1 w-full"
                placeholder="Enter Password"
                required
              />

              <label className="m-1">Role *</label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="bg-transparent border border-gray-400 input m-1 w-full"
                required
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>

              <button
                type="submit"
                disabled={isLoading}
                className="btn m-1 w-full bg-[#1C2730] text-white disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating...
                  </span>
                ) : (
                  'Add User'
                )}
              </button>
            </form>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </ProtectedRoute>
  )
}

export default UserManagment
