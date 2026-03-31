import * as React from "react";
import { TextInput, View, type TextInputProps } from "react-native";
import { cn } from "@/lib/utils";

type InputProps = TextInputProps & {
  className?: string;
  containerClassName?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  size?: "md" | "sm" | "lg";
  variant?: "default" | "ghost";
  invalid?: boolean;
};

const sizeStyles = {
  sm: "h-9 px-2 text-sm",
  md: "h-10 px-3 text-base",
  lg: "h-11 px-4 text-base",
};

export const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      className,
      containerClassName,
      leftSlot,
      rightSlot,
      size = "md",
      variant = "default",
      editable = true,
      invalid = false,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = React.useState(false);

    return (
      <View className={cn("w-full", containerClassName)}>
        <View
          className={cn(
            // base
            "flex-row items-center rounded-lg border transition-colors",

            // size
            sizeStyles[size],

            // variants
            variant === "ghost"
              ? "bg-muted border-transparent"
              : "bg-background border-input",

            // states
            focused && "border-ring ring-2 ring-ring/50",
            invalid && "border-destructive ring-2 ring-destructive/20",

            // disabled
            !editable && "opacity-50",
          )}
        >
          {leftSlot && (
            <View className="pl-2 pr-1 justify-center items-center">
              {leftSlot}
            </View>
          )}

          <TextInput
            ref={ref}
            editable={editable}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            placeholderTextColor="#9ca3af"
            className={cn(
              "flex-1 text-foreground",
              "placeholder:text-muted-foreground",
              className,
            )}
            {...props}
          />

          {rightSlot && (
            <View className="pl-1 pr-2 justify-center items-center">
              {rightSlot}
            </View>
          )}
        </View>
      </View>
    );
  },
);

Input.displayName = "Input";
