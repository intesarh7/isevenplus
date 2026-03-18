import { NextResponse } from "next/server";

// ✅ Extract domain
function extractDomain(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

// ✅ Get Domain Age (RDAP - free & fast)
async function getDomainAge(domain: string) {
  try {
    const res = await fetch(`https://rdap.org/domain/${domain}`, {
      cache: "no-store",
    });

    const data = await res.json();

    const event = data?.events?.find(
      (e: any) => e.eventAction === "registration"
    );

    const created = event?.eventDate;

    if (!created) return null;

    const years = Math.floor(
      (Date.now() - new Date(created).getTime()) /
        (1000 * 60 * 60 * 24 * 365)
    );

    return years;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { message: "URL is required" },
        { status: 400 }
      );
    }

    // ✅ MOZ API CALL
    const response = await fetch(
      "https://moz-da-pa1.p.rapidapi.com/v1/getDaPa",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "moz-da-pa1.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY as string,
        },
        body: JSON.stringify({ q: url }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "API failed");
    }

    // ✅ DOMAIN AGE FETCH
    const domain = extractDomain(url);
    const domainAge = await getDomainAge(domain);

    // ✅ FINAL RESPONSE
    return NextResponse.json({
      pageAuthority: data.page_authority,
      domainAuthority: data.domain_authority,
      spamScore: data.spam_score,
      backlinks: data.external_urls_to_url,
      nofollowLinks: data.external_nofollow_urls_to_url,
      domainAge, // number (years)
    });

  } catch (error: any) {
    console.error("API ERROR:", error.message);

    return NextResponse.json(
      { message: "Failed to fetch Page Authority" },
      { status: 500 }
    );
  }
}