import * as React from "react"

import { cn } from "@/lib/utils"

type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  variant?: "default" | "ghost"
  size?: "default" | "sm" | "lg" | number
  editable?: boolean
  secureTextEntry?: boolean
  invalid?: boolean
  onChangeText?: (value: string) => void
}

function Input({
  className,
  type,
  variant = "default",
  size = "default",
  editable = true,
  secureTextEntry = false,
  invalid = false,
  disabled,
  onChange,
  onChangeText,
  ...props
}: InputProps) {
  return (
    <input
      type={secureTextEntry ? "password" : type}
      data-slot="input"
      aria-invalid={invalid || undefined}
      size={typeof size === "number" ? size : undefined}
      className={cn(
        "w-full min-w-0 rounded-lg border text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        variant === "ghost"
          ? "border-transparent bg-muted"
          : "border-input bg-transparent dark:bg-input/30",
        size === "sm" && "h-9 px-2.5 py-1.5",
        (size === "default" || typeof size === "number") && "h-10 px-3 py-2",
        size === "lg" && "h-11 px-4 py-2.5",
        className
      )}
      disabled={disabled ?? !editable}
      onChange={(event) => {
        onChange?.(event)
        onChangeText?.(event.currentTarget.value)
      }}
      {...props}
    />
  )
}

export { Input }
