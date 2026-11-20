// Visual data for the CSS-only swatches of the four looks (not copy). Keyed by look id.
// TODO(owner): replace each swatch with a real screenshot once the demo site exists
// (add `screenshot` here and render it in LooksSection).

export type LookStyle = {
  bg: string;
  ink: string;
  accent: string;
  dots: string[];
  font: string;
  weight: number;
  screenshot?: { src: string; width: number; height: number; alt: string };
};

export const lookStyles: Record<string, LookStyle> = {
  tradice: {
    bg: "#f4ecda",
    ink: "#5a1826",
    accent: "#6e1f2f",
    dots: ["#f4ecda", "#6e1f2f", "#b38a3e"],
    font: 'Georgia, "Times New Roman", serif',
    weight: 700,
  },
  svetlo: {
    bg: "#ffffff",
    ink: "#1d4f86",
    accent: "#2b6cb0",
    dots: ["#ffffff", "#2b6cb0"],
    font: 'system-ui, -apple-system, "Segoe UI", Arial, sans-serif',
    weight: 600,
  },
  krajina: {
    bg: "#eef2e6",
    ink: "#2f4a22",
    accent: "#4a6b35",
    dots: ["#4a6b35", "#c8902e", "#eef2e6"],
    font: 'ui-rounded, "Arial Rounded MT Bold", "Nunito", system-ui, sans-serif',
    weight: 700,
  },
  liturgie: {
    bg: "#f6f5f2",
    ink: "#3a3a3a",
    accent: "#5d4e7a",
    dots: ["#5d4e7a", "#f6f5f2", "#3f6b3a"],
    font: 'Georgia, "Times New Roman", serif',
    weight: 400,
  },
};

/** Liturgical seasons: violet, white, green. */
export const seasonDots = ["#5d4e7a", "#ffffff", "#3f6b3a"];
