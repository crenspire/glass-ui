/* The blocks gallery: metadata and the snippet shown next to each block. */

export interface Block { name: string; title: string; description: string; category: string; code: string }

export const BLOCKS: Block[] = [
  {
    name: "dashboard",
    title: "Dashboard",
    description: "Complete dashboard layout with stats, charts, and navigation",
    category: "Layout",
    code: `import { DashboardBlock } from "@/components/blocks/dashboard"

export default function Page() {
  return <DashboardBlock />
}`,
  },
  {
    name: "authentication",
    title: "Authentication",
    description: "Login form with glassmorphism effects",
    category: "Auth",
    code: `import { AuthenticationBlock } from "@/components/blocks/authentication"

export default function Page() {
  return <AuthenticationBlock />
}`,
  },
  {
    name: "signup",
    title: "Sign Up",
    description: "Registration form with validation",
    category: "Auth",
    code: `import { SignupBlock } from "@/components/blocks/signup"

export default function Page() {
  return <SignupBlock />
}`,
  },
  {
    name: "forgot-password",
    title: "Forgot Password",
    description: "Password reset form",
    category: "Auth",
    code: `import { ForgotPasswordBlock } from "@/components/blocks/forgot-password"

export default function Page() {
  return <ForgotPasswordBlock />
}`,
  },
  {
    name: "calendar",
    title: "Calendar",
    description: "Calendar view with events and scheduling",
    category: "Data Display",
    code: `import { CalendarBlock } from "@/components/blocks/calendar"

export default function Page() {
  return <CalendarBlock />
}`,
  },
  {
    name: "chart",
    title: "Chart",
    description: "Beautiful charts with bar, line, and area visualizations",
    category: "Data Display",
    code: `import { ChartBlock } from "@/components/blocks/chart"

export default function Page() {
  return <ChartBlock />
}`,
  },
]

export function getBlock(name: string) {
  return BLOCKS.find(b => b.name === name)
}
