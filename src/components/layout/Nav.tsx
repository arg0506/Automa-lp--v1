"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site, href, homeLink, newTabProps } from "@/content/site";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const primaryHref = homeLink(href("primaryCta") || "#vision", onHome);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll-spy active section detection
      const sections = ["vision", "how-it-works", "use-cases", "built-on-near"];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(`#${sectionId}`);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 pb-3 transition-colors duration-300">
      {/* Framed Navigation Container with Technical Corner Ticks */}
      <nav
        aria-label="Primary"
        className={`tick-box mx-auto flex h-14 max-w-[1180px] items-center justify-between px-6 border transition-all duration-300 ${
          scrolled
            ? "border-[rgba(255,255,255,0.12)] bg-[#07070A]/85 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            : "border-[rgba(255,255,255,0.08)] bg-[#0E0E13]/60 backdrop-blur-sm"
        }`}
      >
        {/* Corner registration tick marks */}
        <span className="tick-tl" />
        <span className="tick-tr" />
        <span className="tick-bl" />
        <span className="tick-br" />

        {/* Brand Logo & Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white font-semibold text-sm tracking-tight"
        >
          <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-xs">
            <Image
              src="/Automalogo.png"
              alt="Automa Logo"
              width={24}
              height={24}
              priority
              className="h-full w-full object-contain"
            />
          </div>
          <span className="font-sans font-semibold tracking-[0.14em] text-xs uppercase text-white">
            {site.name}
          </span>
        </Link>

        {/* Desktop links with active scroll-spy highlight */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {site.nav.map((link) => {
            const isActive =
              link.href === "/docs"
                ? pathname.startsWith("/docs")
                : onHome && activeSection === link.href;
            return (
              <li key={link.label}>
                <a
                  href={homeLink(link.href, onHome)}
                  {...(link.newTab ? newTabProps : {})}
                  className={`text-xs font-medium transition-colors duration-150 relative py-1 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-[#9A9AA5] hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-px bg-white" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right CTA button */}
        <div className="hidden md:flex items-center">
          <a
            href={primaryHref}
            className="rounded bg-white px-3.5 py-1.5 text-xs font-medium text-black hover:bg-neutral-200 transition-all duration-150 shadow-[0_1px_8px_rgba(255,255,255,0.15)]"
          >
            {site.hero.primaryCta}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex h-8 w-8 items-center justify-center text-white"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-x-4 top-20 z-40 flex flex-col bg-[#0E0E13] border border-[rgba(255,255,255,0.12)] p-6 shadow-2xl md:hidden rounded-sm">
          <ul className="flex flex-col gap-4 list-none m-0 p-0 mb-6">
            {site.nav.map((link) => (
              <li key={link.label}>
                <a
                  href={homeLink(link.href, onHome)}
                  {...(link.newTab ? newTabProps : {})}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-white hover:text-neutral-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={primaryHref}
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center rounded bg-white text-black py-2.5 text-xs font-medium"
          >
            {site.hero.primaryCta}
          </a>
        </div>
      )}
    </header>
  );
}
