import { AlertTriangle, Ban, Code2, Info, Lightbulb, ShieldAlert, Tag, Target, type LucideIcon } from "lucide-react";
import type { Block } from "@/content/docs";
import Diagram from "@/components/docs/Diagrams";

const statusStyles: Record<string, string> = {
  Production: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  "Test environments": "border-violet-500/30 bg-violet-950/50 text-violet-300",
  "In development": "border-violet-500/30 bg-violet-950/50 text-violet-300",
  Planned: "border-[rgba(255,255,255,0.12)] bg-[#121218] text-[#9A9AA5]",
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider ${
        statusStyles[status] ?? statusStyles.Planned
      }`}
    >
      {status}
    </span>
  );
}

// Picks an icon for a callout from its label.
function calloutIcon(label: string): LucideIcon {
  if (/fail/i.test(label)) return ShieldAlert;
  if (/important|reporting/i.test(label)) return AlertTriangle;
  if (/do not/i.test(label)) return Ban;
  if (/working api/i.test(label)) return Code2;
  if (/illustrative|advice/i.test(label)) return Lightbulb;
  if (/core rule|challenge/i.test(label)) return Target;
  if (/status/i.test(label)) return Tag;
  return Info;
}

// Renders **bold** and `code` spans. Anything else is plain text.
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="rounded border border-[rgba(255,255,255,0.08)] bg-[#121218] px-1.5 py-px font-mono text-[0.85em] text-[#E4E4E7]"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      })}
    </>
  );
}

export default function DocBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[15px] leading-[1.8] text-[#9A9AA5]">
          <Rich text={block.text} />
        </p>
      );

    case "h3":
      return (
        <h3 className="mt-8 flex items-center gap-3 text-base font-semibold tracking-tight text-white first:mt-0">
          <span aria-hidden="true" className="h-px w-5 bg-[#8B5CF6]" />
          {block.text}
        </h3>
      );

    case "list":
      return (
        <ul className="flex list-none flex-col gap-2.5 p-0 text-[15px] leading-[1.7] text-[#9A9AA5]">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8B5CF6]/70" />
              <span>
                <Rich text={item} />
              </span>
            </li>
          ))}
        </ul>
      );

    case "olist":
      return (
        <ol className="flex list-none flex-col gap-3 p-0 text-[15px] leading-[1.7] text-[#9A9AA5]">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="w-7 shrink-0 pt-px font-mono text-xs text-[#8B5CF6]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <Rich text={item} />
              </span>
            </li>
          ))}
        </ol>
      );

    case "defs":
      return (
        <dl className="divide-y divide-[rgba(255,255,255,0.06)] overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0E0E13]">
          {block.items.map((item) => (
            <div key={item.term} className="grid gap-1.5 px-5 py-4 transition-colors hover:bg-[#121218] sm:grid-cols-[210px_minmax(0,1fr)] sm:gap-6">
              <dt className="text-sm font-medium text-white">{item.term}</dt>
              <dd className="text-sm leading-[1.7] text-[#9A9AA5]">
                <Rich text={item.text} />
              </dd>
            </div>
          ))}
        </dl>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0E0E13]">
          <table className="w-full min-w-[460px] border-collapse text-left text-sm">
            <thead className="bg-[#121218] font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-5 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="border-t border-[rgba(255,255,255,0.06)] align-top transition-colors hover:bg-[#121218]/60">
                  {row.map((cell, i) => (
                    <td
                      key={`${row[0]}-${i}`}
                      className={`px-5 py-3 leading-relaxed ${i === 0 ? "text-white" : "text-[#9A9AA5]"}`}
                    >
                      <Rich text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "code":
      return (
        <div className="overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A0A0F]">
          <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.06)] px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-[#3F3F46]" />
            <span className="h-2 w-2 rounded-full bg-[#3F3F46]" />
            <span className="h-2 w-2 rounded-full bg-[#3F3F46]" />
            <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-[#71717A]">{block.lang}</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.75] text-[#D4D4D8]">
            <code>{block.text}</code>
          </pre>
        </div>
      );

    case "note": {
      const Icon = calloutIcon(block.label);
      return (
        <div className="relative overflow-hidden rounded-2xl border border-[rgba(139,92,246,0.25)] bg-[linear-gradient(135deg,rgba(139,92,246,0.10),rgba(139,92,246,0.02))] p-5 sm:p-6">
          <div className="flex gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[rgba(139,92,246,0.35)] bg-[#0E0E13] text-violet-300">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="mb-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-violet-300">
                {block.label}
              </p>
              <p className="text-[15px] leading-[1.7] text-[#C4C4CC]">
                <Rich text={block.text} />
              </p>
            </div>
          </div>
        </div>
      );
    }

    case "diagram":
      return (
        <figure className="scroll-rise my-2">
          <Diagram name={block.name} />
          <figcaption className="mt-3 flex items-start gap-2 px-1 text-[13px] leading-relaxed text-[#71717A]">
            <span className="mt-[0.45em] h-px w-4 shrink-0 bg-[#8B5CF6]" aria-hidden="true" />
            <span>{block.caption}</span>
          </figcaption>
        </figure>
      );
  }
}
