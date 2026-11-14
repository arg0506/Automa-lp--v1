import { cn } from "@/lib/cn";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function Section({ className, ...props }: SectionProps) {
  return (
    <section
      className={cn("py-20 lg:py-32 relative", className)}
      {...props}
    />
  );
}
