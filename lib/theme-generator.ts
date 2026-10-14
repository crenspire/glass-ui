export interface ThemeColors {
  primary: string
  primaryForeground: string
  background: string
  foreground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  destructive: string
  destructiveForeground: string
  border: string
  input: string
  ring: string
  radius?: string
  // Liquid glass variables (see the .lg layer in app/globals.css)
  glassWash?: string
  glassBlur?: string
  glassRimHi?: string
  glassRimLo?: string
  glassHighlight?: string
  glassDrop?: string
  // Dark mode liquid glass variables
  darkGlassWash?: string
  darkGlassRimHi?: string
  darkGlassRimLo?: string
  darkGlassHighlight?: string
  darkGlassDrop?: string
}

const LIGHT_GLASS = {
  glassWash: "rgba(255, 255, 255, 0.42)",
  glassBlur: "16px",
  glassRimHi: "rgba(255, 255, 255, 0.8)",
  glassRimLo: "rgba(255, 255, 255, 0.18)",
  glassHighlight: "rgba(255, 255, 255, 0.6)",
  glassDrop: "rgba(15, 23, 42, 0.14)",
}
const DARK_GLASS = {
  darkGlassWash: "rgba(255, 255, 255, 0.07)",
  darkGlassRimHi: "rgba(255, 255, 255, 0.34)",
  darkGlassRimLo: "rgba(255, 255, 255, 0.06)",
  darkGlassHighlight: "rgba(255, 255, 255, 0.16)",
  darkGlassDrop: "rgba(0, 0, 0, 0.45)",
}

export function generateThemeCSS(colors: ThemeColors, darkColors?: Partial<ThemeColors>): string {
  const lightTheme = `:root {
  --radius: ${colors.radius || "0.625rem"};
  --primary: ${colors.primary};
  --primary-foreground: ${colors.primaryForeground};
  --background: ${colors.background};
  --foreground: ${colors.foreground};
  --card: ${colors.card};
  --card-foreground: ${colors.cardForeground};
  --popover: ${colors.popover};
  --popover-foreground: ${colors.popoverForeground};
  --secondary: ${colors.secondary};
  --secondary-foreground: ${colors.secondaryForeground};
  --muted: ${colors.muted};
  --muted-foreground: ${colors.mutedForeground};
  --accent: ${colors.accent};
  --accent-foreground: ${colors.accentForeground};
  --destructive: ${colors.destructive};
  --destructive-foreground: ${colors.destructiveForeground};
  --border: ${colors.border};
  --input: ${colors.input};
  --ring: ${colors.ring};
  
  /* Liquid glass rim, highlight and shadow */
  --lg-rim-hi: ${colors.glassRimHi || LIGHT_GLASS.glassRimHi};
  --lg-rim-lo: ${colors.glassRimLo || LIGHT_GLASS.glassRimLo};
  --lg-highlight: ${colors.glassHighlight || LIGHT_GLASS.glassHighlight};
  --lg-drop: ${colors.glassDrop || LIGHT_GLASS.glassDrop};
}

/* Regular liquid glass wash and blur */
.lg-regular {
  --lg-base: ${colors.glassWash || LIGHT_GLASS.glassWash};
  --lg-blur: ${colors.glassBlur || LIGHT_GLASS.glassBlur};
}`

  const darkTheme = darkColors
    ? `
.dark {
  --primary: ${darkColors.primary || colors.primary};
  --primary-foreground: ${darkColors.primaryForeground || colors.primaryForeground};
  --background: ${darkColors.background || colors.background};
  --foreground: ${darkColors.foreground || colors.foreground};
  --card: ${darkColors.card || colors.card};
  --card-foreground: ${darkColors.cardForeground || colors.cardForeground};
  --popover: ${darkColors.popover || colors.popover};
  --popover-foreground: ${darkColors.popoverForeground || colors.popoverForeground};
  --secondary: ${darkColors.secondary || colors.secondary};
  --secondary-foreground: ${darkColors.secondaryForeground || colors.secondaryForeground};
  --muted: ${darkColors.muted || colors.muted};
  --muted-foreground: ${darkColors.mutedForeground || colors.mutedForeground};
  --accent: ${darkColors.accent || colors.accent};
  --accent-foreground: ${darkColors.accentForeground || colors.accentForeground};
  --destructive: ${darkColors.destructive || colors.destructive};
  --destructive-foreground: ${darkColors.destructiveForeground || colors.destructiveForeground};
  --border: ${darkColors.border || colors.border};
  --input: ${darkColors.input || colors.input};
  --ring: ${darkColors.ring || colors.ring};
  
  /* Liquid glass - dark mode */
  --lg-rim-hi: ${colors.darkGlassRimHi || darkColors.darkGlassRimHi || DARK_GLASS.darkGlassRimHi};
  --lg-rim-lo: ${colors.darkGlassRimLo || darkColors.darkGlassRimLo || DARK_GLASS.darkGlassRimLo};
  --lg-highlight: ${colors.darkGlassHighlight || darkColors.darkGlassHighlight || DARK_GLASS.darkGlassHighlight};
  --lg-drop: ${colors.darkGlassDrop || darkColors.darkGlassDrop || DARK_GLASS.darkGlassDrop};
}

.dark .lg-regular {
  --lg-base: ${colors.darkGlassWash || darkColors.darkGlassWash || DARK_GLASS.darkGlassWash};
}`
    : ""

  return lightTheme + darkTheme
}

export const defaultTheme: ThemeColors = {
  primary: "oklch(0.5 0.2 260)",
  primaryForeground: "oklch(0.9 0.02 260)",
  background: "oklch(0.85 0.1 220)",
  foreground: "oklch(0.1 0.1 280)",
  card: "oklch(0.85 0.1 220)",
  cardForeground: "oklch(0.1 0.1 280)",
  popover: "oklch(0.85 0.1 220)",
  popoverForeground: "oklch(0.1 0.1 280)",
  secondary: "oklch(0.5 0.2 260)",
  secondaryForeground: "oklch(0.1 0.1 280)",
  muted: "oklch(0.85 0 0)", // Darker gray for light mode - avoids glass effect override
  mutedForeground: "oklch(0.5 0.2 280)",
  accent: "oklch(0.5 0.2 260)",
  accentForeground: "oklch(1 0 0)",
  destructive: "oklch(0.6 0.2 20)",
  destructiveForeground: "oklch(1 0 0)",
  border: "oklch(0.5 0.2 260)",
  input: "oklch(0.5 0.2 260)",
  ring: "oklch(0.5 0.2 260)",
  radius: "0rem",
  ...LIGHT_GLASS,
  ...DARK_GLASS,
}

