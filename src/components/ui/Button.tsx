import { cn } from "@/lib/cn";

type Variant = "primary" | "glass" | "violet";

interface ButtonProps {
  variant?: Variant;
  href?: string;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

export function Button({
  variant = "primary",
  href = "#",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] no-underline";

  const styles: Record<Variant, string> = {
    primary:
      "bg-white text-[#05040A] hover:bg-white/90 shadow-lg hover:shadow-xl",
    glass:
      "border border-white/[0.16] text-white hover:border-white/30 hover:bg-white/[0.05]",
    violet:
      "bg-gradient-to-r from-violet-500 to-violet-600 text-white hover:brightness-110",
  };

  return (
    <a href={href} className={cn(base, styles[variant], className)} {...props}>
      {children}
    </a>
  );
}
