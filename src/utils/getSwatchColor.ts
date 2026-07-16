const STANDARD_COLORS: Record<string, string> = {
  black: "#111111",
  white: "#FFFFFF",
  gray: "#71717a",
  grey: "#71717a",
  "off-white": "#F7F4EF",
  cream: "#FFFDD0",
  beige: "#F5F5DC",
  khaki: "#C3B091",
  brown: "#5C4033",
  red: "#EF4444",
  blue: "#3B82F6",
  yellow: "#FBBF24",
  green: "#22C55E",
  orange: "#F97316",
  purple: "#A855F7",
  pink: "#EC4899",
  navy: "#1E3A8A",
  "navy blue": "#1E3A8A",
  olive: "#3F6212",
  "olive green": "#3F6212",
  maroon: "#7F1D1D",
  burgundy: "#800020",
  teal: "#0F766E",
  cyan: "#06B6D4",
  tan: "#D2B48C",
  sand: "#E6D7B9",
  charcoal: "#36454F",
  lavender: "#E6E6FA"
};

export function getSwatchColor(colorName: string, colorHex?: string) {
  if (colorHex) return colorHex;

  const cleanedName = colorName.toLowerCase().trim();
  const savedColor = STANDARD_COLORS[cleanedName];

  return savedColor || "#D4D4D8";
}
