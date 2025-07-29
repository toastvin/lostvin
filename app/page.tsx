'use client'

import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function HomePage() {
  const router = useRouter()

  const handleCreateRoom = async () => {
    const roomId = uuidv4().slice(0, 6) // 6자리 방 코드 생성
    const { error } = await supabase.from('rooms').insert({ id: roomId })
    if (error) {
      alert('예약방 생성 실패: ' + error.message)
    } else {
      router.push(`/room/${roomId}`)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">🧩 우리 조직만의 예약 시스템</h1>
      <button
        onClick={handleCreateRoom}
        className="bg-green-600 text-white px-6 py-3 rounded text-lg"
      >
        예약방 만들기
      </button>
    </div>
  )
}