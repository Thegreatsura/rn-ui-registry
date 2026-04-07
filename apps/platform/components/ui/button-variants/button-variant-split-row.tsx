"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

import type { ButtonVariantProps } from "./types"

/** 17 — Split */
export function ButtonVariantSplitRow(props: ButtonVariantProps) {
  return (
    <div className="flex w-full gap-2">
      <Button variant="outline" className="min-w-0 flex-1" {...props}>
        Back
      </Button>
      <Button variant="default" className="min-w-0 flex-1" {...props}>
        Next
      </Button>
    </div>
  )
}
