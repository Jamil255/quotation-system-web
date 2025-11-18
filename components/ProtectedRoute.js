import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/Auth/Login')
      } else if (adminOnly && user.role !== 'ADMIN') {
        router.push('/Error/403')
      }
    }
  }, [user, loading, router, adminOnly])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    )
  }

  if (!user || (adminOnly && user.role !== 'ADMIN')) {
    return null
  }

  return <>{children}</>
}
