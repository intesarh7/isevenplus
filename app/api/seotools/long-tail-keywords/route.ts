import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

async function fetchHTML(url: string) {

    const res = await fetch(url, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9"
        }
    })

    return await res.text()

}


/* ---------------------------
 GOOGLE AUTOCOMPLETE
--------------------------- */

async function googleSuggest(keyword: string, country: string): Promise<string[]> {

    const random = Date.now()

    const url =
        `https://suggestqueries.google.com/complete/search?client=firefox&gl=${country}&q=${encodeURIComponent(keyword)}&nocache=${random}`

    const res = await fetch(url)

    const data = await res.json()

    return data[1] || []

}


/* ---------------------------
 PEOPLE ALSO ASK
--------------------------- */

async function peopleAlsoAsk(keyword: string, country: string) {

    const randomStart = Math.floor(Math.random() * 50)
    const url =
        `https://www.google.com/search?q=${encodeURIComponent(keyword)}&gl=${country}&hl=en&start=${randomStart}`

    const matches = [...url.matchAll(/"question":"(.*?)"/g)]

    return matches.map(x =>
        x[1]
            .replace(/\\u003c.*?\\u003e/g, "")
            .replace(/\\/g, "")
    )

}


/* ---------------------------
 RELATED SEARCHES
--------------------------- */

async function relatedSearches(keyword: string, country: string) {

    const html = await fetchHTML(
        `https://www.google.com/search?q=${encodeURIComponent(keyword)}&gl=${country}`
    )

    const matches = [...html.matchAll(/<a[^>]+>(.*?)<\/a>/g)]

    return matches
        .map(x => x[1].replace(/<[^>]+>/g, ""))
        .filter(x => x.toLowerCase().includes(keyword.toLowerCase()))

}

/* ---------------------------
 REDDIT SEARCH KEYWORDS
--------------------------- */

async function redditKeywords(keyword: string) {

    const url =
        `https://www.reddit.com/search.json?q=${encodeURIComponent(keyword)}&limit=25`

    try {

        const res = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        })

        const json = await res.json()

        const posts = json?.data?.children || []

        const titles = posts.map((p: any) => p.data.title)

        return titles

    } catch {

        return []

    }

}


function cleanTitle(t: string) {

    return t
        .replace(/<[^>]+>/g, "")
        .replace(/&.*?;/g, "")
        .replace(/\s+/g, " ")
        .trim()

}

function validTitle(t: string) {

    const low = t.toLowerCase()

    if (t.length < 15) return false

    const junk = [
        "google search",
        "sign in",
        "images for",
        "maps",
        "news",
        "videos"
    ]

    return !junk.some(j => low.includes(j))

}


/* ---------------------------
 SERP TITLES (FIXED PROPERLY)
--------------------------- */

async function serpGoogle(keyword: string, country: string) {

    const url =
        `https://www.google.com/search?q=${encodeURIComponent(keyword)}&gl=${country}&hl=en`

    const html = await fetchHTML(url)

    const titles: string[] = []

    const regex = /<h3[^>]*>(.*?)<\/h3>/gi

    let match

    while ((match = regex.exec(html)) !== null) {

        const title = cleanTitle(match[1])

        if (validTitle(title) && !titles.includes(title)) {
            titles.push(title)
        }

    }

    return titles

}

async function serpBing(keyword: string) {

    const url =
        `https://www.bing.com/search?q=${encodeURIComponent(keyword)}`

    const html = await fetchHTML(url)

    const titles: string[] = []

    const regex = /<h2[^>]*><a[^>]*>(.*?)<\/a>/gi

    let match

    while ((match = regex.exec(html)) !== null) {

        const title = cleanTitle(match[1])

        if (validTitle(title) && !titles.includes(title)) {
            titles.push(title)
        }

    }

    return titles

}

async function serpDuck(keyword: string) {

    const url =
        `https://duckduckgo.com/html/?q=${encodeURIComponent(keyword)}`

    const html = await fetchHTML(url)

    const titles: string[] = []

    const regex = /result__a[^>]*>(.*?)<\/a>/gi

    let match

    while ((match = regex.exec(html)) !== null) {

        const title = cleanTitle(match[1])

        if (validTitle(title) && !titles.includes(title)) {
            titles.push(title)
        }

    }

    return titles

}

async function serpTitles(keyword: string, country: string) {

    const google = await serpGoogle(keyword, country).catch(() => [])
    const bing = await serpBing(keyword).catch(() => [])
    const duck = await serpDuck(keyword).catch(() => [])

    const combined = [
        ...google,
        ...bing,
        ...duck
    ]

    let unique = [...new Set(combined)]

    unique = unique
        .map(v => ({ v, r: Math.random() }))
        .sort((a, b) => a.r - b.r)
        .map(x => x.v)

    return unique.slice(0, 10)

}

/* ---------------------------
 LONG TAIL EXPANSION
--------------------------- */

async function expandLongTail(baseKeywords: string[], country: string) {

    const expanded: string[] = []

    for (const k of baseKeywords.slice(0, 20)) {

        const suggestions = await googleSuggest(k, country)

        suggestions.forEach((s: string) => expanded.push(s))

    }

    return expanded

}


/* ---------------------------
 QUESTION KEYWORDS
--------------------------- */

