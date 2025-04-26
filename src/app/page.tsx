import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      <h2 className="text-2xl font-semibold text-center">予約システムへようこそ</h2>
      <p className="text-lg text-gray-600 max-w-2xl text-center">
        このシステムで簡単に予約を管理できます。以下のリンクから予約ページにアクセスしてください。
      </p>
      <Link 
        href="/reservation" 
        className="px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 transition-colors"
      >
        予約ページへ
      </Link>
    </div>
  );
}
