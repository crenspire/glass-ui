"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar } from "@/components/ui/calendar"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Sidebar, SidebarContent, SidebarHeader, SidebarItem } from "@/components/ui/sidebar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Info, Sparkles, Inbox, Search, Calendar as CalendarIcon } from "lucide-react"
import { Spinner } from "@/components/ui/glass/spinner"
import { ButtonGroup } from "@/components/ui/glass/button-group"
import { InputGroup } from "@/components/ui/glass/input-group"
import { EmptyState, EmptyStateIcon, EmptyStateTitle, EmptyStateDescription } from "@/components/ui/glass/empty-state"
import { MenuBar, MenuBarItem } from "@/components/ui/glass/menu-bar"
import { DatePickerInput } from "@/components/ui/glass/date-picker-input"
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator } from "@/components/ui/glass/context-menu"
import { Carousel } from "@/components/ui/glass/carousel"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Cropper } from "@/components/ui/cropper"
import { ModeToggle } from "@/components/ui/glass/mode-toggle"

function DatePickerInputPreview() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  return (
    <DatePickerInput
      variant="glass"
      value={date}
      onChange={setDate}
      placeholder="Pick a date"
    />
  )
}

export function ComponentPreview({ componentName }: { componentName: string }) {
  switch (componentName) {
    case "button":
      return (
        <div className="flex flex-wrap gap-2">
          <Button variant="glass" className="cursor-pointer">Glass Button</Button>
          <Button variant="outline" className="cursor-pointer">Outline</Button>
          <Button variant="default" className="cursor-pointer">Default</Button>
          <Button variant="ghost" className="cursor-pointer">Ghost</Button>
          <Button variant="destructive" className="cursor-pointer">Destructive</Button>
        </div>
      )

    case "card":
      return (
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>This is a card with glass effect</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content goes here</p>
          </CardContent>
        </Card>
      )

    case "input":
      return (
        <div className="space-y-2">
          <Input variant="glass" placeholder="Enter text..." />
          <Input variant="default" placeholder="Default input" />
        </div>
      )

    case "badge":
      return (
        <div className="flex flex-wrap gap-2">
          <Badge variant="glass">Glass Badge</Badge>
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      )

    case "checkbox":
      return (
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" variant="glass" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      )

    case "switch":
      return (
        <div className="flex items-center space-x-2">
          <Switch variant="glass" />
          <Label>Enable notifications</Label>
        </div>
      )

    case "tabs":
      return (
        <Tabs defaultValue="account" className="w-full">
          <TabsList variant="glass" className="glass-bg p-1">
            <TabsTrigger value="account" className="cursor-pointer">Account</TabsTrigger>
            <TabsTrigger value="password" className="cursor-pointer">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-4">
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Make changes to your account here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Account settings</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password" className="mt-4">
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Password settings</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )

    case "alert":
      return (
        <div className="space-y-2">
          <Alert variant="glass">
            <Info className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              This is an alert with glass effect.
            </AlertDescription>
          </Alert>
        </div>
      )

    case "avatar":
      return (
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/akshaypjoshi.png" alt="@akshaypjoshi" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/akshaypjoshi.png" alt="@akshaypjoshi" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      )

    case "separator":
      return (
        <div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Radix Primitives</h4>
            <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Blog</div>
            <Separator orientation="vertical" />
            <div>Docs</div>
            <Separator orientation="vertical" />
            <div>Source</div>
          </div>
        </div>
      )

    case "skeleton":
      return (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-12 w-full" />
        </div>
      )

    case "slider":
      return (
        <div className="space-y-4">
          <Slider defaultValue={[50]} max={100} step={1} variant="glass" />
        </div>
      )

    case "textarea":
      return (
        <Textarea variant="glass" placeholder="Type your message here." />
      )

    case "label":
      return (
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" variant="glass" type="email" placeholder="name@example.com" />
        </div>
      )

    case "radio-group":
      return (
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" variant="glass" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" variant="glass" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" variant="glass" />
            <Label htmlFor="r3">Compact</Label>
          </div>
        </RadioGroup>
      )

    case "select":
      return (
        <Select>
          <SelectTrigger variant="glass" className="w-[180px]">
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent variant="glass">
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      )

    case "accordion":
      return (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger variant="glass">Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger variant="glass">Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )

    case "tooltip":
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="cursor-pointer">Hover</Button>
            </TooltipTrigger>
            <TooltipContent variant="glass">
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

    case "popover":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="cursor-pointer">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent variant="glass" className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )

    case "dialog":
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="cursor-pointer">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent variant="glass">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

    case "dropdown-menu":
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="cursor-pointer">Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent variant="glass">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )

    case "calendar":
      return (
        <div className="p-6 glass-bg rounded-lg inline-block bg-white/10 dark:bg-white/5">
          <Calendar variant="glass" mode="single" />
        </div>
      )

    case "toggle":
      return (
        <div className="flex gap-2">
          <Toggle variant="glass" aria-label="Toggle italic">
            <Sparkles className="h-4 w-4" />
          </Toggle>
          <Toggle variant="default" aria-label="Toggle bold">
            Bold
          </Toggle>
        </div>
      )

    case "toggle-group":
      return (
        <div className="p-4 glass-bg rounded-lg inline-block">
          <ToggleGroup type="single" variant="glass" defaultValue="b">
            <ToggleGroupItem value="a" className="cursor-pointer">A</ToggleGroupItem>
            <ToggleGroupItem value="b" className="cursor-pointer">B</ToggleGroupItem>
            <ToggleGroupItem value="c" className="cursor-pointer">C</ToggleGroupItem>
          </ToggleGroup>
        </div>
      )

    case "table":
      return (
        <Table variant="glass">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

    case "breadcrumb":
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

    case "collapsible":
      return (
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="cursor-pointer">Toggle</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-2">
              <p className="text-sm">This is collapsible content.</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )

    case "command":
      return (
        <Command variant="glass" className="rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      )

    case "scroll-area":
      return (
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          <div className="space-y-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} className="text-sm">Item {i + 1}</p>
            ))}
          </div>
        </ScrollArea>
      )

    case "sheet":
      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="cursor-pointer">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent variant="glass">
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re done.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )

    case "navigation-menu":
      return (
        <NavigationMenu>
          <NavigationMenuList variant="glass">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent variant="glass">
                <ul className="grid gap-3 p-6 w-[400px]">
                  <li>
                    <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Introduction</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Re-usable components built using Radix UI and Tailwind CSS.
                      </p>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                Documentation
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

    case "pagination":
      return (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )

    case "hover-card":
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="cursor-pointer">@nextjs</Button>
          </HoverCardTrigger>
          <HoverCardContent variant="glass" className="w-80">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm">
                  The React Framework – created and maintained by @vercel.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      )

    case "drawer":
      return (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="cursor-pointer">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent variant="glass">
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button className="cursor-pointer">Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline" className="cursor-pointer">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )

    case "alert-dialog":
      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="cursor-pointer">Show Dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent variant="glass">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
              <AlertDialogAction className="cursor-pointer">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

    case "sidebar":
      return (
        <Sidebar variant="glass" className="w-64">
          <SidebarHeader>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold">Sidebar</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarItem>Home</SidebarItem>
            <SidebarItem>Settings</SidebarItem>
            <SidebarItem>Profile</SidebarItem>
          </SidebarContent>
        </Sidebar>
      )

    case "chart":
      const chartData = [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
        { month: "April", desktop: 273, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "June", desktop: 214, mobile: 140 },
      ]

      const chartConfig = {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
        mobile: {
          label: "Mobile",
          color: "hsl(var(--chart-2))",
        },
      }

      return (
        <ChartContainer config={chartConfig} variant="glass" className="h-[300px]">
          <BarChart data={chartData}>
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
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      )

    case "sonner":
      return (
        <>
          <Alert variant="glass" className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Glass Effects Enabled</AlertTitle>
            <AlertDescription>
              All toasts automatically use glass effects with color-coded borders (green for success, red for error, yellow for warning, blue for info).
            </AlertDescription>
          </Alert>
          <div className="flex flex-col gap-3">
            <Button
              variant="glass"
              className="cursor-pointer"
              onClick={() => toast.success('Success!', {
                description: 'Your action was completed successfully'
              })}
            >
              Show Success Toast
            </Button>
            
            <Button
              variant="glass"
              className="cursor-pointer"
              onClick={() => toast.error('Error!', {
                description: 'Something went wrong'
              })}
            >
              Show Error Toast
            </Button>
            
            <Button
              variant="glass"
              className="cursor-pointer"
              onClick={() => toast('Event Created', {
                description: 'Your event has been scheduled',
                action: {
                  label: 'View',
                  onClick: () => console.log('View clicked'),
                },
              })}
            >
              Toast with Action
            </Button>
          </div>
          <Toaster />
        </>
      )

    case "input-otp":
      return (
        <div className="p-4 glass-bg rounded-lg inline-block">
          <InputOTP variant="glass" maxLength={6} />
        </div>
      )

    case "cropper":
      return (
        <Cropper
          image="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop"
          onCropComplete={() => {}}
          variant="glass"
        />
      )

    case "spinner":
      return (
        <div className="flex items-center gap-4 p-6 glass-bg rounded-lg bg-white/10 dark:bg-white/5">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="md" />
          <Spinner size="md" />
        </div>
      )

    case "button-group":
      return (
        <ButtonGroup variant="glass" orientation="horizontal">
          <Button variant="ghost" className="cursor-pointer">One</Button>
          <Button variant="ghost" className="cursor-pointer">Two</Button>
          <Button variant="ghost" className="cursor-pointer">Three</Button>
        </ButtonGroup>
      )

    case "input-group":
      return (
        <div className="space-y-8">
          <InputGroup variant="glass">
            <Input placeholder="Search..." className="border-0 rounded-r-none" />
            <Button variant="ghost" size="icon" className="rounded-l-none cursor-pointer">
              <Search className="h-4 w-4" />
            </Button>
          </InputGroup>
          <InputGroup variant="frosted">
            <Input placeholder="Email" type="email" className="border-0 rounded-r-none" />
            <Button variant="ghost" size="icon" className="rounded-l-none cursor-pointer">
              <Info className="h-4 w-4" />
            </Button>
          </InputGroup>
        </div>
      )

    case "empty-state":
      return (
        <div className="space-y-4">
          <EmptyState variant="glass">
            <EmptyStateIcon>
              <Inbox className="h-12 w-12" />
            </EmptyStateIcon>
            <EmptyStateTitle>No items found</EmptyStateTitle>
            <EmptyStateDescription>
              Get started by creating a new item.
            </EmptyStateDescription>
            <Button variant="glass" className="mt-4 cursor-pointer">
              Create Item
            </Button>
          </EmptyState>
        </div>
      )

    case "menu-bar":
      return (
        <MenuBar variant="glass">
          <MenuBarItem active>File</MenuBarItem>
          <MenuBarItem>Edit</MenuBarItem>
          <MenuBarItem>View</MenuBarItem>
          <MenuBarItem>Help</MenuBarItem>
        </MenuBar>
      )

    case "date-picker-input":
      return (
        <div className="p-6 glass-bg rounded-lg inline-block bg-white/10 dark:bg-white/5">
          <DatePickerInputPreview />
        </div>
      )

    case "context-menu":
      return (
        <ContextMenu>
          <ContextMenuTrigger>
            <Card variant="glass" className="p-8 cursor-pointer w-fit">
              <CardContent>Right click me</CardContent>
            </Card>
          </ContextMenuTrigger>
          <ContextMenuContent variant="glass">
            <ContextMenuLabel>My Account</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuItem>Profile</ContextMenuItem>
            <ContextMenuItem>Settings</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Logout</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      )

    case "carousel":
      return (
        <Carousel variant="glass" className="w-full max-w-md h-[200px]">
          <Card variant="glass" className="h-full m-2">
            <CardHeader>
              <CardTitle>Slide 1</CardTitle>
            </CardHeader>
            <CardContent>Content for slide 1</CardContent>
          </Card>
          <Card variant="glass" className="h-full m-2">
            <CardHeader>
              <CardTitle>Slide 2</CardTitle>
            </CardHeader>
            <CardContent>Content for slide 2</CardContent>
          </Card>
          <Card variant="glass" className="h-full m-2">
            <CardHeader>
              <CardTitle>Slide 3</CardTitle>
            </CardHeader>
            <CardContent>Content for slide 3</CardContent>
          </Card>
        </Carousel>
      )

    case "mode-toggle":
      return (
        <div className="p-4 glass-bg rounded-lg inline-block">
          <ModeToggle variant="glass" />
        </div>
      )

    default:
      return (
        <div className="p-4 border border-border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">Preview not available for this component.</p>
        </div>
      )
  }
}

