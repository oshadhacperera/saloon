import { kv } from "@vercel/kv";

export async function GET() {
    const saloonOpen = await kv.get("saloonOpen");

    return new Response(
        JSON.stringify({ open: saloonOpen ?? false }),
        { status: 200 }
    );
}

export async function POST(req) {
    const body = await req.json();

    if (typeof body.open !== "boolean") {
        return new Response(
            JSON.stringify({ error: "open must be boolean" }),
            { status: 400 }
        );
    }

    // Persist status forever
    await kv.set("saloonOpen", body.open);

    return new Response(
        JSON.stringify({ success: true, open: body.open }),
        { status: 200 }
    );
}
