import { Suspense } from "react";
import Loading from "@/components/Server/loading";
import List from "@/components/Server/List";
import CreateForm from "@/components/Client/CreateForm";

export default async function Reservation() {
  return (
    <div className="space-y-10">
      <section className="bg-white p-6 rounded-lg shadow-card">
        <h2 className="text-xl font-semibold mb-6 text-primary">予約一覧</h2>
        {/*予約リスト一覧は外部APIから取得する＝delayがあるためSuspenseで囲み、まずはfallbackのLoadingを表示 */}
        <Suspense fallback={<Loading />}>
          <List />
        </Suspense>
      </section>
      
      <section className="bg-white p-6 rounded-lg shadow-card">
        <h2 className="text-xl font-semibold mb-6 text-primary">新規予約</h2>
        <CreateForm />
      </section>
    </div>
  );
}