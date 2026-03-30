import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
function normalizeUrl(input: string) {

  let url = input.trim();

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  return url;

}

export async function POST(req: Request) {

  const { url } = await req.json();

  const target = normalizeUrl(url);

  const redirects: any[] = [];

  try {

    let current = target;

    let response: Response | null = null;

    const start = Date.now();

    for (let i = 0; i < 5; i++) {

      response = await fetch(current, {
        redirect: "manual",
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      });

      redirects.push({
        url: current,
        status: response.status
      });

      const location = response.headers.get("location");

      if (location && response.status >= 300 && response.status < 400) {

        current = location.startsWith("http")
          ? location
          : new URL(location, current).href;

      } else {

        break;

      }

    }

    const time = Date.now() - start;

    const headers: any = {};

    response?.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return NextResponse.json({

      status: response?.status,
      statusText: response?.statusText,
      finalUrl: response?.url,
      responseTime: time,
      redirects,

      headers,

      server: headers["server"] || "Unknown",
      cache: headers["cache-control"] || "Not detected",
      contentType: headers["content-type"] || "Unknown",

      ssl: response?.url.startsWith("https")

    });

  } catch (err) {

    return NextResponse.json({
      error: true,
      message: "Unable to reach server"
    });

  }

}