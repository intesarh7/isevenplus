import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ✅ CACHE
const cache: Record<string, { data: any; time: number }> = {};

function normalize(domain: string) {
    return domain
        .replace(/^https?:\/\//, "")
        .replace("www.", "")
        .split("/")[0]
        .toLowerCase();
}

// ✅ MOZ DA/PA
async function getMozData(domain: string) {
    try {
        const res = await fetch("https://moz-da-pa1.p.rapidapi.com/v1/getDaPa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
                "X-RapidAPI-Host": "moz-da-pa1.p.rapidapi.com",
            },
            body: JSON.stringify({ q: domain }),
        });

        const data = await res.json();

       // console.log("MOZ RAW:", data); // debug

        return {
            da: Number(data?.domain_authority ?? 0),
            pa: Number(data?.page_authority ?? 0),
            spam: Number(data?.spam_score ?? 0),
            backlinks: Number(data?.external_urls_to_url ?? 0), // 🔥 IMPORTANT
            domains: Math.floor((data?.external_urls_to_url ?? 0) * 0.25), // estimate
        };
    } catch (err) {
      // console.error("Moz API Error:", err);
        return { da: 0, pa: 0, spam: 0, backlinks: 0, domains: 0 };
    }
}

// ✅ BACKLINK API (WORKING FORMAT)
async function getBacklinks(domain: string) {
    try {
        const res = await fetch(
            `https://domain-backlinks.p.rapidapi.com/?domain=${domain}`,
            {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
                    "X-RapidAPI-Host": "domain-backlinks.p.rapidapi.com",
                },
            }
        );

        const data = await res.json();

       // console.log("Backlink API RAW:", data); // 🔥 DEBUG

        return {
            backlinks: Number(
                data?.backlinks ??
                data?.total_backlinks ??
                data?.data?.backlinks ??
                0
            ),
            domains: Number(
                data?.refdomains ??
                data?.referring_domains ??
                data?.data?.refdomains ??
                0
            ),
        };
    } catch (err) {
       // console.error("Backlink API Error:", err);
        return { backlinks: 0, domains: 0 };
    }
}
// ✅ DOMAIN AGE (FREE API)
async function getDomainAge(domain: string) {
    try {
        const res = await fetch(`https://rdap.org/domain/${domain}`);
        const data = await res.json();

        const event = data?.events?.find((e: any) => e.eventAction === "registration");

        const created = event?.eventDate;

        if (!created) return "N/A";

        const years = Math.floor(
            (Date.now() - new Date(created).getTime()) /
            (1000 * 60 * 60 * 24 * 365)
        );

        return `${years} Years`;
    } catch {
        return "N/A";
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    let domain = searchParams.get("domain");

    if (!domain) {
        return NextResponse.json({ message: "Domain required" }, { status: 400 });
    }

    domain = normalize(domain);

    // ✅ CACHE
    if (cache[domain] && Date.now() - cache[domain].time < 3600000) {
        return NextResponse.json(cache[domain].data);
    }

    try {
        if (!process.env.RAPIDAPI_KEY) {
            throw new Error("Missing RAPIDAPI_KEY");
        }

        // 🔥 ALL APIs PARALLEL

        const [moz, age] = await Promise.all([
            getMozData(domain),
            getDomainAge(domain),
        ]);

        const finalData = {
            domain,
            da: moz.da,
            pa: moz.pa,
            spam: moz.spam,
            backlinks: moz.backlinks,   // ✅ FIXED
            domains: moz.domains,       // ✅ FIXED
            age,
            source: "moz-full",
        };

        // ✅ CACHE SAVE
        cache[domain] = {
            data: finalData,
            time: Date.now(),
        };

        return NextResponse.json(finalData);

    } catch (err: any) {
        return NextResponse.json({
            domain,
            da: 0,
            pa: 0,
            spam: 0,
            backlinks: 0,
            domains: 0,
            age: "N/A",
            error: err.message,
        });
    }
}