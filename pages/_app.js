import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/context/AuthContext'
import { NotificationProvider } from '@/context/NotificationContext' // Import here
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Register service worker for push notifications
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration)
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error)
        })
    }
  }, [])

  return (
    <AuthProvider>
      <NotificationProvider>
        <Toaster position="top-center" reverseOrder={true} />
        <main>
          <Component {...pageProps} />
        </main>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default MyApp
