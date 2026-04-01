"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Slider({
  className,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(
        "group/slider relative flex w-full touch-none items-center py-2",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="bg-secondary relative h-2 w-full grow overflow-hidden rounded-full"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="bg-primary absolute h-full"
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        className="border-input bg-background ring-ring/50 block size-5 rounded-full border shadow-[0_1px_6px_rgba(0,0,0,0.12)] transition focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50"
      />
    </SliderPrimitive.Root>
  )
}

export { Slider }
