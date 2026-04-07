"use client"

import * as React from "react"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"

import type { ButtonVariantProps } from "./types"

/** 14 — Pulse */
export function ButtonVariantPulse(props: ButtonVariantProps) {
  return (
    <motion.div
      className="inline-flex"
      animate={{ opacity: [1, 0.55, 1] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <Button variant="default" {...props}>
        Pulse CTA
      </Button>
    </motion.div>
  )
}
