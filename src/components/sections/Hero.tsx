"use client";

import Image from "next/image";
import { site, href } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export default function Hero() {
  const primaryHref = href("primaryCta") || "#vision";
  const docsHref = href("docs") || "/docs";
  const { hero } = site;

  return (
    <section id="hero" className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6">
      <Reveal duration={0.8} yOffset={20}>
        {/* Outer Framed Container with Technical Corner Ticks */}
        <div className="tick-box mx-auto max-w-[1180px] border border-[rgba(255,255,255,0.08)] bg-[#0E0E13] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          {/* Corner registration ticks */}
          <span className="tick-tl" />
          <span className="tick-tr" />
          <span className="tick-bl" />
          <span className="tick-br" />

          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[rgba(255,255,255,0.08)]">
            {/* Left Column: Editorial Headline & Actions */}
            <div className="flex flex-col justify-center p-8 sm:p-14 lg:p-16">
              {/* Spec Eyebrow */}
              <div className="hero-rise mb-4 inline-flex items-center gap-2" style={{ "--d": "0ms" } as React.CSSProperties}>
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                <span className="text-[11px] font-mono font-medium uppercase tracking-[0.18em] text-[#9A9AA5]">
                  {hero.eyebrow}
                </span>
              </div>

              <h1 className="leading-[1.12] tracking-[-0.02em] text-white mb-6">
                <span className="hero-rise block font-sans text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium text-white" style={{ "--d": "90ms" } as React.CSSProperties}>
                  {hero.headlineSans}
                </span>
                <span className="hero-rise block font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal italic text-[#E4E4E7]" style={{ "--d": "170ms" } as React.CSSProperties}>
                  {hero.headlineSerif}
                </span>
              </h1>

              <p className="hero-rise text-sm sm:text-base text-[#9A9AA5] leading-[1.65] max-w-md mb-8" style={{ "--d": "260ms" } as React.CSSProperties}>
                {hero.subtitle}
              </p>

              <div className="hero-rise flex flex-wrap items-center gap-3 mb-8" style={{ "--d": "340ms" } as React.CSSProperties}>
                <a
                  href={primaryHref}
                  className="rounded bg-white text-black text-xs font-semibold px-5 py-2.5 hover:bg-neutral-200 transition-all duration-200 active:scale-[0.98] shadow-[0_2px_12px_rgba(255,255,255,0.15)]"
                >
                  {hero.primaryCta}
                </a>
                <a
                  href={docsHref} target="_blank" rel="noopener noreferrer"
                  className="tick-box rounded border border-[rgba(255,255,255,0.12)] bg-[#121218] text-white text-xs font-medium px-5 py-2.5 hover:border-white/40 transition-colors"
                >
                  {hero.secondaryCta}
                </a>
              </div>

              {/* Spec Supporting Label */}
              <div className="hero-rise flex items-center gap-2 text-xs text-[#9A9AA5]" style={{ "--d": "420ms" } as React.CSSProperties}>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="font-sans text-[11px] text-[#A1A1AA] tracking-wide">
                  {hero.supportingLabel}
                </span>
              </div>
            </div>

            {/* Right Column: High-Fidelity Automa Creation Artwork */}
            <div className="relative flex items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden bg-[#07070A] min-h-[380px] sm:min-h-[460px] group">
              {/* Background Architectural Crosshair Grid */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-full h-px bg-[rgba(255,255,255,0.06)]" />
              </div>
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="h-full w-px bg-[rgba(255,255,255,0.06)]" />
              </div>

              {/* Subtle concentric reference circles */}
              <div className="absolute w-[340px] h-[340px] rounded-full border border-[rgba(255,255,255,0.04)] pointer-events-none" />
              <div className="absolute w-[240px] h-[240px] rounded-full border border-[rgba(255,255,255,0.03)] pointer-events-none" />

              {/* Top-Right Technical Registration Label */}
              <div className="absolute top-4 right-5 z-20 hidden sm:flex items-center gap-2 font-mono text-[10px] text-[#71717A] select-none tracking-wider uppercase">
                <span className="h-1 w-1 rounded-full bg-neutral-500" />
                <span>AUTOMA CORE // PROTOCOL</span>
              </div>

              {/* Bottom-Left Technical Telemetry */}
              <div className="absolute bottom-4 left-5 z-20 hidden sm:flex items-center gap-2 font-mono text-[10px] text-[#71717A] select-none tracking-wider uppercase">
                <span>LATENCY &lt; 800MS</span>
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                <span>NEAR CONSENSUS</span>
              </div>

              {/* The Automa Artwork (Two Reaching Hands & Coin) with Deep Black Blending */}
              <div className="relative z-10 w-full max-w-[500px] flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,black_80%,transparent_100%)]">
                <Image
                  src="/hsi-dark-branded.png"
                  alt="Automa — Give AI Agents the Power to Transact"
                  width={1671}
                  height={941}
                  priority
                  className="w-full h-auto object-contain select-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
