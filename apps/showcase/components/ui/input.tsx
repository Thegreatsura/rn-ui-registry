/** @jsxImportSource react */
import * as React from "react";
import {
  StyleSheet,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { useRegistryTheme } from "@/components/ui/theme";

const NativeTextInput = require("react-native")
  .TextInput as React.ComponentType<any>;

type InputProps = TextInputProps & {
  className?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "ghost";
  invalid?: boolean;
};

const Input = React.forwardRef<any, InputProps>(function Input(
  {
    style,
    containerStyle,
    inputStyle,
    variant = "default",
    size = "default",
    editable = true,
    invalid = false,
    leftSlot,
    rightSlot,
    onFocus,
    onBlur,
    placeholderTextColor,
    className: _className,
    ...props
  },
  ref,
) {
  const [focused, setFocused] = React.useState(false);
  const theme = useRegistryTheme();

  const handleFocus = React.useCallback(
    (event: Parameters<NonNullable<TextInputProps["onFocus"]>>[0]) => {
      setFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = React.useCallback(
    (event: Parameters<NonNullable<TextInputProps["onBlur"]>>[0]) => {
      setFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  return (
    <View style={containerStyle}>
      <View
        style={[
          styles.field,
          {
            backgroundColor:
              variant === "ghost" ? theme.muted : theme.background,
            borderColor: invalid
              ? theme.destructive
              : focused
                ? theme.ring
                : variant === "ghost"
                  ? "transparent"
                  : theme.input,
          },
          size === "sm" ? styles.smField : undefined,
          size === "lg" ? styles.lgField : undefined,
          editable === false ? styles.disabled : undefined,
        ]}
      >
        {leftSlot ? (
          <View style={[styles.slot, styles.leftSlot]}>{leftSlot}</View>
        ) : null}
        {React.createElement(NativeTextInput, {
          ...props,
          ref,
          editable,
          onFocus: handleFocus,
          onBlur: handleBlur,
          placeholderTextColor: placeholderTextColor ?? theme.mutedForeground,
          selectionColor: invalid ? theme.destructive : theme.ring,
          underlineColorAndroid: "transparent",
          style: [
            styles.input,
            { color: theme.foreground },
            size === "sm" ? styles.smInput : undefined,
            size === "lg" ? styles.lgInput : undefined,
            leftSlot ? styles.inputWithLeftSlot : undefined,
            rightSlot ? styles.inputWithRightSlot : undefined,
            style,
            inputStyle,
          ],
        })}
        {rightSlot ? (
          <View style={[styles.slot, styles.rightSlot]}>{rightSlot}</View>
        ) : null}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  field: {
    width: "100%",
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    minHeight: 20,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  smField: { minHeight: 36 },
  lgField: { minHeight: 44 },
  smInput: { fontSize: 13, paddingHorizontal: 10, paddingVertical: 8 },
  lgInput: { fontSize: 16, paddingHorizontal: 14, paddingVertical: 12 },
  disabled: { opacity: 0.5 },
  slot: { alignItems: "center", justifyContent: "center" },
  leftSlot: { paddingLeft: 12, paddingRight: 4 },
  rightSlot: { paddingLeft: 4, paddingRight: 12 },
  inputWithLeftSlot: { paddingLeft: 8 },
  inputWithRightSlot: { paddingRight: 8 },
});

export { Input };
export type { InputProps };
