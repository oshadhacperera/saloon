export const runtime = "nodejs";

import { kv } from "@vercel/kv";

export async function GET() {
    const open = await kv.get("saloonOpen");

    return new Response(
        JSON.stringify({ open: open ?? false }),
        { status: 200 }
    );
}

export async function POST(req) {
    try {
        const { open } = await req.json();

        if (typeof open !== "boolean") {
            return new Response(
                JSON.stringify({ error: "open must be boolean" }),
                { status: 400 }
            );
        }

        await kv.set("saloonOpen", open);

        return new Response(
            JSON.stringify({ success: true, open }),
            { status: 200 }
        );
    } catch {
        return new Response(
            JSON.stringify({ error: "Invalid request" }),
            { status: 400 }
        );
    }
}
