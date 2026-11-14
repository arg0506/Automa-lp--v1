import type { DiagramName } from "@/content/docs";

// Inline SVG diagrams. Each uses a fixed viewBox so it scales with the column.
// Colors follow the landing page tokens: near-black panels, white ink, violet accent.

const ink = "#E4E4E7";
const muted = "#9A9AA5";
const dim = "#71717A";
const edge = "rgba(255,255,255,0.22)";
const panel = "#0E0E13";
const accentFill = "rgba(139,92,246,0.12)";
const accentStroke = "rgba(139,92,246,0.6)";

type Tone = "default" | "accent" | "dim";

function Node({
  x,
  y,
  w = 170,
  h = 56,
  title,
  sub,
  tone = "default",
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  title: string;
  sub?: string;
  tone?: Tone;
}) {
  const fill = tone === "accent" ? accentFill : panel;
  const stroke =
    tone === "accent" ? accentStroke : tone === "dim" ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.16)";
  const titleY = sub ? y + h / 2 - 2 : y + h / 2 + 5;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={fill} stroke={stroke} strokeWidth={1.2} />
      <text x={x + w / 2} y={titleY} textAnchor="middle" fontSize={14} fontWeight={600} fill={ink}>
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" fontSize={11} fill={tone === "dim" ? dim : muted}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  label,
  dashed = false,
  lx = 0,
  ly = -6,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
  dashed?: boolean;
  lx?: number;
  ly?: number;
}) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const head = 7;
  const left = [x2 - head * Math.cos(a - 0.45), y2 - head * Math.sin(a - 0.45)];
  const right = [x2 - head * Math.cos(a + 0.45), y2 - head * Math.sin(a + 0.45)];
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={edge}
        strokeWidth={1.4}
        strokeDasharray={dashed ? "5 5" : undefined}
      />
      <polygon points={`${x2},${y2} ${left[0]},${left[1]} ${right[0]},${right[1]}`} fill="rgba(255,255,255,0.55)" />
      {label && (
        <text x={(x1 + x2) / 2 + lx} y={(y1 + y2) / 2 + ly} textAnchor="middle" fontSize={11} fill={dim}>
          {label}
        </text>
      )}
    </g>
  );
}

