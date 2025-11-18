'use client'

import { useState } from 'react'
// import { Sidebar } from '../../components/Sidebar';
import { RightSidebar } from '../../components/invoice/rightside.js'
import { MainContent } from '../../components/invoice/maincontent.js'
import { Menu, X } from 'lucide-react'

export function InvoiceLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false)

  const [customerData, setCustomerData] = useState({})
  const [productsList, setproductsList] = useState([])
  const [priceFormData, setPriceFormData] = useState({
    subtotal: '',
    totalDiscountApplied: '',
    totalTaxApplied: '',
    grandTotal: '',
  })

  const calculateTotals = () => {
    let subtotal = 0
    let totalDiscount = 0
    let totalTax = 0

    productsList.forEach((p) => {
      const qty = Number(p.quantity)
      const price = Number(p.unitPrice)
      const discount = Number(p.discount)
      const tax = Number(p.taxApplied.replace('%', ''))

      const productSubtotal = qty * price
      const discountAmount = (productSubtotal * discount) / 100
      const afterDiscount = productSubtotal - discountAmount
      const taxAmount = (afterDiscount * tax) / 100

      subtotal += productSubtotal
      totalDiscount += discountAmount
      totalTax += taxAmount
    })

    const grandTotal = subtotal - totalDiscount + totalTax

    return {
      subtotal,
      totalDiscountApplied: totalDiscount,
      totalTaxApplied: totalTax,
      grandTotal,
    }
  }

  return (
    <div className="flex h-full bg-gray-50">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm">
        <h1 className="text-lg font-semibold text-gray-800">Create Invoice</h1>
        <button
          onClick={() => setMobilePreviewOpen(!mobilePreviewOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {mobilePreviewOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto h-full md:mt-0 mt-16">
        <div className="h-full p-4 md:p-6">
          <MainContent
            onCustomerUpdate={setCustomerData}
            productsList={productsList}
            setProductsList={setproductsList}
            onPriceUpdate={setPriceFormData}
          />
        </div>
      </div>

      {/* Right Preview Sidebar */}
      <div
        className={`fixed md:static inset-y-0 right-0 z-40 w-full md:w-[420px] lg:w-[450px] shrink-0 bg-white border-l shadow-lg transition-transform duration-300
        ${
          mobilePreviewOpen ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0 overflow-y-auto h-full`}
      >
        <RightSidebar
          customer={customerData}
          priceFormData={priceFormData}
          products={productsList}
        />
      </div>

      {/* Mobile Overlay */}
      {mobilePreviewOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setMobilePreviewOpen(false)}
        />
      )}
    </div>
  )
}
