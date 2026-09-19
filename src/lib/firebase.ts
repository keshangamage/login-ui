import type { Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean)

let authPromise: Promise<Auth | null> | undefined

export function getFirebaseAuth() {
  if (!isFirebaseConfigured) return Promise.resolve(null)

  authPromise ??= Promise.all([
    import('firebase/app'),
    import('firebase/auth'),
  ]).then(([{ getApp, getApps, initializeApp }, { getAuth }]) => {
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
    return getAuth(app)
  })

  return authPromise
}
