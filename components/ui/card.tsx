import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card/80 p-6 shadow-soft backdrop-blur-md transition-transform hover:-translate-y-1 hover:shadow-glow",
        className
      )}
      {...props}
    />
  );
}
