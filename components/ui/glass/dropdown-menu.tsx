"use client"

import * as React from "react"
import {
  DropdownMenu as BaseDropdownMenu,
  DropdownMenuContent as BaseDropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export interface DropdownMenuContentProps extends React.ComponentProps<typeof BaseDropdownMenuContent> {
  glow?: boolean
}

/**
 * Glass UI Dropdown Menu - Enhanced dropdown menu with glassy effects
 */
export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof BaseDropdownMenuContent>,
  DropdownMenuContentProps
>(({ className, variant, glow = false, ...props }, ref) => {
  return (
    <BaseDropdownMenuContent
      ref={ref}
      variant={variant}
      className={cn(
        glow && "shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
        className
      )}
      {...props}
    />
  )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

export {
  BaseDropdownMenu as DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
}

