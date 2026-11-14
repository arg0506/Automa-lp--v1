import { cn } from "@/lib/cn";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  glow?: boolean;
}

export function GlassCard({ className, glow = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[24px]",
        "border border-white/[0.08] bg-white/[0.03]",
        "backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        "transition-colors duration-300",
        "hover:border-white/[0.16] hover:bg-white/[0.05]",
        glow && "before:absolute before:inset-0 before:rounded-[24px] before:pointer-events-none before:bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.12),transparent_60%)]",
        className
      )}
      {...props}
    />
  );
}
