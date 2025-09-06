import React, { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function CreateRoom({ user }){
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const create = async (e) => {
    e.preventDefault()
    if (!name.trim() || !user) return alert('Sign in and provide name')
    const roomsRef = collection(db, 'rooms')
    const docRef = await addDoc(roomsRef, {
      name: name.trim(),
      createdBy: user.uid,
      createdAt: serverTimestamp()
    })
    setName('')
    navigate(`/room/${docRef.id}`)
  }

  return (
    <form onSubmit={create} style={{marginBottom:12}}>
      <input placeholder="New room name" value={name} onChange={e=>setName(e.target.value)} />
      <button type="submit">Create Room</button>
    </form>
  )
}
