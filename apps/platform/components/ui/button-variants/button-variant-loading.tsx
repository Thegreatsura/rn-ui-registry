"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import type { ButtonVariantProps } from "./types"

/** 6 — Loading */
export function ButtonVariantLoading(props: ButtonVariantProps) {
  const [loading, setLoading] = React.useState(false)
  return (
    <Button
      variant="default"
      disabled={loading}
      onClick={() => {
        setLoading(true)
        setTimeout(() => setLoading(false), 1600)
      }}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : "Tap to load"}
    </Button>
  )
}
