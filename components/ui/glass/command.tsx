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
        glow && "shadow-lg shadow-purple-500/20",
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

