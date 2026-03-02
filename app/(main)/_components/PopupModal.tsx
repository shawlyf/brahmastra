"use client";

import { Libre_Baskerville } from "next/font/google";
import { useState } from "react";

const libre = Libre_Baskerville({
    subsets: ["latin"],
    weight: ["400", "700"],
});

interface PopupModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PopupModal({ isOpen, onClose }: PopupModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!name.trim() || !email.trim()) {
            setMessage("Please complete all fields.");
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
                onClose(); // close only on success
            } else {
                setMessage(data.error || "Something went wrong.");
            }
        } catch (error) {
            setMessage("Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
            onClick={onClose}
        >
            <div
                className="
          relative
          w-full max-w-md
          p-10
          rounded-2xl
          bg-[rgba(111,143,175,0.18)]
          backdrop-blur-xl
          border border-white/20
          text-white
        "
                onClick={e => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
                >
                    ✕
                </button>

                {/* Heading */}
                <h2
                    className={`${libre.className} text-2xl text-center mb-3 tracking-wide`}
                >
                    Some things are felt before they’re seen.
                </h2>

                {/* Subheading */}
                <p
                    className={`${libre.className} text-sm text-white/80 text-center mb-8`}
                >
                    Shawlyf is preparing to open. Until then, a select circle is
                    forming. Join the Founding Shawlyf Circle.
                </p>

                {/* Form */}
                <div className="flex flex-col gap-6">
                    <div className="border-b border-white/40 pb-2">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full bg-transparent outline-none text-white placeholder:text-white/60"
                        />
                    </div>

                    <div className="border-b border-white/40 pb-2">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full bg-transparent outline-none text-white placeholder:text-white/60"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="
              mt-6
              py-3
              border border-white/60
              text-white
              text-xs
              tracking-[0.35em]
              uppercase
              hover:bg-white/10
              transition-colors
              disabled:opacity-50
            "
                    >
                        {loading ? "JOINING..." : "I BELONG HERE"}
                    </button>

                    {message && (
                        <p className="text-sm text-red-300 text-center">
                            {message}
                        </p>
                    )}
                </div>

                {/* Bottom Subheading */}
                <p
                    className={`${libre.className} text-xs text-white/60 text-center mt-10 tracking-wide leading-relaxed`}
                >
                    Only a small group of artists, aesthetes, fashion thinkers,
                    and cultural observers will step inside early. You wont just
                    witness the brand being built — you will be in the room
                    while it takes shape.
                </p>
            </div>
        </div>
    );
}
