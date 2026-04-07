"use client"

import * as React from "react"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { ButtonVariantProps } from "./types"

/** 19 — Heart toggle */
export function ButtonVariantIconFavorite(props: ButtonVariantProps) {
  const [liked, setLiked] = React.useState(false)
  return (
    <Button
      variant={liked ? "default" : "outline"}
      size="icon"
      onClick={() => setLiked((l) => !l)}
      {...props}
    >
      <Heart
        className={cn(
          "size-[18px]",
          liked && "fill-primary-foreground text-primary-foreground",
        )}
        strokeWidth={2}
      />
    </Button>
  )
}
