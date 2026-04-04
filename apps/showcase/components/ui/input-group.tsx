import * as React from "react";
import { StyleSheet, View, type ViewProps } from "react-native";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Input, type InputProps } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Textarea, type TextareaProps } from "@/components/ui/textarea";
import { useRegistryTheme } from "@/components/ui/theme";

const EDGE_INSET = 10;

type InputGroupSlotContextValue = { index: number; total: number };

const InputGroupSlotContext = React.createContext<InputGroupSlotContextValue | null>(
  null,
);

function useInputGroupSlot() {
  return React.useContext(InputGroupSlotContext) ?? { index: 0, total: 1 };
}

function InputGroup({ style, children, ...props }: ViewProps) {
  const theme = useRegistryTheme();
  const items = React.Children.toArray(children).filter(Boolean);
  const total = items.length;

  return (
    <View
      style={[
        styles.group,
        { backgroundColor: theme.background, borderColor: theme.input },
        style,
      ]}
      {...props}
    >
      {items.map((child, index) => (
        <InputGroupSlotContext.Provider
          key={index}
          value={{ index, total }}
        >
          {child}
        </InputGroupSlotContext.Provider>
      ))}
    </View>
  );
}

function InputGroupAddon({ style, ...props }: ViewProps) {
  const { index, total } = useInputGroupSlot();
  const addonInset = {
    paddingLeft: index === 0 ? EDGE_INSET : 0,
    paddingRight: index === total - 1 ? EDGE_INSET : 0,
  };

  return (
    <View style={[styles.addon, addonInset, style]} {...props} />
  );
}

function InputGroupButton(props: ButtonProps) {
  return <Button size="sm" variant="ghost" {...props} />;
}

function InputGroupText(props: React.ComponentProps<typeof Text>) {
  return <Text variant="muted" {...props} />;
}

function InputGroupInput({ containerStyle, style, ...props }: InputProps) {
  const { index, total } = useInputGroupSlot();
  const controlInset = {
    paddingLeft: 0,
    paddingRight: index === total - 1 ? EDGE_INSET : 0,
  };

  return (
    <Input
      variant="ghost"
      containerStyle={[
        styles.controlWrap,
        controlInset,
        containerStyle,
      ]}
      style={[styles.control, style]}
      {...props}
    />
  );
}

function InputGroupTextarea({ containerStyle, style, ...props }: TextareaProps) {
  const { index, total } = useInputGroupSlot();
  const controlInset = {
    paddingLeft: 0,
    paddingRight: index === total - 1 ? EDGE_INSET : 0,
  };

  return (
    <Textarea
      variant="ghost"
      containerStyle={[
        styles.controlWrap,
        controlInset,
        containerStyle,
      ]}
      style={[styles.textarea, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  group: {
    width: "100%",
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  addon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  controlWrap: {
    flex: 1,
  },
  control: {
    paddingHorizontal: 8,
  },
  textarea: {
    minHeight: 96,
    paddingHorizontal: 0,
  },
});

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
