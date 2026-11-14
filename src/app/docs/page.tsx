import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BookText,
  Code2,
  FileJson,
  Gauge,
  HelpCircle,
  Handshake,
  Layers,
  LayoutDashboard,
  Lightbulb,
  Lock,
  Map,
  Network,
  Plug,
  Receipt,
  RotateCcw,
  Scale,
  ShieldCheck,
  Wallet,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import DocBlock, { StatusPill } from "@/components/docs/DocBlock";
import DocsSidebar from "@/components/docs/DocsSidebar";
import { docs, docGroups, type DocSection } from "@/content/docs";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${docs.title} — ${site.name}`,
  description:
    "Automa documentation: the problem, the policy-controlled approach, wallets, payments, architecture, security, and roadmap for programmable financial infrastructure for AI agents on NEAR Protocol.",
};

const sectionIcons: Record<string, LucideIcon> = {
  introduction: BookOpen,
  "the-problem": AlertTriangle,
  "the-automa-approach": Scale,
  "core-concepts": Layers,
  "how-automa-works": Workflow,
  "wallets-and-fund-management": Wallet,
  "spending-policies-and-permissions": Gauge,
  "payments-and-transaction-lifecycle": Receipt,
  "agent-and-service-integration": Plug,
  "dashboard-and-activity-monitoring": LayoutDashboard,
  "near-protocol-and-network-design": Network,
  "security-model": ShieldCheck,
  "privacy-and-data-handling": Lock,
  "failure-handling-and-recovery": RotateCcw,
  "use-cases": Lightbulb,
  "developer-concepts": Code2,
  "illustrative-api-and-workflow-examples": FileJson,
  "limitations-and-risks": AlertTriangle,
  "roadmap-considerations": Map,
  faq: HelpCircle,
  glossary: BookText,
  "responsible-use": Handshake,
};

const quickStart: { href: string; icon: LucideIcon; title: string; body: string }[] = [
  {
    href: "#introduction",
    icon: BookOpen,
    title: "Start here",
    body: "What Automa is, the problem it addresses, and who it is for.",
  },
  {
    href: "#near-protocol-and-network-design",
    icon: Network,
    title: "Architecture",
    body: "What runs on-chain, what runs off-chain, and where trust sits.",
  },
  {
    href: "#payments-and-transaction-lifecycle",
    icon: Workflow,
    title: "Payments",
    body: "From payment request to verified settlement, state by state.",
  },
  {
    href: "#security-model",
    icon: ShieldCheck,
    title: "Security",
    body: "Threats, safeguards, and the limits you should plan around.",
  },
];

const sidebarGroups = docGroups.map((group) => ({
  group,
  items: docs.sections
    .filter((s) => s.group === group)
    .map((s) => ({ id: s.id, number: s.number, title: s.title })),
}));

function SectionBlock({ section }: { section: DocSection }) {
  const Icon = sectionIcons[section.id] ?? BookOpen;
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="scroll-rise scroll-mt-24 border-t border-[rgba(255,255,255,0.08)] py-16 first:border-t-0 first:pt-0"
    >
      <header className="mb-10 flex items-start gap-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.08)] text-violet-300">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="mb-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#71717A]">
            {section.number} · {section.group}
          </p>
          <h2
            id={`${section.id}-heading`}
            className="text-[clamp(1.75rem,3.2vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white"
          >
            {section.title}
          </h2>
        </div>
      </header>
      <div className="flex flex-col gap-5">
        {section.blocks.map((block, i) => (
          <DocBlock key={i} block={block} />
        ))}
      </div>
    </section>
  );
}

function DocsTopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.08)] bg-[#07070A]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-xs">
              <Image src="/Automalogo.png" alt="Automa logo" width={24} height={24} className="h-full w-full object-contain" />
            </span>
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white">{site.name}</span>
          </Link>
          <span className="h-4 w-px bg-[rgba(255,255,255,0.12)]" aria-hidden="true" />
          <span className="rounded border border-[rgba(255,255,255,0.12)] bg-[#121218] px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-[#9A9AA5]">
            Docs
          </span>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/" className="hidden text-xs text-[#9A9AA5] transition-colors hover:text-white sm:inline">
            Back to Automa
          </Link>
          <Link
            href="/#vision"
            className="rounded bg-white px-3.5 py-1.5 text-xs font-medium text-black transition-colors hover:bg-neutral-200"
          >
            {site.hero.primaryCta}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#07070A] text-white">
      <a
        href="#docs-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:text-xs focus:text-black"
      >
        Skip to content
      </a>

      <DocsTopBar />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.22),transparent_62%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        />

        <div className="relative mx-auto max-w-[1280px] px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.08)] px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-violet-300">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden="true" />
              {docs.title}
            </div>
            <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-medium leading-[1.03] tracking-[-0.025em] text-white">
              <span className="block font-sans">{docs.eyebrowSans}</span>
              <span className="block font-serif italic font-normal text-[#E4E4E7]">{docs.headlineSerif}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-[1.75] text-[#9A9AA5] sm:text-lg">{docs.intro}</p>
          </div>

          {/* Status panel */}
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.08)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
            <div className="bg-[#0E0E13] p-6 sm:p-8">
              <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-wider text-[#71717A]">
                Documentation status
              </p>
              <p className="text-sm leading-[1.75] text-[#9A9AA5]">{docs.status}</p>
              <p className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                Network focus
                <span className="rounded border border-[rgba(255,255,255,0.12)] bg-[#121218] px-2 py-0.5 text-white">
                  {docs.network}
                </span>
              </p>
            </div>
            <dl className="grid bg-[#0E0E13] p-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6 sm:p-8">
              {docs.statusLegend.map((item) => (
                <div key={item.label} className="mb-5 flex flex-col gap-2 sm:mb-0">
                  <dt>
                    <StatusPill status={item.label} />
                  </dt>
                  <dd className="text-[13px] leading-relaxed text-[#9A9AA5]">{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Quick start */}
          <div className="mt-12">
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-wider text-[#71717A]">
              Start with
            </p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {quickStart.map((card) => (
                <a
                  key={card.title}
                  href={card.href}
                  className="group relative flex flex-col gap-4 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0E0E13] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(139,92,246,0.4)] hover:bg-[#121218]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.08)] text-violet-300">
                    <card.icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
                      {card.title}
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#52525B] transition-colors group-hover:text-violet-300" aria-hidden="true" />
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[#9A9AA5]">{card.body}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div id="docs-main" className="mx-auto grid max-w-[1280px] gap-12 px-4 pb-28 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-6 pr-2 pt-2">
            <DocsSidebar groups={sidebarGroups} />
          </div>
        </aside>

        <div className="min-w-0 max-w-[820px]">
          <details className="mb-10 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0E0E13] p-5 lg:hidden">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-white">
              All sections
              <ArrowRight className="h-4 w-4 text-[#71717A]" aria-hidden="true" />
            </summary>
            <div className="mt-5">
              <DocsSidebar groups={sidebarGroups} />
            </div>
          </details>

          {docs.sections.map((section) => (
            <SectionBlock key={section.id} section={section} />
          ))}

          <div className="mt-8 flex flex-col gap-4 border-t border-[rgba(255,255,255,0.08)] pt-8 text-xs text-[#71717A] sm:flex-row sm:items-center sm:justify-between">
            <p>{site.footer.legal}</p>
            <Link href="/" className="text-[#9A9AA5] transition-colors hover:text-white">
              Back to Automa
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
