"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

import type { ButtonVariantProps } from "./types"

/** 3 — Pill */
export function ButtonVariantPill(props: ButtonVariantProps) {
  return (
    <Button variant="secondary" className="rounded-full px-5" {...props}>
      Pill secondary
    </Button>
  )
}
