"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  CircleAlert,
  Database,
  DoorOpen,
  FileCheck2,
  GitBranch,
  KeyRound,
  LayoutTemplate,
  Library,
  Receipt,
  Ruler,
  ScrollText,
  Target,
  Timer,
  Wallet,
  Workflow,
  Wrench,
} from "lucide-react";
import { SlideShell, Badge } from "@/components/deck/slide-shell";
import { SceneCanvas } from "@/components/three/scene-host";
import { Reveal } from "@/components/motion/containers";
import { CodeBlock } from "@/components/ui/code-block";
import { cn } from "@/lib/cn";
import { ease } from "@/config/theme";

const LAYERS = [
  {
    id: "tujuan",
    icon: Target,
    name: "Tujuan",
    line: "Apa yang harus selesai, dan untuk siapa.",
    prompt: "Tujuan: rangkum 12 keluhan pelanggan minggu ini untuk kepala layanan, agar ia bisa memutuskan prioritas perbaikan.",
  },
  {
    id: "konteks",
    icon: Library,
    name: "Konteks",
    line: "Apa yang model tidak tahu dan perlu kamu berikan.",
    prompt: "Konteks: pelanggan adalah pengguna aplikasi mobile. Keluhan dikumpulkan dari chat dan email, sebagian tidak lengkap.",
  },
  {
    id: "batasan",
    icon: Ruler,
    name: "Batasan",
    line: "Apa yang tidak boleh, sepanjang apa, dan dari mana sumbernya.",
    prompt: "Batasan: jangan mengarang penyebab teknis. Tandai keluhan yang datanya tidak lengkap. Maksimal 150 kata.",
  },
  {
    id: "format",
    icon: LayoutTemplate,
    name: "Format",
    line: "Bentuk keluaran yang bisa langsung kamu pakai.",
    prompt: "Format: tiga kelompok masalah, tiap kelompok berisi jumlah keluhan, satu contoh kutipan, dan tingkat keyakinan (tinggi/sedang/rendah).",
  },
] as const;

