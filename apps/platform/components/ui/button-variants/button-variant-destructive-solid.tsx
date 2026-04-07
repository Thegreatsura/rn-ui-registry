"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

import type { ButtonVariantProps } from "./types"

/** 10 — Destructive */
export function ButtonVariantDestructiveSolid(props: ButtonVariantProps) {
  return (
    <Button variant="destructive" {...props}>
      Remove item
    </Button>
  )
}
