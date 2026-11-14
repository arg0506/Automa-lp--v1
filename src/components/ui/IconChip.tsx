import { cn } from "@/lib/cn";

export function IconChip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl",
        "border border-violet-500/20 bg-violet-950/60 text-violet-400",
        className
      )}
    >
      {children}
    </div>
  );
}
