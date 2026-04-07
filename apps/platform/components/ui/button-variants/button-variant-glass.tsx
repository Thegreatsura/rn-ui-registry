"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { ButtonVariantProps } from "./types"

/** 18 — Liquid glass (blur, soft shadows, specular edge) */
export function ButtonVariantGlass({
  className,
  ...props
}: ButtonVariantProps) {
  return (
    <div
      className={cn(
        "relative isolate w-fit overflow-hidden rounded-2xl",
        "border border-white/40 bg-white/[0.12]",
        "shadow-[0_4px_24px_rgba(15,23,42,0.08),0_14px_44px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.75),inset_0_-1px_0_rgba(15,23,42,0.06)]",
        "backdrop-blur-2xl backdrop-saturate-150",
        "supports-[backdrop-filter]:bg-white/[0.08]",
        "dark:border-white/20 dark:bg-white/[0.06]",
        "dark:shadow-[0_10px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(0,0,0,0.25)]",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-white/12 to-white/35 opacity-90 dark:from-white/25 dark:via-white/8 dark:to-white/12"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_0%_0%,rgba(255,255,255,0.55),transparent_55%)] opacity-80 dark:opacity-60"
        aria-hidden
      />
      <Button
        variant="ghost"
        className={cn("relative z-10", className)}
        {...props}
      >
        Glass
      </Button>
    </div>
  )
}
