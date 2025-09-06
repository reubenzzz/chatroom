import React, { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { Link } from 'react-router-dom'

export default function RoomList(){
  const [rooms, setRooms] = useState([])

  useEffect(()=>{
    const q = query(collection(db, 'rooms'), orderBy('createdAt','desc'))
    const unsub = onSnapshot(q, (snap) => {
      setRooms(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return unsub
  },[])

  return (
    <div>
      <h3>Rooms</h3>
      <ul>
        {rooms.map(r=>(
          <li key={r.id}>
            <Link to={`/room/${r.id}`}>{r.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
