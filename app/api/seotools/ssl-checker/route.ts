import { NextRequest, NextResponse } from "next/server";
import tls from "tls";

function extractHostname(input: string) {
  try {
    if (!input.startsWith("http")) {
      input = "https://" + input;
    }
    const url = new URL(input);
    return url.hostname;
  } catch {
    return input.replace(/^https?:\/\//, "").split("/")[0];
  }
}

export async function POST(req: NextRequest) {
  try {
    const { domain } = await req.json();

    if (!domain) {
      return NextResponse.json({ error: "Domain required" }, { status: 400 });
    }

    const hostname = extractHostname(domain);

    return new Promise((resolve) => {
      const socket = tls.connect(
        {
          host: hostname,
          port: 443,
          servername: hostname, // VERY IMPORTANT (SNI fix)
          rejectUnauthorized: false,
        },
        () => {
          try {
            const cert = socket.getPeerCertificate(true);

            if (!cert || Object.keys(cert).length === 0) {
              throw new Error("No certificate found");
            }

            const valid_from = cert.valid_from;
            const valid_to = cert.valid_to;

            const expiryDate = new Date(valid_to);
            const now = new Date();

            const days_left = Math.ceil(
              (expiryDate.getTime() - now.getTime()) /
              (1000 * 60 * 60 * 24)
            );

            const data = {
              domain: hostname,
              issuer: cert.issuer?.O || cert.issuer?.CN || "Unknown",
              valid_from,
              valid_to,
              days_left,
              valid: days_left > 0,
            };

            socket.end();

            resolve(NextResponse.json(data));
          } catch (err) {
            resolve(
              NextResponse.json(
                { error: "SSL parse failed" },
                { status: 500 }
              )
            );
          }
        }
      );

      socket.setTimeout(10000);

      socket.on("timeout", () => {
        socket.destroy();
        resolve(
          NextResponse.json(
            { error: "Connection timeout" },
            { status: 500 }
          )
        );
      });

      socket.on("error", () => {
        resolve(
          NextResponse.json(
            { error: "Unable to fetch SSL certificate" },
            { status: 500 }
          )
        );
      });
    });

  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}