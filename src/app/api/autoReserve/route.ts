import { NextResponse } from "next/server";
import { getReservation } from "@/libs/reservation";

// ぎなん予約を自動で開始するAPIルート
// 成功でも失敗でもjsonを返す
export async function GET() {
  // 3回までトライする。
  let errorCount: number = 0;
  while (true) {
    try {
      await getReservation();
      break;
    } catch (error) {
      errorCount++;
      console.error(error);
      // 100ms待ってから再トライ
      await new Promise(r => setTimeout(r, 100));
      if (errorCount > 3) {
        return NextResponse.json({
          error: "Failed to get reservation",
          detail: (error as Error).message,
        }, { status: 500 });
      }
    }
  }
  return NextResponse.json({
    status: "success",
  }, { status: 200 });
}
