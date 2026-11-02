import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const inc = searchParams.get("inc") === "1" || searchParams.get("inc") === "true";

  const url = inc
    ? "https://api.counterapi.dev/v1/tejasjsolanki_portfolio/visitors/up"
    : "https://api.counterapi.dev/v1/tejasjsolanki_portfolio/visitors";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "TejasSolankiPortfolio/2.0",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const count = typeof data.count === "number" ? data.count : parseInt(data.count, 10);
      if (!isNaN(count)) {
        return NextResponse.json({ count, source: "counterapi" });
      }
    }
  } catch {
    // Graceful offline fallback
  }

  return NextResponse.json({ count: null, status: "offline" });
}
