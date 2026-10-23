export const ease = [0.22, 1, 0.36, 1] as const;

export const spring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 30,
  mass: 0.8,
};

export const springSoft = {
  type: "spring" as const,
  stiffness: 140,
  damping: 22,
  mass: 1,
};

export const revealDuration = 0.62;
export const staggerStep = 0.028;

export type Palette = {
  bg: string;
  ink: string;
  accent: string;
  accent2: string;
  accent3: string;
  line: string;
};

/** Palette mirrored for three.js, which cannot read CSS variables cheaply. */
export const scenePalette: Record<"light" | "dark", Palette> = {
  light: {
    bg: "#f7f3ec",
    ink: "#14110e",
    accent: "#d9481c",
    accent2: "#146b5a",
    accent3: "#a67c12",
    line: "#14110e",
  },
  dark: {
    bg: "#0b0a09",
    ink: "#f4efe6",
    accent: "#ff6a3d",
    accent2: "#4fd6b4",
    accent3: "#e8c559",
    line: "#f4efe6",
  },
} as const;

export type SceneTheme = keyof typeof scenePalette;
