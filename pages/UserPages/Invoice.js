'use client'
import UserSidebar from '../../components/UserSidebar'
import DashboardNavbar from '../../components/DashboardNavbar'
import ProtectedRoute from '../../components/ProtectedRoute'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'
import { invoiceAPI } from '@/lib/api'
import toast from 'react-hot-toast'
import { SquarePen, Trash2, Eye } from 'lucide-react'

export default function Invoice() {
  const { user } = useAuth()
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetchInvoices()
    fetchStats()
  }, [])

  const fetchInvoices = async () => {
    try {
      const response = await invoiceAPI.getAll({
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      })
      setInvoices(response.data.data.invoices)
    } catch (error) {
      toast.error('Failed to fetch invoices')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await invoiceAPI.getStats()
      setStats(response.data.data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <UserSidebar />

        <main className="md:ml-64 flex-1 p-4 md:p-8 pt-0">
          <DashboardNavbar />

          <h1 className="text-xl md:text-2xl font-bold mb-4">
            Welcome {user?.userName} 👋
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {stats ? (
              <>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-500 text-sm">Total Invoices</h3>
                  <p className="text-2xl font-bold mt-2">
                    {stats.totalInvoices}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-500 text-sm">Total Revenue</h3>
                  <p className="text-2xl font-bold mt-2">
                    Rs {stats.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-500 text-sm">This Month</h3>
                  <p className="text-2xl font-bold mt-2">
                    {stats.thisMonthInvoices}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="skeleton h-24 w-full"></div>
                <div className="skeleton h-24 w-full"></div>
                <div className="skeleton h-24 w-full"></div>
              </>
            )}
          </div>

          {/* Invoices Table */}
          <div className="bg-white rounded-xl shadow border border-[#0000003D] p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Invoices</h2>

            {loading ? (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0000003D]">
                      <th className="py-3 px-3 font-semibold">#</th>
                      <th className="py-3 px-3 font-semibold">Client Name</th>
                      <th className="py-3 px-3 font-semibold">Product</th>
                      <th className="py-3 px-3 font-semibold">Date</th>
                      <th className="py-3 px-3 font-semibold">Amount</th>
                      <th className="py-3 px-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices?.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-8 text-gray-500"
                        >
                          No invoices found
                        </td>
                      </tr>
                    ) : (
                      invoices?.map((invoice, index) => (
                        <tr
                          key={invoice.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="py-2 px-3">{index + 1}</td>
                          <td className="py-2 px-3">{invoice.customerName}</td>
                          <td className="py-2 px-3">{invoice.productName}</td>
                          <td className="py-2 px-3 text-[#00000099]">
                            {new Date(invoice.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-3">
                            Rs {invoice.grandTotal.toLocaleString()}
                          </td>
                          <td className="py-2 px-3">
                            <Eye
                              size={17}
                              className="inline-block text-blue-600 cursor-pointer mr-2"
                            />
                            <SquarePen
                              size={17}
                              className="inline-block text-green-600 cursor-pointer mr-2"
                            />
                            <Trash2
                              size={17}
                              className="inline-block text-red-600 cursor-pointer"
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
