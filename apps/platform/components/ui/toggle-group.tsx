"use client"

import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function ToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn("flex flex-wrap items-center gap-3", className)}
      {...props}
    />
  )
}

function ToggleGroupItem({
  className,
  variant = "outline",
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & {
  variant?: "default" | "outline"
}) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={variant}
      className={cn(
        "inline-flex min-h-9 items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-45 data-[state=on]:border-primary",
        variant === "default"
          ? "border-border bg-background text-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          : "border-border bg-background text-foreground data-[state=on]:bg-secondary",
        className
      )}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
