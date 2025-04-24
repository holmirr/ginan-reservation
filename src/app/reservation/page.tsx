import List from "@/components/Server/List";
import { Suspense } from "react";
import Loading from "@/components/Server/loading";
import { createCronJobAction } from "@/action";
export default async function Reservation() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <List />
      </Suspense>
    <div>
      <form action={createCronJobAction}>
        <input type="hidden" name="cron_job_name" defaultValue="ぎなん皮ふ科" />
        <input type="datetime-local" name="date" />
        <button type="submit">Create</button>
      </form>
    </div>
    </div>
  );
}