/* eslint-disable react/display-name */
'use client'

import { useState, forwardRef, useImperativeHandle } from 'react'
import { PriceSummarySchema } from '../../schemas/PriceSummary'

export const PriceSummary = forwardRef(({ onUpdate }, ref) => {
  const [formData, setFormData] = useState({
    subtotal: '',
    totalDiscountApplied: '',
    totalTaxApplied: '',
    grandTotal: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (onUpdate) {
      onUpdate((prev) => ({ ...prev, [name]: value }))
    }
  }

  // âœ… Validation function
  const validateForm = async () => {
    const result = PriceSummarySchema.safeParse(formData)

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors)
      return false
    }

    setErrors({})
    console.log('VALID PRICE DATA:', result.data)
    return true
  }

  // âœ… Expose validateForm to parent
  useImperativeHandle(ref, () => ({
    validateForm,
  }))

  const handleSubmit = (e) => {
    e.preventDefault()
    validateForm()
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-[500px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub Total
            </label>
            <input
              type="text"
              name="subtotal"
              value={formData.subtotal}
              onChange={handleChange}
              placeholder="Add Calculated"
              className={`w-[200px] px-4 py-2 border rounded-lg ${
                errors.subtotal ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.subtotal && (
              <p className="text-red-500 text-sm">{errors.subtotal[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Discount Applied
            </label>
            <input
              type="text"
              name="totalDiscountApplied"
              value={formData.totalDiscountApplied}
              onChange={handleChange}
              placeholder="Add Calculated"
              className={`w-[200px] px-4 py-2 border rounded-lg ${
                errors.totalDiscountApplied
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {errors.totalDiscountApplied && (
              <p className="text-red-500 text-sm">
                {errors.totalDiscountApplied[0]}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Tax Applied
            </label>
            <input
              type="text"
              name="totalTaxApplied"
              value={formData.totalTaxApplied}
              onChange={handleChange}
              placeholder="Add Calculated"
              className={`w-[200px] px-4 py-2 border rounded-lg ${
                errors.totalTaxApplied ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.totalTaxApplied && (
              <p className="text-red-500 text-sm">
                {errors.totalTaxApplied[0]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grand Total
            </label>
            <input
              type="text"
              name="grandTotal"
              value={formData.grandTotal}
              onChange={handleChange}
              placeholder="Add Calculated"
              className={`w-[200px] px-4 py-2 border rounded-lg ${
                errors.grandTotal ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.grandTotal && (
              <p className="text-red-500 text-sm">{errors.grandTotal[0]}</p>
            )}
          </div>
        </div>
      </form>
      );
    </>
  )
})
