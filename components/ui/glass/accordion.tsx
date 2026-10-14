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
        glow && "data-[state=open]:shadow-md data-[state=open]:shadow-purple-500/20",
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
