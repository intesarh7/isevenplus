import { NextRequest, NextResponse } from "next/server";
import dns from "dns";

const resolver = new dns.Resolver();

// 🔥 Use Google DNS (stable)
resolver.setServers(["8.8.8.8", "8.8.4.4"]);

function resolveAsync(method: Function, domain: string) {
    return new Promise((resolve) => {
        method.call(resolver, domain, (err: any, records: any) => {
            if (err) return resolve([]);
            resolve(records || []);
        });
    });
}
function cleanDomain(input: string) {
    try {
        const url = new URL(input);
        return url.hostname;
    } catch {
        return input
            .replace(/^https?:\/\//, "")
            .replace(/\/.*$/, "");
    }
}
export async function POST(req: NextRequest) {
    try {
        const { domain } = await req.json();
        const clean = cleanDomain(domain);

        if (!domain || typeof domain !== "string") {
            return NextResponse.json(
                { error: "Invalid domain" },
                { status: 400 }
            );
        }

        const result: any = {};

        result.A = await resolveAsync(resolver.resolve4, clean);
        result.AAAA = await resolveAsync(resolver.resolve6, clean);
        result.MX = await resolveAsync(resolver.resolveMx, clean);
        result.NS = await resolveAsync(resolver.resolveNs, clean);
        result.TXT = await resolveAsync(resolver.resolveTxt, clean);
        result.CNAME = await resolveAsync(resolver.resolveCname, clean);

        return NextResponse.json(result);

    } catch (err) {
        console.error("DNS Lookup Error:", err);

        return NextResponse.json(
            { error: "DNS lookup failed" },
            { status: 500 }
        );
    }
}

