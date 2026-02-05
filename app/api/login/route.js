export const runtime = "nodejs";

export async function POST(req) {
    const { username, password } = await req.json();

    // CHANGE THESE
    if (username === "rksaloon" && password === "ravi1234") {
        return new Response(
            JSON.stringify({ success: true }),
            { status: 200 }
        );
    }

    return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401 }
    );
}
