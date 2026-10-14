import { Card } from "@/components/ui/glass"
import { cn } from "@/lib/utils"

/** A glass window tile. Content scrolls inside it on desktop. */
export function SettingsWindow({ className, children }: { className?: string; children: React.ReactNode }) {
  return <Card className={cn("gap-0 overflow-hidden p-0", className)}>{children}</Card>
}
