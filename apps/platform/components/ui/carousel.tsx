"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type CarouselContextValue = {
  count: number
  setCount: (count: number) => void
  index: number
  setIndex: (index: number) => void
  scrollToIndex: (index: number) => void
  loop: boolean
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

function useCarouselContext() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("Carousel components must be used inside Carousel.")
  }

  return context
}

function clampIndex(index: number, count: number, loop: boolean) {
  if (count <= 0) {
    return 0
  }

  if (loop) {
    return (index + count) % count
  }

  return Math.min(Math.max(index, 0), count - 1)
}

function Carousel({
  children,
  className,
  defaultIndex = 0,
  index,
  loop = false,
  onIndexChange,
  ...props
}: React.ComponentProps<"div"> & {
  defaultIndex?: number
  index?: number
  loop?: boolean
  onIndexChange?: (index: number) => void
}) {
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const [count, setCount] = React.useState(0)
  const [internalIndex, setInternalIndex] = React.useState(defaultIndex)
  const isControlled = index !== undefined
  const resolvedIndex = clampIndex(isControlled ? index : internalIndex, count, loop)

  const setIndex = React.useCallback(
    (nextIndex: number) => {
      const clamped = clampIndex(nextIndex, count, loop)

      if (!isControlled) {
        setInternalIndex(clamped)
      }

      onIndexChange?.(clamped)
    },
    [count, isControlled, loop, onIndexChange]
  )

  const scrollToIndex = React.useCallback(
    (nextIndex: number) => {
      const clamped = clampIndex(nextIndex, count, loop)
      const viewport = viewportRef.current

      if (viewport) {
        viewport.scrollTo({
          left: clamped * viewport.clientWidth,
          behavior: "smooth",
        })
      }

      setIndex(clamped)
    },
    [count, loop, setIndex]
  )

  return (
    <CarouselContext.Provider
      value={{
        count,
        setCount,
        index: resolvedIndex,
        setIndex,
        scrollToIndex,
        loop,
      }}
    >
      <div
        data-slot="carousel"
        className={cn("relative w-full", className)}
        {...props}
      >
        <div ref={viewportRef}>{children}</div>
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { setCount, setIndex } = useCarouselContext()

  React.useEffect(() => {
    setCount(React.Children.count(children))
  }, [children, setCount])

  return (
    <div
      data-slot="carousel-content"
      className={cn(
        "flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
      onScroll={(event) => {
        const current = event.currentTarget
        if (current.clientWidth > 0) {
          setIndex(Math.round(current.scrollLeft / current.clientWidth))
        }
      }}
      {...props}
    >
      {children}
    </div>
  )
}

function CarouselItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="carousel-item"
      className={cn("min-w-0 shrink-0 basis-full snap-start", className)}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  children,
  onClick,
  disabled,
  ...props
}: React.ComponentProps<"button">) {
  const { index, count, loop, scrollToIndex } = useCarouselContext()
  const resolvedDisabled = disabled ?? (!loop && index <= 0)

  return (
    <button
      type="button"
      data-slot="carousel-previous"
      aria-label="Previous slide"
      disabled={resolvedDisabled || count <= 1}
      onClick={(event) => {
        onClick?.(event)
        scrollToIndex(index - 1)
      }}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    >
      {children ?? "<"}
    </button>
  )
}

function CarouselNext({
  className,
  children,
  onClick,
  disabled,
  ...props
}: React.ComponentProps<"button">) {
  const { index, count, loop, scrollToIndex } = useCarouselContext()
  const resolvedDisabled = disabled ?? (!loop && index >= count - 1)

  return (
    <button
      type="button"
      data-slot="carousel-next"
      aria-label="Next slide"
      disabled={resolvedDisabled || count <= 1}
      onClick={(event) => {
        onClick?.(event)
        scrollToIndex(index + 1)
      }}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    >
      {children ?? ">"}
    </button>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
}
