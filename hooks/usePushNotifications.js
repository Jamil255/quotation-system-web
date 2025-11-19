import { useEffect, useState } from 'react'
import { messaging } from '../config/firebaseClient'
import { getToken, onMessage } from 'firebase/messaging'

export function usePushNotifications() {
  const [permission, setPermission] = useState('default')
  const [token, setToken] = useState(null)

  useEffect(() => {
    if (!messaging) {
      console.log('Messaging not available')
      return
    }


    // Request permission and get token
    const requestPermission = async () => {
      try {
        const permissionResult = await Notification.requestPermission()
        console.log('Notification permission:', permissionResult)
        setPermission(permissionResult)

        if (permissionResult === 'granted') {

          const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
          if (!vapidKey) {
            console.error('VAPID key not found in environment variables')
            return
          }

          const currentToken = await getToken(messaging, {
            vapidKey: vapidKey,
          })
          if (currentToken) {
            setToken(currentToken)
         
          } else {
            console.log('No registration token available.')
          }
        }
      } catch (error) {
        console.error('Error getting permission or token:', error)
      }
    }

    requestPermission()

    // Handle foreground messages
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Message received in foreground:', payload)

      // Show notification
      if (Notification.permission === 'granted') {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: '/icon-192x192.png',
        })
      }
    })

    return () => unsubscribe()
  }, [])

  return { permission, token }
}
