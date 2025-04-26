// clientコンポーネントで使用される
// cron式のstringをDateオブジェクトに変換する
export function cronToDate(cronExpress: string){
  const [minute, hour, day, month, weekday, year] = cronExpress.split(" ");
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute)));
}