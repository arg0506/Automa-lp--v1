"use client";

import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export default function Principles() {
  const { principles } = site;

  return (
    <section id="principles" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-xl mx-auto mb-14 sm:mb-16">
            <div className="inline-block rounded border border-[rgba(255,255,255,0.12)] bg-[#121218] px-2.5 py-1 text-[11px] font-mono font-medium text-[#9A9AA5] tracking-wider uppercase mb-4 shadow-sm">
              {principles.badge}
            </div>
            <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white mb-3">
              <span className="block font-sans">{principles.headlineSans}</span>
              <span className="block font-serif italic font-normal text-[#E4E4E7]">
                {principles.headlineSerif}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#9A9AA5]">{principles.caption}</p>
          </div>
        </Reveal>

        {/* Eight principles in a compact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.08)]">
          {principles.items.map((item, index) => (
            <Reveal key={item.number} delay={(index % 4) * 0.08}>
              <div className="h-full bg-[#0E0E13] p-7 sm:p-8 hover:bg-[#121218] transition-colors duration-200">
                <span className="inline-block font-mono text-xs font-semibold text-[#71717A] mb-6">
                  {item.number}
                </span>
                <h3 className="text-sm font-semibold text-white mb-2 tracking-tight">{item.title}</h3>
                <p className="text-xs sm:text-[13px] text-[#9A9AA5] leading-[1.6]">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
