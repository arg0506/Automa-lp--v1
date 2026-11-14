import { cn } from "@/lib/cn";

interface GlowBackgroundProps {
  variant?: "hero" | "section" | "cta";
  className?: string;
}

export function GlowBackground({ variant = "section", className }: GlowBackgroundProps) {
  if (variant === "hero") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className
        )}
      >
        {/* Top center glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[120px]" />
        {/* Bottom rim glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-violet-400/10 blur-[80px]" />
      </div>
    );
  }

  if (variant === "cta") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className
        )}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-violet-600/25 blur-[100px]" />
      </div>
    );
  }

  // default "section"
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 left-0 right-0 h-64 overflow-hidden",
        className
      )}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-violet-600/15 blur-[80px] rounded-full" />
    </div>
  );
}
