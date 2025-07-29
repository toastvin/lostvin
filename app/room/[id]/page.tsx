'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function RoomPage() {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    if (!name || !date) {
      setMessage('이름과 날짜를 모두 입력해주세요.')
      return
    }

    const { error } = await supabase.from('reservations').insert({
      room_id: id,
      name,
      date,
    })

    if (error) {
      setMessage('예약 실패: ' + error.message)
    } else {
      setMessage('✅ 예약이 완료되었습니다.')
      setName('')
      setDate('')
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">예약방 ID: {id}</h1>

      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-2"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-2"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white w-full py-2 rounded"
      >
        예약하기
      </button>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
  )
}