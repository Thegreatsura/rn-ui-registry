"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

import type { ButtonVariantProps } from "./types"

/** 8 — Toggle */
export function ButtonVariantToggle(props: ButtonVariantProps) {
  const [on, setOn] = React.useState(false)
  return (
    <Button
      variant={on ? "default" : "outline"}
      onClick={() => setOn((v) => !v)}
      {...props}
    >
      {on ? "Subscribed" : "Subscribe"}
    </Button>
  )
}
