'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // 로그인 상태 감지 → 자동 이동
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.push('/admin')
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push('/admin')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      setMessage('인증 이메일 전송 실패')
    } else {
      setMessage('이메일이 전송되었습니다. 메일함을 확인하세요.')
    }
    setLoading(false)
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">이메일 로그인</h2>

      <input
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-2"
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white w-full py-2 rounded mb-2"
        disabled={loading}
      >
        {loading ? '전송 중...' : '인증 이메일 보내기'}
      </button>

      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  )
}