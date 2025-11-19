importScripts(
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js'
)

const firebaseConfig = {
  apiKey: 'AIzaSyDjMm1yoRHxM7EPFbXpgydDmzeG1CKHcsE',
  authDomain: 'real-77584.firebaseapp.com',
  projectId: 'real-77584',
  storageBucket: 'real-77584.firebasestorage.app',
  messagingSenderId: '639012073970',
  appId: '1:639012073970:web:afb5de4e30f65efb4e3b6b',
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192x192.png', // Add your icon
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
