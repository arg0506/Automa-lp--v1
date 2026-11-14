"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { site, href } from "@/content/site";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export default function HowItWorks() {
  const { howItWorks } = site;
  const docsHref = href("docs") || "/docs";
  const [step1, step2, step3] = howItWorks.steps;

  // Scroll-pinned storytelling (desktop only): scroll progress drives the active step.
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1); // -1 = not yet inside the pinned track, so nothing dims
  const [pinnable, setPinnable] = useState(false);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const segments = [
    useTransform(scrollYProgress, [0, 1 / 3], [0, 1], { clamp: true }),
    useTransform(scrollYProgress, [1 / 3, 2 / 3], [0, 1], { clamp: true }),
    useTransform(scrollYProgress, [2 / 3, 1], [0, 1], { clamp: true }),
  ];

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(v <= 0 ? -1 : Math.min(2, Math.floor(v * 3)));
  });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setPinnable(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const dimFor = (i: number) => (pinnable && active !== -1 && active !== i ? "opacity-40" : "opacity-100");

  return (
    <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-xl mx-auto mb-14 sm:mb-16">
            <div className="inline-block rounded border border-[rgba(255,255,255,0.12)] bg-[#121218] px-2.5 py-1 text-[11px] font-mono font-medium text-[#9A9AA5] tracking-wider uppercase mb-4 shadow-sm">
              {howItWorks.badge}
            </div>
            <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white mb-3">
              <span className="block font-sans">{howItWorks.headlineSans}</span>
              <span className="block font-serif italic font-normal text-[#E4E4E7]">
                {howItWorks.headlineSerif}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#9A9AA5]">
              {howItWorks.subtitle}
            </p>
          </div>
        </Reveal>

        {/* Bento Grid Layout. On desktop the track is tall and the grid sticks, so scrolling walks through the steps. */}
        <div ref={trackRef} className="pin-track relative md:h-[220vh]">
        <div className="pin-sticky md:sticky md:top-24">
          {pinnable && (
            <div className="mb-6 flex items-center gap-3" aria-hidden="true">
              {segments.map((scale, i) => (
                <div key={i} className="relative h-px flex-1 overflow-hidden bg-[rgba(255,255,255,0.1)]">
                  <motion.div className="absolute inset-0 origin-left bg-white" style={{ scaleX: scale }} />
                </div>
              ))}
            </div>
          )}
        <div className="space-y-6">
          {/* Card 1: Wide Top Flow Diagram Card with Staggered Scroll Entrance */}
          <Reveal delay={0.1}>
            <div className="tick-box border border-[rgba(255,255,255,0.08)] bg-[#0E0E13] p-8 sm:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              {/* Corner registration ticks */}
              <span className="tick-tl" />
              <span className="tick-tr" />
              <span className="tick-bl" />
              <span className="tick-br" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left Column: Step 01 Connect */}
                <div className={`md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left transition-opacity duration-500 ${dimFor(0)}`}>
                  {/* Node cluster illustration */}
                  <div className="relative w-44 h-24 mb-6">
                    <div className="absolute top-2 left-6 h-7 w-7 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold shadow-md">
                      AI
                    </div>
                    <div className="absolute top-10 left-16 h-8 w-8 rounded-full bg-[#27272A] border border-[rgba(255,255,255,0.2)] text-white flex items-center justify-center text-[11px] font-mono font-bold shadow-sm">
                      01
                    </div>
                    <div className="absolute top-1 left-28 h-7 w-7 rounded-full bg-[#18181B] border border-[rgba(255,255,255,0.15)] text-white flex items-center justify-center text-[10px] font-mono font-bold shadow-sm">
                      02
                    </div>
                    <div className="absolute top-14 left-4 h-6 w-6 rounded-full bg-[#3F3F46] text-white flex items-center justify-center text-[9px] font-mono font-bold shadow-sm">
                      03
                    </div>
                    <div className="absolute top-12 left-32 h-6 w-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-[9px] font-bold shadow-sm">
                      NEAR
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs font-semibold text-[#71717A]">
                      {step1.number}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-[#9A9AA5] font-medium">
                      {step1.name}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2 tracking-tight">
                    {step1.title}
                  </h3>
                  <p className="text-xs text-[#9A9AA5] leading-[1.6] max-w-xs">
                    {step1.description}
                  </p>
                </div>

                {/* Center Column: Hardware Hub Unit with Animated Wires */}
                <div className="md:col-span-4 flex flex-col items-center justify-center py-4">
                  <div className="relative flex items-center justify-center w-full">
                    {/* Left connecting wire with animated light pulse */}
                    <div className="hidden md:block relative w-full h-[1px] bg-[rgba(255,255,255,0.1)] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400 to-transparent animate-wire-pulse" />
                    </div>

                    {/* Center Device Pill with Automa Logo */}
                    <div className="z-10 shrink-0 flex items-center gap-2.5 rounded-xl border border-[rgba(255,255,255,0.15)] bg-[#15151C] px-5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
                      <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-xs">
                        <Image
                          src="/Automalogo.png"
                          alt="Automa Core"
                          width={20}
                          height={20}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span className="text-[11px] font-mono font-semibold tracking-wider text-white">
                        AUTOMA CORE
                      </span>
                    </div>

                    {/* Right connecting wire with animated light pulse */}
                    <div className="hidden md:block relative w-full h-[1px] bg-[rgba(255,255,255,0.1)] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-wire-pulse" />
                    </div>
                  </div>
                </div>

                {/* Right Column: Step 03 Transact */}
                <div className={`md:col-span-4 flex flex-col items-center md:items-end text-center md:text-right transition-opacity duration-500 ${dimFor(2)}`}>
                  {/* Stacked document / receipt visual */}
                  <div className="relative w-40 h-24 mb-6 flex items-center justify-center md:justify-end">
                    <div className="absolute right-6 top-1 w-20 h-22 rounded border border-[rgba(255,255,255,0.06)] bg-[#121218] shadow-sm" />
                    <div className="absolute right-3 top-3 w-20 h-22 rounded border border-[rgba(255,255,255,0.08)] bg-[#161620] shadow-sm" />
                    <div className="absolute right-0 top-5 w-20 h-22 rounded border border-[rgba(255,255,255,0.12)] bg-[#1C1C26] p-2.5 shadow-md flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="w-8 h-1.5 bg-white rounded-xs" />
                        <div className="w-14 h-1 bg-[rgba(255,255,255,0.2)] rounded-xs" />
                        <div className="w-12 h-1 bg-[rgba(255,255,255,0.1)] rounded-xs" />
                      </div>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 self-end" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs font-semibold text-[#71717A]">
                      {step3.number}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-[#9A9AA5] font-medium">
                      {step3.name}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2 tracking-tight">
                    {step3.title}
                  </h3>
                  <p className="text-xs text-[#9A9AA5] leading-[1.6] max-w-xs">
                    {step3.description}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Cards 2 & 3: Bottom Split Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bottom-Left Card: Step 02 Enable */}
            <Reveal delay={0.2}>
              <div className={`tick-box border border-[rgba(255,255,255,0.08)] bg-[#0E0E13] p-8 sm:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between min-h-[300px] h-full hover:border-[rgba(255,255,255,0.2)] hover:bg-[#121218] transition-all duration-500 ${dimFor(1)}`}>
                <span className="tick-tl" />
                <span className="tick-tr" />
                <span className="tick-bl" />
                <span className="tick-br" />

                {/* Connected node network visual */}
                <div className="relative w-full h-36 flex items-center justify-center mb-6">
                  <svg viewBox="0 0 280 120" className="w-full max-w-[260px] h-auto">
                    {/* Connecting lines */}
                    <line x1="70" y1="40" x2="140" y2="60" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                    <line x1="70" y1="80" x2="140" y2="60" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                    <line x1="210" y1="40" x2="140" y2="60" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                    <line x1="210" y1="80" x2="140" y2="60" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

                    {/* Left nodes */}
                    <rect x="55" y="25" width="30" height="30" rx="6" fill="#18181B" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <circle cx="70" cy="40" r="6" fill="#FFFFFF" />

                    <rect x="55" y="65" width="30" height="30" rx="6" fill="#18181B" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <rect x="65" y="75" width="10" height="10" rx="2" fill="#71717A" />

                    {/* Center Node: Automa */}
                    <rect x="125" y="45" width="30" height="30" rx="6" fill="#FFFFFF" />
                    <path d="M136 54L140 60L136 66M144 54L140 60L144 66" stroke="#000000" strokeWidth="1.5" />

                    {/* Right nodes */}
                    <rect x="195" y="25" width="30" height="30" rx="6" fill="#18181B" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <polygon points="210,33 216,45 204,45" fill="#A1A1AA" />

                    <rect x="195" y="65" width="30" height="30" rx="6" fill="#18181B" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <text x="210" y="85" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#34D399">N</text>
                  </svg>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs font-semibold text-[#71717A]">
                      {step2.number}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-[#9A9AA5] font-medium">
                      {step2.name}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1.5 tracking-tight">
                    {step2.title}
                  </h3>
                  <p className="text-xs text-[#9A9AA5] leading-[1.6]">
                    {step2.description}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Bottom-Right Card: Status & Docs Link */}
            <Reveal delay={0.25}>
              <div className="tick-box border border-[rgba(255,255,255,0.08)] bg-[#0E0E13] p-8 sm:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between min-h-[300px] h-full hover:border-[rgba(255,255,255,0.2)] hover:bg-[#121218] transition-all duration-200">
                <span className="tick-tl" />
                <span className="tick-tr" />
                <span className="tick-bl" />
                <span className="tick-br" />

                {/* Technical state visual */}
                <div className="relative w-full h-36 flex flex-col justify-center items-center mb-6 border border-dashed border-[rgba(255,255,255,0.1)] bg-[#07070A] rounded-md p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-xs font-medium text-white">
                      {howItWorks.statusNote}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-[#71717A] text-center">
                    NEAR Testnet · Agent Key Delegation · Escrow Contracts
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white mb-1.5 tracking-tight">
                    Deep Technical Documentation
                  </h3>
                  <p className="text-xs text-[#9A9AA5] leading-[1.6] mb-4">
                    Explore architecture diagrams, contract interfaces, and integration guides for autonomous agents.
                  </p>
                  <a
                    href={docsHref} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-neutral-300"
                  >
                    <span>{howItWorks.docsLinkText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        </div>
        </div>
      </div>
    </section>
  );
}
