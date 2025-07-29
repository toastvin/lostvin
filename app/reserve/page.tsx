'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ReservePage() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [memo, setMemo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('reservations').insert([
      {
        name,
        date,
        memo,
        room_id: 'manual-form', // 수동 예약용 고정 room_id
      },
    ]);

    if (error) {
      alert('등록 실패: ' + error.message);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 수동 예약 등록</h1>

      {submitted ? (
        <div className="bg-green-100 text-green-800 p-4 rounded">
          예약이 완료되었습니다!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="이름"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <textarea
            placeholder="메모 (선택)"
            className="w-full border p-2 rounded"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            예약 제출
          </button>
        </form>
      )}
    </div>
  );
}