'use client'
import { SquarePen, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { invoiceAPI } from '@/lib/api'
import toast from 'react-hot-toast'

export default function QuotationTable() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      const response = await invoiceAPI.getAll({
        limit: 7,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      })
      console.log('invoiceAPI.getAll response:', response)

      // Support multiple possible response shapes from the API
      let fetched = []
      if (Array.isArray(response.data)) {
        fetched = response.data
      } else if (Array.isArray(response.data?.data?.invoices)) {
        fetched = response.data.data.invoices
      } else if (Array.isArray(response.data?.invoices)) {
        fetched = response.data.invoices
      } else if (Array.isArray(response.data?.data)) {
        fetched = response.data.data
      } else {
        console.warn(
          'Unexpected invoices response shape, defaulting to empty array'
        )
      }

      setInvoices(fetched)
    } catch (error) {
      toast.error('Failed to fetch invoices')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow mt-6 border border-[#0000003D] p-8">
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-white rounded-xl shadow mt-6 border border-[#0000003D] p-2">
      {/* -------- Desktop Table -------- */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0000003D] text-left">
              <th className="py-3 px-3 font-semibold">#</th>
              <th className="py-3 px-3 font-semibold">Client Name</th>
              <th className="py-3 px-3 font-semibold">Date</th>
              <th className="py-3 px-3 font-semibold">Total Amount</th>
              <th className="py-3 px-3 font-semibold">Status</th>
              <th className="py-3 px-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No quotations found
                </td>
              </tr>
            ) : (
              invoices?.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-[#0000003D] hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-2 px-3">{index + 1}</td>
                  <td className="py-2 px-3">{item.customerName}</td>
                  <td className="py-2 px-3 text-[#00000099]">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3 text-[#00000099]">
                    Rs {item.grandTotal.toLocaleString()}
                  </td>
                  <td className="py-2 px-3">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      Sent
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <Trash2
                      size={17}
                      className="inline-block text-red-600 cursor-pointer"
                    />
                    <SquarePen
                      size={17}
                      className="inline-block text-green-600 ml-2 cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* -------- Mobile Card Layout -------- */}
      <div className="sm:hidden flex flex-col gap-3">
        {invoices?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No quotations found
          </div>
        ) : (
          invoices?.map((item, index) => (
            <div
              key={item.id}
              className="border border-[#0000003D] rounded-lg p-3 shadow-sm bg-white"
            >
              <div className="flex justify-between">
                <p className="font-semibold">{item.customerName}</p>
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
                  Sent
                </span>
              </div>

              <p className="text-sm text-[#00000099] mt-1">
                Date: {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-[#00000099]">
                Amount: Rs {item.grandTotal.toLocaleString()}
              </p>

              <div className="flex justify-between items-center mt-2">
                <p className="text-sm font-medium">#: {index + 1}</p>
                <div>
                  <Trash2
                    size={17}
                    className="inline-block text-red-600 cursor-pointer"
                  />
                  <SquarePen
                    size={17}
                    className="inline-block text-green-600 ml-2 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
