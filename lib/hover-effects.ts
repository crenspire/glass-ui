import { cva } from "class-variance-authority"

/**
 * Liquid Glass hover effect variants
 *
 * Effects:
 * - none: No hover effect
 * - glow: Soft luminous glow that intensifies on hover
 * - ripple: Fluid ripple expanding outward
 * - lift: Subtle elevation with enhanced shadow depth
 * - scale: Gentle scale with brightness shift
 */
export const hoverEffects = cva(
  "transition-all duration-300 ease-out",
  {
    variants: {
      hover: {
        none: "",
        glow: "hover:shadow-[0_0.5px_0_0_rgba(255,255,255,0.85)_inset,0_4px_16px_rgba(100,140,255,0.15),0_8px_32px_rgba(100,140,255,0.1)] hover:brightness-105",
        ripple: "relative overflow-hidden after:absolute after:inset-0 after:scale-0 after:rounded-full after:bg-white/20 after:transition-transform after:duration-500 after:ease-out hover:after:scale-150",
        lift: "hover:-translate-y-0.5 hover:shadow-[0_0.5px_0_0_rgba(255,255,255,0.8)_inset,0_4px_12px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)]",
        scale: "hover:scale-[1.03] hover:brightness-105",
      },
    },
    defaultVariants: {
      hover: "none",
    },
  }
)

export type HoverEffect = "none" | "glow" | "ripple" | "lift" | "scale"
