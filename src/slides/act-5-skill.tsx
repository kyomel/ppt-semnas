"use client";

import { useState } from "react";
import {
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
  Workflow,
  Wrench,
} from "lucide-react";
import { SlideShell, Badge } from "@/components/deck/slide-shell";
import { SceneCanvas } from "@/components/three/scene-host";
import { Reveal } from "@/components/motion/containers";
import { cn } from "@/lib/cn";

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

const EFFECTS = [
  {
    title: "Jawaban terlalu umum",
    body: "Model tidak tahu kamu mengerjakan apa, untuk siapa, dan dalam bentuk apa. Hasilnya saran umum yang harus kamu tulis ulang.",
  },
  {
    title: "Arah benar, isi kabur",
    body: "Satu lapis memberi arah, tapi model masih menebak sisanya. Kamu akan lebih lama menyunting daripada menulis sendiri.",
  },
  {
    title: "Bisa dipakai, perlu disunting",
    body: "Sekitar separuh isi bisa dipakai, separuh lagi harus dirapikan.",
  },
  {
    title: "Hampir siap kirim",
    body: "Hampir semua yang model butuhkan sudah ada. Sisa pekerjaanmu: verifikasi klaim dan sesuaikan detail.",
  },
  {
    title: "Siap dipakai, tetap diverifikasi",
    body: "Tujuan, konteks, batasan, dan format selaras. Keluaran bisa langsung dipakai, kamu tinggal memeriksa sumbernya.",
  },
] as const;

