"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { getGlassStyles, type GlassCustomization } from "@/lib/glass-utils"

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "glassSubtle" | "frosted" | "fluted" | "crystal"
  glass?: GlassCustomization
  autoPlay?: boolean
  interval?: number
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, variant = "glass", glass, autoPlay = false, interval = 3000, children, ...props }, ref) => {
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
    
    const hasCustomGlass = glass !== undefined
    
    const getVariantClass = () => {
      if (variant === "default") return "bg-card text-card-foreground border shadow-sm"
      if (hasCustomGlass) return "glass-bg text-foreground"
      
      const variants = {
        glass: "glass-bg text-foreground",
        glassSubtle: "glass-bg text-foreground opacity-60",
        frosted: "glass-frosted text-foreground",
        fluted: "glass-fluted text-foreground",
        crystal: "glass-crystal text-foreground",
      }
      return variants[variant] || variants.glass
    }
    
    const glassStyles = variant !== "default" ? getGlassStyles(glass) : {}
    
    if (totalItems === 0) return null
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-lg",
          getVariantClass(),
          className
        )}
        style={{
          ...glassStyles,
        }}
        {...props}
      >
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
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full glass-bg"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full glass-bg"
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

