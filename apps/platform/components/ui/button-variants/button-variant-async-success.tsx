"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import type { ButtonVariantProps } from "./types"

/** 7 — Async success */
export function ButtonVariantAsyncSuccess(props: ButtonVariantProps) {
  const [phase, setPhase] = React.useState<"idle" | "busy" | "done">("idle")
  return (
    <Button
      variant="default"
      disabled={phase === "busy" || phase === "done"}
      onClick={() => {
        setPhase("busy")
        setTimeout(() => setPhase("done"), 1200)
      }}
      {...props}
    >
      {phase === "busy" ? (
        <Spinner size="sm" />
      ) : phase === "done" ? (
        "Saved ✓"
      ) : (
        "Save changes"
      )}
    </Button>
  )
}
