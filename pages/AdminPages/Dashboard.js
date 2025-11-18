'use client'
import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import StatCard from '../../components/StartCard'
import QuotationTable from '../../components/QuotationTable'
import DashboardNavbar from '../../components/DashboardNavbar'
import ProtectedRoute from '../../components/ProtectedRoute'
import { useAuth } from '@/context/AuthContext'
import { invoiceAPI } from '@/lib/api'

export default function Home() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await invoiceAPI.getStats()
      setStats(response.data.data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute adminOnly>
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="md:ml-64 flex-1 p-4 md:p-8 pt-0">
          <DashboardNavbar />

          <h1 className="text-xl md:text-2xl font-bold">
            Welcome {user?.userName} 👋
          </h1>

          {/* Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {loading ? (
              <>
                <div className="skeleton h-32 w-full bg-white"></div>
                <div className="skeleton h-32 w-full bg-white"></div>
                <div className="skeleton h-32 w-full bg-white"></div>
              </>
            ) : (
              <>
                <StatCard
                  title="Total Quotations"
                  value={stats?.totalInvoices || 0}
                  change={`Rs. ${(stats?.totalRevenue || 0).toLocaleString()}`}
                />
                <StatCard
                  title="This Month"
                  value={stats?.thisMonthInvoices || 0}
                  change={`Rs. ${(
                    stats?.thisMonthRevenue || 0
                  ).toLocaleString()}`}
                />
                <StatCard
                  title="Total Revenue"
                  value={`Rs. ${(stats?.totalRevenue || 0).toLocaleString()}`}
                  change=""
                />
              </>
            )}
          </div>

          <div className="mt-6">
            <QuotationTable />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
