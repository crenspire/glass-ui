"use client"

import * as React from "react"
import {
  ContextMenu as BaseContextMenu,
  ContextMenuTrigger as BaseContextMenuTrigger,
  ContextMenuContent as BaseContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from "@/components/ui/context-menu"

/**
 * Glass UI Context Menu - A beautifully designed context menu with glassy effects
 * Built on top of the base ContextMenu component with enhanced visual styling
 */
export const ContextMenu = BaseContextMenu
export const ContextMenuTrigger = BaseContextMenuTrigger

export const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof BaseContextMenuContent>,
  React.ComponentProps<typeof BaseContextMenuContent> & {
    variant?: "liquid" | "default"
  }
>(({ className, variant, ...props }, ref) => {
  return (
    <BaseContextMenuContent
      ref={ref}
      variant={variant}
      className={className}
      {...props}
    />
  )
})
ContextMenuContent.displayName = "ContextMenuContent"

export {
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}

