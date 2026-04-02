import * as React from "react"

import { cn } from "@/lib/utils"

type SpinnerProps = React.ComponentProps<"span"> & {
  size?: "sm" | "default" | "lg"
}

function Spinner({
  className,
  size = "default",
  ...props
}: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      className={cn(
        "border-primary/30 border-t-primary inline-block animate-spin rounded-full border-2",
        size === "sm"
          ? "size-4"
          : size === "lg"
            ? "size-8"
            : "size-6",
        className
      )}
      {...props}
    />
  )
}

export { Spinner }
