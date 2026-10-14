"use client"

import * as React from "react"
import {
  Dialog as BaseDialog,
  DialogContent as BaseDialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { hoverEffects, type HoverEffect } from "@/lib/hover-effects"

export interface DialogContentProps extends React.ComponentProps<typeof BaseDialogContent> {
  /** @deprecated No effect: the liquid material carries its own blur. */
  animated?: boolean
  hover?: HoverEffect
}

/**
 * Glass UI Dialog - Enhanced dialog with glassy effects and animations
 * 
 * @example
 * ```tsx
 * <DialogContent glass={{ tint: "rgba(139, 92, 246, 0.5)", frost: 0.6 }}>
 *   Dialog content
 * </DialogContent>
 * ```
 */
export const DialogContent = React.forwardRef<
  React.ElementRef<typeof BaseDialogContent>,
  DialogContentProps
>(({ className, animated: _animated, hover = "none", children, ...props }, ref) => {
  return (
    <BaseDialogContent
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        hoverEffects({ hover }),
        className
      )}
      {...props}
    >
      {children}
    </BaseDialogContent>
  )
})
DialogContent.displayName = "DialogContent"

export {
  BaseDialog as Dialog,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

