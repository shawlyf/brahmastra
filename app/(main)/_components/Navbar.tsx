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
            bg-[rgba(111,143,175,0.30)] backdrop-blur-md
            border-b border-white/20
        "
        >
            {/* Logo */}
            <Image
                src="/logo.png"
                alt="Shawlyf Logo"
                width={110}
                height={40}
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
                    hover:bg-white/10
                    transition-colors
                "
            >
                Register
            </button>
        </nav>
    );
}
