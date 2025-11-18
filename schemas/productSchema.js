import { z } from 'zod'

export const ProductSchema = z.object({
  productName: z.string().min(1, 'Product Name is required'),

  category: z.string().min(1, 'Category is required'),

  unitMeasure: z.string().min(1, 'Unit Measure is required'),

  quantity: z.string().min(1, 'Quantity is required'),

  unitPrice: z.string().min(1, 'Unit Price is required'),

  discount: z.string().min(1, 'Discount is required'),

  taxApplied: z.string().min(1, 'Tax is required'),
})
