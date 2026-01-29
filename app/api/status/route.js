let saloonOpen = false; // false = Closed, true = Open

export async function GET() {
    return new Response(
        JSON.stringify({ open: saloonOpen }),
        { status: 200 }
    );
}

export async function POST(req) {
    const body = await req.json();
    saloonOpen = body.open;

    return new Response(
        JSON.stringify({ success: true }),
        { status: 200 }
    );
}
