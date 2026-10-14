"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"
import { BarChart3, TrendingUp, Users, DollarSign, Activity, CreditCard } from "lucide-react"

export function DashboardBlock() {
  return (
    <div className="space-y-6 p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$45,231.89</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-400">+20.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+2350</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-400">+180.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+12,234</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-400">+19%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+573</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-400">+201</span> since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="text-white">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-muted-foreground">Latest transactions and events</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">User</TableHead>
                  <TableHead className="text-white">Action</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-white">John Doe</TableCell>
                  <TableCell className="text-white">Purchase</TableCell>
                  <TableCell>
                    <Badge>Completed</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-white">Jane Smith</TableCell>
                  <TableCell className="text-white">Subscription</TableCell>
                  <TableCell>
                    <Badge>Active</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="text-white">
          <CardHeader>
            <CardTitle className="text-white">Overview</CardTitle>
            <CardDescription className="text-muted-foreground">Performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-1))",
                },
                users: {
                  label: "Users",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <BarChart data={[
                { month: "Jan", revenue: 186, users: 80 },
                { month: "Feb", revenue: 305, users: 200 },
                { month: "Mar", revenue: 237, users: 120 },
                { month: "Apr", revenue: 273, users: 190 },
                { month: "May", revenue: 209, users: 130 },
                { month: "Jun", revenue: 214, users: 140 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                <Bar dataKey="users" fill="var(--color-users)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

