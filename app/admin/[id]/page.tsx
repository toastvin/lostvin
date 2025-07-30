type AdminPageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: AdminPageProps) {
  const { id: roomId } = params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">예약 내역 (방 ID: {roomId})</h1>
      <p>예약 정보는 클라이언트 컴포넌트에서 불러옵니다.</p>
    </div>
  );
}