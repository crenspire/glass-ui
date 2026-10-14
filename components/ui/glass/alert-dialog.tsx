"use client"

import * as React from "react"
import {
  AlertDialog as BaseAlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent as BaseAlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"

export interface AlertDialogContentProps extends React.ComponentProps<typeof BaseAlertDialogContent> {
  /** @deprecated No effect: the liquid material carries its own blur. */
  animated?: boolean
}

/**
 * Glass UI Alert Dialog - Enhanced alert dialog with glassy effects
 */
export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof BaseAlertDialogContent>,
  AlertDialogContentProps
>(({ className, animated: _animated, ...props }, ref) => {
  return (
    <BaseAlertDialogContent
      ref={ref}
      className={cn(
        className
      )}
      {...props}
    />
  )
})
AlertDialogContent.displayName = "AlertDialogContent"

export {
  BaseAlertDialog as AlertDialog,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

