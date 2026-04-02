import * as React from "react";
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { TextStyleContext } from "@/components/ui/text";
import { useRegistryTheme } from "@/components/ui/theme";

type ToggleVariant = "default" | "outline";

type ToggleProps = Omit<PressableProps, "children"> & {
  children?: React.ReactNode;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: ToggleVariant;
};

function Toggle({
  children,
  pressed,
  defaultPressed = false,
  disabled,
  onPress,
  onPressedChange,
  style,
  variant = "outline",
  ...props
}: ToggleProps) {
  const theme = useRegistryTheme();
  const [internalPressed, setInternalPressed] = React.useState(defaultPressed);
  const isControlled = pressed !== undefined;
  const resolvedPressed = isControlled ? pressed : internalPressed;

  const handlePress = React.useCallback(
    (event: Parameters<NonNullable<PressableProps["onPress"]>>[0]) => {
      onPress?.(event);

      if (disabled) {
        return;
      }

      const nextValue = !resolvedPressed;

      if (!isControlled) {
        setInternalPressed(nextValue);
      }

      onPressedChange?.(nextValue);
    },
    [disabled, isControlled, onPress, onPressedChange, resolvedPressed],
  );

  const textStyle = React.useMemo<TextStyle>(
    () => ({
      color:
        resolvedPressed && variant === "default"
          ? theme.primaryForeground
          : theme.foreground,
      fontSize: 14,
      fontWeight: "500",
      lineHeight: 18,
    }),
    [resolvedPressed, theme.foreground, theme.primaryForeground, variant],
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: resolvedPressed, disabled: disabled ?? undefined }}
      disabled={disabled}
      onPress={handlePress}
      style={(state: PressableStateCallbackType) => {
        const resolvedStyle =
          typeof style === "function" ? style(state) : (style as StyleProp<ViewStyle>);

        return [styles.pressable, resolvedStyle];
      }}
      {...props}
    >
      {({ pressed: isPressed }) => (
        <TextStyleContext.Provider value={textStyle}>
          <View
            style={[
              styles.base,
              {
                backgroundColor: resolvedPressed
                  ? variant === "default"
                    ? theme.primary
                    : theme.secondary
                  : theme.background,
                borderColor: resolvedPressed ? theme.primary : theme.border,
              },
              isPressed ? styles.active : null,
              disabled ? styles.disabled : null,
            ]}
          >
            {children}
          </View>
        </TextStyleContext.Provider>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    alignSelf: "flex-start",
  },
  base: {
    minHeight: 36,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  active: {
    opacity: 0.94,
    transform: [{ translateY: 1 }],
  },
  disabled: {
    opacity: 0.45,
  },
});

export { Toggle };
export type { ToggleProps };
