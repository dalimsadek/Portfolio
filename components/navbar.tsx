"use client";

import { sectionOrder } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Menu, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const brand = "Welcome to my portfolio";

  const handleScroll = () => {
    const offsets = sectionOrder.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return { id, top: Number.POSITIVE_INFINITY };
      return { id, top: Math.abs(el.getBoundingClientRect().top) };
    });
    offsets.sort((a, b) => a.top - b.top);
    setActive(offsets[0]?.id ?? "home");
  };

  useEffect(() => {
    if (pathname !== "/") return;
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const items = useMemo(() => sectionOrder, []);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/80 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="text-lg font-semibold text-foreground">
          <motion.span className="flex flex-wrap" aria-label={brand}>
            {brand.split("").map((char, idx) => (
              <motion.span
                key={`${char}-${idx}`}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.25 }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {items.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-mutedForeground transition hover:text-foreground",
                active === id && "bg-muted text-foreground"
              )}
            >
              {label}
            </a>
          ))}
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle>
            <Sun className="h-4 w-4" />
          </ThemeToggle>
          <Button
            variant="ghost"
            className="px-2"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
      {open ? (
        <div className="border-t border-border/60 bg-background/95 px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-2">
            {items.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-medium text-mutedForeground transition hover:bg-muted hover:text-foreground",
                  active === id && "bg-muted text-foreground"
                )}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
