'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { loginSchema } from '@/schemas/loginSchema'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await login(data)
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-8">
        <div className="max-w-md w-full">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">Log in</h2>
            <p className="text-gray-500 mb-6">
              Enter your email and password to log in.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Write here..."
                {...register('email')}
                className={`w-full border rounded-lg p-2 outline-none focus:ring-2 
                  ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
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

                {/* Eye Icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm">
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
                  Logging in...
                </span>
              ) : (
                'Log in'
              )}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              href="/Auth/Register"
              className="text-blue-500 hover:underline font-medium"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="w-full md:w-1/2 bg-[#008CFF] text-white flex flex-col justify-center items-center p-8">
        <div className="max-w-sm">
          <img
            src="/img.jpg"
            alt="Sign up illustration"
            className="rounded-lg shadow-lg mb-6 w-full object-cover"
          />
          <h3 className="text-2xl font-semibold mb-2 text-center">
            Your Vision, Our Expertise
          </h3>
          <p className="text-center text-blue-100">
            Experience seamless collaboration where your goals meet our
            professional expertise.
          </p>
        </div>
      </div>
    </div>
  )
}
