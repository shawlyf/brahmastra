"use client";

import { useState } from "react";

export default function EmailForm({ onSuccess }: { onSuccess?: () => void }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            setMessage("Please fill in all fields");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/save-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Successfully joined the Founding Shawlyf Circle!");
                setName("");
                setEmail("");
                onSuccess?.();
            } else {
                setMessage(data.error || "Failed to save email.");
            }
        } catch (error) {
            setMessage("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="border-b border-white/50 pb-2">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-transparent outline-none text-white placeholder:text-white/50"
                />
            </div>

            <div className="border-b border-white/50 pb-2 flex items-center">
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-transparent outline-none text-white placeholder:text-white/50"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="text-xs uppercase px-2 disabled:opacity-50"
                >
                    {loading ? "Joining..." : "Join"}
                </button>
            </div>

            {message && (
                <p
                    className={`text-sm ${
                        message.includes("Successfully")
                            ? "text-green-400"
                            : "text-red-400"
                    }`}
                >
                    {message}
                </p>
            )}
        </form>
    );
}
