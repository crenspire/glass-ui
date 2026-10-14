"use client"

import * as React from "react"
import {
  Pagination as BasePagination,
  PaginationContent as BasePaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

export interface PaginationContentProps extends React.ComponentProps<typeof BasePaginationContent> {
  glow?: boolean
}

/**
 * Glass UI Pagination - Enhanced pagination with glassy effects
 */
export const PaginationContent = React.forwardRef<
  HTMLUListElement,
  PaginationContentProps
>(({ className, glow = false, ...props }, ref) => {
  return (
    <BasePaginationContent
      ref={ref}
      className={cn(
        glow && "shadow-md shadow-purple-500/20",
        className
      )}
      {...props}
    />
  )
})
PaginationContent.displayName = "PaginationContent"

export {
  BasePagination as Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
}