export function PromptAnatomySlide({ index }: { index: number }) {
  const [on, setOn] = useState<Record<string, boolean>>({
    tujuan: true,
    konteks: true,
    batasan: true,
    format: true,
  });
  const activeCount = Object.values(on).filter(Boolean).length;
  const effect = EFFECTS[activeCount];

  return (
    <SlideShell
      index={index}
      eyebrow="Skill · 1 dari 4"
      title="Anatomi permintaan yang baik: empat lapis"
      lead="Prompt bagus bukan yang panjang, tapi yang memuat informasi terkecil yang mengubah jawaban."
      source="Sumber: Anthropic, “Effective context engineering for AI agents” (Sep 2025); Anthropic, prompt engineering best practices (Nov 2025). Efek pada jawaban adalah ilustrasi, bukan keluaran model sungguhan."
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
                  <span className="text-[0.86rem] font-medium">{layer.name}</span>
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

        <div className="flex min-h-0 flex-col justify-center gap-2.5">
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

          <div className="rounded-xl bg-bg-soft/60 p-3 shadow-[inset_0_0_0_1px_var(--line)]">
            <div className="space-y-2">
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

          <div
            className={cn(
              "rounded-xl px-4 py-3",
              activeCount >= 3
                ? "bg-accent-2-soft/60 shadow-[inset_0_0_0_1.5px_var(--accent-2)]"
                : "bg-accent-3-soft/60 shadow-[inset_0_0_0_1.5px_var(--accent-3)]",
            )}
          >
            <p className="font-mono text-[0.5rem] tracking-[0.16em] text-ink-faint uppercase">
              efek pada jawaban (ilustrasi)
            </p>
            <p className="mt-1 text-[0.82rem] font-medium">{effect.title}</p>
            <p className="mt-0.5 text-[0.74rem] leading-snug text-ink-soft">
              {effect.body}
            </p>
          </div>
        </div>
      </div>

      <Reveal delay={0.4} className="mt-3 shrink-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-3">
          <span className="font-mono text-[0.55rem] tracking-[0.2em] text-accent uppercase">
            Dua tambahan murah
          </span>
          {[
            "Beri satu contoh keluaran yang kamu mau",
            "Minta model menandai ketidakpastian: “kalau data kurang, tulis DATA KURANG”",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full bg-ink/[0.04] px-2.5 py-1 text-[0.7rem] text-ink-soft"
            >
              {item}
            </span>
          ))}
        </div>
      </Reveal>
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

const CHAIN_LENGTHS = [3, 6, 10] as const;

export function AgentAnatomySlide({ index }: { index: number }) {
  const [active, setActive] = useState(0);

  return (
    <SlideShell
      index={index}
      eyebrow="Skill · 2 dari 4"
      title="Dari chat ke sistem: anatomi agent"
      lead="Agent bukan model yang lebih pintar, tapi model yang diberi alat, memori, dan izin untuk mengulang langkah."
      source="Sumber: definisi loop agentic (2026); dimensi otonomi dan kerapuhan horizon panjang, Springer, Cognitive Computation (Agu 2026). Perhitungan peluang di bawah adalah ilustrasi aritmetika, bukan data."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="relative min-h-0">
          <SceneCanvas kind="agent" active={active} level={1} onPick={setActive} camera={[0, 0, 6.8]} />
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
            <span className="font-mono text-[0.52rem] tracking-[0.16em] text-ink-faint uppercase">
              kalau tiap langkah 90% benar, peluang rantai benar semua
            </span>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {CHAIN_LENGTHS.map((steps) => (
                <div key={steps}>
                  <p className="font-display text-[1.7rem] leading-none text-accent tabular">
                    {(Math.pow(0.9, steps) * 100).toFixed(0)}%
                  </p>
                  <p className="mt-1 text-[0.68rem] leading-snug text-ink-faint">
                    rantai {steps} langkah
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-2 border-t border-line pt-1.5 text-[0.68rem] leading-snug text-ink-faint">
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
  return (
    <SlideShell
      index={index}
      eyebrow="Skill · 3 dari 4"
      title="Otonomi butuh gerbang, bukan kepercayaan"
      lead="Agent paling maju pun meminta izin sebelum membayar atau menghapus, karena akibatnya tidak bisa ditarik."
      source="Sumber: Anthropic, “Introducing Claude Duet” (21 Okt 2026): meminta persetujuan sebelum kirim pesan, bayar, tanda tangan, atau hapus; research preview, baru di AS. Dimensi decision authority: Springer (2026). Lima gerbang: sintesis context engineering (Anthropic, 2025) dan Blanchard dkk. (2026). Hasil tiga kebijakan adalah simulasi ilustrasi."
    >
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
            tugas yang diserahkan ke agent
          </span>
          {ACTIONS.map((action) => (
            <span
              key={action.label}
              className="flex items-center gap-2 rounded-full bg-bg-soft/60 px-3 py-1.5 text-[0.76rem] shadow-[inset_0_0_0_1px_var(--line)]"
            >
              {action.label}
              <Badge tone="accent3">{action.risk}</Badge>
            </span>
          ))}
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-3 gap-2.5">
          {POLICIES.map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex flex-col rounded-xl p-4",
                item.tone === "accent2"
                  ? "bg-accent-2-soft/60 shadow-[inset_0_0_0_1.5px_var(--accent-2)]"
                  : item.tone === "accent3"
                    ? "bg-accent-3-soft/60 shadow-[inset_0_0_0_1.5px_var(--accent-3)]"
                    : "bg-bg-soft/60 shadow-[inset_0_0_0_1px_var(--line)]",
              )}
            >
              <p className="font-mono text-[0.54rem] tracking-[0.16em] text-ink uppercase">
                {item.label}
              </p>
              <p className="mt-2 text-[0.78rem] leading-relaxed text-ink-soft">
                {item.outcome}
              </p>
              <p className="mt-auto border-t border-line pt-2 text-[0.76rem] leading-snug font-medium">
                {item.verdict}
              </p>
            </div>
          ))}
        </div>

        <div className="shrink-0 rounded-xl border border-line p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-2 font-mono text-[0.52rem] tracking-[0.18em] text-accent uppercase">
              <DoorOpen size={12} /> lima gerbang alur kerja aman
            </span>
            <span className="text-[0.7rem] text-ink-faint">
              Muat dalam satu halaman SOP. Yang mahal bukan menulisnya, tapi tidak punya.
            </span>
          </div>
          <div className="mt-2.5 grid grid-cols-5 gap-3">
            {GATES.map((gate, i) => {
              const Icon = gate.icon;
              return (
                <div key={gate.name} className="flex items-start gap-2">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-accent-soft text-accent">
                    <Icon size={12} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.76rem] font-medium">
                      <span className="mr-1 font-mono text-[0.5rem] text-ink-faint tabular">
                        0{i + 1}
                      </span>
                      {gate.name}
                    </p>
                    <p className="mt-0.5 text-[0.64rem] leading-snug text-ink-faint">
                      {gate.line}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

const GATES = [
  {
    icon: Database,
    name: "Data",
    line: "Jangan masukkan rahasia atau data pribadi ke tool yang tidak jelas penyimpanannya.",
  },
  {
    icon: FileCheck2,
    name: "Sumber",
    line: "Setiap klaim penting harus punya asal yang bisa dibuka. Tanpa sumber, anggap draf.",
  },
  {
    icon: KeyRound,
    name: "Izin",
    line: "Aksi yang tidak bisa dibatalkan butuh persetujuan manusia: kirim, hapus, bayar, publikasi.",
  },
  {
    icon: Receipt,
    name: "Biaya",
    line: "Tetapkan batas token, waktu, dan jumlah panggilan per tugas. Lalu pantau.",
  },
  {
    icon: ScrollText,
    name: "Jejak",
    line: "Catat apa yang diminta, dilakukan, dan hasilnya. Tanpa log, tidak ada perbaikan.",
  },
] as const;;

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
  return (
    <SlideShell
      index={index}
      eyebrow="Skill · 4 dari 4"
      title="Studi kasus: 60 menit membuat satu asisten"
      lead="Contoh: merangkum 20 chat pelanggan jadi satu laporan pagi. Kecil, tapi mengembalikan jam kerja."
      source="Sumber: alur kerja disusun dari praktik context engineering (Anthropic, 2025) dan pola gerbang pada slide sebelumnya. Contoh kasus, bukan studi terukur."
    >
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-3">
        <div className="relative">
          <div className="absolute top-[0.4rem] right-0 left-0 h-px bg-line" />
          <div className="relative grid grid-cols-5 gap-2.5">
            {PHASES.map((item) => (
              <div key={item.name} className="flex flex-col gap-2">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full border-2 border-accent bg-accent" />
                  <span className="font-mono text-[0.52rem] tracking-[0.12em] text-accent tabular">
                    {item.time} mnt
                  </span>
                </span>
                <div className="flex flex-1 flex-col rounded-xl bg-bg-soft/60 p-3 shadow-[inset_0_0_0_1px_var(--line)]">
                  <p className="text-[0.84rem] leading-tight font-medium">{item.name}</p>
                  <p className="mt-2 font-mono text-[0.48rem] tracking-[0.16em] text-accent uppercase">
                    keluaran
                  </p>
                  <p className="mt-0.5 text-[0.72rem] leading-snug text-ink-soft">
                    {item.output}
                  </p>
                  <p className="mt-2 border-t border-line pt-2 font-mono text-[0.48rem] tracking-[0.16em] text-ink-faint uppercase">
                    kesalahan umum
                  </p>
                  <p className="mt-0.5 text-[0.72rem] leading-snug text-ink-soft">
                    {item.pitfall}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

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
