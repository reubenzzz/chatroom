import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db, sendMessage } from '../firebase'
import Message from './Message'

export default function ChatRoom({ user }){
  const { id: roomId } = useParams()
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(()=>{
    if (!roomId) return
    const messagesRef = collection(db, 'rooms', roomId, 'messages')
    const q = query(messagesRef, orderBy('createdAt'))
    const unsub = onSnapshot(q, (snap)=>{
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    })
    return unsub
  },[roomId])

  const send = async (e) => {
    e.preventDefault()
    if (!text.trim() || !user) return
    await sendMessage(roomId, user.uid, user.displayName, text.trim())
    setText('')
    inputRef.current?.focus()
  }

  return (
    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
      <div style={{flex:1, overflowY:'auto', padding:12}}>
        {messages.map(m => <Message key={m.id} message={m} currentUid={user?.uid} />)}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={send} style={{display:'flex', gap:8, padding:12}}>
        <input ref={inputRef} value={text} onChange={e=>setText(e.target.value)} placeholder={user ? 'Type a message...' : 'Sign in to send messages'} style={{flex:1}} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
