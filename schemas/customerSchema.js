import * as z from 'zod'

export const CustomerSchema = z.object({
  customerName: z.string().trim().min(1, 'Customer Name is required'),
  companyName: z.string().trim().min(1, 'Company Name is required'),
  deliveryAddress: z.string().trim().min(1, 'Delivery Address is required'),
  city: z.string().trim().min(1, 'City is required'),
  state: z.string().trim().min(1, 'State is required'),
  postalCode: z.string().trim().min(1, 'Postal Code is required'),
  email: z.string().trim().email('Invalid email format'),
  phone: z.string().trim().min(1, 'Phone Number is required'),
  specialInstruction: z.string().optional(),
})
