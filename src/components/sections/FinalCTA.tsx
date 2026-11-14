"use client";

import Image from "next/image";
import { site, href } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export default function FinalCTA() {
  const { finalCta } = site;
  const primaryHref = href("primaryCta") || "#vision";
  const docsHref = href("docs") || "/docs";

  return (
    <section id="final-cta" className="py-16 sm:py-24 px-4 sm:px-6">
      <Reveal duration={0.8}>
        <div className="tick-box mx-auto max-w-[1180px] border border-[rgba(255,255,255,0.08)] bg-[#0E0E13] p-10 sm:p-16 lg:p-20 shadow-[0_4px_30px_rgba(0,0,0,0.6)] text-center relative overflow-hidden group">
          <span className="tick-tl" />
          <span className="tick-tr" />
          <span className="tick-bl" />
          <span className="tick-br" />

          {/* Background subtle radial glow */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
            <div className="w-[500px] h-[300px] rounded-full bg-violet-600/15 blur-[100px]" />
          </div>

          {/* Atmospheric Currency Engraving Watermark (Fiat to Agentic Economy) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
            <div className="relative w-[520px] h-[520px] sm:w-[640px] sm:h-[640px] opacity-20 transition-opacity duration-700 group-hover:opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]">
              <Image
                src="/currency-engraving-dark.png"
                alt="Legacy Currency Engraving"
                fill
                className="object-cover mix-blend-screen select-none"
              />
            </div>
          </div>

          {/* Subtle decorative crosshair lines */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25">
            <div className="w-full h-px bg-[rgba(255,255,255,0.1)]" />
          </div>
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25">
            <div className="h-full w-px bg-[rgba(255,255,255,0.1)]" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            {/* Automa Logo Mark */}
            <div className="mb-6 h-12 w-12 rounded-lg border border-[rgba(255,255,255,0.14)] bg-[#181824] p-2 shadow-lg flex items-center justify-center">
              <Image
                src="/Automalogo.png"
                alt="Automa"
                width={32}
                height={32}
                className="h-full w-full object-contain"
              />
            </div>

            <h2 className="leading-[1.12] tracking-[-0.02em] text-white mb-5">
              <span className="block font-sans text-[clamp(2rem,4vw,3rem)] font-medium">
                {finalCta.headlineSans}
              </span>
              <span className="block font-serif text-[clamp(2.25rem,4.5vw,3.25rem)] font-normal italic text-[#E4E4E7]">
                {finalCta.headlineSerif}
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#E4E4E7] font-medium leading-[1.6] mb-2 max-w-lg">
              {finalCta.body}
            </p>
            <p className="text-xs sm:text-sm text-[#9A9AA5] leading-[1.6] mb-8 max-w-md">
              {finalCta.supportingLine}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={primaryHref}
                className="rounded bg-white text-black text-xs font-semibold px-6 py-3 hover:bg-neutral-200 transition-all duration-200 active:scale-[0.98] shadow-[0_2px_16px_rgba(255,255,255,0.2)]"
              >
                {finalCta.primaryCta}
              </a>
              <a
                href={docsHref} target="_blank" rel="noopener noreferrer"
                className="tick-box rounded border border-[rgba(255,255,255,0.14)] bg-[#121218] text-white text-xs font-medium px-6 py-3 hover:border-white/40 transition-all duration-200 active:scale-[0.98]"
              >
                {finalCta.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
