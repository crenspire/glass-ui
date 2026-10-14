"use client"

import * as React from "react"
import {
  Table as BaseTable,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export interface TableProps extends React.ComponentProps<typeof BaseTable> {
  glow?: boolean
}

/**
 * Glass UI Table - Enhanced table with glassy effects
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, glow = false, ...props }, ref) => {
    return (
      <BaseTable
        ref={ref}
        variant={variant}
        className={cn(
          glow && "shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
          className
        )}
        {...props}
      />
    )
  }
)
Table.displayName = "Table"

export {
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

