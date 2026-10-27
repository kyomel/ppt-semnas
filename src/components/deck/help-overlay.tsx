"use client";

import { motion } from "motion/react";
import { X } from "lucide-react";
import { ease } from "@/config/theme";

const groups = [
  {
    title: "Navigasi",
    items: [
      ["→  Space  PageDown", "Slide berikutnya"],
      ["←  PageUp", "Slide sebelumnya"],
      ["Home  End", "Slide pertama / terakhir"],
      ["1-9 lalu Enter", "Lompat ke slide N"],
    ],
  },
  {
    title: "Tampilan",
    items: [
      ["F", "Masuk / keluar layar penuh"],
      ["Esc", "Ikhtisar slide"],
      ["T", "Ganti mode terang / gelap"],
      ["?", "Panel bantuan ini"],
    ],
  },
  {
    title: "Mouse",
    items: [
      ["Tombol ‹ ›", "Maju / mundur"],
      ["▦", "Ikhtisar slide"],
      ["Klik kartu", "Lompat ke slide"],
      ["Gulir di ikhtisar", "Telusuri semua slide"],
    ],
  },
];

export function HelpOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="absolute inset-0 z-50 grid place-items-center bg-bg/94 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-[min(64rem,90vw)] rounded-2xl bg-bg-soft/80 p-[clamp(1.75rem,2.8vw,2.6rem)] shadow-[inset_0_0_0_1px_var(--line)]"
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="font-mono text-[0.62rem] tracking-[0.26em] text-accent uppercase">
              Pintasan
            </p>
            <h2 className="mt-1 font-display text-[clamp(1.5rem,2vw,2rem)] leading-none">
              Kendali deck
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup bantuan"
            className="grid h-8 w-8 place-items-center rounded-md text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="mb-3 font-mono text-[0.62rem] tracking-[0.2em] text-ink-faint uppercase">
                {group.title}
              </p>
              <ul className="space-y-2.5">
                {group.items.map(([keys, label]) => (
                  <li key={keys} className="flex flex-col gap-0.5">
                    <kbd className="w-fit rounded border border-line bg-bg px-1.5 py-0.5 font-mono text-[0.62rem] text-ink">
                      {keys}
                    </kbd>
                    <span className="text-[0.72rem] leading-snug text-ink-soft">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
