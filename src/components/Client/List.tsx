"use client";

import { CronJob } from "@/libs/types";
import { useEffect, useState } from "react";
import { cronToDate } from "@/libs/cronText";
import { deleteCronJobAction } from "@/action";

// 予約一覧をサーバーコンポーネントからpropsとして受け取り表示する
// 削除ボタンを実装したいのでクライアントコンポーネントとしている。
export default function ListClient({ _cronJobs }: { _cronJobs: CronJob[] }) {
  // propsとして受け取ったリストをnameごとに分類してオブジェクトとしてstateに格納
  const [cronJobs, setCronJobs] = useState<Record<string, CronJob[]>>({});
  // deletingは削除中のcronJobIdを格納する
  const [deleting, setDeleting] = useState<number | null>(null);
  
  // propsが更新される＝クライアントルーティングごと or 初回マウント時に実行
  // propsのリストからnameごとに分類してオブジェクトとしてstateに格納
  useEffect(() => {
    // 削除した後にクライアントルーティングでuseEffectが実行されるので、このタイミングでdeletingをnullにする
    setDeleting(null);
    // Array.reduceでリストをnameごとに分類してオブジェクトとしてstateに格納
    // reduceの引数は(要素ごとのcallback, 初期値)
    // callbackの引数は(累計値、要素)
    // 要素ごとに累計値に要素を追加していく
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

  
  const handleDelete = async (cronJobId: number) => {
    setDeleting(cronJobId);
    try {
      // deleteCronJobActionは成功時はredirect、失敗時はobjectを返す
      // redirect時はNext_Redirectのエラーがthrowされる
      const res = await deleteCronJobAction(cronJobId);
      if (!res.success) {
        throw new Error(res.error);
      }
    } catch (error) {
      // エラーがNext_Redirectのエラーの場合は何もしない
      if (error instanceof Error && 
          'digest' in error && 
          typeof error.digest === 'string' && 
          error.digest.includes('NEXT_REDIRECT')) {
        return;
      }
      // エラーがNext_Redirectのエラーでない場合は削除エラーメッセージを表示
      alert("削除に失敗しました");
      setDeleting(null);
    }
  };
  
  return (
    <div>
      {Object.keys(cronJobs).length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          予約がありません。新規予約を作成してください。
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(cronJobs).map(([clinicName, appointments]) => (
            <div key={clinicName} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">{clinicName}</h3>
              </div>
              
              <div className="divide-y divide-gray-200">
                {appointments.map((appointment) => {
                  const appointmentDate = cronToDate(appointment.cron_expression);
                  const formattedDate = appointmentDate.toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                    timeZone: "UTC"
                  });
                  
                  return (
                    <div key={appointment.cron_job_id} className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                        <span className="font-medium">{formattedDate}</span>
                      </div>
                      
                      <button 
                        onClick={() => handleDelete(appointment.cron_job_id)}
                        disabled={deleting === appointment.cron_job_id}
                        className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        {deleting === appointment.cron_job_id ? "削除中..." : "削除"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}