"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleLogin(e) {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) throw new Error();

            setLoggedIn(true);
            setError("");
        } catch {
            setError("Invalid username or password");
        }
    }

    async function updateStatus(open) {
        try {
            const res = await fetch("/api/status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ open })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed");
            }

            alert(`Saloon is now ${open ? "OPEN" : "CLOSED"}`);
        } catch (err) {
            alert("Error updating status");
            console.error(err);
        }
    }

    return (
        <div className="container">
            <button onClick={() => router.push("/")}>
                ← Back to Home
            </button>

            {!loggedIn ? (
                <>
                    <h1>Admin Login</h1>

                    <form onSubmit={handleLogin}>
                        <input name="username" placeholder="Username" required />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <button type="submit">Login</button>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </form>
                </>
            ) : (
                <>
                    <h1>Admin Control Panel</h1>

                    <button onClick={() => updateStatus(true)}>
                        Open Saloon
                    </button>

                    <button onClick={() => updateStatus(false)}>
                        Close Saloon
                    </button>
                </>
            )}
        </div>
    );
}
