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
      const response = await invoiceAPI.getUserInvoices({
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
    
    const totalAmmount = invoices.reduce((total, invoice) => total + invoice.grandTotal, 0);
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const invoicesThisMonth = invoices.filter(invoice => {
        let invoiceDate = new Date(invoice.createdAt);
        return invoiceDate.getMonth() === currentMonth && invoiceDate.getFullYear() === currentYear;
    });
    

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <UserSidebar />

        <main className="md:ml-64 flex-1 p-4 md:p-8 pt-0">
          <DashboardNavbar />

          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome back, {user?.userName} 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your invoices today
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {stats ? (
              <>
                <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">
                        Total Invoices
                      </p>
                      <p className="text-3xl font-bold text-gray-800 mt-2">
                        {invoices.length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">
                        Total Revenue
                      </p>
                      <p className="text-3xl font-bold text-gray-800 mt-2">
                        Rs {totalAmmount}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">
                        This Month
                      </p>
                      <p className="text-3xl font-bold text-gray-800 mt-2">
                        {invoicesThisMonth.length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="skeleton h-28 w-full rounded-xl"></div>
                <div className="skeleton h-28 w-full rounded-xl"></div>
                <div className="skeleton h-28 w-full rounded-xl"></div>
              </>
            )}
          </div>

          {/* Invoices Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            

            {loading ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg text-gray-400"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-3 px-4 md:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        #
                      </th>
                      <th className="py-3 px-4 md:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Client Name
                      </th>
                      <th className="py-3 px-4 md:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="py-3 px-4 md:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="py-3 px-4 md:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="py-3 px-4 md:px-6 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoices?.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-12">
                          <div className="flex flex-col items-center">
                            <svg
                              className="w-16 h-16 text-gray-300 mb-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            <p className="text-gray-500 font-medium">
                              No invoices found
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                              Create your first invoice to get started
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      invoices?.map((invoice, index) => (
                        <tr
                          key={invoice.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-4 md:px-6 text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td className="py-4 px-4 md:px-6">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <span className="text-blue-600 font-semibold text-sm">
                                  {invoice.customerName.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {invoice.customerName}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {invoice.customerEmail}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 md:px-6 text-sm text-gray-700">
                            {invoice.productName}
                          </td>
                          <td className="py-4 px-4 md:px-6 text-sm text-gray-600">
                            {new Date(invoice.createdAt).toLocaleDateString(
                              'en-US',
                              {
                                month: 'short',
                                day: '2-digit',
                                year: 'numeric',
                              }
                            )}
                          </td>
                          <td className="py-4 px-4 md:px-6 text-sm font-semibold text-gray-900">
                            Rs {invoice.grandTotal.toLocaleString()}
                          </td>
                          <td className="py-4 px-4 md:px-6">
                            <div className="flex items-center justify-center gap-2">
                              <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
                                <Eye
                                  size={18}
                                  className="text-gray-400 group-hover:text-blue-600"
                                  onClick={() =>
                                    document.getElementById('my_modal_2').showModal()
                                }
                                />
                              </button>
                            </div>
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
               {/*MODAL */}
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box bg-white w-90 max-w-sm">
            <h3 className="font-bold text-lg mb-4">Invoice</h3>
            <h1></h1>
                  </div>
            <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </ProtectedRoute>
  )
}
