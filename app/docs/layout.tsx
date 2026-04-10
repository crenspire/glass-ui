"use client"

import * as React from "react"
import { DocsSidebar } from "@/components/docs-sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 pt-6 pb-16 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <aside className="hidden md:block">
            <DocsSidebar />
          </aside>
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="glass" size="sm" className="mb-4">
                  <Menu className="h-4 w-4 mr-2" />
                  Menu
                </Button>
              </SheetTrigger>
              <SheetContent variant="glass" side="left" className="w-[280px] p-0">
                <div className="h-full overflow-y-auto pt-8">
                  <DocsSidebar onLinkClick={() => setMobileMenuOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <main className="flex-1 max-w-4xl min-w-0 w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
