"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const barChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 273, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const lineChartData = [
  { month: "Jan", revenue: 186, profit: 80 },
  { month: "Feb", revenue: 305, profit: 200 },
  { month: "Mar", revenue: 237, profit: 120 },
  { month: "Apr", revenue: 273, profit: 190 },
  { month: "May", revenue: 209, profit: 130 },
  { month: "Jun", revenue: 214, profit: 140 },
]

const areaChartData = [
  { month: "Jan", sales: 186, returns: 20 },
  { month: "Feb", sales: 305, returns: 45 },
  { month: "Mar", sales: 237, returns: 30 },
  { month: "Apr", sales: 273, returns: 50 },
  { month: "May", sales: 209, returns: 35 },
  { month: "Jun", sales: 214, returns: 40 },
]

export function ChartBlock() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Charts</h2>
        <p className="text-muted-foreground">Visualize your data with beautiful charts</p>
      </div>

      <Tabs defaultValue="bar" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          <TabsTrigger value="line">Line Chart</TabsTrigger>
          <TabsTrigger value="area">Area Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="bar">
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Bar Chart</CardTitle>
              <CardDescription className="text-muted-foreground">
                Desktop vs Mobile traffic comparison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  desktop: {
                    label: "Desktop",
                    color: "hsl(var(--chart-1))",
                  },
                  mobile: {
                    label: "Mobile",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="line">
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Line Chart</CardTitle>
              <CardDescription className="text-muted-foreground">
                Revenue and profit trends over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                  profit: {
                    label: "Profit",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="var(--color-profit)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="area">
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Area Chart</CardTitle>
              <CardDescription className="text-muted-foreground">
                Sales and returns comparison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  sales: {
                    label: "Sales",
                    color: "hsl(var(--chart-1))",
                  },
                  returns: {
                    label: "Returns",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <AreaChart data={areaChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="var(--color-sales)"
                    fill="var(--color-sales)"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="returns"
                    stroke="var(--color-returns)"
                    fill="var(--color-returns)"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

