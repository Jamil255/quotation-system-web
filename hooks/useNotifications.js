/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc 
} from 'firebase/firestore';
import { db } from '../config/firebaseClient';

export function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    // 1. Create the query
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('user_id', '==', userId),
      orderBy('created_at', 'desc') 
    );

    // 2. Set up the real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore Timestamp to JS Date safely
        created_at: doc.data().created_at?.toDate() || new Date(),
      }));
      
      setNotifications(notifsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    });

    // 3. Cleanup listener on unmount
    return () => unsubscribe();
  }, [userId]);

  // Helper function to mark a notification as read
  const markAsRead = async (notificationId) => {
    try {
      const notifRef = doc(db, 'notifications', notificationId);
      await updateDoc(notifRef, {
        is_seen: true
      });
    } catch (error) {
      console.error("Error marking read:", error);
    }
  };

  // Helper to calculate unread count
  const unreadCount = notifications.filter(n => !n.is_seen).length;

  return { notifications, loading, unreadCount, markAsRead };
}