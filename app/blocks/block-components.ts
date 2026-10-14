import type * as React from "react"
import { DashboardBlock } from "@/components/blocks/dashboard"
import { AuthenticationBlock } from "@/components/blocks/authentication"
import { SignupBlock } from "@/components/blocks/signup"
import { ForgotPasswordBlock } from "@/components/blocks/forgot-password"
import { CalendarBlock } from "@/components/blocks/calendar"
import { ChartBlock } from "@/components/blocks/chart"

export const BLOCK_COMPONENTS: Record<string, React.ComponentType> = {
  dashboard: DashboardBlock, authentication: AuthenticationBlock, signup: SignupBlock,
  "forgot-password": ForgotPasswordBlock, calendar: CalendarBlock, chart: ChartBlock,
}
