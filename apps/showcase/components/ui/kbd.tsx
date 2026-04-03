import * as React from "react";
import { StyleSheet, View, type TextProps, type ViewProps } from "react-native";

import { Text } from "@/components/ui/text";
import { useRegistryTheme } from "@/components/ui/theme";

function Kbd({ style, ...props }: TextProps) {
  const theme = useRegistryTheme();

  return (
    <View style={[styles.base, { backgroundColor: theme.muted }, style as ViewProps["style"]]}>
      <Text variant="small" style={{ color: theme.mutedForeground }} {...props} />
    </View>
  );
}

function KbdGroup({ style, ...props }: ViewProps) {
  return <View style={[styles.group, style]} {...props} />;
}

const styles = StyleSheet.create({
  base: {
    minWidth: 20,
    height: 22,
    paddingHorizontal: 6,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  group: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});

export { Kbd, KbdGroup };
