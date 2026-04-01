import * as React from "react";
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type ViewProps,
} from "react-native";

import { useRegistryTheme } from "@/components/ui/theme";

type RadioGroupContextValue = {
  value?: string;
  setValue: (value: string) => void;
  disabled?: boolean;
};

type RadioGroupProps = ViewProps & {
  children?: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
};

type RadioGroupItemProps = Omit<PressableProps, "children"> & {
  value: string;
  children?: React.ReactNode;
};

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null,
);

function useRadioGroupContext() {
  const context = React.useContext(RadioGroupContext);

  if (!context) {
    throw new Error("Radio group components must be used inside RadioGroup.");
  }

  return context;
}

function RadioGroup({
  children,
  defaultValue,
  value,
  onValueChange,
  disabled,
  style,
  ...props
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const resolvedValue = isControlled ? value : internalValue;

  const setValue = React.useCallback(
    (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange],
  );

  return (
    <RadioGroupContext.Provider
      value={{ value: resolvedValue, setValue, disabled }}
    >
      <View style={[styles.group, style]} {...props}>
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

function RadioGroupItem({
  children,
  disabled,
  onPress,
  style,
  value,
  ...props
}: RadioGroupItemProps) {
  const theme = useRegistryTheme();
  const group = useRadioGroupContext();
  const checked = group.value === value;
  const resolvedDisabled = Boolean(group.disabled || disabled);

  const handlePress = React.useCallback(
    (event: Parameters<NonNullable<PressableProps["onPress"]>>[0]) => {
      onPress?.(event);

      if (!resolvedDisabled) {
        group.setValue(value);
      }
    },
    [group, onPress, resolvedDisabled, value],
  );

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked, disabled: !!resolvedDisabled }}
      disabled={resolvedDisabled}
      onPress={handlePress}
      style={
        typeof style === "function"
          ? (state) => [
              styles.item,
              style(state),
              resolvedDisabled && styles.disabled,
            ]
          : [styles.item, style, resolvedDisabled && styles.disabled]
      }
      {...props}
    >
      <View
        style={[
          styles.control,
          { borderColor: checked ? theme.primary : theme.border },
        ]}
      >
        {checked ? (
          <View
            style={[styles.indicator, { backgroundColor: theme.primary }]}
          />
        ) : null}
      </View>
      <View style={styles.label}>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  control: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  label: {
    flex: 1,
  },
  disabled: {
    opacity: 0.45,
  },
});

export { RadioGroup, RadioGroupItem };
export type { RadioGroupItemProps, RadioGroupProps };
