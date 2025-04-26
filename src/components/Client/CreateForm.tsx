"use client";

import { useActionState } from "react";
import { createCronJobAction } from "@/action";


// 新規予約作成フォーム
export default function CreateForm() {
  // createCronJobActionは成功時はredirect、失敗時はobjectを返す
  // *useActionStateはform × serverActionの組み合わせでしか使えない→form × (redirect in serverAction)はアンマウント前提
  const [state, formAction, isPending] = useActionState<{success: boolean, error: string} | null, FormData>(createCronJobAction, null);

  return (
    <div>
      <form action={formAction} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">
            予約日時
          </label>
          <input 
            type="datetime-local" 
            name="date" 
            id="date"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        
        <input type="hidden" name="cron_job_name" defaultValue="ぎなん皮ふ科" />
        
        
        {
          state?.error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
            {state.error}
          </div>
        )}
        
        
        <div className="pt-2">
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "作成中..." : "予約を作成"}
          </button>
        </div>
      </form>
    </div>
  );
}