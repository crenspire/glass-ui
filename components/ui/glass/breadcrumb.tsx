"use client"

import * as React from "react"
import {
  Breadcrumb as BaseBreadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList as BaseBreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"

export interface BreadcrumbListProps extends React.ComponentProps<typeof BaseBreadcrumbList> {
  glow?: boolean
}

/**
 * Glass UI Breadcrumb - Enhanced breadcrumb with glassy effects
 */
export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  BreadcrumbListProps
>(({ className, glow = false, ...props }, ref) => {
  return (
    <BaseBreadcrumbList
      ref={ref}
      className={cn(
        glow && "shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
        className
      )}
      {...props}
    />
  )
})
BreadcrumbList.displayName = "BreadcrumbList"

export {
  BaseBreadcrumb as Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

