"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [key in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: { light?: string; dark?: string } }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
} & {
  variant?: "default" | "glass"
}
>(({ id, className, children, config, variant = "glass", ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  const variants = {
    default: "",
    glass: "glass-bg text-foreground rounded-lg p-4",
  }

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line-line]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          variants[variant],
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

type TooltipProps = React.ComponentProps<typeof RechartsPrimitive.Tooltip> & {
  active?: boolean
  payload?: Array<{
    dataKey?: string
    name?: string
    value?: number | string
    color?: string
    payload?: {
      fill?: string
      [key: string]: unknown
    }
    [key: string]: unknown
  }>
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipProps &
    React.ComponentProps<"div"> & {
      variant?: "default" | "glass"
      indicator?: "dot" | "line" | "dashed"
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      variant = "glass",
      ...props
    },
    ref
  ) => {
    const { config } = useChart()

    const variants = {
      default: "bg-popover text-popover-foreground border",
      glass: "glass-bg text-foreground",
    }

    if (!active || !payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-md",
          variants[variant],
          className
        )}
        {...props}
      >
        {payload?.map((item, index) => {
          const key = `${item.dataKey || item.name || "value"}-${index}`
          const configItem = config[item.dataKey as string] || config[item.name as string]
          const indicatorColor = (item.payload as { fill?: string } | undefined)?.fill || item.color

          return (
            <div
              key={item.dataKey || item.name}
              className={cn(
                "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                indicator === "line" && "items-center"
              )}
            >
              {configItem?.icon ? (
                <configItem.icon />
              ) : (
                <div
                  className={cn(
                    "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                    indicator === "dot" && "h-2.5 w-2.5",
                    indicator === "line" && "h-0.5 w-4",
                    indicator === "dashed" && "h-0.5 w-4 border-[1.5px] border-dashed bg-transparent"
                  )}
                  style={
                    {
                      "--color-bg": indicatorColor,
                      "--color-border": indicatorColor,
                    } as React.CSSProperties
                  }
                />
              )}
              <div
                className={cn(
                  "flex flex-1 justify-between leading-none",
                  indicator === "line" && "items-center"
                )}
              >
                <div className="grid gap-1.5">
                  <span className="text-muted-foreground">
                    {configItem?.label || item.name}
                  </span>
                  {item.value && (
                    <span className="font-mono font-medium tabular-nums text-foreground">
                      {item.value.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

type LegendProps = {
  payload?: Array<{
    value?: string
    dataKey?: string
    color?: string
    [key: string]: unknown
  }>
  verticalAlign?: "top" | "bottom"
}

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    LegendProps & {
      variant?: "default" | "glass"
    }
>(
  ({ className, payload, verticalAlign = "bottom", variant = "glass", ...props }, ref) => {
    const { config } = useChart()

    const variants = {
      default: "",
      glass: "glass-bg text-foreground rounded-lg px-2 py-1",
    }

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-2" : "pt-2",
          variants[variant],
          className
        )}
        {...props}
      >
        {payload.map((item) => {
          const key = `${item.dataKey || item.value}`
          const configItem = config[key]

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {configItem?.icon ? (
                <configItem.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {configItem?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}

