"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Ganti mode terang atau gelap"
      title="Ganti tema (T)"
      suppressHydrationWarning
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "relative grid h-8 w-8 place-items-center rounded-md text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink",
        className,
      )}
    >
      <Sun size={15} className="dark:hidden" />
      <Moon size={15} className="hidden dark:block" />
    </button>
  );
}
