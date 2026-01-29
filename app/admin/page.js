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

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (res.ok) {
            setLoggedIn(true);
            setError("");
        } else {
            setError("Invalid username or password");
        }
    }

    async function updateStatus(open) {
        await fetch("/api/status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ open })
        });

        alert(`Saloon is now ${open ? "OPEN" : "CLOSED"}`);
    }

    return (
        <div className="container">
            {/* Back to Home Button */}
            <button
                className="back-btn"
                onClick={() => router.push("/")}
            >
                ← Back to Home
            </button>

            {!loggedIn ? (
                <>
                    <h1>Admin Login</h1>

                    <form className="card" onSubmit={handleLogin}>
                        <input name="username" placeholder="Username" required />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <button type="submit" style={{ backgroundColor: "blueviolet" }}>Login</button>
                        {error && <p className="error">{error}</p>}
                    </form>
                </>
            ) : (
                <>
                    <h1>Admin Control Panel</h1>

                    <div className="card">
                        <button
                            className="open-btn"
                            onClick={() => updateStatus(true)}
                        >
                            Open Saloon
                        </button>

                        <button
                            className="close-btn"
                            onClick={() => updateStatus(false)}
                        >
                            Close Saloon
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
