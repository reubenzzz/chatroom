// Firebase init and helper exports
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { getFirestore, serverTimestamp, collection, addDoc, query, orderBy, onSnapshot, doc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)

// helpers
export const signInWithGoogle = () => signInWithPopup(auth, provider)
export const logout = () => signOut(auth)

export const sendMessage = async (roomId, uid, displayName, text) => {
  const messagesRef = collection(db, 'rooms', roomId, 'messages')
  await addDoc(messagesRef, {
    text,
    uid,
    displayName,
    createdAt: serverTimestamp()
  })
}

// update last seen (simple presence)
export const updateLastSeen = async (uid, data) => {
  if (!uid) return
  const userRef = doc(db, "users", uid)
  await setDoc(userRef, { ...data, lastSeen: serverTimestamp() }, { merge: true })
}
