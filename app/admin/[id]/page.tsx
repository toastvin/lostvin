import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import { redirect } from 'next/navigation';

type Reservation = {
  id: number;
  name: string;
  date: string;
  created_at: string;
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id: roomId } = params;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data } = await supabase
    .from('reservations')
    .select('*')
    .eq('room_id', roomId)
    .order('date', { ascending: true });

  const reservations = data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">예약 내역 (방 ID: {roomId})</h1>
      {reservations.length === 0 ? (
        <p>예약된 정보가 없습니다.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">이름</th>
              <th className="px-4 py-2 border">예약일</th>
              <th className="px-4 py-2 border">등록일</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.id}>
                <td className="border px-4 py-2">{res.name}</td>
                <td className="border px-4 py-2">{res.date}</td>
                <td className="border px-4 py-2">
                  {format(new Date(res.created_at), 'yyyy-MM-dd HH:mm')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}