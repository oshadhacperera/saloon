export default async function Home() {
    const res = await fetch("/api/status", {
        cache: "no-store"
    });

    const { open } = await res.json();

    return (
        <main>
            <h1>Saloon Status</h1>
            <h2 style={{ color: open ? "green" : "red" }}>
                {open ? "OPEN" : "CLOSED"}
            </h2>
        </main>
    );
}
