"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function ThemeToggle({ children }: { children?: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <Button variant="ghost" size="sm" aria-label="toggle theme" />;

  const isDark = theme === "dark" || (!theme && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full px-3"
    >
      {children ?? (isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
    </Button>
  );
}
