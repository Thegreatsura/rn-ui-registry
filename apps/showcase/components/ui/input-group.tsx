import * as React from "react";
import { StyleSheet, View, type ViewProps } from "react-native";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Input, type InputProps } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Textarea, type TextareaProps } from "@/components/ui/textarea";
import { useRegistryTheme } from "@/components/ui/theme";

function InputGroup({ style, ...props }: ViewProps) {
  const theme = useRegistryTheme();

  return (
    <View
      style={[
        styles.group,
        { backgroundColor: theme.background, borderColor: theme.input },
        style,
      ]}
      {...props}
    />
  );
}

function InputGroupAddon({ style, ...props }: ViewProps) {
  return <View style={[styles.addon, style]} {...props} />;
}

function InputGroupButton(props: ButtonProps) {
  return <Button size="sm" variant="ghost" {...props} />;
}

function InputGroupText(props: React.ComponentProps<typeof Text>) {
  return <Text variant="muted" {...props} />;
}

function InputGroupInput({ containerStyle, style, ...props }: InputProps) {
  return (
    <Input
      variant="ghost"
      containerStyle={[styles.controlWrap, containerStyle]}
      style={[styles.control, style]}
      {...props}
    />
  );
}

function InputGroupTextarea({ containerStyle, style, ...props }: TextareaProps) {
  return (
    <Textarea
      variant="ghost"
      containerStyle={[styles.controlWrap, containerStyle]}
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
    paddingHorizontal: 10,
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
    paddingHorizontal: 0,
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
