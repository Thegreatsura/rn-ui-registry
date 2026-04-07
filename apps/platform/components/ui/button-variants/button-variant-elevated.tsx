"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

import type { ButtonVariantProps } from "./types"

/** 1 — Elevated shadow */
export function ButtonVariantElevated(props: ButtonVariantProps) {
  return (
    <div className="shadow-lg rounded-lg">
      <Button {...props}>Elevated primary</Button>
    </div>
  )
}
