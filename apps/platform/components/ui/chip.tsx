"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

export type ChipProps = Omit<React.ComponentProps<"button">, "children"> & {
  children: React.ReactNode
  selected?: boolean
  variant?: "default" | "outline"
  /** Shows a remove control (filters / tags). */
  onRemove?: () => void
}

function Chip({
  className,
  selected = false,
  variant = "default",
  onRemove,
  children,
  ...props
}: ChipProps) {
  if (onRemove) {
    return (
      <span
        className={cn(
          "border-border bg-secondary text-foreground inline-flex max-w-full items-center gap-0.5 rounded-full border py-1 pr-1 pl-3 text-sm font-semibold",
          className,
        )}
      >
        <span className="min-w-0 truncate">{children}</span>
        <button
          type="button"
          onClick={onRemove}
          className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors"
          aria-label="Remove"
        >
          <X className="size-3.5" strokeWidth={2} />
        </button>
      </span>
    )
  }

  return (
    <button
      type="button"
      className={cn(
        "inline-flex min-h-9 min-w-0 items-center justify-center rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors",
        selected
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : variant === "outline"
            ? "border-border bg-background text-foreground hover:bg-muted/70"
            : "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { Chip }
