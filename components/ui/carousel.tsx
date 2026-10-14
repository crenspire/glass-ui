"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { liquidProps, resolveVariant, type LiquidProps } from "@/lib/liquid-glass/material"

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement>, LiquidProps {
  variant?: "liquid" | "default"
  autoPlay?: boolean
  interval?: number
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, variant, material, tint, glass, webgl, style, autoPlay = false, interval = 3000, children, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const items = React.Children.toArray(children)
    const totalItems = items.length
    
    React.useEffect(() => {
      if (!autoPlay || totalItems <= 1) return
      
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalItems)
      }, interval)
      
      return () => clearInterval(timer)
    }, [autoPlay, interval, totalItems])
    
    const goToSlide = (index: number) => {
      setCurrentIndex(index)
    }
    
    const goToPrevious = () => {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems)
    }
    
    const goToNext = () => {
      setCurrentIndex((prev) => (prev + 1) % totalItems)
    }
    
    const v = resolveVariant<"liquid" | "default">(variant, material)
    const base = "relative w-full overflow-hidden"
    const own = v.variant === "liquid"
      ? liquidProps({ role: "surface", material: v.material, tint, glass, webgl }, { className: cn(base, className), style })
      : { className: cn(base, "rounded-lg bg-card text-card-foreground border shadow-sm", className), style }

    if (totalItems === 0) return null
    
    return (
      <div ref={ref} {...own} {...props}>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="min-w-full flex-shrink-0">
              {item}
            </div>
          ))}
        </div>
        
        {totalItems > 1 && (
          <>
            <Button
              webgl={false}
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 size-9"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              webgl={false}
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 size-9"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    index === currentIndex
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/50 hover:bg-muted-foreground"
                  )}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    )
  }
)
Carousel.displayName = "Carousel"

export { Carousel }

