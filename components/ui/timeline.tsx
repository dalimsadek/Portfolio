import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { KeyboardEvent } from "react";

export type TimelineItem = {
  id: string;
  label: string;
  subLabel?: string;
};

export function Timeline({
  items,
  activeIndex,
  onSelect,
  accentClass = "bg-primary",
  mutedClass = "bg-border",
  className
}: {
  items: TimelineItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  accentClass?: string;
  mutedClass?: string;
  className?: string;
}) {
  const maxIndex = Math.max(0, items.length - 1);

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      onSelect(Math.min(activeIndex + 1, maxIndex));
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      onSelect(Math.max(activeIndex - 1, 0));
    }
  };

  return (
    <div
      className={cn("relative mx-auto flex w-full max-w-3xl flex-col gap-4", className)}
      role="group"
      aria-label="Journey timeline"
      tabIndex={0}
      onKeyDown={handleKey}
    >
      <div className="relative h-1 overflow-hidden rounded-full bg-border">
        <motion.div
          className={cn("absolute left-0 top-0 h-1 rounded-full", accentClass)}
          initial={{ width: 0 }}
          animate={{ width: `${(activeIndex / Math.max(1, maxIndex)) * 100}%` }}
          transition={{ duration: 0.3 }}
          aria-hidden
        />
      </div>
      <div className="flex items-start justify-between gap-2 text-xs text-mutedForeground">
        {items.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(i)}
              className={cn(
                "group flex flex-col items-center gap-1 text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isActive ? "text-primary" : "text-mutedForeground"
              )}
              aria-current={isActive ? "step" : undefined}
              aria-label={`${item.label}${item.subLabel ? `, ${item.subLabel}` : ""}`}
            >
              <span
                className={cn(
                  "h-3 w-3 rounded-full border",
                  isActive
                    ? "border-primary bg-primary"
                    : i === items.length - 1
                      ? "border-primary/50 bg-background"
                      : "border-border bg-background"
                )}
              />
              <span className="font-semibold leading-tight">{item.label}</span>
              {item.subLabel ? (
                <span className="hidden text-[11px] text-mutedForeground md:block">{item.subLabel}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
