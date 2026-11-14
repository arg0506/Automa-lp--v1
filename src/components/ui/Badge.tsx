import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full",
        "border border-violet-500/30 bg-violet-950/50",
        "px-4 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-violet-300",
        className
      )}
    >
      {children}
    </span>
  );
}
