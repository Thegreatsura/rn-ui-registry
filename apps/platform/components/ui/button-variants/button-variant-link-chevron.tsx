"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { ButtonVariantProps } from "./types"

/** 11 — Link chevron */
export function ButtonVariantLinkChevron({
  className,
  ...props
}: ButtonVariantProps) {
  return (
    <Button variant="link" className={cn("group", className)} {...props}>
      Continue
      <ChevronRight
        className="size-4 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1"
        strokeWidth={2}
      />
    </Button>
  )
}
