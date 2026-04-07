"use client"

import * as React from "react"
import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"

import type { ButtonVariantProps } from "./types"

/** 16 — Badge */
export function ButtonVariantBadge(props: ButtonVariantProps) {
  return (
    <Button variant="outline" {...props}>
      <Bell className="size-4" strokeWidth={2} />
      Alerts
      <span className="bg-destructive text-destructive-foreground ml-1 flex size-5 items-center justify-center rounded-full text-[11px] font-bold">
        3
      </span>
    </Button>
  )
}
