import { NextResponse } from "next/server";

export async function GET() {
  const content = `google.com, pub-5131122927046742, DIRECT, f08c47fec0942fa0`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}