"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

import type { ButtonVariantProps } from "./types"

/** 13 — Compact */
export function ButtonVariantCompact(props: ButtonVariantProps) {
  return (
    <Button variant="secondary" size="sm" className="text-xs" {...props}>
      Micro
    </Button>
  )
}
