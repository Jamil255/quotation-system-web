/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useContext, useEffect, useState } from 'react'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  limit,
} from 'firebase/firestore'
import { db } from '../config/firebaseClient'
import { useAuth } from './AuthContext'
import { usePushNotifications } from '../hooks/usePushNotifications'

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const { user } = useAuth() 
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Initialize push notifications
  const { permission, token } = usePushNotifications()

  useEffect(() => {
    if (!user?.uid && !user?.id) {
      setNotifications([])
      setUnreadCount(0)
      return
    }

    const userId = user.uid || user.id


    // 2. Query Firestore (Real-time)
    const q = query(
      collection(db, 'notifications'),
      where('user_id', '==', userId),
      orderBy('created_at', 'desc'),
      limit(20)
    )


    // 3. Listen for changes
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate() || new Date(),
      }))

      console.log('NotificationContext - Received notifications:', data)
      setNotifications(data)

      // 4. Calculate Unread Count (Silent Update - NO TOAST)
      const unread = data.filter((n) => !n.is_seen).length
      setUnreadCount(unread)
      console.log('NotificationContext - Unread count:', unread)
    })

    // Cleanup on unmount
    return () => unsubscribe()
  }, [user])

  // Helper: Mark as Read
  const markAsRead = async (notificationId) => {
    // 1. Optimistic UI Update (Instant)
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, is_seen: true } : n))
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))

    // 2. Update Firestore
    try {
      const ref = doc(db, 'notifications', notificationId)
      await updateDoc(ref, { is_seen: true })
    } catch (error) {
      console.error('Error updating notification:', error)
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        pushPermission: permission,
        pushToken: token,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)
