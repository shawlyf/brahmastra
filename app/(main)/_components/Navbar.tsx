"use client";

import Image from "next/image";

interface NavbarProps {
    onRegisterClick: () => void;
}

export default function Navbar({ onRegisterClick }: NavbarProps) {
    return (
        <nav
            className="
            fixed top-0 left-0 w-full z-30
            px-8 py-4 h-25
            flex items-center justify-between
            bg-[rgba(240,238,233,0.30)] backdrop-blur-md
            border-b border-white/20"
        >
            {/* Logo */}
            <Image
                src="/logo.png"
                alt="Shawlyf Logo"
                width={50}
                height={10}
                className="object-contain"
                priority
            />

            {/* Register Button */}
            <button
                onClick={onRegisterClick}
                className="
                    -mt-1
                    px-6 py-2
                    border border-white/60
                    text-white
                    text-xs
                    tracking-[0.25em]
                    uppercase
                    bg-[rgba(36,58,37)]
                    hover:bg-[rgba(36,58,37,0.8)]
                    transition-colors
                "
            >
                Join Waitlist
            </button>
        </nav>
    );
}
