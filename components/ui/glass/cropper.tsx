"use client"

import * as React from "react"
import { Cropper as BaseCropper } from "@/components/ui/cropper"
import { cn } from "@/lib/utils"
import type { LegacyGlassVariant } from "@/lib/liquid-glass/material"

export interface CropperProps {
  image: string
  onCropComplete: (croppedArea: { x: number; y: number; width: number; height: number }, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => void
  aspect?: number
  variant?: "liquid" | "default" | LegacyGlassVariant
  glow?: boolean
  className?: string
}

/**
 * Glass UI Cropper - Enhanced image cropper with glassy effects
 */
export function Cropper({ className, glow = false, ...props }: CropperProps) {
  return (
    <div
      className={cn(
        glow && "shadow-lg shadow-purple-500/20",
        className
      )}
    >
      <BaseCropper
        {...props}
      />
    </div>
  )
}

