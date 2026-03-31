/** @jsxImportSource react */
import * as React from "react";
import {
  Platform,
  StyleSheet,
  Text as RNText,
  type Role,
  type StyleProp,
  type TextStyle,
} from "react-native";

import { useRegistryTheme } from "@/components/ui/theme";

type TextVariant =
  | "default"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "blockquote"
  | "code"
  | "lead"
  | "large"
  | "small"
  | "muted";

type TextProps = React.ComponentProps<typeof RNText> &
  React.RefAttributes<RNText> & {
    asChild?: boolean;
    className?: string;
    variant?: TextVariant;
  };

const ROLE: Partial<Record<TextVariant, Role>> = {
  h1: "heading",
  h2: "heading",
  h3: "heading",
  h4: "heading",
  blockquote: Platform.select({ web: "blockquote" as Role }),
  code: Platform.select({ web: "code" as Role }),
};

const ARIA_LEVEL: Partial<Record<TextVariant, string>> = {
  h1: "1",
  h2: "2",
  h3: "3",
  h4: "4",
};

const TextStyleContext = React.createContext<StyleProp<TextStyle> | undefined>(
  undefined,
);

const styles = StyleSheet.create({
  base: { fontSize: 16, letterSpacing: -0.1 },
  defaultTextStyles: {},
  h1: { fontSize: 36, fontWeight: "800", letterSpacing: -0.8, lineHeight: 40 },
  h2: {
    fontSize: 30,
    fontWeight: "600",
    letterSpacing: -0.6,
    lineHeight: 34,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  h3: { fontSize: 24, fontWeight: "600", letterSpacing: -0.4, lineHeight: 28 },
  h4: { fontSize: 20, fontWeight: "600", letterSpacing: -0.2, lineHeight: 24 },
  p: { lineHeight: 24 },
  blockquote: { borderLeftWidth: 3, fontStyle: "italic", paddingLeft: 12 },
  code: {
    borderRadius: 6,
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }),
    fontSize: 13,
    fontWeight: "600",
    overflow: "hidden",
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  lead: { fontSize: 20, lineHeight: 28 },
  large: { fontSize: 18, fontWeight: "600", lineHeight: 24 },
  small: { fontSize: 14, fontWeight: "500", lineHeight: 14 },
  muted: { fontSize: 14, lineHeight: 20 },
});

function getVariantStyle(variant: TextVariant): StyleProp<TextStyle> {
  switch (variant) {
    case "h1": return styles.h1;
    case "h2": return styles.h2;
    case "h3": return styles.h3;
    case "h4": return styles.h4;
    case "p": return styles.p;
    case "blockquote": return styles.blockquote;
    case "code": return styles.code;
    case "lead": return styles.lead;
    case "large": return styles.large;
    case "small": return styles.small;
    case "muted": return styles.muted;
    default: return styles.defaultTextStyles;
  }
}

function Text({ style, asChild = false, variant = "default", ...props }: TextProps) {
  const inheritedStyle = React.useContext(TextStyleContext);
  const theme = useRegistryTheme();
  const Component = RNText;

  return (
    <Component
      style={[
        styles.base,
        { color: theme.foreground },
        getVariantStyle(variant),
        variant === "h2" ? { borderBottomColor: theme.border } : undefined,
        variant === "blockquote" ? { borderLeftColor: theme.border } : undefined,
        variant === "code" ? { backgroundColor: theme.muted } : undefined,
        variant === "lead" || variant === "muted" ? { color: theme.mutedForeground } : undefined,
        inheritedStyle,
        style,
      ]}
      role={ROLE[variant]}
      aria-level={ARIA_LEVEL[variant]}
      {...props}
    />
  );
}

export { Text, TextStyleContext };
