"use client"

import type * as React from "react"

import type { Button } from "@/components/ui/button"

export type ButtonVariantProps = Omit<React.ComponentProps<typeof Button>, "children">
