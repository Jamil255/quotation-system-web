/* eslint-disable react/display-name */
'use client'

import { forwardRef, useImperativeHandle, useState } from 'react'
import { ProductSchema } from '../../schemas/productSchema'

export const ProductForm = forwardRef(
  ({ productsList, setProductsList }, ref) => {
    const [formData, setFormData] = useState({
      productName: '',
      category: '',
      unitMeasure: '',
      quantity: '',
      unitPrice: '',
      discount: '',
      taxApplied: '',
    })

    const [errors, setErrors] = useState({})

    useImperativeHandle(ref, () => ({
      validateForm() {
        console.log('=== Product Validation Start ===')
        console.log('Current form data:', JSON.stringify(formData, null, 2))

        // Check if form has any data filled
        const hasFormData =
          formData.productName && formData.productName.trim() !== ''

        if (!hasFormData && productsList.length === 0) {
          console.log('✗ ERROR: No products and form is empty')
          alert('Please fill the product form')
          return false
        }

        // If form is empty but products exist, validation passes
        if (!hasFormData && productsList.length > 0) {
          console.log('✓ SUCCESS: Form empty but products already added')
          return true
        }

        // If form has data, validate and add it
        console.log('✓ Form has data, validating...')
        const result = ProductSchema.safeParse(formData)

        if (!result.success) {
          const errors = result.error.flatten().fieldErrors
          console.log('✗ Validation failed:', errors)
          setErrors(errors)

          const missingFields = Object.keys(errors).join(', ')
          alert(`Please fill these fields correctly: ${missingFields}`)
          return false
        }

        console.log('✓ Validation passed, adding product...')

        // Add product to list
        const newProduct = {
          sno: productsList.length + 1,
          productName: formData.productName,
          category: formData.category,
          quantity: Number(formData.quantity),
          unitPrice: Number(formData.unitPrice),
          discount: Number(formData.discount),
          taxApplied: formData.taxApplied,
          unitMeasure: formData.unitMeasure,
        }

        setProductsList((prevList) => [...prevList, newProduct])

        // Reset form
        setFormData({
          productName: '',
          category: '',
          unitMeasure: '',
          quantity: '',
          unitPrice: '',
          discount: '',
          taxApplied: '',
        })
        setErrors({})

        console.log('✓ Product added successfully')
        return true
      },
    }))

    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
      <form className="space-y-6 max-w-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm mb-1">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg 
              ${errors.productName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.productName && (
              <p className="text-red-500 text-sm">{errors.productName[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg 
              ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Category</option>
              <option value="Construction">Construction</option>
              <option value="Tools">Tools</option>
              <option value="Hardware">Hardware</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category[0]}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm mb-1">Unit Measure</label>
            <select
              name="unitMeasure"
              value={formData.unitMeasure}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg 
              ${errors.unitMeasure ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Unit</option>
              <option value="Pcs">Pcs</option>
              <option value="Kg">Kg</option>
              <option value="Liters">Liters</option>
            </select>
            {errors.unitMeasure && (
              <p className="text-red-500 text-sm">{errors.unitMeasure[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg 
              ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity[0]}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm mb-1">Unit Price</label>
            <input
              type="text"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg 
              ${errors.unitPrice ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.unitPrice && (
              <p className="text-red-500 text-sm">{errors.unitPrice[0]}</p>
            )}
          </div>

          {/* Discount */}
          <div>
            <label className="block text-sm mb-1">Discount</label>
            <input
              type="text"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg 
              ${errors.discount ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.discount && (
              <p className="text-red-500 text-sm">{errors.discount[0]}</p>
            )}
          </div>
        </div>

        {/* FIFTH ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Tax Applied */}
          <div>
            <label className="block text-sm mb-1">Tax Applied</label>
            <select
              name="taxApplied"
              value={formData.taxApplied}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg 
              ${errors.taxApplied ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Tax</option>
              <option value="2%">2%</option>
              <option value="5%">5%</option>
              <option value="10%">10%</option>
            </select>
            {errors.taxApplied && (
              <p className="text-red-500 text-sm">{errors.taxApplied[0]}</p>
            )}
          </div>
        </div>
      </form>
    )
  }
)
