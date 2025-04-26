// Suspenseのfallbackとして表示されるぐるぐる
export default function Loading() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-500">読み込み中...</p>
      </div>
    </div>
  );
}
