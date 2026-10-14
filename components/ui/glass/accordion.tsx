"use client"

import * as React from "react"
import {
  Accordion as BaseAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger as BaseAccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export interface AccordionTriggerProps extends React.ComponentProps<typeof BaseAccordionTrigger> {
  glow?: boolean
}

/**
 * Glass UI Accordion - Enhanced accordion with glassy effects
 */
export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof BaseAccordionTrigger>,
  AccordionTriggerProps
>(({ className, glow = false, ...props }, ref) => {
  return (
    <BaseAccordionTrigger
      ref={ref}
      className={cn(
        glow && "data-[state=open]:shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]",
        className
      )}
      {...props}
    />
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

export {
  BaseAccordion as Accordion,
  AccordionItem,
  AccordionContent,
}
