import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { auth, signInWithGoogle, logout, db, sendMessage, updateLastSeen } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import RoomList from './components/RoomList'
import ChatRoom from './components/ChatRoom'
import CreateRoom from './components/CreateRoom'
import './index.css'

export default function App(){
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (u)=>{
      setUser(u)
      if (u) {
        updateLastSeen(u.uid, { displayName: u.displayName })
      }
    })
    return unsub
  },[])
  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="brand">ChatApp</Link>
        <div>
          {user ? (
            <>
              <span style={{marginRight:12}}>Hi, {user.displayName}</span>
              <button onClick={()=>{ logout(); navigate('/') }}>Sign out</button>
            </>
          ) : (
            <button onClick={signInWithGoogle}>Sign in with Google</button>
          )}
        </div>
      </header>

      <main className="container">
        <aside className="sidebar">
          <CreateRoom user={user} />
          <RoomList />
        </aside>
        <section className="content">
          <Routes>
            <Route path="/" element={<div>Select or create a room to start chatting</div>} />
            <Route path="/room/:id" element={<ChatRoom user={user} />} />
          </Routes>
        </section>
      </main>
    </div>
  )
}
