import Image from "next/image";

// Honest ticker: product concepts and the network focus only.
// No partner or vendor logos, since those would imply a partnership that does not exist.
const concepts = [
  "Agent wallets",
  "Policy-controlled spending",
  "Programmatic payments",
  "Human oversight",
  "Activity visibility",
  "On-chain foundations",
];

function Item({ label }: { label: string }) {
  return (
    <span className="flex shrink-0 items-center gap-6 pr-6 sm:gap-8 sm:pr-8">
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#9A9AA5] transition-colors duration-300 hover:text-white sm:text-xs">
        {label}
      </span>
      <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-violet-400/70" />
    </span>
  );
}

function NearMark() {
  return (
    <span className="flex shrink-0 items-center gap-3 pr-6 sm:pr-8">
      <span className="relative h-5 w-5 shrink-0">
        <Image src="/near-dark.png" alt="" aria-hidden="true" width={20} height={20} className="h-full w-full object-contain" />
      </span>
      <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white sm:text-xs">
        Built on NEAR Protocol
      </span>
      <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-emerald-400/80" />
    </span>
  );
}

export default function LogoCarousel() {
  // The track holds two identical halves. Moving it by -50% loops with no seam.
  const half = (
    <>
      {concepts.map((label) => (
        <Item key={label} label={label} />
      ))}
      <NearMark />
    </>
  );

  return (
    <section aria-label="Core concepts" className="relative py-8 sm:py-10">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#07070A] to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#07070A] to-transparent sm:w-32" />

      <div className="relative w-full overflow-hidden border-y border-[rgba(255,255,255,0.06)] py-5">
        <div className="animate-marquee flex items-center" style={{ animationDuration: "42s" }}>
          <div className="flex shrink-0 items-center">{half}</div>
          <div aria-hidden="true" className="flex shrink-0 items-center">
            {half}
          </div>
        </div>
      </div>
    </section>
  );
}
