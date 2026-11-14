"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

type Item = { id: string; number: string; title: string };
type Group = { group: string; items: Item[] };

// Lists every section, filters by title, and highlights the section in view.
export default function DocsSidebar({ groups }: { groups: Group[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("");
  const ids = useMemo(() => groups.flatMap((g) => g.items.map((i) => i.id)), [groups]);

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  const q = query.trim().toLowerCase();
  const filtered = groups
    .map((g) => ({ ...g, items: g.items.filter((i) => !q || i.title.toLowerCase().includes(q)) }))
    .filter((g) => g.items.length > 0);

  return (
    <nav aria-label="Documentation sections" className="flex flex-col gap-6">
      <label className="relative block">
        <span className="sr-only">Search sections</span>
        <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#71717A]" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search sections"
          className="w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0E0E13] py-2 pl-9 pr-3 text-[13px] text-white placeholder:text-[#52525B] transition-colors focus:border-[#8B5CF6]/60 focus:outline-none"
        />
      </label>

      {filtered.map((g) => (
        <div key={g.group}>
          <p className="mb-2 px-3 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#71717A]">
            {g.group}
          </p>
          <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
            {g.items.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative flex items-baseline gap-3 rounded-md px-3 py-1.5 text-[13px] transition-colors ${
                      isActive
                        ? "bg-[#14141C] text-white"
                        : "text-[#9A9AA5] hover:bg-[#121218] hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <span aria-hidden="true" className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-[#8B5CF6]" />
                    )}
                    <span className={`font-mono text-[11px] ${isActive ? "text-[#8B5CF6]" : "text-[#52525B]"}`}>
                      {item.number}
                    </span>
                    <span>{item.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="px-3 text-[13px] text-[#71717A]">No sections match “{query}”.</p>
      )}
    </nav>
  );
}
