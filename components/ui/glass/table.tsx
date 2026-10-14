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
          glow && "shadow-lg shadow-purple-500/20",
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

