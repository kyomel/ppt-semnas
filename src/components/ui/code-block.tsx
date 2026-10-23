"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Check, Copy } from "lucide-react";
import type { HighlighterCore } from "shiki/core";
import { cn } from "@/lib/cn";

let highlighterPromise: Promise<{ highlighter: HighlighterCore; light: string; dark: string }> | null =
  null;

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] = await Promise.all([
        import("shiki/core"),
        import("shiki/engine/javascript"),
      ]);
      const [lightModule, darkModule, jsModule, mdModule] = await Promise.all([
        import("shiki/themes/vitesse-light.mjs"),
        import("shiki/themes/vitesse-dark.mjs"),
        import("shiki/langs/javascript.mjs"),
        import("shiki/langs/markdown.mjs"),
      ]);
      const light = (lightModule.default ?? lightModule) as { name: string };
      const dark = (darkModule.default ?? darkModule) as { name: string };
      const highlighter = await createHighlighterCore({
        themes: [light as never, dark as never],
        langs: [(jsModule.default ?? jsModule) as never, (mdModule.default ?? mdModule) as never],
        engine: createJavaScriptRegexEngine(),
      });
      return { highlighter, light: light.name, dark: dark.name };
    })();
  }
  return highlighterPromise;
}

export function CodeBlock({
  code,
  lang = "markdown",
  className,
  label,
}: {
  code: string;
  lang?: "markdown" | "javascript";
  className?: string;
  label?: string;
}) {
  const { resolvedTheme } = useTheme();
  const [html, setHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    let alive = true;
    getHighlighter()
      .then(({ highlighter, light, dark }) => {
        if (!alive) return;
        setHtml(
          highlighter.codeToHtml(code, {
            lang,
            theme: isDark ? dark : light,
          }),
        );
      })
      .catch(() => setHtml(null));
    return () => {
      alive = false;
    };
  }, [code, lang, isDark]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard can be blocked; the code is still readable */
    }
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg bg-bg-soft/60 shadow-[inset_0_0_0_1px_var(--line)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
        <span className="font-mono text-[0.55rem] tracking-[0.18em] text-ink-faint uppercase">
          {label ?? lang}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label="Salin kode"
          className="flex items-center gap-1 font-mono text-[0.55rem] tracking-[0.12em] text-ink-faint uppercase transition-colors hover:text-ink"
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "tersalin" : "salin"}
        </button>
      </div>
      {html ? (
        <div
          className="code-body scroll-thin overflow-x-auto px-3.5 py-3 text-[0.74rem] leading-[1.65] [&_pre]:bg-transparent! [&_pre]:p-0 [&_code]:bg-transparent!"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="scroll-thin overflow-x-auto px-3.5 py-3 font-mono text-[0.74rem] leading-[1.65] text-ink-soft">
          {code}
        </pre>
      )}
    </div>
  );
}
