"use client";

import { CronJob } from "@/libs/types";
import { useEffect, useState } from "react";
import { cronToDate } from "@/libs/cronText";
import { deleteCronJobAction } from "@/action";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ListClient({ _cronJobs }: { _cronJobs: CronJob[] }) {
  const [cronJobs, setCronJobs] = useState<Record<string, CronJob[]>>({});
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    setCronJobs(_cronJobs.reduce<Record<string, CronJob[]>>((acc, cronJob) => {
      const key = cronJob.cron_job_name ?? "unknown";
      if (acc[key] === undefined) {
        acc[key] = [cronJob];
      } else {
        acc[key].push(cronJob);
      }
      return acc;
    }, {}));
  }, [_cronJobs]);
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      alert(error);
      router.replace("/reservation");
    }
  }, [searchParams]);
  return (
    <div>
      <ul>
        {Object.entries(cronJobs).map(([key, cronJobs]) => (
          <li key={key}>
            <p>{key}</p>
            <ul>
              {cronJobs.map((cronJob) => (
                <li key={cronJob.cron_job_id}>
                  <p>
                    {cronToDate(cronJob.cron_expression).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      timeZone: "UTC"
                    })}
                  </p>
                  <button onClick={async () => {
                    const res = await deleteCronJobAction(cronJob.cron_job_id);
                    if (res === undefined) return;
                    if (!res.success) {
                      console.error(res.error);
                      alert("削除に失敗しました");
                    }
                  }
                  }
                  >Delete</button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}