function questionKeywords(seed: string) {

    const q = ["how", "why", "what", "which", "when", "where"]

    return q.map(x => `${x} ${seed}`)

}

/* ---------------------------
 QUERY EXPANSION
--------------------------- */

async function expandQueries(keyword: string, country: string) {

    const words = [
        "for",
        "with",
        "vs",
        "near",
        "best",
        "top",
        "review",
        "tools",
        "software",
        "service"
    ]

    const shuffled = words.sort(() => 0.5 - Math.random())

    const variants = shuffled.slice(0, 6).map(w => `${keyword} ${w}`)

    const results: string[] = []

    for (const q of variants) {

        const suggestions = await googleSuggest(q, country)

        suggestions.forEach(s => results.push(s))

    }

    return results

}


/* ---------------------------
 INTENT DETECTION
--------------------------- */

function detectIntent(keyword: string) {

    keyword = keyword.toLowerCase()

    if (keyword.includes("buy") || keyword.includes("price"))
        return "Transactional"

    if (keyword.includes("best") || keyword.includes("top"))
        return "Commercial"

    if (keyword.includes("how") || keyword.includes("guide"))
        return "Informational"

    return "Navigational"

}


/* ---------------------------
 TREND DETECTION
--------------------------- */

function trendIndicator(keyword: string) {

    const year = new Date().getFullYear()

    if (keyword.includes(year.toString()))
        return "Rising"

    if (keyword.includes("2020") || keyword.includes("2019"))
        return "Declining"

    return "Stable"

}


/* ---------------------------
 SEARCH VOLUME MODEL
--------------------------- */

function estimateVolume(keyword: string) {

    const words = keyword.split(" ").length

    return Math.floor((1500 / words) * 8)

}


/* ---------------------------
 CPC MODEL
--------------------------- */

function estimateCPC(keyword: string) {

    return (keyword.length * 0.12).toFixed(2)

}


/* ---------------------------
 KEYWORD DIFFICULTY
--------------------------- */

function keywordDifficulty(volume: number, serpCount: number) {

    const score = (volume / 500) + serpCount * 2

    return Math.min(100, Math.floor(score))

}


/* ---------------------------
 OPPORTUNITY SCORE
--------------------------- */

function opportunity(volume: number, difficulty: number) {

    return Math.round(volume / (difficulty + 1))

}


/* ---------------------------
 KEYWORD CLUSTERING (IMPROVED)
--------------------------- */

function clusterKeywords(list: string[]) {

    const clusters: any = {}

    list.forEach(k => {

        const words = k.split(" ")

        const root = words.slice(0, 2).join(" ")

        if (!clusters[root]) clusters[root] = []

        clusters[root].push(k)

    })

    return clusters

}


/* ---------------------------
 CLEAN KEYWORDS
--------------------------- */

function cleanKeywords(list: string[]) {

    return list
        .map(k => k.toLowerCase().trim())
        .filter(k => k.length > 4)

}


/* ---------------------------
 LONG TAIL FILTER
--------------------------- */

function longTailOnly(list: string[]) {

    return list.filter(k => {

        const words = k.split(" ").length

        return words >= 4 && words <= 9

    })

}


/* ---------------------------
 MAIN API
--------------------------- */

export async function POST(req: Request) {

    const { keyword, country = "us" } = await req.json()

    if (!keyword) {

        return NextResponse.json(
            { error: "keyword required" },
            { status: 400 }
        )

    }

    try {

        const suggest = await googleSuggest(keyword, country)

        const paa = await peopleAlsoAsk(keyword, country)

        const related = await relatedSearches(keyword, country)
        const reddit = await redditKeywords(keyword)

        const serp = await serpTitles(keyword, country)

        const questions = questionKeywords(keyword)
        const expandedQueries = await expandQueries(keyword, country)

        const baseSources = [
            ...suggest,
            ...paa,
            ...related,
            ...serp,
            ...questions,
            ...reddit
        ]

        /* expand deeper queries */

        const expanded = await expandLongTail(baseSources, country)

        const allSources = [
            ...suggest,
            ...paa,
            ...related,
            ...serp,
            ...questions,
            ...reddit,
            ...expandedQueries,
            ...expanded
        ]
        const cleaned = cleanKeywords(allSources)

        const longTail = longTailOnly(cleaned)

        let unique = [...new Set(longTail)]

        if (unique.length < 50) {

            const extra = await expandQueries(keyword + " tips", country)

            unique = [...new Set([...unique, ...extra])]

        }
        unique = unique.sort(() => Math.random() - 0.5)

        unique = unique.slice(0, 1000)

        const keywords = unique.map(k => {

            const volume = estimateVolume(k)

            const difficulty = keywordDifficulty(volume, serp.length)

            const intent = detectIntent(k)

            return {

                keyword: k,

                volume,

                cpc: estimateCPC(k),

                difficulty,

                intent,

                trend: trendIndicator(k),

                words: k.split(" ").length,

                opportunity: opportunity(volume, difficulty)

            }

        })


        const clusters = clusterKeywords(unique)


        const chartData = keywords.map(k => ({
            keyword: k.keyword,
            volume: k.volume,
            difficulty: k.difficulty
        }))


        return NextResponse.json({

            keywords,
            clusters,
            serp,
            chartData

        })

    } catch (err) {

        return NextResponse.json(
            { error: "scraping failed" },
            { status: 500 }
        )

    }

}