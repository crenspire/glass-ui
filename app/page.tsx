import { Hero } from "@/components/desktop/hero"
import { DesktopMaterialProvider } from "@/components/desktop/material-context"
import { About, CalendarWidget, ControlCenter, MaterialsWidget, Messages, NowPlaying, Weather } from "@/components/desktop/widgets"

export default function Home() {
  return (
    <DesktopMaterialProvider>
      <div className="mx-auto flex h-full max-w-[1600px] flex-col gap-8 lg:flex-row lg:items-center lg:gap-12 lg:px-6">
        <div className="pt-10 lg:w-1/3 lg:shrink-0 lg:pt-0"><Hero /></div>
        {/* Widgets tile; they never overlap, so each can be shader glass. */}
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3 lg:max-h-full lg:overflow-y-auto lg:py-2">
          <ControlCenter />
          <NowPlaying />
          <Weather />
          <Messages />
          <CalendarWidget />
          <div className="flex flex-col gap-4"><MaterialsWidget /><About /></div>
        </div>
      </div>
    </DesktopMaterialProvider>
  )
}
