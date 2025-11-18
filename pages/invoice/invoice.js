'use client'
import { useState } from 'react'
import { InvoiceLayout } from '../../components/invoice/invoicelayout'
import Sidebar from '@/components/Sidebar'

export default function Invoicepage() {
  const [activeTab, setActiveTab] = useState('customer')

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="md:ml-64 flex-1 overflow-hidden">
        <InvoiceLayout activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  )
}
