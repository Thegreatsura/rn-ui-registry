"use client"

import * as React from "react"
import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"

import type { ButtonVariantProps } from "./types"

/** 5 — Icon leading */
export function ButtonVariantIconLeading(props: ButtonVariantProps) {
  return (
    <Button variant="outline" {...props}>
      <Mail className="size-4" strokeWidth={2} />
      Email invite
    </Button>
  )
}
