const ADMIN_USERNAME = "rksaloon";
const ADMIN_PASSWORD = "ravi1234";

export async function POST(req) {
    const { username, password } = await req.json();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    return new Response(JSON.stringify({ success: false }), { status: 401 });
}
