"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const sizeClass: Record<"sm" | "default" | "lg", string> = {
  sm: "size-12 min-h-12 min-w-12",
  default: "size-14 min-h-14 min-w-14",
  lg: "size-16 min-h-16 min-w-16",
}

export type FabProps = React.ComponentProps<"button"> & {
  size?: "sm" | "default" | "lg"
  variant?: "default" | "secondary"
}

function Fab({
  className,
  size = "default",
  variant = "default",
  type = "button",
  ...props
}: FabProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full shadow-lg transition-transform active:scale-95",
        sizeClass[size],
        variant === "secondary"
          ? "border-border bg-secondary text-secondary-foreground border"
          : "bg-primary text-primary-foreground hover:bg-primary/90",
        className,
      )}
      {...props}
    />
  )
}

export type FabMenuAction = {
  id: string
  label: string
  onPress?: () => void
  icon?: React.ReactNode
}

export type FabMenuProps = {
  actions: FabMenuAction[]
  accessibilityLabel?: string
  renderMain?: (open: boolean) => React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function FabMenu({
  actions,
  accessibilityLabel = "Open actions menu",
  renderMain,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: FabMenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : internalOpen

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next)
      }
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  const defaultMain = (isOpen: boolean) => (
    <span className="text-primary-foreground text-[30px] leading-none font-light">{isOpen ? "×" : "+"}</span>
  )

  return (
    <div className="relative flex min-h-[220px] w-full flex-col items-end justify-end overflow-hidden">
      {open ? (
        <button
          type="button"
          className="absolute inset-0 z-0 rounded-md bg-[rgba(9,9,11,0.22)]"
          aria-label="Dismiss"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <div className="relative z-10 flex w-full flex-col items-end gap-3">
        {open
          ? actions.map((action) => (
              <div key={action.id} className="flex flex-row items-center justify-end gap-2.5">
                <div className="border-border bg-card text-foreground max-w-[200px] rounded-[10px] border px-3 py-2 text-[13px] font-semibold">
                  {action.label}
                </div>
                <Fab
                  size="sm"
                  variant="secondary"
                  aria-label={action.label}
                  onClick={() => {
                    action.onPress?.()
                    setOpen(false)
                  }}
                >
                  {action.icon ?? (
                    <span className="text-secondary-foreground text-[22px] leading-none">•</span>
                  )}
                </Fab>
              </div>
            ))
          : null}
        <Fab
          aria-label={open ? "Close actions menu" : accessibilityLabel}
          onClick={() => setOpen(!open)}
        >
          {renderMain ? renderMain(open) : defaultMain(open)}
        </Fab>
      </div>
    </div>
  )
}

export { Fab, FabMenu }
