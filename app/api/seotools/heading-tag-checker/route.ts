import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req:NextRequest){

const url = req.nextUrl.searchParams.get("url");

if(!url) return new Response("URL missing");

const res = await fetch(url);

const html = await res.text();

return new Response(html,{
headers:{ "Content-Type":"text/html"}
});

}