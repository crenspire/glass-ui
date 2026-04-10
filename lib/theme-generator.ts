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
  // Glass effect variables
  glassBg?: string
  glassBorder?: string
  glassShadow?: string
  glassShadowLg?: string
  glassShadowSm?: string
  blur?: string
  blurSm?: string
  blurLg?: string
  // Dark mode glass variables
  darkGlassBg?: string
  darkGlassBorder?: string
  darkGlassShadow?: string
  darkGlassShadowLg?: string
  darkGlassShadowSm?: string
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
  
  /* Liquid Glass variables */
  --glass-bg: ${colors.glassBg || "linear-gradient(180deg, rgba(255, 255, 255, 0.56) 0%, rgba(255, 255, 255, 0.36) 100%)"};
  --glass-border: ${colors.glassBorder || "rgba(255, 255, 255, 0.45)"};
  --glass-shadow: ${colors.glassShadow || "0 0.5px 0 0 rgba(255, 255, 255, 0.7) inset, 0 -0.5px 0 0 rgba(0, 0, 0, 0.04) inset, 0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.04)"};
  --glass-shadow-lg: ${colors.glassShadowLg || "0 0.5px 0 0 rgba(255, 255, 255, 0.8) inset, 0 -0.5px 0 0 rgba(0, 0, 0, 0.05) inset, 0 2px 8px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.08), 0 16px 48px rgba(0, 0, 0, 0.04)"};
  --glass-shadow-sm: ${colors.glassShadowSm || "0 0.5px 0 0 rgba(255, 255, 255, 0.6) inset, 0 1px 2px rgba(0, 0, 0, 0.04)"};
  --blur: ${colors.blur || "40px"};
  --blur-sm: ${colors.blurSm || "24px"};
  --blur-lg: ${colors.blurLg || "60px"};
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
  
  /* Liquid Glass variables - Dark mode */
  --glass-bg: ${colors.darkGlassBg || darkColors.darkGlassBg || "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)"};
  --glass-border: ${colors.darkGlassBorder || darkColors.darkGlassBorder || "rgba(255, 255, 255, 0.18)"};
  --glass-shadow: ${colors.darkGlassShadow || darkColors.darkGlassShadow || "0 0.5px 0 0 rgba(255, 255, 255, 0.25) inset, 0 -0.5px 0 0 rgba(0, 0, 0, 0.15) inset, 0 1px 3px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15)"};
  --glass-shadow-lg: ${colors.darkGlassShadowLg || darkColors.darkGlassShadowLg || "0 0.5px 0 0 rgba(255, 255, 255, 0.3) inset, 0 -0.5px 0 0 rgba(0, 0, 0, 0.2) inset, 0 2px 8px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.25), 0 16px 48px rgba(0, 0, 0, 0.15)"};
  --glass-shadow-sm: ${colors.darkGlassShadowSm || darkColors.darkGlassShadowSm || "0 0.5px 0 0 rgba(255, 255, 255, 0.2) inset, 0 1px 2px rgba(0, 0, 0, 0.15)"};
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
  // Liquid Glass defaults
  glassBg: "linear-gradient(180deg, rgba(255, 255, 255, 0.56) 0%, rgba(255, 255, 255, 0.36) 100%)",
  glassBorder: "rgba(255, 255, 255, 0.45)",
  glassShadow: "0 0.5px 0 0 rgba(255, 255, 255, 0.7) inset, 0 -0.5px 0 0 rgba(0, 0, 0, 0.04) inset, 0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.04)",
  glassShadowLg: "0 0.5px 0 0 rgba(255, 255, 255, 0.8) inset, 0 -0.5px 0 0 rgba(0, 0, 0, 0.05) inset, 0 2px 8px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.08), 0 16px 48px rgba(0, 0, 0, 0.04)",
  glassShadowSm: "0 0.5px 0 0 rgba(255, 255, 255, 0.6) inset, 0 1px 2px rgba(0, 0, 0, 0.04)",
  blur: "40px",
  blurSm: "24px",
  blurLg: "60px",
  // Liquid Glass dark mode defaults
  darkGlassBg: "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)",
  darkGlassBorder: "rgba(255, 255, 255, 0.18)",
  darkGlassShadow: "0 0.5px 0 0 rgba(255, 255, 255, 0.25) inset, 0 -0.5px 0 0 rgba(0, 0, 0, 0.15) inset, 0 1px 3px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15)",
  darkGlassShadowLg: "0 0.5px 0 0 rgba(255, 255, 255, 0.3) inset, 0 -0.5px 0 0 rgba(0, 0, 0, 0.2) inset, 0 2px 8px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.25), 0 16px 48px rgba(0, 0, 0, 0.15)",
  darkGlassShadowSm: "0 0.5px 0 0 rgba(255, 255, 255, 0.2) inset, 0 1px 2px rgba(0, 0, 0, 0.15)",
}

