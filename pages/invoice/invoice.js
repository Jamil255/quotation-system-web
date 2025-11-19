'use client'
import { useState } from 'react'
import { InvoiceLayout } from '../../components/invoice/invoicelayout'
import Sidebar from '@/components/Sidebar'
import UserSidebar from '@/components/UserSidebar'
import { useAuth } from '@/context/AuthContext'

export default function Invoicepage() {
  const [activeTab, setActiveTab] = useState('customer')
  const { isAdmin } = useAuth()
    
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {isAdmin ? <Sidebar /> : <UserSidebar />}
      <div className="md:ml-64 flex-1 overflow-hidden">
        <InvoiceLayout activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  )
}
