import * as React from "react";
import { View, type ViewProps } from "react-native";

import { Toggle } from "@/components/ui/toggle";

type ToggleGroupContextValue = {
  type: "single" | "multiple";
  value: string | string[] | undefined;
  onItemToggle: (item: string) => void;
};

type ToggleGroupProps = ViewProps & {
  children?: React.ReactNode;
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
};

type ToggleGroupItemProps = React.ComponentProps<typeof Toggle> & {
  value: string;
};

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null);

function useToggleGroupContext() {
  const context = React.useContext(ToggleGroupContext);

  if (!context) {
    throw new Error("ToggleGroupItem must be used inside ToggleGroup.");
  }

  return context;
}

function ToggleGroup({
  children,
  type = "single",
  value,
  defaultValue,
  onValueChange,
  style,
  ...props
}: ToggleGroupProps) {
  const [internalValue, setInternalValue] = React.useState<string | string[] | undefined>(
    defaultValue,
  );
  const isControlled = value !== undefined;
  const resolvedValue = isControlled ? value : internalValue;

  const onItemToggle = React.useCallback(
    (item: string) => {
      let nextValue: string | string[];

      if (type === "single") {
        nextValue = resolvedValue === item ? "" : item;
      } else {
        const current = Array.isArray(resolvedValue) ? resolvedValue : [];
        nextValue = current.includes(item)
          ? current.filter((entry) => entry !== item)
          : [...current, item];
      }

      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange, resolvedValue, type],
  );

  return (
    <ToggleGroupContext.Provider value={{ type, value: resolvedValue, onItemToggle }}>
      <View style={[{ flexDirection: "row", flexWrap: "wrap", gap: 12 }, style]} {...props}>
        {children}
      </View>
    </ToggleGroupContext.Provider>
  );
}

function ToggleGroupItem({ value, onPressedChange, ...props }: ToggleGroupItemProps) {
  const context = useToggleGroupContext();
  const isPressed = Array.isArray(context.value)
    ? context.value.includes(value)
    : context.value === value;

  return (
    <Toggle
      pressed={isPressed}
      onPressedChange={(nextPressed) => {
        onPressedChange?.(nextPressed);
        context.onItemToggle(value);
      }}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };
export type { ToggleGroupItemProps, ToggleGroupProps };
