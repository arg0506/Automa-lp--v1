"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { site, href, homeLink, newTabProps } from "@/content/site";

type FooterLink = { label: string; href: string; external?: boolean };

const explore: FooterLink[] = [
  { label: "Vision", href: "#vision" },
  { label: "The Problem", href: "#the-problem" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Principles", href: "#principles" },
  { label: "NEAR", href: "#built-on-near" },
];

const docsLinks: FooterLink[] = [
  { label: "Documentation", href: "/docs", external: true },
  { label: "Security model", href: "/docs#security-model", external: true },
  { label: "FAQ", href: "/docs#faq", external: true },
  { label: "Glossary", href: "/docs#glossary", external: true },
];

export default function Footer() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const primaryHref = href("primaryCta") || "#vision";
  const docsHref = href("docs") || "/docs";

  // Community links appear only when a URL is configured.
  const community = [
    { label: "GitHub", url: href("github") },
    { label: "X", url: href("x") },
    { label: "Discord", url: href("discord") },
  ].filter((l): l is { label: string; url: string } => Boolean(l.url));

  const columnHeading = "mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#71717A]";
  const columnLink =
    "group inline-flex items-center gap-1 text-[13px] text-[#9A9AA5] transition-colors duration-150 hover:text-white";

  return (
    <footer className="relative overflow-hidden border-t border-[rgba(255,255,255,0.08)] bg-[#07070A] px-4 pt-16 sm:px-6 sm:pt-20">
      {/* Faint top glow, decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(139,92,246,0.5)] to-transparent"
      />

      <div className="relative mx-auto max-w-[1180px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand and primary actions */}
          <div className="md:col-span-5">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-xs">
                <Image src="/Automalogo.png" alt="Automa logo" width={28} height={28} className="h-full w-full object-contain" />
              </div>
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white">
                {site.footer.wordmark}
              </span>
            </div>
            <p className="max-w-xs text-sm leading-[1.6] text-[#9A9AA5]">{site.footer.tagline}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={homeLink(primaryHref, onHome)}
                className="rounded bg-white px-4 py-2 text-xs font-semibold text-black shadow-[0_2px_14px_rgba(255,255,255,0.14)] transition-all duration-200 hover:bg-neutral-200 active:scale-[0.98]"
              >
                {site.hero.primaryCta}
              </a>
              <a
                href={docsHref}
                {...newTabProps}
                className="tick-box rounded border border-[rgba(255,255,255,0.12)] bg-[#121218] px-4 py-2 text-xs font-medium text-white transition-all duration-200 hover:border-white/40 active:scale-[0.98]"
              >
                {site.hero.secondaryCta}
              </a>
            </div>
          </div>

          {/* Explore: section anchors */}
          <nav aria-label="Explore" className="md:col-span-2">
            <p className={columnHeading}>Explore</p>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {explore.map((link) => (
                <li key={link.label}>
                  <a href={homeLink(link.href, onHome)} className={columnLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Docs: opens in its own tab */}
          <nav aria-label="Docs" className="md:col-span-2">
            <p className={columnHeading}>Docs</p>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {docsLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} {...newTabProps} className={columnLink}>
                    {link.label}
                    <ArrowUpRight aria-hidden="true" className="h-3 w-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Community: only links with a configured URL */}
          {community.length > 0 && (
            <nav aria-label="Community" className="md:col-span-3">
              <p className={columnHeading}>Community</p>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {community.map((link) => (
                  <li key={link.label}>
                    <a href={link.url} {...newTabProps} className={columnLink}>
                      {link.label}
                      <ArrowUpRight aria-hidden="true" className="h-3 w-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-5 border-t border-[rgba(255,255,255,0.06)] py-6 text-[11px] text-[#71717A] sm:flex-row sm:items-center sm:justify-between">
          <p>{site.footer.legal}</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-[#9A9AA5]">
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 text-emerald-400 live-pulse" aria-hidden="true" />
              {site.footer.builtOnLabel}
            </span>
            <a
              href={homeLink("#hero", onHome)}
              className="inline-flex items-center gap-1.5 text-[#9A9AA5] transition-colors duration-150 hover:text-white"
            >
              Back to top
              <ArrowUp aria-hidden="true" className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Oversized wordmark, decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0))] bg-clip-text text-center font-sans font-semibold leading-[0.8] tracking-[-0.04em] text-transparent text-[clamp(4.5rem,20vw,15rem)] -mb-[0.12em]"
      >
        AUTOMA
      </div>
    </footer>
  );
}
