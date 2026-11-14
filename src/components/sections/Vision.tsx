"use client";

import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export default function Vision() {
  const { vision } = site;

  return (
    <section id="vision" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <div className="inline-block rounded border border-[rgba(255,255,255,0.12)] bg-[#121218] px-2.5 py-1 text-[11px] font-mono font-medium text-[#9A9AA5] tracking-wider uppercase mb-4 shadow-sm">
              {vision.badge}
            </div>
            <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white mb-6">
              <span className="block font-sans">{vision.headlineSans}</span>
              <span className="block font-serif italic font-normal text-[#E4E4E7]">
                {vision.headlineSerif}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#9A9AA5] leading-[1.65]">
              {vision.body}
            </p>
          </div>
        </Reveal>

        {/* 3 Architectural Pillar Cards with Staggered Scroll Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vision.pillars.map((pillar, i) => (
            <Reveal key={pillar.index} delay={i * 0.12} duration={0.6}>
              <div className="tick-box border border-[rgba(255,255,255,0.08)] bg-[#0E0E13] p-8 sm:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex flex-col justify-between h-full hover:border-[rgba(255,255,255,0.2)] hover:bg-[#121218] transition-all duration-200">
                <span className="tick-tl" />
                <span className="tick-tr" />
                <span className="tick-bl" />
                <span className="tick-br" />

                <div>
                  <span className="inline-block font-mono text-xs font-semibold text-[#71717A] mb-4">
                    {pillar.index}
                  </span>
                  <h3 className="text-base font-semibold text-white mb-3 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9A9AA5] leading-[1.6]">
                    {pillar.body}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] font-mono text-[#71717A]">
                  <span>AUTOMA INFRASTRUCTURE</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
