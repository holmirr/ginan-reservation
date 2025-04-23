import MyFetch from "@holmirr/myfetch";
import * as cheerio from "cheerio";

const headers = {
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Encoding": "gzip, deflate, br, zstd",
  "Accept-Language": "en-US,en;q=0.5",
  "Cache-Control": "no-cache",
  "Connection": "keep-alive",
  "Host": "ginan-skin.mdja.jp",
  "Pragma": "no-cache",
  "Priority": "u=0, i",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "cross-site",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0"
};

const {fetch, client } = MyFetch.create({
  defaultHeaders: headers
})

export async function getReservation() {
  const res1 = await fetch("https://ginan-skin.mdja.jp/");
  const $1 = cheerio.load(await res1.text());
  const href1 = $1("a.group-next-button.group-next-button--g0").first().attr("href");
  console.log("href1", href1);
  if (!href1) throw new Error("href1 is not found");

  const res2 = await fetch("https://ginan-skin.mdja.jp/" + href1);
  const $2 = cheerio.load(await res2.text());
  const href2 = $2("a#ymake").first().attr("href");
  if (!href2) throw new Error("href2 is not found");

  const res3 = await fetch("https://ginan-skin.mdja.jp/" + href2);
  const $3 = cheerio.load(await res3.text());
  const form = $3("form#form1");
  const href3 = form.attr("action");
  if (!href3) throw new Error("href3 is not found");

  const data: Record<string, string> = {};
  form.find("input").each((_, el) => {
    const $el = $3(el);
    const name = $el.attr("name");
    const value = $el.attr("value");
    if (name === "id1") data.id1 = "051277";
    else if (name === "birth1") data.birth1 = "0729";
    else if (name) data[name] = value ?? "";
  });
  
  const res4 = await fetch("https://ginan-skin.mdja.jp/" + href3 + "?" + new URLSearchParams(data).toString());
  const $4 = cheerio.load(await res4.text());
  const href4 = $4("a.button").filter((_, el) => $4(el).text().trim() === "はい(本人のみ受付する)").attr("href");
  if (!href4) throw new Error("href4 is not found");

  const res5 = await fetch("https://ginan-skin.mdja.jp/" + href4);
  const $5 = cheerio.load(await res5.text());
  const index = $5("div.box-li-right-wrapper span").first().text().trim();
  if (!index) throw new Error("index is not found");

  console.log(`あなたは${index}目の予約者です。`);
}
