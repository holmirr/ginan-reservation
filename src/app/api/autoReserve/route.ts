import { NextResponse } from "next/server";
import { getReservation } from "@/libs/reservation";

export async function GET() {
  let errorCount: number = 0;
  while (true) {
    try {
      await getReservation();
      break;
    } catch (error) {
      errorCount++;
      console.error(error);
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
