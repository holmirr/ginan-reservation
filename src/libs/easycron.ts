import MyFetch, { MyFetchError } from "@holmirr/myfetch";
import { CronJobsResponse, CronJob } from "./types";

const { fetch, client } = MyFetch.create({
  defaultHeaders: {
    "Content-Type": "application/json",
    "X-API-KEY": process.env.EASYCRON_API_KEY as string,
  }
})

// EasyCronのAPIを使用して指定されたurlに対してアクセスを行う予約を作成する
export async function createCronJob(url: string, cron_job_name: string, { year, month, day, hour, minute }: { year: number, month: number, day: number, hour: number, minute: number }) {
  const cronUrl = "https://api.easycron.com/v1/cron-jobs"
  const cronData = {
    url,
    cron_expression: `${minute} ${hour} ${day} ${month} * ${year}`,
    timezone: "Asia/Tokyo",
    timezon_from: 2,
    cron_job_name
  }

  const res = await fetch(cronUrl, { method: "POST", body: JSON.stringify(cronData) });
  const { cron_job_id }: { cron_job_id: number } = await res.json();
  return cron_job_id;
}

// EasyCronのAPIを使用して予約されているCronJob情報一覧を取得
export async function getCronJobs(): Promise<CronJob[]> {
  const cronUrl = "https://api.easycron.com/v1/cron-jobs"
  try {
    const res = await fetch(cronUrl);
    const data = await res.json() as CronJobsResponse;
    return data.cron_jobs;
  } catch (error) {
    if (!(error instanceof MyFetchError)) {
      throw error;
    }
    else if (error.status === 404) {
      return [];
    } else {
      throw error;
    }
  }
}

// EasyCronのAPIを使用して指定されたCronJobを削除
export async function deleteCronJob(cron_job_id: number) {
  const cronUrl = `https://api.easycron.com/v1/cron-jobs/${cron_job_id}`;
  const res = await fetch(cronUrl, { method: "DELETE" });
}