export function PromptAnatomySlide({ index }: { index: number }) {
  const [on, setOn] = useState<Record<string, boolean>>({
    tujuan: true,
    konteks: false,
    batasan: false,
    format: false,
  });
  const activeCount = Object.values(on).filter(Boolean).length;

  return (
    <SlideShell
      index={index}
      eyebrow="Skill · 1 dari 6"
      title="Anatomi permintaan yang baik: empat lapis"
      lead="Prompt bagus bukan yang panjang, tapi yang memuat informasi terkecil yang mengubah jawaban."
      source="Sumber: Anthropic, “Effective context engineering for AI agents” (Sep 2025); Anthropic, prompt engineering best practices (Nov 2025)."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="flex flex-col justify-center gap-2">
          {LAYERS.map((layer) => {
            const Icon = layer.icon;
            const isOn = on[layer.id];
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setOn((prev) => ({ ...prev, [layer.id]: !prev[layer.id] }))}
                className={cn(
                  "flex items-start gap-3 rounded-lg border-l-2 py-2.5 pr-3 pl-3.5 text-left transition-all duration-300",
                  isOn
                    ? "border-accent bg-accent-soft/40"
                    : "border-transparent hover:border-line-strong hover:bg-ink/[0.03]",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md transition-colors",
                    isOn ? "bg-accent text-bg" : "bg-ink/5 text-ink-soft",
                  )}
                >
                  <Icon size={14} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[0.86rem] font-medium">{layer.name}</span>
                    <span
                      className={cn(
                        "font-mono text-[0.48rem] tracking-[0.14em] uppercase",
                        isOn ? "text-accent" : "text-ink-faint",
                      )}
                    >
                      {isOn ? "aktif" : "mati"}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-[0.74rem] leading-snug text-ink-soft">
                    {layer.line}
                  </span>
                </span>
              </button>
            );
          })}

          <div className="mt-1 flex items-center gap-3 rounded-lg bg-bg-soft/60 px-3.5 py-2.5 shadow-[inset_0_0_0_1px_var(--line)]">
            <span className="font-mono text-[0.52rem] tracking-[0.16em] text-ink-faint uppercase">
              kelengkapan
            </span>
            <div className="flex flex-1 gap-1">
              {LAYERS.map((layer) => (
                <span
                  key={layer.id}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors duration-300",
                    on[layer.id] ? "bg-accent" : "bg-ink/10",
                  )}
                />
              ))}
            </div>
            <span className="font-mono text-[0.62rem] text-ink tabular">
              {activeCount}/4
            </span>
          </div>
        </div>

        <div className="flex min-h-0 flex-col justify-center">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
              prompt yang tersusun
            </span>
            <Badge tone={activeCount >= 3 ? "accent2" : "neutral"}>
              {activeCount >= 4
                ? "lengkap"
                : activeCount >= 3
                  ? "cukup"
                  : activeCount >= 2
                    ? "lemah"
                    : "terlalu tipis"}
            </Badge>
          </div>

          <div className="mt-2 rounded-xl bg-bg-soft/60 p-4 shadow-[inset_0_0_0_1px_var(--line)]">
            <div className="space-y-2.5">
              {LAYERS.map((layer) => {
                const isOn = on[layer.id];
                return (
                  <div
                    key={layer.id}
                    className={cn(
                      "flex gap-2.5 transition-opacity duration-300",
                      isOn ? "opacity-100" : "opacity-35",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1.5 h-1 w-1 shrink-0 rounded-full",
                        isOn ? "bg-accent" : "bg-ink-faint",
                      )}
                    />
                    <div className="min-w-0">
                      <p className="font-mono text-[0.48rem] tracking-[0.16em] text-ink-faint uppercase">
                        {layer.name}
                      </p>
                      <p className="mt-0.5 font-mono text-[0.7rem] leading-relaxed text-ink-soft">
                        {isOn ? layer.prompt : "belum diisi"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-2 text-[0.72rem] leading-snug text-ink-faint">
            Empat lapis ini sama untuk chat, dokumen, maupun agent. Yang berubah
            hanya siapa yang mengisi: kamu, atau sistemnya.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}

const PATTERNS = [
  {
    id: "peran",
    label: "Peran + audiens",
    note: "Model menyesuaikan kosakata dan kedalaman. Tanpa ini, ia memilih rata-rata.",
    weak: "Tolong tulis ulang paragraf ini supaya lebih bagus.",
    code: `Kamu editor yang menulis untuk kepala sekolah
yang tidak punya latar belakang teknis.

Tulis ulang paragraf ini supaya bisa dipahami
tanpa istilah teknis, maksimal 80 kata.`,
  },
  {
    id: "contoh",
    label: "Satu contoh",
    note: "Satu contoh konkret mengalahkan tiga paragraf penjelasan tentang gaya.",
    weak: "Buat ringkasan dari 12 keluhan ini.",
    code: `Tulis ringkasan dengan gaya seperti contoh ini:

> Tiga keluhan tentang login. Dua sudah diperbaiki,
> satu masih menunggu data dari tim server.

Sekarang ringkas 12 keluhan berikut dengan gaya sama.`,
  },
  {
    id: "format",
    label: "Format keluaran",
    note: "Kalau kamu tidak menyebut bentuknya, kamu akan menyunting ulang.",
    weak: "Beri saya ringkasan yang rapi.",
    code: `Keluarkan tepat dalam format ini, tanpa basa-basi:

MASALAH: <satu baris>
JUMLAH: <angka>
KEYAKINAN: <tinggi|sedang|rendah>`,
  },
  {
    id: "ragu",
    label: "Tandai ketidakpastian",
    note: "Meminta penanda membuat model berhenti mengarang untuk menutup celah.",
    weak: "Pastikan jawabannya akurat.",
    code: `Kalau data tidak cukup untuk menyimpulkan,
tulis "DATA KURANG" dan sebutkan data apa
yang kamu butuhkan. Jangan menebak.`,
  },
] as const;

export function PromptPatternsSlide({ index }: { index: number }) {
  const [active, setActive] = useState(0);
  const pattern = PATTERNS[active];

  return (
    <SlideShell
      index={index}
      eyebrow="Skill · 2 dari 6"
      title="Empat pola yang tahan banting"
      lead="Pola ini jalan di model apa pun. Yang rapuh: prompt yang bergantung pada satu versi model."
      source="Sumber: prinsip “jelaskan persis apa yang kamu ingin lihat” (Anthropic, Nov 2025) dan few-shot prompting sebagai teknik dasar (Anthropic, Sep 2025)."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="flex min-h-0 flex-col justify-center">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {PATTERNS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-full px-2.5 py-1.5 text-[0.66rem] transition-colors",
                  i === active
                    ? "bg-ink text-bg"
                    : "bg-ink/5 text-ink-soft hover:bg-ink/10",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <motion.div
            key={pattern.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease }}
          >
            <CodeBlock code={pattern.code} lang="markdown" label="pola" />
          </motion.div>
        </div>

        <div className="flex flex-col justify-center gap-3">
          <div className="rounded-xl border border-line p-3.5">
            <p className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
              versi lemah
            </p>
            <p className="mt-1.5 font-mono text-[0.74rem] leading-relaxed text-ink-faint">
              “{pattern.weak}”
            </p>
          </div>

          <div>
            <p className="font-mono text-[0.52rem] tracking-[0.18em] text-accent uppercase">
              kenapa pola ini bekerja
            </p>
            <p className="mt-1.5 text-[0.84rem] leading-relaxed text-ink-soft">
              {pattern.note}
            </p>
          </div>

          <div className="rounded-xl bg-bg-soft/60 p-3.5 shadow-[inset_0_0_0_1px_var(--line)]">
            <p className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
              yang biasanya gagal
            </p>
            <ul className="mt-2 space-y-1.5">
              {[
                "Instruksi bertumpuk dalam satu paragraf panjang.",
                "Meminta “yang terbaik” tanpa menyebut kriteria.",
                "Menambah aturan baru di setiap percobaan tanpa membuang yang lama.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CircleAlert size={11} className="mt-0.5 shrink-0 text-ink-faint" />
                  <span className="text-[0.72rem] leading-snug text-ink-faint">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-[0.72rem] leading-snug text-ink-faint">
            Simpan yang bekerja. Prompt yang berhasil tiga kali lebih berharga
            daripada sepuluh prompt yang belum pernah diuji.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}

const AGENT_PARTS = [
  {
    name: "Putuskan",
    line: "Model membaca tujuan dan memilih langkah berikutnya.",
    icon: GitBranch,
  },
  {
    name: "Lakukan",
    line: "Aksi nyata: panggil API, buka browser, jalankan kode, tulis file.",
    icon: Wrench,
  },
  {
    name: "Amati",
    line: "Hasil aksi masuk kembali sebagai konteks. Lalu loop diulang.",
    icon: Workflow,
  },
] as const;

export function AgentAnatomySlide({ index }: { index: number }) {
  const [active, setActive] = useState(0);
  const [steps, setSteps] = useState(5);
  const reliability = Math.pow(0.9, steps) * 100;

  return (
    <SlideShell
      index={index}
      eyebrow="Skill · 3 dari 6"
      title="Dari chat ke sistem: anatomi agent"
      lead="Agent bukan model yang lebih pintar, tapi model yang diberi alat, memori, dan izin untuk mengulang langkah."
      source="Sumber: definisi loop agentic (2026); dimensi otonomi dan kerapuhan horizon panjang, Springer, Cognitive Computation (Agu 2026). Perhitungan peluang di bawah adalah ilustrasi aritmetika, bukan data."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="relative min-h-0">
          <SceneCanvas
            kind="agent"
            active={active}
            level={steps / 10}
            onPick={setActive}
            camera={[0, 0, 6.8]}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-1 flex justify-center">
            <p className="font-mono text-[0.54rem] tracking-[0.16em] text-ink-faint uppercase">
              klik simpul untuk perannya
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2">
          {AGENT_PARTS.map((part, i) => {
            const Icon = part.icon;
            const isActive = i === active;
            return (
              <button
                key={part.name}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "flex items-start gap-3 rounded-lg border-l-2 py-2.5 pr-3 pl-3.5 text-left transition-all duration-300",
                  isActive
                    ? "border-accent bg-accent-soft/40"
                    : "border-transparent hover:border-line-strong hover:bg-ink/[0.03]",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md transition-colors",
                    isActive ? "bg-accent text-bg" : "bg-ink/5 text-ink-soft",
                  )}
                >
                  <Icon size={14} />
                </span>
                <span>
                  <span className="text-[0.86rem] font-medium">{part.name}</span>
                  <span className="mt-0.5 block text-[0.74rem] leading-snug text-ink-soft">
                    {part.line}
                  </span>
                </span>
              </button>
            );
          })}

          <div className="mt-1 rounded-xl bg-bg-soft/60 p-3.5 shadow-[inset_0_0_0_1px_var(--line)]">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[0.52rem] tracking-[0.16em] text-ink-faint uppercase">
                panjang rantai
              </span>
              <span className="font-mono text-[0.7rem] text-accent tabular">
                {steps} langkah
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={12}
              value={steps}
              onChange={(event) => setSteps(Number(event.target.value))}
              aria-label="Jumlah langkah agent"
              className="mt-2 w-full"
            />
            <div className="mt-2 flex items-end justify-between gap-3">
              <p className="text-[0.72rem] leading-snug text-ink-soft">
                Kalau tiap langkah 90% benar, rantai {steps} langkah benar semua
                dengan peluang:
              </p>
              <span className="font-display text-[1.5rem] leading-none text-accent tabular">
                {reliability.toFixed(0)}%
              </span>
            </div>
            <p className="mt-1.5 border-t border-line pt-1.5 text-[0.68rem] leading-snug text-ink-faint">
              Ini sebabnya agent rapuh di horizon panjang: kesalahan kecil beruntun
              jadi kegagalan total. Gerbang manusia bukan kemewahan, tapi syarat.
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

const ACTIONS = [
  { label: "Kirim email ke 200 pelanggan", risk: "tinggi" },
  { label: "Hapus 3 file arsip lama", risk: "tinggi" },
  { label: "Bayar tagihan vendor", risk: "tinggi" },
] as const;

const POLICIES = [
  {
    id: "open",
    label: "Izinkan semua",
    tone: "accent3",
    outcome:
      "Agent menyelesaikan semuanya dalam 40 detik. Termasuk mengirim email dengan satu nama pelanggan yang salah, dan menghapus file yang ternyata masih dipakai.",
    verdict: "Cepat, tapi kamu menanggung akibat yang tidak kamu lihat.",
  },
  {
    id: "gated",
    label: "Gerbang untuk aksi berisiko",
    tone: "accent2",
    outcome:
      "Agent menyiapkan tiga aksi, menandainya berisiko, dan menunggu. Kamu menyetujui dua, membatalkan satu karena nama pelanggan keliru.",
    verdict: "Sedikit lebih lambat, tapi setiap akibat sudah kamu lihat.",
  },
  {
    id: "review",
    label: "Tinjau semua langkah",
    tone: "neutral",
    outcome:
      "Agent berhenti di setiap langkah. Kamu menyetujui 47 kali untuk pekerjaan yang seharusnya butuh 3 keputusan.",
    verdict: "Aman, tapi kamu menjadi tombol, bukan pengarah.",
  },
] as const;

export function AutonomyGatesSlide({ index }: { index: number }) {
  const [policy, setPolicy] = useState("gated");
  const chosen = POLICIES.find((item) => item.id === policy) ?? POLICIES[1];

  return (
    <SlideShell
      index={index}
      eyebrow="Skill · 4 dari 6"
      title="Otonomi butuh gerbang, bukan kepercayaan"
      lead="Agent paling maju pun meminta izin sebelum membayar atau menghapus, karena akibatnya tidak bisa ditarik."
      source="Sumber: Anthropic, “Introducing Claude Duet” (21 Okt 2026): meminta persetujuan sebelum kirim pesan, bayar, tanda tangan, atau hapus; research preview, baru di AS. Dimensi decision authority: Springer (2026). Hasil simulasi di kanan adalah ilustrasi."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="flex flex-col justify-center gap-2">
          <p className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
            tugas yang diserahkan ke agent
          </p>
          {ACTIONS.map((action) => (
            <div
              key={action.label}
              className="flex items-center justify-between rounded-lg bg-bg-soft/50 px-3.5 py-2.5 shadow-[inset_0_0_0_1px_var(--line)]"
            >
              <span className="text-[0.8rem]">{action.label}</span>
              <Badge tone="accent3">{action.risk}</Badge>
            </div>
          ))}

          <p className="mt-2 font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
            pilih kebijakan
          </p>
          <div className="flex flex-col gap-1.5">
            {POLICIES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPolicy(item.id)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3.5 py-2 text-left text-[0.78rem] transition-colors",
                  policy === item.id
                    ? "bg-ink text-bg"
                    : "bg-ink/5 text-ink-soft hover:bg-ink/10",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    policy === item.id ? "bg-bg" : "bg-transparent",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <motion.div
            key={policy}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease }}
            className={cn(
              "rounded-xl p-4",
              chosen.tone === "accent2"
                ? "bg-accent-2-soft/60 shadow-[inset_0_0_0_1.5px_var(--accent-2)]"
                : chosen.tone === "accent3"
                  ? "bg-accent-3-soft/60 shadow-[inset_0_0_0_1.5px_var(--accent-3)]"
                  : "bg-bg-soft/60 shadow-[inset_0_0_0_1px_var(--line)]",
            )}
          >
            <div className="flex items-center gap-2">
              <Wallet size={13} className="text-ink-soft" />
              <p className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
                hasil simulasi
              </p>
            </div>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-soft">
              {chosen.outcome}
            </p>
            <p className="mt-2 border-t border-line pt-2 text-[0.76rem] font-medium leading-snug">
              {chosen.verdict}
            </p>
          </motion.div>

          <div className="mt-2.5 flex items-start gap-2 rounded-lg border border-line px-3.5 py-2.5">
            <Timer size={12} className="mt-0.5 shrink-0 text-accent" />
            <p className="text-[0.72rem] leading-snug text-ink-soft">
              Gerbang yang baik punya tiga hal: aksi mana yang berisiko, siapa yang
              menyetujui, dan bagaimana membatalkannya.
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

const GATES = [
  {
    icon: Database,
    name: "Gerbang data",
    line: "Jangan masukkan rahasia, data pribadi, atau kontrak ke tool yang tidak jelas penyimpanannya.",
    fail: "Menempel data pelanggan ke chatbot gratis.",
  },
  {
    icon: FileCheck2,
    name: "Gerbang sumber",
    line: "Setiap klaim penting harus punya asal yang bisa dibuka. Tanpa sumber, anggap draf.",
    fail: "Mengutip angka dari AI tanpa melacak asalnya.",
  },
  {
    icon: KeyRound,
    name: "Gerbang izin",
    line: "Aksi yang tidak bisa dibatalkan butuh persetujuan manusia: kirim, hapus, bayar, publikasi.",
    fail: "Memberi agent akses penuh ke email dan file.",
  },
  {
    icon: Receipt,
    name: "Gerbang biaya",
    line: "Tetapkan batas token, waktu, dan jumlah panggilan per tugas. Lalu pantau.",
    fail: "Loop yang berjalan semalam dan menghabiskan kuota.",
  },
  {
    icon: ScrollText,
    name: "Gerbang jejak",
    line: "Catat apa yang diminta, apa yang dilakukan, dan apa hasilnya. Tanpa log, tidak ada perbaikan.",
    fail: "Tidak tahu versi prompt mana yang menghasilkan kesalahan.",
  },
] as const;

export function FiveGatesSlide({ index }: { index: number }) {
  const [active, setActive] = useState(1);

  return (
    <SlideShell
      index={index}
      eyebrow="Skill · 5 dari 6"
      title="Alur kerja aman: lima gerbang"
      lead="Lima pemeriksaan tanpa alat baru. Cukup kesepakatan dan satu tempat mencatat."
      source="Sumber: sintesis dari praktik context engineering (Anthropic, 2025), kasus agent produksi (2026), dan temuan verifikasi (Blanchard dkk., 2026)."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="flex flex-col justify-center gap-1.5">
          {GATES.map((gate, i) => {
            const Icon = gate.icon;
            const isActive = i === active;
            return (
              <button
                key={gate.name}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-300",
                  isActive
                    ? "bg-bg-soft/80 shadow-[inset_0_0_0_1.5px_var(--accent)]"
                    : "hover:bg-ink/[0.03]",
                )}
              >
                <span
                  className={cn(
                    "grid h-7 w-7 shrink-0 place-items-center rounded-md transition-colors",
                    isActive ? "bg-accent text-bg" : "bg-ink/5 text-ink-soft",
                  )}
                >
                  <Icon size={13} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.84rem] font-medium">{gate.name}</span>
                  <span
                    className={cn(
                      "mt-0.5 block text-[0.72rem] leading-snug transition-colors",
                      isActive ? "text-ink-soft" : "text-ink-faint",
                    )}
                  >
                    {gate.line}
                  </span>
                </span>
                <span className="font-mono text-[0.5rem] text-ink-faint tabular">
                  0{i + 1}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col justify-center gap-2.5">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, ease }}
            className="rounded-xl bg-bg-soft/60 p-4 shadow-[inset_0_0_0_1px_var(--line)]"
          >
            <div className="flex items-center gap-2">
              <DoorOpen size={13} className="text-accent" />
              <p className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
                yang diperiksa
              </p>
            </div>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-soft">
              {GATES[active].line}
            </p>
          </motion.div>

          <div className="rounded-xl border border-line p-4">
            <p className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
              contoh kegagalan
            </p>
            <p className="mt-2 text-[0.78rem] leading-relaxed text-ink-soft">
              {GATES[active].fail}
            </p>
          </div>

          <div className="flex items-center gap-2.5 rounded-lg bg-accent-soft/40 px-3.5 py-2.5">
            <Reveal delay={0.1} y={0} blur={false}>
              <p className="text-[0.72rem] leading-snug text-ink-soft">
                Kelima gerbang ini muat dalam satu halaman SOP. Yang mahal bukan
                menulisnya, tapi tidak punya.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

const PHASES = [
  {
    time: "0-10",
    name: "Pilih satu tugas",
    output: "Satu tugas berulang yang kamu kerjakan minimal sekali seminggu.",
    pitfall: "Memilih tugas yang terlalu besar, lalu berhenti di tengah.",
  },
  {
    time: "10-25",
    name: "Tulis instruksi",
    output: "Empat lapis: tujuan, konteks, batasan, format.",
    pitfall: "Menulis instruksi untuk dirimu sendiri, bukan untuk orang baru.",
  },
  {
    time: "25-40",
    name: "Uji lima kasus",
    output: "Lima input nyata, termasuk satu yang jelek dan satu yang aneh.",
    pitfall: "Menguji dengan contoh yang sudah rapi. Hasilnya terlihat bagus, aslinya tidak.",
  },
  {
    time: "40-50",
    name: "Pasang gerbang",
    output: "Satu titik pemeriksaan manusia sebelum hasil keluar.",
    pitfall: "Menaruh gerbang di tempat yang membuat orang melewatinya.",
  },
  {
    time: "50-60",
    name: "Jadwalkan",
    output: "Alur berjalan otomatis, dengan log dan batas biaya.",
    pitfall: "Menjalankan otomatis tanpa pernah membaca lognya.",
  },
] as const;

export function CaseStudySlide({ index }: { index: number }) {
  const [active, setActive] = useState(2);
  const phase = PHASES[active];

  return (
    <SlideShell
      index={index}
      eyebrow="Skill · 6 dari 6"
      title="Studi kasus: 60 menit membuat satu asisten"
      lead="Contoh: merangkum 20 chat pelanggan jadi satu laporan pagi. Kecil, tapi mengembalikan jam kerja."
      source="Sumber: alur kerja disusun dari praktik context engineering (Anthropic, 2025) dan pola gerbang pada slide sebelumnya. Contoh kasus, bukan studi terukur."
    >
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-3">
        <div className="relative">
          <div className="absolute top-[0.6rem] right-0 left-0 h-px bg-line" />
          <div className="relative grid grid-cols-5 gap-2">
            {PHASES.map((item, i) => {
              const isActive = i === active;
              const isPast = i < active;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActive(i)}
                  className="group flex flex-col items-start gap-2 text-left"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-3 w-3 rounded-full border-2 transition-colors duration-300",
                        isActive
                          ? "border-accent bg-accent"
                          : isPast
                            ? "border-accent-2 bg-accent-2"
                            : "border-line-strong bg-bg",
                      )}
                    />
                    <span
                      className={cn(
                        "font-mono text-[0.52rem] tracking-[0.12em] tabular transition-colors",
                        isActive ? "text-accent" : "text-ink-faint",
                      )}
                    >
                      {item.time} mnt
                    </span>
                  </span>
                  <span
                    className={cn(
                      "text-[0.78rem] leading-tight transition-colors",
                      isActive ? "font-medium text-ink" : "text-ink-soft",
                    )}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, ease }}
          className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2.5"
        >
          <div className="rounded-xl bg-bg-soft/60 p-4 shadow-[inset_0_0_0_1px_var(--line)]">
            <p className="font-mono text-[0.52rem] tracking-[0.18em] text-accent uppercase">
              keluaran fase ini
            </p>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-soft">
              {phase.output}
            </p>
          </div>
          <div className="rounded-xl border border-line p-4">
            <p className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
              kesalahan umum
            </p>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-soft">
              {phase.pitfall}
            </p>
          </div>
        </motion.div>

        <div className="flex items-center gap-3 rounded-lg bg-accent-soft/40 px-4 py-2.5">
          <Badge tone="accent">hasil</Badge>
          <p className="text-[0.76rem] leading-snug text-ink-soft">
            Setelah 60 menit: satu alur yang berjalan tiap pagi, satu log, satu
            gerbang. Bukan asisten yang sempurna, tapi satu jam yang kembali.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}
