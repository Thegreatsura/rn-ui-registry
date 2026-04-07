"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

import type { ButtonVariantProps } from "./types"

/** 4 — Dashed frame */
export function ButtonVariantDashedFrame(props: ButtonVariantProps) {
  return (
    <div className="border-border w-fit rounded-lg border border-dashed p-1">
      <Button variant="ghost" {...props}>
        Dashed frame
      </Button>
    </div>
  )
}
