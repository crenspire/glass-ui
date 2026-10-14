"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, MapPin } from "lucide-react"

const events = [
  { id: 1, title: "Team Meeting", time: "10:00 AM", location: "Conference Room A", date: new Date() },
  { id: 2, title: "Client Call", time: "2:00 PM", location: "Zoom", date: new Date() },
  { id: 3, title: "Project Review", time: "4:00 PM", location: "Office", date: new Date() },
]

export function CalendarBlock() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Calendar</h2>
          <p className="text-muted-foreground">Manage your schedule and events</p>
        </div>
        <Button className="text-white">
          New Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 text-white">
          <CardHeader>
            <CardTitle className="text-white">Calendar View</CardTitle>
            <CardDescription className="text-muted-foreground">Select a date to view events</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card className="text-white">
          <CardHeader>
            <CardTitle className="text-white">Upcoming Events</CardTitle>
            <CardDescription className="text-muted-foreground">Today&apos;s schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-lg border border-white/20 bg-black/20 backdrop-blur-sm"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white">{event.title}</h4>
                      <Badge>Today</Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