function Frame({ w, h, label, children }: { w: number; h: number; label: string; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded border border-[rgba(255,255,255,0.08)] bg-[#0A0A0F] p-4 sm:p-6">
      <svg
        role="img"
        aria-label={label}
        viewBox={`0 0 ${w} ${h}`}
        className="mx-auto block h-auto"
        style={{ width: "100%", minWidth: 600 }}
      >
        {children}
      </svg>
    </div>
  );
}

function Overview() {
  return (
    <Frame w={800} h={380} label="Overview: user, agent, Automa, service provider and NEAR Protocol">
      <Node x={40} y={24} w={200} title="User" sub="Funds wallet, sets policies" />
      <Node x={300} y={24} w={200} title="AI agent" sub="Requests eligible payments" />
      <Node x={560} y={24} w={200} title="Service provider" sub="Price, identity, payment flow" />

      <Node x={170} y={150} w={460} h={100} tone="accent" title="Automa" sub="Policy engine · Agent wallets · Audit trail" />
      <text x={614} y={172} textAnchor="end" fontSize={10} fill={accentStroke} letterSpacing={1.2}>
        PLANNED
      </text>

      <Node x={170} y={300} w={460} h={52} tone="dim" title="NEAR Protocol" sub="Base chain for on-chain settlement" />

      <Arrow x1={140} y1={84} x2={230} y2={150} label="funds · sets rules" lx={-30} ly={-14} />
      <Arrow x1={400} y1={84} x2={400} y2={150} label="payment request" lx={62} ly={-2} />
      <Arrow x1={600} y1={150} x2={660} y2={84} label="pays for service" lx={52} ly={-4} />
      <Arrow x1={400} y1={250} x2={400} y2={300} label="settles on-chain" lx={72} ly={4} />
    </Frame>
  );
}

function Separation() {
  return (
    <Frame w={800} h={300} label="Agent requests, policy engine decides, wallet executes if allowed">
      <Node x={300} y={6} w={200} h={56} title="Owner" sub="Sets policies, approves" />
      <Node x={30} y={120} w={200} h={70} title="Agent" sub="Reasons and requests" />
      <Node x={300} y={120} w={200} h={70} tone="accent" title="Policy engine" sub="Checks every request" />
      <Node x={570} y={120} w={200} h={70} title="Agent wallet" sub="Executes only if allowed" />
      <Node x={300} y={228} w={200} h={52} tone="dim" title="Rejected or held" sub="Routed back to owner" />

      <Arrow x1={230} y1={155} x2={300} y2={155} label="1 · request" lx={0} ly={-8} />
      <Arrow x1={500} y1={155} x2={570} y2={155} label="2 · allowed" lx={0} ly={-8} />
      <Arrow x1={400} y1={62} x2={400} y2={120} label="rules & approvals" lx={92} ly={0} />
      <Arrow x1={400} y1={190} x2={400} y2={228} label="3 · denied" dashed lx={58} ly={4} />

      <text x={30} y={278} fontSize={11} fill={dim}>
        In this model the agent receives no unrestricted signing key.
      </text>
    </Frame>
  );
}

function Sequence() {
  const steps = [
    { n: "01", name: "Need", actor: "Agent" },
    { n: "02", name: "Request", actor: "Agent → Automa" },
    { n: "03", name: "Validate", actor: "Automa" },
    { n: "04", name: "Decide", actor: "Policy engine" },
    { n: "05", name: "Submit", actor: "Wallet" },
    { n: "06", name: "Track", actor: "Network + audit" },
  ];
  const w = 110;
  const gap = 22;
  return (
    <Frame w={800} h={170} label="Six stages: need, request, validate, decide, submit, track and record">
      {steps.map((s, i) => {
        const x = 15 + i * (w + gap);
        return (
          <g key={s.n}>
            <text x={x + w / 2} y={36} textAnchor="middle" fontSize={11} fill={dim} fontFamily="monospace">
              {s.n}
            </text>
            <Node x={x} y={46} w={w} h={68} tone={i === 3 || i === 4 ? "accent" : "default"} title={s.name} sub={s.actor} />
            {i < steps.length - 1 && <Arrow x1={x + w + 3} y1={80} x2={x + w + gap - 3} y2={80} />}
          </g>
        );
      })}
      <text x={400} y={150} textAnchor="middle" fontSize={11} fill={dim}>
        Approval and rejection branches are shown in the lifecycle diagram.
      </text>
    </Frame>
  );
}

function Balance() {
  const total = 10;
  const bar = 720;
  const scale = (v: number) => (v / total) * bar;
  const spent = 3;
  const reserved = 1.5;
  const available = 5.5;
  const sx = 40;
  const rx = sx + scale(spent);
  const ax = rx + scale(reserved);
  return (
    <Frame w={800} h={250} label="Wallet balance split into spent, reserved and available; daily budget used and remaining">
      <text x={40} y={34} fontSize={13} fontWeight={600} fill={ink}>
        Wallet balance · total 10.00
      </text>
      <rect x={sx} y={46} width={scale(spent)} height={44} rx={6} fill="#2A2A33" />
      <rect x={rx} y={46} width={scale(reserved)} height={44} fill="#6D4AC4" />
      <rect x={ax} y={46} width={scale(available)} height={44} rx={6} fill="#E4E4E7" />
      <text x={sx + scale(spent) / 2} y={73} textAnchor="middle" fontSize={12} fill={ink}>
        Spent 3.00
      </text>
      <text x={rx + scale(reserved) / 2} y={73} textAnchor="middle" fontSize={12} fill="#FFFFFF">
        Reserved 1.50
      </text>
      <text x={ax + scale(available) / 2} y={73} textAnchor="middle" fontSize={12} fill="#07070A">
        Available 5.50
      </text>

      <text x={40} y={142} fontSize={13} fontWeight={600} fill={ink}>
        Daily budget · limit 10.00
      </text>
      <rect x={sx} y={154} width={scale(spent + reserved)} height={44} rx={6} fill="#6D4AC4" />
      <rect
        x={sx + scale(spent + reserved)}
        y={154}
        width={scale(total - spent - reserved)}
        height={44}
        rx={6}
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeDasharray="5 5"
      />
      <text x={sx + scale(spent + reserved) / 2} y={181} textAnchor="middle" fontSize={12} fill="#FFFFFF">
        Used 4.50
      </text>
      <text x={sx + scale(spent + reserved) + scale(total - spent - reserved) / 2} y={181} textAnchor="middle" fontSize={12} fill={muted}>
        Budget remaining 5.50
      </text>

      <text x={40} y={230} fontSize={11} fill={dim}>
        Reserved funds count only where the implementation reserves them for pending requests.
      </text>
    </Frame>
  );
}

function PolicyPipeline() {
  const checks = [
    "Agent registered and active",
    "Request authenticated and well-formed",
    "Fresh and not a duplicate",
    "Asset and network supported",
    "Destination permitted",
    "Within per-transaction limit",
    "Cumulative spend within budget",
    "Balance covers amount and fees",
    "Human approval required?",
    "Risk checks and safeguards pass",
  ];
  return (
    <Frame w={800} h={400} label="Ten policy checks in order, leading to authorized, awaiting approval, or rejected">
      {checks.map((c, i) => {
        const y = 20 + i * 36;
        return (
          <g key={c}>
            <rect x={30} y={y} width={500} height={28} rx={6} fill={panel} stroke="rgba(255,255,255,0.08)" />
            <circle cx={50} cy={y + 14} r={9} fill="none" stroke="rgba(255,255,255,0.22)" />
            <text x={50} y={y + 18} textAnchor="middle" fontSize={10} fill={muted} fontFamily="monospace">
              {i + 1}
            </text>
            <text x={70} y={y + 18} fontSize={12.5} fill={ink}>
              {c}
            </text>
          </g>
        );
      })}

      <Arrow x1={532} y1={190} x2={580} y2={96} />
      <Arrow x1={532} y1={200} x2={580} y2={206} />
      <Arrow x1={532} y1={212} x2={580} y2={316} dashed />

      <Node x={580} y={62} w={190} h={68} tone="accent" title="Authorized" sub="All checks pass" />
      <Node x={580} y={172} w={190} h={68} title="Awaiting approval" sub="Owner decides" />
      <Node x={580} y={282} w={190} h={68} tone="dim" title="Rejected or review" sub="Fails closed" />
    </Frame>
  );
}

function Lifecycle() {
  return (
    <Frame w={800} h={390} label="Payment states: created, validating, authorized, submitted, pending, confirmed, with terminal outcomes">
      <Node x={20} y={36} w={150} h={48} title="Created" />
      <Node x={200} y={36} w={150} h={48} title="Validating" />
      <Node x={380} y={36} w={150} h={48} tone="accent" title="Authorized" />
      <Node x={560} y={36} w={150} h={48} title="Submitted" />
      <Node x={560} y={124} w={150} h={48} title="Pending" sub="confirmation" />
      <Node x={560} y={212} w={150} h={48} tone="accent" title="Confirmed" />
      <Node x={200} y={124} w={150} h={48} title="Awaiting" sub="approval" />

      <Arrow x1={170} y1={60} x2={200} y2={60} />
      <Arrow x1={350} y1={60} x2={380} y2={60} />
      <Arrow x1={530} y1={60} x2={560} y2={60} />
      <Arrow x1={635} y1={84} x2={635} y2={124} />
      <Arrow x1={635} y1={172} x2={635} y2={212} />
      <Arrow x1={275} y1={84} x2={275} y2={124} label="needs human" lx={46} ly={4} />
      <Arrow x1={350} y1={150} x2={392} y2={84} label="approved" lx={-18} ly={24} />

      <text x={20} y={300} fontSize={11} fill={dim}>
        Terminal outcomes, reachable before confirmation
      </text>
      <Node x={20} y={316} w={170} h={44} tone="dim" title="Rejected" />
      <Node x={210} y={316} w={170} h={44} tone="dim" title="Failed" />
      <Node x={400} y={316} w={170} h={44} tone="dim" title="Expired" />
      <Node x={590} y={316} w={170} h={44} tone="dim" title="Cancelled" />
    </Frame>
  );
}

function Integration() {
  return (
    <Frame w={800} h={300} label="Integration components: agent runtime, connector, identity, policy evaluator, wallet, service adapter, status handler">
      <Node x={20} y={24} title="Agent runtime" sub="Performs the task" />
      <Node x={220} y={24} title="Automa connector" sub="Submits requests" />
      <Node x={420} y={24} title="Identity & auth" sub="Scoped agent credential" />
      <Node x={620} y={24} title="Policy evaluator" sub="Checks owner rules" tone="accent" />

      <Arrow x1={190} y1={52} x2={218} y2={52} />
      <Arrow x1={390} y1={52} x2={418} y2={52} />
      <Arrow x1={590} y1={52} x2={618} y2={52} />

      <Node x={420} y={170} title="Wallet / tx" sub="Signs authorized operations" tone="accent" />
      <Node x={20} y={170} title="Service adapter" sub="Provider API and payment" />
      <Node x={620} y={170} title="Status handler" sub="Reports outcomes" />

      <Arrow x1={640} y1={80} x2={560} y2={170} label="authorized only" lx={-44} ly={-6} />
      <Arrow x1={420} y1={198} x2={190} y2={198} label="submits payment" ly={-8} />
      <Arrow x1={590} y1={198} x2={618} y2={198} />
      <Arrow x1={710} y1={170} x2={710} y2={80} dashed label="status" lx={22} ly={-30} />

      <text x={20} y={268} fontSize={11} fill={dim}>
        Solid lines are the request path. Dashed lines return status to the agent and owner.
      </text>
    </Frame>
  );
}

function TrustBoundary() {
  return (
    <Frame w={800} h={390} label="Off-chain components and on-chain components, separated by a trust boundary">
      <rect x={20} y={20} width={760} height={160} rx={14} fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.14)" strokeDasharray="6 6" />
      <text x={38} y={44} fontSize={11} fontWeight={600} fill={muted} letterSpacing={1.5}>
        OFF-CHAIN · APPLICATION AND OPERATIONS
      </text>
      <Node x={50} y={62} w={200} h={56} title="Dashboard and UI" sub="Rendering and controls" />
      <Node x={300} y={62} w={200} h={56} title="Agent orchestration" sub="Service discovery" />
      <Node x={550} y={62} w={200} h={56} title="Policy evaluation" sub="Unless enforced by a contract" tone="accent" />
      <text x={400} y={150} textAnchor="middle" fontSize={11} fill={dim}>
        Notifications, indexing, analytics, and integration management
      </text>

      <line x1={20} y1={210} x2={780} y2={210} stroke="rgba(139,92,246,0.7)" strokeWidth={1.4} strokeDasharray="2 6" />
      <text x={780} y={204} textAnchor="end" fontSize={11} fill={accentStroke}>
        trust boundary
      </text>

      <rect x={20} y={226} width={760} height={144} rx={14} fill="rgba(139,92,246,0.04)" stroke="rgba(139,92,246,0.3)" />
      <text x={38} y={250} fontSize={11} fontWeight={600} fill={muted} letterSpacing={1.5}>
        ON-CHAIN · NEAR PROTOCOL
      </text>
      <Node x={50} y={266} w={200} h={56} title="Asset transfers" sub="Supported by the network" tone="dim" />
      <Node x={300} y={266} w={200} h={56} title="Contract rules" sub="Only if implemented" tone="dim" />
      <Node x={550} y={266} w={200} h={56} title="Public records" sub="Verifiable contract state" tone="dim" />
      <text x={400} y={345} textAnchor="middle" fontSize={11} fill={dim}>
        Off-chain rules protect only as far as the server is trusted. On-chain rules hold where contracts enforce them.
      </text>
    </Frame>
  );
}

const diagrams: Record<DiagramName, () => React.ReactElement> = {
  overview: Overview,
  separation: Separation,
  sequence: Sequence,
  balance: Balance,
  "policy-pipeline": PolicyPipeline,
  lifecycle: Lifecycle,
  integration: Integration,
  "trust-boundary": TrustBoundary,
};

export default function Diagram({ name }: { name: DiagramName }) {
  const View = diagrams[name];
  return <View />;
}
