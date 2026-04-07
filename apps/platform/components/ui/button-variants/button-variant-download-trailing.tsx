"use client"

import * as React from "react"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"

import type { ButtonVariantProps } from "./types"

/** 20 — Download trailing */
export function ButtonVariantDownloadTrailing(props: ButtonVariantProps) {
  return (
    <Button variant="secondary" {...props}>
      Download
      <Download className="size-4" strokeWidth={2} />
    </Button>
  )
}
