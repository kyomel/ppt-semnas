import type { ComponentType } from "react";
import { IntroSlide, OverviewSlide } from "./act-0-opening";
import {
  GlossarySlide,
  HallucinationSlide,
  PredictionSlide,
  TimelineSlide,
} from "./act-1-foundations";
import {
  IndonesiaSlide,
  LiteracyDefinitionSlide,
  SkillsSlide,
  UsageSlide,
} from "./act-2-reality";
import {
  DomainsSlide,
  LadderSlide,
  TrapsSlide,
} from "./act-3-mental-models";
import {
  AgencySlide,
  ApprenticeSlide,
  FrictionSlide,
  JaggedFrontierSlide,
  VerificationSlide,
} from "./act-4-mindset";
import {
  AgentAnatomySlide,
  AutonomyGatesSlide,
  CaseStudySlide,
  PromptAnatomySlide,
} from "./act-5-skill";
import { MythsSlide, PlanSlide, RulesSlide } from "./act-6-action";
import { QaSlide, RecapSlide } from "./act-7-closing";

export type SlideMeta = {
  id: string;
  section: string;
  short: string;
  Component: ComponentType<{ index: number }>;
};

export const slides: SlideMeta[] = [
  { id: "intro", section: "Pembuka", short: "Judul dan pembuka", Component: IntroSlide },
  {
    id: "overview",
    section: "Pembuka",
    short: "Agenda enam bagian",
    Component: OverviewSlide,
  },

  {
    id: "prediction",
    section: "Fondasi",
    short: "AI itu mesin prediksi",
    Component: PredictionSlide,
  },
  {
    id: "hallucination",
    section: "Fondasi",
    short: "Kenapa AI bisa salah dengan yakin",
    Component: HallucinationSlide,
  },
  {
    id: "glossary",
    section: "Fondasi",
    short: "Tujuh istilah dasar",
    Component: GlossarySlide,
  },
  {
    id: "timeline",
    section: "Fondasi",
    short: "Sepekan di AI, 22-28 Oktober",
    Component: TimelineSlide,
  },

  {
    id: "indonesia",
    section: "Realita",
    short: "Literasi belum cukup, pemakaian belum merata",
    Component: IndonesiaSlide,
  },
  {
    id: "usage",
    section: "Realita",
    short: "Untuk apa AI benar-benar dipakai",
    Component: UsageSlide,
  },
  {
    id: "skills",
    section: "Realita",
    short: "Skill 2030 dan pelatihan",
    Component: SkillsSlide,
  },
  {
    id: "literacy-definition",
    section: "Realita",
    short: "Literasi AI bukan tool use",
    Component: LiteracyDefinitionSlide,
  },

  {
    id: "domains",
    section: "Model mental",
    short: "Empat domain literasi AI",
    Component: DomainsSlide,
  },
  {
    id: "ladder",
    section: "Model mental",
    short: "Tangga lima level dan posisimu",
    Component: LadderSlide,
  },
  {
    id: "traps",
    section: "Model mental",
    short: "Empat jebakan level awam",
    Component: TrapsSlide,
  },

  {
    id: "apprentice",
    section: "Mindset",
    short: "Rekan magang, bukan oracle",
    Component: ApprenticeSlide,
  },
  {
    id: "verification",
    section: "Mindset",
    short: "Verifikasi adalah pekerjaan",
    Component: VerificationSlide,
  },
  {
    id: "friction",
    section: "Mindset",
    short: "Friksi kognitif itu fitur",
    Component: FrictionSlide,
  },
  {
    id: "agency",
    section: "Mindset",
    short: "Kamu yang memutuskan",
    Component: AgencySlide,
  },
  {
    id: "jagged",
    section: "Mindset",
    short: "Frontier bergerigi",
    Component: JaggedFrontierSlide,
  },

  {
    id: "prompt-anatomy",
    section: "Skill",
    short: "Empat lapis permintaan",
    Component: PromptAnatomySlide,
  },
  {
    id: "agent-anatomy",
    section: "Skill",
    short: "Anatomi agent",
    Component: AgentAnatomySlide,
  },
  {
    id: "autonomy-gates",
    section: "Skill",
    short: "Otonomi butuh gerbang",
    Component: AutonomyGatesSlide,
  },
  {
    id: "case-study",
    section: "Skill",
    short: "Studi kasus 60 menit",
    Component: CaseStudySlide,
  },

  {
    id: "rules",
    section: "Aksi",
    short: "Tiga lapis aturan main",
    Component: RulesSlide,
  },
  {
    id: "myths",
    section: "Aksi",
    short: "Empat mitos dan faktanya",
    Component: MythsSlide,
  },
  {
    id: "plan",
    section: "Aksi",
    short: "Rencana 30 hari",
    Component: PlanSlide,
  },

  {
    id: "recap",
    section: "Rangkuman",
    short: "Enam langkah yang bisa diulang",
    Component: RecapSlide,
  },
  {
    id: "qa",
    section: "Penutup",
    short: "Tanya jawab dan kontak",
    Component: QaSlide,
  },
];
