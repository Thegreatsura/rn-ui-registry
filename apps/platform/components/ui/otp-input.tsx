"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function OTPInput({
  value = "",
  onValueChange,
  maxLength = 6,
  disabled = false,
  className,
  ...props
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
} & React.ComponentProps<"div">) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const digits = value.split("");
  const cells = Array.from({ length: maxLength }, (_, i) => digits[i] || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val) && val.length <= maxLength) {
      onValueChange?.(val);
    }
  };

  return (
    <div
      className={cn("relative flex items-center justify-center gap-2", className)}
      onClick={() => inputRef.current?.focus()}
      {...props}
    >
      {cells.map((digit, index) => {
        const isFocused = value.length === index;
        return (
          <div
            key={index}
            className={cn(
              "flex h-12 w-10 items-center justify-center rounded-md border-2 border-input bg-background text-xl font-semibold transition-all",
              isFocused && "border-primary ring-2 ring-primary/20",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {digit}
            {isFocused && !disabled && (
              <span className="absolute bottom-2 h-0.5 w-4 animate-pulse bg-primary" />
            )}
          </div>
        );
      })}
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="\d*"
        maxLength={maxLength}
        value={value}
        onChange={handleInputChange}
        className="absolute inset-0 opacity-0 cursor-default"
        disabled={disabled}
      />
    </div>
  );
}

export { OTPInput };
