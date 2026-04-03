import * as React from "react";
import { Pressable, StyleSheet, View, type PressableProps, type TextProps, type ViewProps } from "react-native";

import { Text } from "@/components/ui/text";
import { useRegistryTheme } from "@/components/ui/theme";

function Breadcrumb(props: ViewProps) {
  return <View accessibilityRole="summary" {...props} />;
}

function BreadcrumbList({ style, ...props }: ViewProps) {
  return <View style={[styles.list, style]} {...props} />;
}

function BreadcrumbItem({ style, ...props }: ViewProps) {
  return <View style={[styles.item, style]} {...props} />;
}

function BreadcrumbLink({ children, style, ...props }: PressableProps & { children?: React.ReactNode }) {
  const theme = useRegistryTheme();
  return (
    <Pressable {...props}>
      <Text style={[styles.link, { color: theme.mutedForeground }, style as TextProps["style"]]}>
        {children}
      </Text>
    </Pressable>
  );
}

function BreadcrumbPage({ children, style, ...props }: TextProps) {
  return (
    <Text accessibilityRole="text" style={[styles.page, style]} {...props}>
      {children}
    </Text>
  );
}

function BreadcrumbSeparator({ children, style, ...props }: TextProps) {
  const theme = useRegistryTheme();
  return (
    <Text
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={[styles.separator, { color: theme.mutedForeground }, style]}
      {...props}
    >
      {children ?? "›"}
    </Text>
  );
}

function BreadcrumbEllipsis(props: TextProps) {
  return <BreadcrumbSeparator {...props}>…</BreadcrumbSeparator>;
}

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  link: {
    fontSize: 14,
    lineHeight: 18,
  },
  page: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
  },
  separator: {
    fontSize: 14,
    lineHeight: 18,
  },
});

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
