import React from 'react'

export default function Message({ message, currentUid }){
  const mine = message.uid === currentUid
  return (
    <div style={{ display:'flex', justifyContent: mine ? 'flex-end' : 'flex-start', marginBottom:8 }}>
      <div style={{ maxWidth:'70%', padding:8, borderRadius:8, background: mine ? '#DCF8C6' : '#ffffff22', color: mine? '#000':'#fff' }}>
        <div style={{ fontSize:12, opacity:.9 }}>{message.displayName}</div>
        <div style={{ marginTop:4 }}>{message.text}</div>
      </div>
    </div>
  )
}
