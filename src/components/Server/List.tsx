// 常に最新の予約状況を取得するためにforce-dynamicを設定
const dynamic = "force-dynamic";

import { getCronJobs } from "@/libs/easycron";
import ListClient from "@/components/Client/List";

export default async function List() {
  try {
    // サーバーコンポーネントで外部APIと通信し、クライアントコンポーネントにpropsとして渡す＝Suspenseが使える AND セキュアな実装
    const cronJobs = await getCronJobs();
    return <ListClient _cronJobs={cronJobs} />;
  } catch (error) {
    console.error(error);
    // 取得エラー時はサーバー側でエラーメッセージを含むコンポーネントを構築する。
    // vercelではサーバーからのエラーをクライアントコンポーネントに投げると、メッセージがマスクされるため
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-600 font-medium mb-2">予約取得エラー</h3>
        <p className="text-red-500 text-sm">{(error as Error).message}</p>
      </div>
    );
  }
}