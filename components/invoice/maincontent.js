'use client'

import { ChevronRight, CheckCircle2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { CustomerDetailsForm } from '../../components/forms/customer'
import { OrderSourcesForm } from '../../components/forms/order'
import { ProductForm } from '../../components/forms/addProduct'
import { PriceSummary } from '../../components/forms/price'
import { invoiceAPI } from '../../lib/api'
import { toast } from 'react-hot-toast'

export function MainContent({
  onCustomerUpdate,
  productsList,
  setProductsList,
  onPriceUpdate,
}) {
  const [activeTab, setActiveTab] = useState('customer')
  const [completedTabs, setCompletedTabs] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const customerRef = useRef()
  const orderRef = useRef()
  const productRef = useRef()
  const priceRef = useRef()

  const goNext = async () => {
    if (activeTab === 'customer') {
      const isValid = await customerRef.current?.validateForm()
      if (!isValid) return
      setCompletedTabs((prev) => [...new Set([...prev, 'customer'])])
      setActiveTab('order')
      return
    }

    if (activeTab === 'order') {
      const isValid = await orderRef.current?.validateForm()
      if (!isValid) return

      const orderValues = orderRef.current.getFormValues()
      onPriceUpdate((prev) => ({ ...prev, ...orderValues }))

      setCompletedTabs((prev) => [...new Set([...prev, 'order'])])
      setActiveTab('product')
      return
    }

    if (activeTab === 'product') {
      console.log('=== Before Product Validation ===')
      console.log('productsList from MainContent:', productsList)
      console.log('productsList length:', productsList.length)
      console.log('productRef.current:', productRef.current)
      console.log(
        'productRef.current?.validateForm:',
        productRef.current?.validateForm
      )

      if (!productRef.current) {
        console.error('ERROR: productRef.current is null!')
        return
      }

      if (!productRef.current.validateForm) {
        console.error('ERROR: validateForm method not found on productRef!')
        return
      }

      const isValid = await productRef.current.validateForm()
      console.log('Product validation result:', isValid)

      if (!isValid) {
        console.log('Product validation failed')
        return
      }

      // Small delay to ensure state updates
      await new Promise((resolve) => setTimeout(resolve, 100))

      setCompletedTabs((prev) => [...new Set([...prev, 'product'])])
      setActiveTab('price')
      return
    }

    if (activeTab === 'price') {
      const isValid = await priceRef.current?.validateForm()
      if (!isValid) return
      setCompletedTabs((prev) => [...new Set([...prev, 'price'])])
      await handleSubmitInvoice()
    }
  }

  const handleSubmitInvoice = async () => {
    try {
      setIsSubmitting(true)

      console.log('🚀 Starting invoice submission...')

      // Validate Customer and Order forms only (Product form is reset after adding products)
      console.log('📝 Validating customer form...')
      const customerValid = await customerRef.current?.validateForm()
      console.log('✅ Customer validation result:', customerValid)

      console.log('📝 Validating order form...')
      const orderValid = await orderRef.current?.validateForm()
      console.log('✅ Order validation result:', orderValid)

      if (!customerValid) {
        console.error('❌ Customer form validation FAILED')
        toast.error('Please fill customer details correctly')
        setIsSubmitting(false)
        setActiveTab('customer') // Go back to customer form
        return
      }

      if (!orderValid) {
        toast.error('Please fill order details correctly')
        setIsSubmitting(false)
        setActiveTab('order') // Go back to order form
        return
      }

      // Validate we have products in the list (don't validate the form itself as it's been reset)
      if (!productsList || productsList.length === 0) {
        toast.error('Please add at least one product')
        setIsSubmitting(false)
        setActiveTab('product')
        return
      }

      // Gather all form data
      const customerData = customerRef.current?.getFormValues()
      const orderData = orderRef.current?.getFormValues()

      if (!customerData || !orderData) {
        toast.error('Form data is missing. Please fill all forms.')
        setIsSubmitting(false)
        return
      }

      // Calculate totals from products
      let subtotal = 0
      let totalDiscountApplied = 0
      let totalTaxApplied = 0

      productsList.forEach((product) => {
        const qty = Number(product.quantity)
        const price = Number(product.unitPrice)
        const discount = Number(product.discount || 0)
        const taxPercent = Number(
          String(product.taxApplied || '0').replace('%', '')
        )

        const productTotal = qty * price
        const discountAmount = (productTotal * discount) / 100
        const afterDiscount = productTotal - discountAmount
        const taxAmount = (afterDiscount * taxPercent) / 100

        subtotal += productTotal
        totalDiscountApplied += discountAmount
        totalTaxApplied += taxAmount
      })

      const grandTotal = subtotal - totalDiscountApplied + totalTaxApplied

      // Prepare invoice data for API
      const invoiceData = {
        // Customer Details
        customerName: customerData?.customerName,
        companyName: customerData?.companyName,
        email: customerData?.email,
        phoneNo: customerData?.phone,
        address: {
          city: customerData?.city,
          state: customerData?.state,
          postalCode: customerData?.postalCode,
          fullAddress: `${customerData?.city}, ${customerData?.state}, ${customerData?.postalCode}`,
        },
        devliveryAddress: customerData?.deliveryAddress,
        specialInstructions: customerData?.specialInstruction || '',

        // Order Details
        orderRosurces: orderData?.orderSource,
        OrderDate: orderData?.orderDate,
        issueDate: orderData?.issueDate,
        dueDate: orderData?.dueDate,
        paymentMethod: orderData?.paymentMethod,
        advance: orderData?.advance || '0',
        termsAndConditions: orderData?.termsAndConditions || '',

        // Product Details (using first product for now - API expects single product)
        productName: productsList.map((p) => p.productName).join(', '),
        category: productsList[0]?.category || 'General',
        unitMeasure: productsList[0]?.unitMeasure || '',
        quantity: String(
          productsList.reduce((sum, p) => sum + Number(p.quantity), 0)
        ),
        unitPrice: String(productsList[0]?.unitPrice || 0),
        Discount: productsList[0]?.discount || 0,
        tax: Number(productsList[0]?.taxApplied?.replace('%', '') || 0),

        // Totals
        subTotal: Math.round(subtotal),
        totalDiscountApplied: Math.round(totalDiscountApplied),
        totalTaxApplied: Math.round(totalTaxApplied),
        grandTotal: Math.round(grandTotal),
      }

      // Submit to API
      const response = await invoiceAPI.create(invoiceData)
      console.log('Invoice created:', response.data, response)

      toast.success('Invoice created successfully!')

      // Reset form or redirect
      // You can add navigation here if needed
      console.log('Invoice created:', response.data)
    } catch (error) {
      console.error('Error creating invoice:', error)
      toast.error(error.response?.data?.message || 'Failed to create invoice')
    } finally {
      setIsSubmitting(false)
    }
  }

  const tabs = [
    { id: 'customer', label: 'Customer Details', step: 1 },
    { id: 'order', label: 'Order Sources', step: 2 },
    { id: 'product', label: 'Add Product', step: 3 },
    { id: 'price', label: 'Price Summary', step: 4 },
  ]

  return (
    <div className="flex w-full h-full">
      <div className="flex-1 flex flex-col w-full max-w-3xl mx-auto overflow-y-auto">
        {/* Breadcrumb */}
        <div className="p-4 md:p-6 border-b bg-white sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-2 text-sm mb-4">
            <span className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors">
              Invoices
            </span>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="font-semibold text-gray-900">New Invoice</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Create New Invoice
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Fill in the details below to generate your invoice
          </p>
        </div>

        {/* Progress Steps */}
        <div className="px-4 md:px-6 py-6 bg-white border-b">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {tabs.map((tab, index) => (
              <div key={tab.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 transform hover:scale-110 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg scale-110'
                        : completedTabs.includes(tab.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {completedTabs.includes(tab.id) ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      tab.step
                    )}
                  </button>
                  <span
                    className={`text-xs mt-2 font-medium transition-colors hidden md:block ${
                      activeTab === tab.id
                        ? 'text-blue-600'
                        : completedTabs.includes(tab.id)
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {tab.label}
                  </span>
                </div>
                {index < tabs.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded transition-colors duration-300 ${
                      completedTabs.includes(tab.id)
                        ? 'bg-green-500'
                        : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Form Area */}
        <div className="flex-1 p-4 md:p-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
            {/* Tab Content */}
            <div className="p-6 min-h-[400px]">
              <div
                className={`transition-opacity duration-300 ${
                  activeTab === 'customer' ? 'opacity-100' : 'hidden'
                }`}
              >
                <CustomerDetailsForm
                  ref={customerRef}
                  onUpdate={onCustomerUpdate}
                />
              </div>

              <div
                className={`transition-opacity duration-300 ${
                  activeTab === 'order' ? 'opacity-100' : 'hidden'
                }`}
              >
                <OrderSourcesForm ref={orderRef} />
              </div>

              <div
                className={`transition-opacity duration-300 ${
                  activeTab === 'product' ? 'opacity-100' : 'hidden'
                }`}
              >
                {activeTab === 'product' && (
                  <ProductForm
                    ref={productRef}
                    productsList={productsList}
                    setProductsList={setProductsList}
                  />
                )}
              </div>

              <div
                className={`transition-opacity duration-300 ${
                  activeTab === 'price' ? 'opacity-100' : 'hidden'
                }`}
              >
                {activeTab === 'price' && (
                  <PriceSummary ref={priceRef} onUpdate={onPriceUpdate} />
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 bg-gray-50 border-t flex gap-3">
              <button
                onClick={goNext}
                disabled={isSubmitting}
                className="flex-1 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg py-3 font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creating...
                  </span>
                ) : activeTab === 'price' ? (
                  'Create Invoice'
                ) : (
                  'Next Step'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
