"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, ChevronRight } from "lucide-react";

function slugify(text: string) {
    return text
        ?.toString()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

/* ================================
   ✅ STATIC COUNTRY NAME MAP (SAFE)
================================ */
const countryNames: Record<string, string> = {
     
};

/* ================================
   GET COUNTRY NAME (SAFE)
================================ */
function getCountryName(code: string) {
    return countryNames[code] || code;
}

/* ================================
   CONTINENT MAP
================================ */
const continentMap: Record<string, string> = {
    US: "North America & Caribbean",
    CA: "North America & Caribbean",
    MX: "North America & Caribbean",
    JM: "North America & Caribbean",
    CU: "North America & Caribbean",

    BR: "South America",
    AR: "South America",
    CL: "South America",
    CO: "South America",
    PE: "South America",

    GB: "Europe",
    DE: "Europe",
    FR: "Europe",
    IT: "Europe",
    ES: "Europe",
    NL: "Europe",
    SE: "Europe",
    CH: "Europe",
    RU: "Europe",
    PL: "Europe",
    BE: "Europe",
    AT: "Europe",
    DK: "Europe",

    IN: "Asia",
    CN: "Asia",
    JP: "Asia",
    PK: "Asia",
    BD: "Asia",
    AE: "Asia",
    SG: "Asia",
    SA: "Asia",
    KR: "Asia",
    TH: "Asia",
    MY: "Asia",
    ID: "Asia",
    PH: "Asia",
    VN: "Asia",
    QA: "Asia",
    KW: "Asia",
    OM: "Asia",

    AU: "Oceania",
    NZ: "Oceania",
    FJ: "Oceania",

    ZA: "Africa",
    NG: "Africa",
    EG: "Africa",
    KE: "Africa",
    TZ: "Africa",
    GH: "Africa",
    UG: "Africa",
    DZ: "Africa",
};

/* ================================
   FILTER OPTIONS
================================ */
const continents = [
    "All",
    "North America & Caribbean",
    "South America",
    "Europe",
    "Asia",
    "Oceania",
    "Africa",
    "Other",
];

export default function ContinentFilterGrid({ countryData }: any) {
    const [selected, setSelected] = useState("All");

    const filteredData = countryData;

    return (
        <>
            <div>

                

                {/* ================= GRID ================= */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredData.map((c: any) => {
                        const continent = continentMap[c.country_code] || "Other";
                        const countryName = getCountryName(c.country_code);

                        return (
                            <Link
                                key={c.country_code}
                                href={`/postalcode/${slugify(c.country_code)}`}
                                className="group border rounded-2xl p-4 hover:shadow-md transition bg-white"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 font-semibold text-sm text-gray-800">
                                            <Globe size={18} className="text-indigo-500" />
                                            {countryName}
                                        </div>

                                        {/* OPTIONAL: show code */}
                                        <span className="text-xs text-gray-400">
                                            {c.country_code}
                                        </span>
                                    </div>

                                    <ChevronRight
                                        size={16}
                                        className="text-gray-400 group-hover:translate-x-1 transition"
                                    />
                                </div>

                                {/* CONTINENT */}
                                <p className="text-xs text-indigo-600 font-medium mb-1">
                                    {continent}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {c.total} Postal Codes
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
}