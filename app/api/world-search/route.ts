import db from "@/app/lib/db";
import { NextResponse } from "next/server";

/* ================================
   NORMALIZE TEXT (SEARCH SAFE)
================================ */
function normalizeText(text: string) {
    return text
        ?.toString()
        .toLowerCase()
        .normalize("NFD") // remove accents
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/["'`´-]/g, "")
        .replace(/[^a-z0-9\s]/g, "")
        .trim();
}

/* ================================
   SLUGIFY (URL SAFE)
================================ */
function slugify(text: string) {
    return text
        ?.toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/["'`´]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

/* ================================
   CLEAN POSTAL (🔥 FIX)
================================ */
function cleanPostal(text: string) {
    return text
        ?.toString()
        .replace(/\s+/g, "-") // space → dash
        .replace(/[^0-9a-zA-Z-]/g, "") // remove junk
        .trim();
}

/* ================================
   API
================================ */
export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";

    if (!q) {
        return NextResponse.json({ results: [] });
    }

    const search = `%${q}%`;

    try {

        const [rows]: any = await db.query(
            `
        SELECT country_code, admin1, place_name, postal_code
        FROM worldwide_postal_codes
        WHERE 
            country_code LIKE ?
            OR admin1 LIKE ?
            OR place_name LIKE ?
            OR postal_code LIKE ?
        LIMIT 50
        `,
            [search, search, search, search]
        );

        /* ================================
           CLEAN + DEDUPE RESULTS
        ================================= */
        const seen = new Set();

        const cleaned = rows
            .map((r: any) => {

                const country = r.country_code?.toLowerCase();

                const stateSlug = slugify(r.admin1 || "unknown");
                const citySlug = slugify(r.place_name || "unknown");
                const postalClean = cleanPostal(r.postal_code || "");

                // unique key
                const key = `${country}-${stateSlug}-${citySlug}-${postalClean}`;

                if (seen.has(key)) return null;
                seen.add(key);

                return {
                    country_code: country,
                    admin1: r.admin1,
                    place_name: r.place_name,
                    postal_code: postalClean, // 🔥 cleaned
                    state_slug: stateSlug,
                    city_slug: citySlug,
                };
            })
            .filter(Boolean);

        return NextResponse.json({
            results: cleaned,
        });

    } catch (err) {
        console.error("WORLD SEARCH ERROR:", err);
        return NextResponse.json({ results: [] });
    }
}