'use client'

import { forwardRef, useImperativeHandle, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CustomerSchema } from '../../schemas/customerSchema'

export const CustomerDetailsForm = forwardRef(function CustomerDetailsForm(
  { onUpdate },
  ref
) {
  const {
    register,
    trigger,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      customerName: '',
      companyName: '',
      deliveryAddress: '',
      city: '',
      state: '',
      postalCode: '',
      email: '',
      phone: '',
      specialInstruction: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    const sub = watch((value) => {
      if (typeof onUpdate === 'function') onUpdate(value)
    })
    return () => sub.unsubscribe()
  }, [watch, onUpdate])

  useImperativeHandle(ref, () => ({
    async validateForm() {
      const isValid = await trigger()
      const values = getValues()
      console.log('Customer Form Validation:', { isValid, values, errors })
      return isValid
    },
    getFormValues() {
      const values = getValues()
      console.log('Getting Customer Form Values:', values)
      return values
    },
  }))

  return (
    <div className="space-y-6 max-w-[520px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Customer Name
          </label>
          <input
            {...register('customerName')}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.customerName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.customerName && (
            <p className="text-red-500 text-sm">
              {errors.customerName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <input
            {...register('companyName')}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.companyName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Delivery Address
        </label>
        <input
          {...register('deliveryAddress')}
          className={`w-full px-4 py-2 border rounded-lg ${
            errors.deliveryAddress ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.deliveryAddress && (
          <p className="text-red-500 text-sm">
            {errors.deliveryAddress.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">City</label>

          <input
            type="text"
            {...register('city', { required: 'City is required' })}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
          />

          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">State</label>

          <input
            type="text"
            {...register('state', { required: 'State is required' })}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.state ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter State"
          />

          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Postal Code</label>
          <input
            {...register('postalCode')}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.postalCode ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.postalCode && (
            <p className="text-red-500 text-sm">{errors.postalCode.message}</p>
          )}
        </div>
      </div>

      {/* Email / Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            {...register('email')}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            {...register('phone')}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Special Instruction
        </label>
        <textarea
          {...register('specialInstruction')}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
        />
      </div>
    </div>
  )
})
