'use client'
import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import ClientTable from '../../components/ClientTable'
import Navbar from '../../components/Navbar'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/context/AuthContext'
import { invoiceAPI } from '@/lib/api'
import { ListFilter, Search, X } from 'lucide-react'

export default function Home() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalClients: 0,
    approvedQuotations: 0,
    rejectedQuotations: 0,
    totalQuotations: 0,
  })
  const [search, setSearch] = useState('')

  const fetchStats = async () => {
    try {
      const response = await invoiceAPI.getAll()
      const invoices = response.data.data

      // Get unique clients
      const uniqueClients = new Set()
      invoices.forEach((inv) => {
        uniqueClients.add(inv.customerName + inv.email)
      })

      setStats({
        totalClients: uniqueClients.size,
        approvedQuotations: invoices.filter(
          (inv) => inv.paymentMethod === 'Paid'
        ).length,
        rejectedQuotations: 0,
        totalQuotations: invoices.length,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <ProtectedRoute adminOnly>
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="md:ml-64 flex-1 p-4 md:p-8 pt-0">
          <Navbar title="Client List" dec="Manage and track all your client" />
          <h1 className="text-2xl font-bold">Welcome {user?.userName} 👋</h1>

          {/*Cards*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            <div className="bg-white/40 rounded-lg shadow p-5">
              <h3>Total Clients</h3>
              <p className="text-2xl font-bold mt-2">{stats.totalClients}</p>
              <p className="text-sm mt-1 text-gray-500">Unique clients</p>
            </div>

            <div className="bg-white/40 rounded-lg shadow p-5">
              <h3>Approved Quotation</h3>
              <p className="text-2xl font-bold mt-2">
                {stats.approvedQuotations}
              </p>
              <p className="text-sm mt-1 text-gray-500">Paid invoices</p>
            </div>

            <div className="bg-white/40 rounded-lg shadow p-5">
              <h3>Pending Quotation</h3>
              <p className="text-2xl font-bold mt-2">
                {stats.totalQuotations - stats.approvedQuotations}
              </p>
              <p className="text-sm mt-1 text-gray-500">Awaiting payment</p>
            </div>

            <div className="bg-white/40 rounded-lg shadow p-5">
              <h3>Total Quotation</h3>
              <p className="text-2xl font-bold mt-2">{stats.totalQuotations}</p>
              <p className="text-sm mt-1 text-gray-500">All quotations</p>
            </div>
          </div>

          {/* Filters Section */}
          <div
            className="
                    mt-3 
                    flex flex-wrap gap-3 
                    items-center justify-between
                "
          >
            {/* LEFT FILTERS */}
            <div className="flex flex-wrap gap-3">
              <div className="input bg-transparent border border-[#0000003D] w-24 rounded-lg text-sm text-[#C6D3CC] font-medium flex items-center justify-between px-2">
                Filter
                <ListFilter />
              </div>

              <div className="input bg-transparent border border-[#0000003D] w-40 rounded-lg text-sm font-medium flex items-center gap-2 px-2">
                Client
                <input
                  type="text"
                  placeholder="Smith Jones"
                  className="flex-1 outline-none"
                />
                <X className="cursor-pointer" />
              </div>

              <div className="input bg-transparent border border-[#0000003D] w-40 rounded-lg text-sm font-medium flex items-center gap-2 px-2">
                Status
                <input
                  type="text"
                  placeholder="Approved"
                  className="flex-1 outline-none"
                />
                <X className="cursor-pointer" />
              </div>
            </div>

            {/* RIGHT SEARCH */}
            <div className="w-full sm:w-auto">
              <div className="input bg-transparent border border-[#0000003D] w-full sm:w-80 rounded-lg text-sm font-medium flex items-center gap-2 px-2">
                <Search className="text-[#00000099]" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <ClientTable searchQuery={search} />
        </main>
      </div>
    </ProtectedRoute>
  )
}
