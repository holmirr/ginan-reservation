const dynamic = "force-dynamic";

import { getCronJobs } from "@/libs/easycron";
import ListClient from "@/components/Client/List";

export default async function List() {
  try {
    const cronJobs = await getCronJobs();
    return (
      <div>
        <h1>予約一覧</h1>
        <ListClient _cronJobs={cronJobs} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div>
        <h1>予約取得エラーが発生しました</h1>
        <p>{(error as Error).message}</p>
      </div>
    );
  }
}