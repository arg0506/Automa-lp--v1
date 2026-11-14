export const site = {
  name: "Automa",
  title: "Automa — Financial Infrastructure for the Agentic Economy",
  description:
    "Automa is building financial infrastructure for the agentic economy, helping autonomous AI agents participate in programmable, on-chain economic activity on NEAR Protocol.",
  links: {
    docs: "/docs",
    primaryCta: "#vision",
    github: "https://github.com",
    x: "https://x.com",
    discord: "https://discord.com",
  },
  nav: [
    { label: "Vision", href: "#vision" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "NEAR", href: "#built-on-near" },
    { label: "Docs", href: "/docs", newTab: true },
  ],
  hero: {
    eyebrow: "THE AGENTIC ECONOMY",
    headlineSans: "Give AI Agents the Power to",
    headlineSerif: "Transact.",
    subtitle:
      "AI agents can do more than think. Automa is building the financial infrastructure that helps autonomous agents participate in the digital economy.",
    primaryCta: "Explore Automa",
    secondaryCta: "Read the Docs",
    supportingLabel: "Built on NEAR Protocol",
  },
  vision: {
    badge: "The Vision",
    headlineSans: "Intelligence Needs an",
    headlineSerif: "Economy.",
    body: "As AI agents take on more tasks, they need ways to interact with services and exchange value. Automa is building toward a world where agents can move from completing tasks to participating in economic activity.",
    pillars: [
      {
        index: "01",
        title: "Autonomous Value Exchange",
        body: "Enabling agents to trade computational resources, access proprietary data, and pay for APIs peer-to-peer without human intermediaries.",
      },
      {
        index: "02",
        title: "Programmable Settlement",
        body: "Self-executing payment streams, conditional milestones, and micro-escrows designed specifically for sub-second machine execution.",
      },
      {
        index: "03",
        title: "Agent-Bound Accounts",
        body: "Cryptographic identities with granular permission scoping, allowing agents to hold verifiable balances and sign on-chain actions safely.",
      },
    ],
  },
  problem: {
    badge: "The Problem",
    headlineSans: "Agents can act.",
    headlineSerif: "Payments still stop them.",
    caption: "Five gaps sit between an agent's work and a payment it can safely make.",
    items: [
      {
        number: "01",
        image: "/collage/motif-agents-stop.png",
        w: 585,
        h: 585,
        title: "Agents can act, payments don't",
        body: "An agent can finish most of a workflow, then wait for a person to buy the credits.",
      },
      {
        number: "02",
        image: "/collage/motif-locked.png",
        w: 585,
        h: 585,
        title: "Credentials are too powerful",
        body: "A personal card or an unrestricted wallet key lets one bug or prompt injection overspend.",
      },
      {
        number: "03",
        image: "/collage/motif-budgets.png",
        w: 585,
        h: 605,
        title: "Budgets are fragmented",
        body: "Limits sit across separate tools and dashboards, so it's hard to see what an agent can buy.",
      },
      {
        number: "04",
        image: "/collage/motif-gears.png",
        w: 605,
        h: 605,
        title: "Services aren't built for machines",
        body: "Each provider has its own billing, authentication, and settlement, and agents must handle all of them.",
      },
      {
        number: "05",
        image: "/collage/motif-receipt.png",
        w: 535,
        h: 545,
        title: "Actions need accountability",
        body: "Users should see why a payment was requested, which rule allowed it, and whether it settled.",
      },
      {
        number: "06",
        image: "/collage/motif-target.png",
        w: 585,
        h: 585,
        title: "The design challenge",
        body: "Make machine payments practical while keeping authority constrained, observable, and revocable.",
      },
    ],
  },
  howItWorks: {
    badge: "How It Works",
    headlineSans: "From Agents to",
    headlineSerif: "Action.",
    subtitle: "A streamlined framework for autonomous economic participation.",
    statusNote: "Early stage — follow along as we build",
    docsLinkText: "Learn more in the Docs →",
    steps: [
      {
        number: "01",
        name: "Connect",
        title: "Bring Agents In",
        description:
          "Bring agent-powered applications into the Automa ecosystem with simple SDK hooks and cryptographic key generation.",
      },
      {
        number: "02",
        name: "Enable",
        title: "Programmable Interactions",
        description:
          "Support programmable financial interactions for agent workflows with budget policies, escrow, and multi-agent coordination.",
      },
      {
        number: "03",
        name: "Transact",
        title: "On-Chain Activity",
        description:
          "Help agents participate in on-chain economic activity with instant finality, low overhead, and verifiable execution trails.",
      },
    ],
  },
  useCases: {
    badge: "Use Cases",
    headlineSans: "Built for an",
    headlineSerif: "Agent-Powered World.",
    caption: "Potential use cases as the ecosystem develops.",
    items: [
      {
        number: "01",
        title: "AI Services",
        description: "Agents access and pay for digital services, compute, and specialized knowledge bases on demand.",
        tag: "Inference & APIs",
      },
      {
        number: "02",
        title: "Agent-to-Agent Commerce",
        description: "Agents exchange value, sub-contract tasks, and settle micro-payments while collaborating together.",
        tag: "Machine Commerce",
      },
      {
        number: "03",
        title: "Autonomous Applications",
        description: "Agent-powered products coordinate economic actions, rebalancing treasuries and fulfilling user goals.",
        tag: "Protocol Operations",
      },
    ],
  },
  principles: {
    badge: "Principles",
    headlineSans: "Useful autonomy,",
    headlineSerif: "without unlimited authority.",
    caption: "The rules Automa is designed around. They describe intent, not a finished product.",
    items: [
      { number: "01", title: "Bounded autonomy", body: "Agents operate within explicit permissions, never unlimited financial authority." },
      { number: "02", title: "Least privilege", body: "Each agent gets only the funds and capabilities its task needs." },
      { number: "03", title: "User-defined rules", body: "The wallet owner sets spending limits and recipient permissions." },
      { number: "04", title: "Visible activity", body: "Requests, decisions, and outcomes should be easy to understand." },
      { number: "05", title: "Revocability", body: "Owners should be able to pause an agent or change its permissions." },
      { number: "06", title: "Fail safely", body: "Uncertain or disallowed requests should never silently become payments." },
      { number: "07", title: "Separate concerns", body: "The agent, policy engine, wallet, and blockchain each have a distinct role." },
      { number: "08", title: "Honest status", body: "A request, an approval, a submission, and a confirmation are different states." },
    ],
  },
  builtOnNear: {
    badge: "Infrastructure",
    headlineSans: "Built on NEAR.",
    headlineSerif: "Designed for What's Next.",
    body: "Automa is being built on NEAR Protocol to explore financial infrastructure for autonomous agents.",
    cta: "Explore the Docs",
    features: [
      {
        label: "Sub-Second Finality",
        desc: "Ultra-fast consensus guarantees machine-to-machine transactions settle in fractions of a second.",
      },
      {
        label: "Account Abstraction",
        desc: "Named accounts and flexible key hierarchy allow granular permissions tailored to agent autonomy.",
      },
      {
        label: "Predictable Micro-Fees",
        desc: "Sub-cent fees make high-frequency agent interactions and fractional token transfers economically viable.",
      },
    ],
  },
  finalCta: {
    badge: "Get Started",
    headlineSans: "Build for the",
    headlineSerif: "Agentic Economy.",
    body: "The next generation of software won't just respond. It will act.",
    supportingLine: "Join the journey toward an economy powered by autonomous agents.",
    primaryCta: "Explore Automa",
    secondaryCta: "Read the Docs",
  },
  footer: {
    wordmark: "AUTOMA",
    tagline: "Financial infrastructure for the agentic economy.",
    builtOnLabel: "Built on NEAR Protocol",
    legal: "© 2026 Automa",
  },
};

export function href(key: keyof typeof site.links): string | undefined {
  return site.links[key];
}

// Docs open in their own tab, like a separate site.
export const newTabProps = { target: "_blank", rel: "noopener noreferrer" } as const;

// Section anchors live on the home page, so resolve them to /#section elsewhere.
export function homeLink(to: string, onHome: boolean) {
  return to.startsWith("#") && !onHome ? `/${to}` : to;
}
