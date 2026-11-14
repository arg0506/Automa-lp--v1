"use client";

import { site, href } from "@/content/site";
import { ArrowRight, ShieldCheck, Zap, Key } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export default function BuiltOnNear() {
  const { builtOnNear } = site;
  const docsHref = href("docs") || "/docs";

  const icons = [
    <Zap key="zap" className="w-4 h-4 text-white" />,
    <Key key="key" className="w-4 h-4 text-white" />,
    <ShieldCheck key="shield" className="w-4 h-4 text-white" />,
  ];

  return (
    <section id="built-on-near" className="py-16 sm:py-24 px-4 sm:px-6">
      <Reveal duration={0.8}>
        <div className="tick-box mx-auto max-w-[1180px] border border-[rgba(255,255,255,0.08)] bg-[#0E0E13] p-8 sm:p-14 lg:p-16 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <span className="tick-tl" />
          <span className="tick-tr" />
          <span className="tick-bl" />
          <span className="tick-br" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading, Body & CTA */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="text-[11px] font-mono font-medium uppercase tracking-[0.18em] text-[#9A9AA5]">
                  {builtOnNear.badge}
                </span>
              </div>

              <h2 className="leading-[1.12] tracking-[-0.02em] text-white mb-5">
                <span className="block font-sans text-[clamp(1.85rem,3.5vw,2.5rem)] font-medium">
                  {builtOnNear.headlineSans}
                </span>
                <span className="block font-serif text-[clamp(2rem,4vw,2.75rem)] font-normal italic text-[#E4E4E7]">
                  {builtOnNear.headlineSerif}
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#9A9AA5] leading-[1.65] mb-8 max-w-md">
                {builtOnNear.body}
              </p>

              <div>
                <a
                  href={docsHref} target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded bg-white text-black text-xs font-semibold px-5 py-2.5 hover:bg-neutral-200 transition-all duration-200 active:scale-[0.98] shadow-[0_2px_12px_rgba(255,255,255,0.15)]"
                >
                  <span>{builtOnNear.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
                </a>
              </div>
            </div>

            {/* Right Column: 3 Technical Capability Pillars */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {builtOnNear.features.map((feature, i) => (
                <div
                  key={feature.label}
                  className="scroll-rise border border-[rgba(255,255,255,0.08)] bg-[#121218] p-6 rounded-md hover:bg-[#161622] hover:border-[rgba(255,255,255,0.2)] transition-all duration-150"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 shrink-0 rounded border border-[rgba(255,255,255,0.12)] bg-[#181824] flex items-center justify-center shadow-xs">
                      {icons[i]}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1 tracking-tight">
                        {feature.label}
                      </h3>
                      <p className="text-xs text-[#9A9AA5] leading-[1.6]">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
