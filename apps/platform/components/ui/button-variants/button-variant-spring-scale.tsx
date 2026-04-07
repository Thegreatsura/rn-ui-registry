"use client"

import * as React from "react"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"

import type { ButtonVariantProps } from "./types"

/** 15 — Spring scale */
export function ButtonVariantSpringScale(props: ButtonVariantProps) {
  return (
    <motion.div whileTap={{ scale: 0.94 }} className="inline-flex">
      <Button variant="default" {...props}>
        Spring press
      </Button>
    </motion.div>
  )
}
