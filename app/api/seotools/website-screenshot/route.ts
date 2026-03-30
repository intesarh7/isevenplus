import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
function normalize(url: string) {

  if (!url.startsWith("http")) {
    url = "https://" + url;
  }

  return url;

}

export async function POST(req: Request) {

  const { url, device } = await req.json();

  const target = normalize(url);

  try {

    const start = Date.now();

    const site = await fetch(target);

    const loadTime = Date.now() - start;

    let width = 1920;

if (device === "mobile") width = 800;
if (device === "tablet") width = 1200;
if (device === "desktop") width = 1920;

const screenshot =
`https://s.wordpress.com/mshots/v1/${encodeURIComponent(target)}?w=${width}`;

    return NextResponse.json({

      screenshot,
      status: site.status,
      ssl: target.startsWith("https"),
      loadTime

    });

  } catch {

    return NextResponse.json({
      error: true
    });

  }

}