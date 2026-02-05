import { kv } from "@vercel/kv";

export const runtime = "nodejs";

export default async function Home() {
    const open = await kv.get("saloonOpen");

    return (
        <main>
            <h1>Saloon Status</h1>
            <h2 style={{ color: open ? "green" : "red" }}>
                {open ? "OPEN" : "CLOSED"}
            </h2>
        </main>
    );
}
