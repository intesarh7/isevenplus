import { NextRequest, NextResponse } from "next/server";
import beautify from "js-beautify";

const { js: jsBeautify } = beautify;

export async function POST(req: NextRequest) {
    try {
        const { js } = await req.json();

        if (!js || typeof js !== "string") {
            return NextResponse.json(
                { error: "Invalid JavaScript input" },
                { status: 400 }
            );
        }

        let formatted;

        try {
            formatted = jsBeautify(js, {
                indent_size: 2,
                space_in_empty_paren: true,
                preserve_newlines: true,
                max_preserve_newlines: 2,
                break_chained_methods: true,
            });
        } catch (err) {
            return NextResponse.json(
                { error: "Invalid or unparsable JavaScript code" },
                { status: 422 }
            );
        }

        if (!formatted) {
            return NextResponse.json(
                { error: "Beautification failed" },
                { status: 500 }
            );
        }

        return NextResponse.json({ formatted });

    } catch (err) {
        console.error("JS Beautifier Error:", err);

        return NextResponse.json(
            { error: "Server error. Try again." },
            { status: 500 }
        );
    }
}