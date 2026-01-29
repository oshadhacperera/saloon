"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/status")
            .then(res => res.json())
            .then(data => setOpen(data.open));
    }, []);

    return (
        <div className="container">
            <h1>✂️ RK Saloon</h1>

            <div className={`status ${open ? "open" : "closed"}`}>
                {open ? "WE ARE OPEN" : "WE ARE CLOSED"}
            </div>

            <p className="note">
                Thank you for visiting RK Saloon. Please come during open hours!
            </p>

            {/* Admin Button */}
            <button
                className="admin-btn"
                onClick={() => router.push("/admin")}
            >
                Admin Login
            </button>
        </div>
    );
}
