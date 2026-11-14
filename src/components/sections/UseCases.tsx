"use client";

import { site } from "@/content/site";
import { Cpu, Repeat, Boxes } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export default function UseCases() {
  const { useCases } = site;

  const icons = [
    <Cpu key="cpu" className="w-4 h-4 text-white" />,
    <Repeat key="repeat" className="w-4 h-4 text-white" />,
    <Boxes key="boxes" className="w-4 h-4 text-white" />,
  ];

  return (
    <section id="use-cases" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-xl mx-auto mb-14 sm:mb-16">
            <div className="inline-block rounded border border-[rgba(255,255,255,0.12)] bg-[#121218] px-2.5 py-1 text-[11px] font-mono font-medium text-[#9A9AA5] tracking-wider uppercase mb-4 shadow-sm">
              {useCases.badge}
            </div>
            <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white mb-3">
              <span className="block font-sans">{useCases.headlineSans}</span>
              <span className="block font-serif italic font-normal text-[#E4E4E7]">
                {useCases.headlineSerif}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#9A9AA5]">
              {useCases.caption}
            </p>
          </div>
        </Reveal>

        {/* 3 Use Case Cards with Staggered Scroll Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.items.map((item, index) => (
            <Reveal key={item.number} delay={index * 0.12}>
              <div
                onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
                className="group tick-box border border-[rgba(255,255,255,0.08)] bg-[#0E0E13] p-8 sm:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between h-full hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.25)] hover:bg-[#121218] transition-all duration-200"
              >
                {/* Cursor-following glow, invisible until hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(139,92,246,0.16), transparent 70%)" }}
                />
                <span className="tick-tl" />
                <span className="tick-tr" />
                <span className="tick-bl" />
                <span className="tick-br" />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="h-9 w-9 rounded border border-[rgba(255,255,255,0.12)] bg-[#15151E] flex items-center justify-center">
                      {icons[index]}
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#71717A]">
                      {item.number}
                    </span>
                  </div>

                  <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#161622] text-[#A1A1AA] border border-[rgba(255,255,255,0.06)] mb-3">
                    {item.tag}
                  </div>

                  <h3 className="text-base font-semibold text-white mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9A9AA5] leading-[1.6]">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] font-mono text-[#71717A]">
                  <span>AGENT CAPABILITY</span>
                  <span>VERIFIABLE</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
