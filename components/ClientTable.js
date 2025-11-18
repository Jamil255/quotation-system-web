'use client'
import React, { useState, useEffect } from 'react'
import { invoiceAPI } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'

export default function ClientTable({ searchQuery = '' }) {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchClients()
  }, [user])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const response = await invoiceAPI.getAll()
      const invoices = response.data.data

      // Extract unique clients from invoices
      const clientMap = new Map()
      invoices.forEach((invoice) => {
        const key = invoice.customerName + invoice.email
        if (!clientMap.has(key)) {
          clientMap.set(key, {
            id: invoice.id,
            name: invoice.customerName,
            companyName: invoice.companyName,
            phone: invoice.phoneNo,
            email: invoice.email,
            date: new Date(invoice.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            }),
            amount: `$${invoice.grandTotal}`,
            status: invoice.paymentMethod === 'Paid' ? 'Approved' : 'Pending',
          })
        }
      })

      setClients(Array.from(clientMap.values()))
    } catch (error) {
      console.error('Error fetching clients:', error)
      toast.error('Failed to load clients')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow mt-6 border border-[#0000003D] p-8 text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-2 text-gray-600">Loading clients...</p>
      </div>
    )
  }

  if (clients.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow mt-6 border border-[#0000003D] p-8 text-center">
        <p className="text-gray-600">No clients found</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow mt-6 border border-[#0000003D] p-2">
      {/* Filter controls */}
      <div className="flex items-center justify-end gap-2 p-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('Approved')}
          className={`px-3 py-1 rounded ${
            filter === 'Approved' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setFilter('Pending')}
          className={`px-3 py-1 rounded ${
            filter === 'Pending' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
        >
          Pending
        </button>
      </div>
      {/* ---- Desktop Table ---- */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0000003D] text-left">
              <th className="py-3 px-3 font-semibold">#</th>
              <th className="py-3 px-3 font-semibold">Client Name</th>
              <th className="py-3 px-3 font-semibold">Company Name</th>
              <th className="py-3 px-3 font-semibold">Phone Number</th>
              <th className="py-3 px-3 font-semibold">Status</th>
              <th className="py-3 px-3 font-semibold">Date</th>
              <th className="py-3 px-3 font-semibold">Amount</th>
            </tr>
          </thead>

          <tbody>
            {clients
              .filter((c) => (filter === 'all' ? true : c.status === filter))
              .filter((c) => {
                const q = searchQuery?.trim().toLowerCase()
                if (!q) return true
                return (
                  (c.name && c.name.toLowerCase().includes(q)) ||
                  (c.companyName && c.companyName.toLowerCase().includes(q)) ||
                  (c.email && c.email.toLowerCase().includes(q)) ||
                  (c.phone && c.phone.toLowerCase().includes(q))
                )
              })
              .map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-[#0000003D] hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-2 px-3">{index + 1}</td>
                  <td className="py-2 px-3">{item.name}</td>
                  <td className="py-2 px-3 text-[#00000099]">
                    {item.companyName}
                  </td>
                  <td className="py-2 px-3 text-[#00000099]">{item.phone}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full ${
                        item.status === 'Approved'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-yellow-50 text-yellow-600'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2 px-3">{item.date}</td>
                  <td className="py-2 px-3">{item.amount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* ---- Mobile Card Layout ---- */}
      <div className="sm:hidden flex flex-col gap-3">
        {clients
          .filter((c) => (filter === 'all' ? true : c.status === filter))
          .filter((c) => {
            const q = searchQuery?.trim().toLowerCase()
            if (!q) return true
            return (
              (c.name && c.name.toLowerCase().includes(q)) ||
              (c.companyName && c.companyName.toLowerCase().includes(q)) ||
              (c.email && c.email.toLowerCase().includes(q)) ||
              (c.phone && c.phone.toLowerCase().includes(q))
            )
          })
          .map((item, index) => (
            <div
              key={item.id}
              className="border border-[#0000003D] rounded-lg p-3 shadow-sm bg-white"
            >
              {/* Name + Status */}
              <div className="flex justify-between items-center">
                <p className="font-semibold">{item.name}</p>

                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    item.status === 'Approved'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-yellow-50 text-yellow-600'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <p className="text-sm text-[#00000099] mt-1">
                Company: {item.companyName}
              </p>

              <p className="text-sm text-[#00000099]">Phone: {item.phone}</p>

              <p className="text-sm text-[#00000099]">Date: {item.date}</p>

              <div className="flex justify-between items-center mt-2">
                <p className="text-sm font-medium">#{index + 1}</p>
                <p className="font-semibold">{item.amount}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
