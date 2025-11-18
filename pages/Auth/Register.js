'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { z } from 'zod'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

const registerSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  userName: z.string().min(3, 'Username must be at least 3 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  // .regex(
  //   /[^a-zA-Z0-9]/,
  //   'Password must contain at least one special character'
  // )
  companyName: z.string().min(2, 'Company name is required'),
  companyAddress: z.string().min(5, 'Company address is required'),
})

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { register: registerUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await registerUser(data)
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-8">
        <div className="max-w-md w-full">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">Sign Up</h2>
            <p className="text-gray-500 mb-6">
              Enter your details to create account.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                className={`w-full border rounded-lg p-2 outline-none focus:ring-2 
                  ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-gray-700 mb-1">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                {...register('userName')}
                className={`w-full border rounded-lg p-2 outline-none focus:ring-2 
                  ${errors.userName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                placeholder="Enter company name"
                {...register('companyName')}
                className={`w-full border rounded-lg p-2 outline-none focus:ring-2 
                  ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* Company Address */}
            <div>
              <label className="block text-gray-700 mb-1">
                Company Address
              </label>
              <input
                type="text"
                placeholder="Enter company address"
                {...register('companyAddress')}
                className={`w-full border rounded-lg p-2 outline-none focus:ring-2 
                  ${
                    errors.companyAddress ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.companyAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyAddress.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  {...register('password')}
                  className={`w-full border rounded-lg p-2 pr-10 outline-none focus:ring-2 
                    ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating Account...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/Auth/Login"
              className="text-blue-500 hover:underline font-medium"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-[#008CFF] text-white flex flex-col justify-center items-center p-8">
        <div className="max-w-sm">
          <img
            src="/img.jpg"
            alt="Register illustration"
            className="rounded-lg shadow-lg mb-6 w-full object-cover"
          />
          <h3 className="text-2xl font-semibold mb-2 text-center">
            Join Our Platform
          </h3>
          <p className="text-center text-blue-100">
            Create your company account and start managing your quotations
            efficiently.
          </p>
        </div>
      </div>
    </div>
  )
}
