export const deck = {
  title: "Meningkatkan Literasi dan Mindset Pemahaman AI",
  subtitle: "Dari Awam ke Advanced",
  speaker: "Michael Stevan Lapandio",
  speakerRole: "Praktisi AI",
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
    slides: 5,
  },
  {
    id: "model-mental",
    label: "Model mental",
    blurb: "Kerangka literasi dan tangga lima level",
    firstSlide: 12,
    slides: 4,
  },
  {
    id: "mindset",
    label: "Mindset",
    blurb: "Enam keyakinan yang membedakan awam dan advanced",
    firstSlide: 16,
    slides: 6,
  },
  {
    id: "skill",
    label: "Skill",
    blurb: "Dari chat ke sistem yang berjalan sendiri",
    firstSlide: 22,
    slides: 6,
  },
  {
    id: "aksi",
    label: "Aksi",
    blurb: "Kebijakan, mitos, dan rencana 30 hari",
    firstSlide: 28,
    slides: 3,
  },
] as const;

export const totalSlides = 33;
