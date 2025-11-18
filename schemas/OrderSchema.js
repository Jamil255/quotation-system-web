import { z } from 'zod'

export const OrderSchema = z.object({
  orderSource: z.string().min(1, 'Order Source is required'),
  orderDate: z.string().min(1, 'Order Date is required'),
  deliveryAddress: z.string().min(1, 'Delivery Address is required'),
  issueDate: z.string().min(1, 'Issue Date is required'),
  dueDate: z.string().min(1, 'Due Date is required'),
  paymentMethod: z.string().min(1, 'Payment Method is required'),
  advance: z.string().min(1, 'Advance is required'),
  termsAndConditions: z.string().min(1, 'Terms & Conditions required'),
})
