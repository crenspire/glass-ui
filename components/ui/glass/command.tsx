"use client"

import * as React from "react"
import {
  Command as BaseCommand,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"

export interface CommandProps extends React.ComponentProps<typeof BaseCommand> {
  glow?: boolean
}

/**
 * Glass UI Command - Enhanced command menu with glassy effects
 */
export const Command = React.forwardRef<
  React.ElementRef<typeof BaseCommand>,
  CommandProps
>(({ className, variant, glow = false, ...props }, ref) => {
  return (
    <BaseCommand
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
Command.displayName = "Command"

export {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}

