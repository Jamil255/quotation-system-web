'use client'

import {
  Bell,
  Eye,
  Save,
  FileText,
  Home,
  Users,
  LayoutDashboard,
  Menu,
  X,
} from 'lucide-react'
import { generateInvoiceDOCX } from '../../utils/generateinvoice'
import { useState } from 'react'
import Link from 'next/link'

export function RightSidebar({
  customer = {},
  products = [],
  priceFormData = {},
}) {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const name = customer.customerName || 'Thomas Shelby'
  const company = customer.companyName || ''
  const email = customer.email || 'thomasshelby@gmail.com'
  const phone = customer.phone || '+1-0281-856-6521'
  const address = customer.deliveryAddress || '19th Street, Mckinney Walker'
  const city = customer.city || 'Houston'
  const state = customer.state || 'Texas'
  const postal = customer.postalCode || '77002'
  const instruction = customer.specialInstruction || ''

  const terms = priceFormData?.termsAndConditions || 'No terms added.'

  const issueDate = priceFormData?.issueDate || ''
  const dueDate = priceFormData?.dueDate || ''

  const subtotal = priceFormData?.subtotal || '0.00'
  const discountTotal = priceFormData?.totalDiscountApplied || '0.00'
  const taxTotal = priceFormData?.totalTaxApplied || '0.00'
  const grandTotal = priceFormData?.grandTotal || '0.00'

  const navigationLinks = [
    {
      href: '/AdminPages/Dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
    },
    { href: '/AdminPages/ClientPage', icon: Users, label: 'Clients' },
    {
      href: '/AdminPages/UserManagment',
      icon: Users,
      label: 'User Management',
    },
  ]

  return (
    <div className="h-full w-full overflow-y-auto bg-white border-l shadow-xl">
      {/* ---------------------- TOP BAR ---------------------- */}
      <div className="w-full border-b px-4 py-3 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white sticky top-0 z-20 shadow-sm">
        {/* Mobile Navigation Menu Button - Only on Mobile/Tablet */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              generateInvoiceDOCX({
                customer,
                products,
                issueDate,
                dueDate,
                subtotal,
                discountTotal,
                taxTotal,
                grandTotal,
                terms,
              })
            }
            className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            <FileText size={16} />
            <span className="hidden sm:inline">Generate Invoice</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <img
            src="https://i.pravatar.cc/42"
            alt="profile"
            className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-500 transition-colors cursor-pointer"
          />
        </div>
      </div>

      {/* Mobile Navigation Menu - Only visible on Mobile/Tablet */}
      {showMobileMenu && (
        <div className="lg:hidden bg-white border-b shadow-lg">
          <div className="p-4 space-y-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <link.icon
                  size={20}
                  className="text-gray-600 group-hover:text-blue-600 transition-colors"
                />
                <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* -------------------- INVOICE PREVIEW CONTENT -------------------- */}
      <div className="p-6 space-y-6 animate-fadeIn">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-200">
          {/* Logo with hover effect */}
          <div className="transform transition-transform duration-300 hover:scale-110">
            <svg
              width="50"
              height="72"
              viewBox="0 0 50 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.4401 72V59.6842C33.4481 59.6842 33.2176 52.7368 32.4288 49.2632H5.93564C0.258526 49.2632 -0.53103 40.3168 0.257458 35.5263H3.57018V31.2632H1.20471V27H4.98945V30.7895H6.88183V25.5789H11.1397V30.7895H14.9244V27.9474H18.2361V24.1579H22.0208V27H25.8055V29.8421H22.0208V34.5789H27.2248V30.7895H31.4827V35.5263H35.7405V26.0526H40.9445V29.8421H44.2562V27H48.9871V31.2632H44.2562V35.5263H48.0409C52.2041 61.6737 33.375 70.7368 23.4401 72Z"
                fill="#008CFF"
              />
              <path
                d="M12.1526 21.7895H15.9373V25.5789H12.1526V21.7895Z"
                fill="#008CFF"
              />
              <path
                d="M21.6144 19.8947H25.3992V23.6842H21.6144V19.8947Z"
                fill="#008CFF"
              />
              <path
                d="M2.69072 18H6.47546V21.7895H2.69072V18Z"
                fill="#008CFF"
              />
              <path
                d="M27.2915 17.0526H31.0763V20.8421H27.2915V17.0526Z"
                fill="#008CFF"
              />
              <path
                d="M29.1839 22.7368H32.9687V26.5263H29.1839V22.7368Z"
                fill="#008CFF"
              />
              /
              <path
                d="M0.798344 11.3684H4.58309V15.1579H0.798344V11.3684Z"
                fill="#008CFF"
              />
              <path
                d="M23.5068 12.3158H27.2915V16.1053H23.5068V12.3158Z"
                fill="#008CFF"
              />
              <path
                d="M8.36783 16.1053H12.1526V19.8947H8.36783V16.1053Z"
                fill="#008CFF"
              />
              <path
                d="M32.9687 15.1579H36.7534V18.9474H32.9687V15.1579Z"
                fill="#008CFF"
              />
              <path
                d="M11.2064 9.47368H14.9911V13.2632H11.2064V9.47368Z"
                fill="#008CFF"
              />
              <path
                d="M35.8072 8.52632H39.592V12.3158H35.8072V8.52632Z"
                fill="#008CFF"
              />
              <path
                d="M28.2377 1.89474H32.0225V5.68421H28.2377V1.89474Z"
                fill="#008CFF"
              />
              <path d="M6.47546 0H10.2602V3.78947H6.47546V0Z" fill="#008CFF" />
              <path
                d="M16.8835 14.2105H20.6682V18H16.8835V14.2105Z"
                fill="#008CFF"
              />
              <path
                d="M41.4843 13.2632H45.2691V17.0526H41.4843V13.2632Z"
                fill="#008CFF"
              />
              <path
                d="M46.2153 18.9474H50V22.7368H46.2153V18.9474Z"
                fill="#008CFF"
              />
            </svg>
          </div>

          {/* Company Info with hover effect */}
          <div className="text-right space-y-1 text-sm text-gray-700 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <p className="font-medium">{address}</p>
            <p>{city}</p>
            <p className="text-blue-600 hover:text-blue-700">{phone}</p>

            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-gray-900 font-bold text-base">{name}</p>
              {company && (
                <p className="text-gray-600 font-medium">{company}</p>
              )}
              <p className="text-blue-600 hover:text-blue-700 cursor-pointer">
                {email}
              </p>
              <p className="text-gray-700">
                {city}, {state}
              </p>
              <p className="text-gray-700">{postal}</p>
            </div>
          </div>
        </div>

        {/* Invoice Details Card */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
          <div className="space-y-2">
            <p className="text-gray-700 text-sm">
              <span className="font-bold text-gray-900">Invoice Number:</span>{' '}
              <span className="text-blue-600 font-semibold">
                INV-04568-07526
              </span>
            </p>

            <p className="text-gray-700 text-sm">
              <span className="font-bold text-gray-900">Issue Date:</span>{' '}
              {priceFormData.issueDate || (
                <span className="text-gray-400 italic">N/A</span>
              )}
            </p>

            <p className="text-gray-700 text-sm">
              <span className="font-bold text-gray-900">Due Date:</span>{' '}
              {priceFormData.dueDate || (
                <span className="text-gray-400 italic">N/A</span>
              )}
            </p>
          </div>
        </div>

        {/* Blue Divider with animation */}
        <div className="h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 mb-6 rounded-full animate-pulse"></div>

        {instruction && (
          <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded hover:shadow-md transition-shadow">
            <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              Project Description
            </h4>
            <p className="text-sm text-gray-700">{instruction}</p>
          </div>
        )}

        {/* Product Details Section */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-600 rounded"></span>
              Product Details
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-700 bg-gray-50 border-b-2 border-gray-200">
                  <th className="p-3 font-semibold">S.no</th>
                  <th className="p-3 font-semibold">Product Name</th>
                  <th className="p-3 font-semibold">Quantity</th>
                  <th className="p-3 text-right font-semibold">Unit Price</th>
                  <th className="p-3 text-right font-semibold">Discount %</th>
                  <th className="p-3 text-right font-semibold">Tax %</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.sno}
                    className={`border-b hover:bg-blue-50 transition-colors cursor-pointer ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="p-3">
                      <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                        {product.sno || index + 1}
                      </span>
                    </td>

                    <td className="p-3">
                      <p className="font-semibold text-gray-900">
                        {product.productName || 'No product name yet'}
                      </p>
                    </td>

                    <td className="p-3">
                      <span className="inline-block px-2 py-1 bg-gray-100 rounded text-gray-700 font-medium">
                        {product.quantity || 0}
                      </span>
                    </td>

                    <td className="p-3 text-right font-medium text-gray-900">
                      $
                      {product.unitPrice
                        ? product.unitPrice.toFixed(2)
                        : '0.00'}
                    </td>

                    <td className="p-3 text-right">
                      <span className="inline-block px-2 py-1 bg-red-100 text-red-600 rounded font-medium">
                        {product.discount || 0}%
                      </span>
                    </td>

                    <td className="p-3 text-right">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-600 rounded font-medium">
                        {product.taxApplied || '0%'}
                      </span>
                    </td>
                  </tr>
                ))}

                {products.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <svg
                          className="w-16 h-16 mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                        <p className="font-medium">No products added yet</p>
                        <p className="text-sm mt-1">
                          Add products to see them here
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Price Summary Section */}
        <div className="mt-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
          <div className="flex justify-end">
            <div className="w-full max-w-sm space-y-3">
              {/* Subtotal */}
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <p className="text-gray-700 font-medium">Subtotal</p>
                <p className="text-gray-900 font-semibold text-lg">
                  ${subtotal}
                </p>
              </div>

              {/* Discount Applied */}
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <p className="text-gray-700 font-medium">Discount Applied</p>
                <p className="text-red-600 font-semibold text-lg">
                  -${discountTotal}
                </p>
              </div>

              {/* Tax Applied */}
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <p className="text-gray-700 font-medium">Tax Applied</p>
                <p className="text-green-600 font-semibold text-lg">
                  +${taxTotal}
                </p>
              </div>

              {/* Grand Total */}
              <div className="pt-4 mt-2 border-t-2 border-blue-600 flex justify-between items-center bg-white rounded-lg p-4 shadow-md transform hover:scale-105 transition-transform">
                <p className="text-gray-900 font-bold text-lg">Grand Total</p>
                <p className="text-blue-600 font-bold text-2xl">
                  ${grandTotal}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        {terms && (
          <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <h4 className="text-base font-bold mb-3 text-gray-900 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-600 rounded"></span>
              Terms & Conditions
            </h4>
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {terms}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
