"use server";

import { deleteCronJob, createCronJob } from "@/libs/easycron";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// EasyCronのAPIを使用して指定されたCronJobを削除
// 削除成功時はリダイレクト、失敗時はエラーメッセージを返す
// このサーバーアクションはformで使用されない＝成功時クライアントコンポーネントはアンマウントされず再レンダリングされる。
// 成功時はクライアントルーティングで最新の予約状況を取得し、再レンダリングされる。
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

// 指定された日時にEasyCronの予約を作成するサーバーアクション
// 作成成功時はリダイレクト、失敗時はuseActionStateにエラーメッセージを返す
// このサーバーアクションはformで使用される＝成功時クライアントコンポーネントはアンマウントされる。
export async function createCronJobAction(prevState: {success: boolean, error: string} | null, formData: FormData) {
  const cron_job_name = formData.get("cron_job_name") as string;
  const dateStr = formData.get("date") as string;
  const date = new Date(dateStr + "Z");
  
  // 現在時刻と比較して、過去の日時でないかチェックを追加
  const now = new Date();
  if (date < now) {
    return {
      success: false,
      error: "過去の日時は指定できません"
    }
  }

  try{
    await createCronJob(process.env.ReservationApiURL as string, cron_job_name, {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
      hour: date.getUTCHours(),
      minute: date.getUTCMinutes()
    });


  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "予約の作成に失敗しました"
    }
  }

  revalidatePath("/reservation");
  redirect("/reservation");
}


