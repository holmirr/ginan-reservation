"use server";

import { deleteCronJob, createCronJob } from "@/libs/easycron";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const url = "http://vercel.com/api/autoReservation"

export async function deleteCronJobAction(cron_job_id: number) {
  try{
    await deleteCronJob(cron_job_id);
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: (error as Error).message
    }
  }
  revalidatePath("/reservation");
  redirect("/reservation");
}

export async function createCronJobAction(formData: FormData) {
  const cron_job_name = formData.get("cron_job_name") as string;
  const dateStr = formData.get("date") as string;
  const date = new Date(dateStr + "Z");
  
  // 現在時刻と比較して、過去の日時でないかチェックを追加
  const now = new Date();
  if (date < now) {
    redirect(`/reservation?${new URLSearchParams({error: "過去の日時は指定できません"})}`);
  }

  try{
    await createCronJob(url, cron_job_name, {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
      hour: date.getUTCHours(),
      minute: date.getUTCMinutes()
    });


  } catch (error) {
    console.error(error);
    redirect(`/reservation?${new URLSearchParams({error: "予約の作成に失敗しました"})}`);
  }

  revalidatePath("/reservation");
  redirect("/reservation");
}


