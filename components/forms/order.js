/* eslint-disable react/display-name */
'use client'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { OrderSchema } from '../../schemas/OrderSchema'

export const OrderSourcesForm = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    orderSource: '',
    orderDate: '',
    deliveryAddress: '',
    issueDate: '',
    dueDate: '',
    paymentMethod: '',
    advance: '',
    termsAndConditions: '',
  })

  const [errors, setErrors] = useState({})

  useImperativeHandle(ref, () => ({
    validateForm() {
      const result = OrderSchema.safeParse(formData)

      if (!result.success) {
        setErrors(result.error.flatten().fieldErrors)
        return false
      }

      setErrors({})
      return true
    },

    getFormValues() {
      return formData
    },
  }))

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <form className="space-y-6 max-w-[500px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium mb-2">
              Order Source
            </label>
            <input
              type="text"
              name="orderSource"
              value={formData.orderSource}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.orderSource ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.orderSource && (
              <p className="text-red-500 text-sm">{errors.orderSource[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Order Date</label>
            <input
              type="date"
              name="orderDate"
              value={formData.orderDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.orderDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.orderDate && (
              <p className="text-red-500 text-sm">{errors.orderDate[0]}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Delivery Address
          </label>
          <input
            type="text"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.deliveryAddress ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.deliveryAddress && (
            <p className="text-red-500 text-sm">{errors.deliveryAddress[0]}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium mb-2">Issue Date</label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.issueDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.issueDate && (
              <p className="text-red-500 text-sm">{errors.issueDate[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.dueDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm">{errors.dueDate[0]}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Payment Method
          </label>
          <input
            type="text"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.paymentMethod ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm">{errors.paymentMethod[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Advance</label>
          <input
            type="number"
            name="advance"
            value={formData.advance}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.advance ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.advance && (
            <p className="text-red-500 text-sm">{errors.advance[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Terms & Conditions
          </label>
          <textarea
            name="termsAndConditions"
            value={formData.termsAndConditions}
            onChange={handleChange}
            rows="4"
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.termsAndConditions ? 'border-red-500' : 'border-gray-300'
            }`}
          ></textarea>
          {errors.termsAndConditions && (
            <p className="text-red-500 text-sm">
              {errors.termsAndConditions[0]}
            </p>
          )}
        </div>
      </form>
      );
    </>
  )
})
