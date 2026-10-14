export function getComponentExampleCode(componentName: string): string {
  switch (componentName) {
    case "button":
      return `import { Button } from "@/components/ui/glass/button"

export function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Glass Button</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="default">Default</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}`
    
    case "card":
      return `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/glass/card"

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a card with glass effect</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
    </Card>
  )
}`
    
    case "input":
      return `import { Input } from "@/components/ui/glass/input"

export function Example() {
  return (
    <div className="space-y-2">
      <Input placeholder="Enter text..." />
      <Input variant="default" placeholder="Default input" />
    </div>
  )
}`
    
    case "badge":
      return `import { Badge } from "@/components/ui/glass/badge"

export function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Glass Badge</Badge>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  )
}`
    
    case "checkbox":
      return `import { Checkbox } from "@/components/ui/glass/checkbox"
import { Label } from "@/components/ui/glass/label"

export function Example() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}`
    
    case "switch":
      return `import { Switch } from "@/components/ui/glass/switch"
import { Label } from "@/components/ui/glass/label"

export function Example() {
  return (
    <div className="flex items-center space-x-2">
      <Switch />
      <Label>Enable notifications</Label>
    </div>
  )
}`
    
    case "tabs":
      return `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/glass/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/glass/card"

export function Example() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Make changes to your account here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Account settings</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
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
}`
    
    case "alert":
      return `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/glass/alert"
import { Info } from "lucide-react"

export function Example() {
  return (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        This is an alert with glass effect.
      </AlertDescription>
    </Alert>
  )
}`
    
    case "avatar":
      return `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/glass/avatar"

export function Example() {
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
}`
    
    case "separator":
      return `import { Separator } from "@/components/ui/glass/separator"

export function Example() {
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
}`
    
    case "skeleton":
      return `import { Skeleton } from "@/components/ui/glass/skeleton"

export function Example() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-12 w-full" />
    </div>
  )
}`
    
    case "slider":
      return `import { Slider } from "@/components/ui/glass/slider"

export function Example() {
  return (
    <div className="space-y-4">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  )
}`
    
    case "textarea":
      return `import { Textarea } from "@/components/ui/glass/textarea"

export function Example() {
  return (
    <Textarea placeholder="Type your message here." />
  )
}`
    
    case "label":
      return `import { Label } from "@/components/ui/glass/label"
import { Input } from "@/components/ui/glass/input"

export function Example() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="name@example.com" />
    </div>
  )
}`
    
    case "radio-group":
      return `import { RadioGroup, RadioGroupItem } from "@/components/ui/glass/radio-group"
import { Label } from "@/components/ui/glass/label"

export function Example() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}`
    
    case "select":
      return `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/glass/select"

export function Example() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  )
}`
    
    case "accordion":
      return `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/glass/accordion"

export function Example() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components' aesthetic.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`
    
    case "tooltip":
      return `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/glass/tooltip"
import { Button } from "@/components/ui/glass/button"

export function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`
    
    case "popover":
      return `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/glass/popover"
import { Button } from "@/components/ui/glass/button"

export function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
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
}`
    
    case "dialog":
      return `import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/glass/dialog"
import { Button } from "@/components/ui/glass/button"

export function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
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
}`
    
    case "dropdown-menu":
      return `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/glass/dropdown-menu"
import { Button } from "@/components/ui/glass/button"

export function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`
    
    case "calendar":
      return `import { Calendar } from "@/components/ui/glass/calendar"

export function Example() {
  return (
    <Calendar mode="single" className="rounded-md border" className="[--cell-size:--spacing(12)]" />
  )
}`
    
    case "toggle":
      return `import { Toggle } from "@/components/ui/glass/toggle"
import { Sparkles } from "lucide-react"

export function Example() {
  return (
    <div className="flex gap-2">
      <Toggle aria-label="Toggle italic">
        <Sparkles className="h-4 w-4" />
      </Toggle>
      <Toggle variant="default" aria-label="Toggle bold">
        Bold
      </Toggle>
    </div>
  )
}`
    
    case "toggle-group":
      return `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/glass/toggle-group"

export function Example() {
  return (
    <ToggleGroup type="single">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  )
}`
    
    case "table":
      return `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/glass/table"

export function Example() {
  return (
    <Table>
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
}`
    
    case "breadcrumb":
      return `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/glass/breadcrumb"

export function Example() {
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
}`
    
    case "collapsible":
      return `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/glass/collapsible"
import { Button } from "@/components/ui/glass/button"

export function Example() {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-2">
          <p className="text-sm">This is collapsible content.</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}`
    
    case "command":
      return `import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/glass/command"

export function Example() {
  return (
    <Command className="rounded-lg border shadow-md">
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
}`
    
    case "scroll-area":
      return `import { ScrollArea } from "@/components/ui/glass/scroll-area"

export function Example() {
  return (
    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
      <div className="space-y-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="text-sm">Item {i + 1}</p>
        ))}
      </div>
    </ScrollArea>
  )
}`
    
    case "sheet":
      return `import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/glass/sheet"
import { Button } from "@/components/ui/glass/button"

export function Example() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}`
    
    case "navigation-menu":
      return `import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/glass/navigation-menu"

export function Example() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
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
}`
    
    case "pagination":
      return `import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/glass/pagination"

export function Example() {
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
}`
    
    case "hover-card":
      return `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/glass/hover-card"
import { Button } from "@/components/ui/glass/button"

export function Example() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
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
}`
    
    case "drawer":
      return `import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/glass/drawer"
import { Button } from "@/components/ui/glass/button"

export function Example() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}`
    
    case "alert-dialog":
      return `import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/glass/alert-dialog"
import { Button } from "@/components/ui/glass/button"

export function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`
    
    case "sidebar":
      return `import { Sidebar, SidebarContent, SidebarHeader, SidebarItem } from "@/components/ui/glass/sidebar"

export function Example() {
  return (
    <Sidebar className="w-64">
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
}`
    
    case "chart":
      return `import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/glass/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

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

export function Example() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
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
}`
    
    case "sonner":
      return `import { Button } from "@/components/ui/glass/button"
import { toast } from "sonner"

export function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={() => toast.success('Success!', {
          description: 'Your action was completed successfully'
        })}
      >
        Show Success Toast
      </Button>
      
      <Button
        onClick={() => toast.error('Error!', {
          description: 'Something went wrong'
        })}
      >
        Show Error Toast
      </Button>
      
      <Button
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
  )
}

// Don't forget to add <Toaster /> to your root layout:
// import { Toaster } from "@/components/ui/glass/sonner"
// 
// export default function RootLayout({ children }) {
//   return (
//     <html>
//       <body>
//         {children}
//         <Toaster />
//       </body>
//     </html>
//   )
// }
//
// Note: All toasts automatically use glass effects!
// Success toasts have green borders, errors have red borders,
// warnings have yellow borders, and info toasts have blue borders.`
    
    case "spinner":
      return `import { Spinner } from "@/components/ui/glass/spinner"

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  )
}`
    
    case "button-group":
      return `import { ButtonGroup } from "@/components/ui/glass/button-group"
import { Button } from "@/components/ui/glass/button"

export function Example() {
  return (
    <ButtonGroup orientation="horizontal">
      <Button variant="ghost">One</Button>
      <Button variant="ghost">Two</Button>
      <Button variant="ghost">Three</Button>
    </ButtonGroup>
  )
}`
    
    case "input-group":
      return `import { InputGroup } from "@/components/ui/glass/input-group"
import { Input } from "@/components/ui/glass/input"
import { Button } from "@/components/ui/glass/button"
import { Search } from "lucide-react"

export function Example() {
  return (
    <InputGroup>
      <Input placeholder="Search..." className="border-0 rounded-r-none" />
      <Button variant="ghost" size="icon" className="rounded-l-none">
        <Search className="h-4 w-4" />
      </Button>
    </InputGroup>
  )
}`
    
    case "input-otp":
      return `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/glass/input-otp"

export function Example() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}`
    
    case "empty-state":
      return `import { EmptyState, EmptyStateIcon, EmptyStateTitle, EmptyStateDescription } from "@/components/ui/glass/empty-state"
import { Button } from "@/components/ui/glass/button"
import { Inbox } from "lucide-react"

export function Example() {
  return (
    <EmptyState>
      <EmptyStateIcon>
        <Inbox className="h-12 w-12" />
      </EmptyStateIcon>
      <EmptyStateTitle>No items found</EmptyStateTitle>
      <EmptyStateDescription>
        Get started by creating a new item.
      </EmptyStateDescription>
      <Button className="mt-4">
        Create Item
      </Button>
    </EmptyState>
  )
}`
    
    case "menu-bar":
      return `import { MenuBar, MenuBarItem } from "@/components/ui/glass/menu-bar"

export function Example() {
  return (
    <MenuBar>
      <MenuBarItem active>File</MenuBarItem>
      <MenuBarItem>Edit</MenuBarItem>
      <MenuBarItem>View</MenuBarItem>
      <MenuBarItem>Help</MenuBarItem>
    </MenuBar>
  )
}`
    
    case "date-picker-input":
      return `import { DatePickerInput } from "@/components/ui/glass/date-picker-input"
import { useState } from "react"

export function Example() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  
  return (
    <DatePickerInput
      value={date}
      onChange={setDate}
      placeholder="Pick a date"
    />
  )
}`
    
    case "context-menu":
      return `import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@/components/ui/glass/context-menu"
import { Card, CardContent } from "@/components/ui/glass/card"

export function Example() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="p-8 cursor-pointer">
          <CardContent>Right click me</CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>My Account</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Settings</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Logout</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`
    
    case "carousel":
      return `import { Carousel } from "@/components/ui/glass/carousel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/glass/card"

export function Example() {
  return (
    <Carousel className="w-full max-w-md h-[200px]">
      <Card className="h-full m-2">
        <CardHeader>
          <CardTitle>Slide 1</CardTitle>
        </CardHeader>
        <CardContent>Content for slide 1</CardContent>
      </Card>
      <Card className="h-full m-2">
        <CardHeader>
          <CardTitle>Slide 2</CardTitle>
        </CardHeader>
        <CardContent>Content for slide 2</CardContent>
      </Card>
      <Card className="h-full m-2">
        <CardHeader>
          <CardTitle>Slide 3</CardTitle>
        </CardHeader>
        <CardContent>Content for slide 3</CardContent>
      </Card>
    </Carousel>
  )
}`
    
    case "mode-toggle":
      return `import { ModeToggle } from "@/components/ui/glass/mode-toggle"

export function Example() {
  return (
    <ModeToggle />
  )
}`
    
    default:
      return `import { ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} } from "@/components/ui/glass/${componentName}"

export function Example() {
  return (
    <${componentName.charAt(0).toUpperCase() + componentName.slice(1)}>
      ${componentName} content
    </${componentName.charAt(0).toUpperCase() + componentName.slice(1)}>
  )
}`
  }
}

