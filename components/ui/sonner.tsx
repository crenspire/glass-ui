"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

/**
 * Glass UI Toaster - Toast notifications with glassmorphism effects
 * 
 * Features:
 * - Glass background with backdrop blur
 * - Glass border and shadow effects
 * - Smooth animations and transitions
 * - Light/dark mode support
 * 
 * @example
 * ```tsx
 * import { Toaster } from "@/components/ui/sonner"
 * import { toast } from "sonner"
 * 
 * // Add to root layout
 * <Toaster />
 * 
 * // Use in components
 * toast.success('Success!', { description: 'Your action completed' })
 * ```
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast lg lg-regular lg-overlay text-foreground",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "lg lg-regular lg-inline",
          cancelButton: "lg lg-regular lg-inline",
          closeButton: "lg lg-regular lg-inline",
          success: "group-[.toast]:border-green-500/30",
          error: "group-[.toast]:border-red-500/30",
          warning: "group-[.toast]:border-yellow-500/30",
          info: "group-[.toast]:border-blue-500/30",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

