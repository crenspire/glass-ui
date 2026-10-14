"use client"

import * as React from "react"
import { Cropper as BaseCropper } from "@/components/ui/cropper"
import { cn } from "@/lib/utils"

export interface CropperProps {
  image: string
  onCropComplete: (croppedArea: { x: number; y: number; width: number; height: number }, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => void
  aspect?: number
  variant?: "liquid" | "default"
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
        glow && "shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
        className
      )}
    >
      <BaseCropper
        {...props}
      />
    </div>
  )
}

