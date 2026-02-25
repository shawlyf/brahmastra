import React from 'react';
import Image from 'next/image';

export default function Home() {
    return (
        <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/bg.png"
                    alt="Aesthetic Background"
                    fill
                    className="object-cover object-center w-full h-full opacity-60"
                    priority
                />
            </div>

            {/* Aesthetic Top Navigation/Logo area */}
            <header className="absolute top-0 w-full p-8 z-10 flex justify-center tracking-widest text-sm md:text-base font-light">
                <h1>SHAWLYF</h1>
            </header>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-3xl mt-20">

                {/* Main Heading */}
                <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6 leading-tight font-serif text-white/95">
                    We&apos;ll be live soon.<br />
                    <span className="text-xl md:text-2xl opacity-80 mt-4 block font-sans font-light">
                        But you can still request to join the <br className="md:hidden" />&quot;Founding Shawlyf Circle&quot;
                    </span>
                </h2>

                {/* Email Input Form styled like Raw Mango / premium brands */}
                <div className="w-full max-w-md mt-8 mb-12 flex flex-col gap-4">
                    <div className="relative w-full border-b border-white/50 pb-2 flex items-center transition-colors focus-within:border-white">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-transparent outline-none text-white placeholder:text-white/50 text-base font-light px-2"
                            required
                        />
                        <button className="text-xs tracking-widest uppercase hover:text-white/80 transition-colors px-2 font-medium">
                            Join
                        </button>
                    </div>
                </div>

                {/* Description Text matching user requirements */}
                <div className="mt-auto md:mt-12 text-center max-w-xl mx-auto backdrop-blur-sm bg-black/10 p-6 rounded-lg border border-white/10">
                    <p className="text-sm md:text-base font-light leading-relaxed text-white/80">
                        Only a chosen group of fashion passionate people, artists and marketers will be getting access where the brand will directly interact with them and talk to them while building the brand.
                    </p>
                </div>

            </div>
        </main>
    );
}