"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

import type { ButtonVariantProps } from "./types"

/** 9 — Stepper */
export function ButtonVariantStepper(props: ButtonVariantProps) {
  const [n, setN] = React.useState(1)
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setN((x) => Math.max(0, x - 1))}
        {...props}
      >
        <Minus className="size-4" />
      </Button>
      <span className="text-foreground min-w-[1.5rem] text-center text-sm tabular-nums">
        {n}
      </span>
      <Button variant="outline" size="icon" onClick={() => setN((x) => x + 1)} {...props}>
        <Plus className="size-4" />
      </Button>
    </div>
  )
}
