"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

import type { ButtonVariantProps } from "./types"

/** 2 — Soft muted pad */
export function ButtonVariantSoft(props: ButtonVariantProps) {
  return (
    <div className="bg-muted w-fit rounded-lg px-1 py-0.5">
      <Button variant="ghost" {...props}>
        Soft action
      </Button>
    </div>
  )
}
