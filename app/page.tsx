"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Navbar from "./(main)/_components/Navbar";
import PopupModal from "./(main)/_components/PopupModal";
import { Libre_Baskerville } from "next/font/google";
import { Instagram, Twitter } from "lucide-react";

const libre = Libre_Baskerville({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsModalOpen(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    return (
        <main className="bg-white min-h-screen">
            <Navbar onRegisterClick={handleOpenModal} />

            {/* HERO SECTION */}
            <section className="pt-24 pb-16">
                {/* Centered Container */}
                <div className="max-w-[1500px] mx-auto px-6">
                    <div className="relative w-full h-[80vh] overflow-hidden">
                        {/* Mobile Image */}
                        <div className="block md:hidden absolute inset-0">
                            <Image
                                src="/bg-mobile.png"
                                alt="Mobile Hero"
                                fill
                                priority
                                className="object-contain object-center"
                            />
                        </div>

                        {/* Desktop Image */}
                        <div className="hidden md:block absolute inset-0">
                            <Image
                                src="/SHAWL.png"
                                alt="Desktop Hero"
                                fill
                                priority
                                className="object-cover object-top"
                            />
                        </div>

                        {/* Text Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
                            <h1
                                className={`${libre.className} text-white text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] md:tracking-[0.35em]`}
                            >
                                SHAWLYF
                            </h1>

                            <p
                                className={`${libre.className} mt-6 text-white text-sm md:text-base tracking-[0.5em]`}
                            >
                                COMING SOON
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHITE SPACE SECTION BELOW */}
            <section className="py-40 px-6 text-center bg-white">
                <div className="max-w-2xl mx-auto">
                    <p
                        className={`${libre.className} text-lg md:text-xl leading-relaxed text-neutral-800`}
                    >
                        Shawlyf is a quiet expression of modern identity —
                        crafted for those who move with intention, confidence,
                        and understated power.
                    </p>
                </div>

                <div className="mt-14 flex justify-center gap-8">
                    <a
                        href="https://www.instagram.com/houseofshawlyf/"
                        className="text-neutral-600 hover:text-black transition-colors"
                        aria-label="Instagram"
                    >
                        <Instagram size={40} strokeWidth={1.5} />
                    </a>

                    <a
                        href="https://x.com/shawlifelab?s=21"
                        className="text-neutral-600 hover:text-black transition-colors"
                        aria-label="Twitter"
                    >
                        <Twitter size={40} strokeWidth={1.5} />
                    </a>
                </div>
            </section>

            <PopupModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </main>
    );
}
