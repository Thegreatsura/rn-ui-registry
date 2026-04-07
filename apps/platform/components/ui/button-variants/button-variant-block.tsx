"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

import type { ButtonVariantProps } from "./types"

/** 12 — Block */
export function ButtonVariantBlock(props: ButtonVariantProps) {
  return (
    <Button variant="default" className="w-full" {...props}>
      Full width checkout
    </Button>
  )
}
