import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {

        let { site, path } = await req.json();

        if (!site.startsWith("http")) {
            site = "https://" + site;
        }

        const robotsUrl = site + "/robots.txt";

        const res = await fetch(robotsUrl);

        const content = await res.text();

        const lines = content.split("\n");

        let blocked = false;

        const errors: string[] = [];

        lines.forEach(line => {

            const l = line.trim();

            if (l.startsWith("Disallow")) {

                const rule = l.split(":")[1]?.trim();

                if (rule && path.startsWith(rule)) {
                    blocked = true;
                }

            }

            if (!l.includes(":") && l !== "") {
                errors.push("Invalid directive: " + l);
            }

        });

        return NextResponse.json({
            content,
            result: blocked ? "blocked" : "allowed",
            errors
        });

    } catch {

        return NextResponse.json({
            content: "",
            result: null,
            errors: ["Unable to fetch robots.txt"]
        });

    }

}