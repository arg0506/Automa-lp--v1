"use client";

import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export default function Problem() {
  const { problem } = site;

  return (
    <section id="the-problem" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-xl mx-auto mb-14 sm:mb-16">
            <div className="inline-block rounded border border-[rgba(255,255,255,0.12)] bg-[#121218] px-2.5 py-1 text-[11px] font-mono font-medium text-[#9A9AA5] tracking-wider uppercase mb-4 shadow-sm">
              {problem.badge}
            </div>
            <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white mb-3">
              <span className="block font-sans">{problem.headlineSans}</span>
              <span className="block font-serif italic font-normal text-[#E4E4E7]">
                {problem.headlineSerif}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#9A9AA5]">{problem.caption}</p>
          </div>
        </Reveal>

        {/* Six cards, each paired with one collage object */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problem.items.map((item, index) => (
            <Reveal key={item.number} delay={(index % 3) * 0.12}>
              <div className="tick-box border border-[rgba(255,255,255,0.08)] bg-[#0E0E13] p-8 sm:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] flex flex-col h-full hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.25)] hover:bg-[#121218] transition-all duration-200">
                <span className="tick-tl" />
                <span className="tick-tr" />
                <span className="tick-bl" />
                <span className="tick-br" />

                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-semibold text-[#71717A]">{item.number}</span>
                  <span className="h-px flex-1 mx-4 bg-[rgba(255,255,255,0.06)]" />
                </div>

                <div className="flex h-36 items-center justify-center mb-6">
                  <Image
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    width={item.w}
                    height={item.h}
                    style={{ "--i": index } as React.CSSProperties}
                    className="h-full w-auto object-contain float-soft drop-shadow-[0_18px_26px_rgba(0,0,0,0.55)]"
                  />
                </div>

                <h3 className="text-base font-semibold text-white mb-2 tracking-tight">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#9A9AA5] leading-[1.6]">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
