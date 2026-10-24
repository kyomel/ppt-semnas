export const deck = {
  title: "Meningkatkan Literasi dan Mindset Pemahaman AI",
  subtitle: "Dari Awam ke Advanced",
  speaker: "Michael Stevan Lapandio",
  speakerRole: "Software Engineer (Orbiitum)",
  event: "SEMNAS AMIKOM 2026",
  date: "2026-10-23",
  dateLabel: "23 Oktober 2026",
  durationMinutes: 60,
  location: "Yogyakarta",
  handle: "@kyomel",
} as const;

export type Section = {
  id: string;
  label: string;
  blurb: string;
  firstSlide: number;
  slides: number;
};

export const sections: Section[] = [
  {
    id: "fondasi",
    label: "Fondasi",
    blurb: "Apa yang sebenarnya sedang kamu ajak bicara",
    firstSlide: 3,
    slides: 4,
  },
  {
    id: "realita",
    label: "Realita",
    blurb: "Posisi Indonesia dan dunia, dengan angka",
    firstSlide: 7,
    slides: 4,
  },
  {
    id: "model-mental",
    label: "Model mental",
    blurb: "Kerangka literasi dan tangga lima level",
    firstSlide: 11,
    slides: 3,
  },
  {
    id: "mindset",
    label: "Mindset",
    blurb: "Lima keyakinan yang membedakan awam dan advanced",
    firstSlide: 14,
    slides: 5,
  },
  {
    id: "skill",
    label: "Skill",
    blurb: "Dari chat ke sistem yang berjalan sendiri",
    firstSlide: 19,
    slides: 4,
  },
  {
    id: "aksi",
    label: "Aksi",
    blurb: "Kebijakan, mitos, dan rencana 30 hari",
    firstSlide: 23,
    slides: 3,
  },
] as const;
