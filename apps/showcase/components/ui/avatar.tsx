/** @jsxImportSource react */
import * as React from "react";
import {
  Image,
  StyleSheet,
  View,
  type ImageProps,
  type TextStyle,
  type ViewProps,
} from "react-native";

import { TextStyleContext } from "@/components/ui/text";
import { useRegistryTheme } from "@/components/ui/theme";

type AvatarProps = ViewProps & {
  alt?: string;
  className?: string;
  size?: "default" | "sm" | "lg";
};

type AvatarImageProps = ImageProps & {
  className?: string;
  src?: string;
};

type AvatarFallbackProps = ViewProps & {
  className?: string;
};

const styles = StyleSheet.create({
  base: { borderRadius: 999, height: 40, overflow: "hidden", width: 40 },
  image: { height: "100%", width: "100%" },
  fallback: { alignItems: "center", flex: 1, justifyContent: "center" },
  sizeSm: { height: 32, width: 32 },
  sizeLg: { height: 56, width: 56 },
  sizeXl: { height: 80, width: 80 },
});

function getSizeStyle(className?: string, size: AvatarProps["size"] = "default") {
  if (size === "sm") return styles.sizeSm;
  if (size === "lg") return styles.sizeLg;
  if (!className) return undefined;
  if (className.includes("h-20") || className.includes("w-20") || className.includes("size-20")) return styles.sizeXl;
  if (className.includes("h-16") || className.includes("w-16") || className.includes("size-16")) return styles.sizeLg;
  if (className.includes("h-10") || className.includes("w-10") || className.includes("size-10")) return styles.base;
  if (className.includes("h-8") || className.includes("w-8") || className.includes("size-8")) return styles.sizeSm;
  return undefined;
}

function Avatar({ className, size = "default", style, ...props }: AvatarProps) {
  return <View style={[styles.base, getSizeStyle(className, size), style]} {...props} />;
}

function AvatarImage({ style, src, source, ...props }: AvatarImageProps) {
  return <Image style={[styles.image, style]} source={source ?? (src ? { uri: src } : undefined)} {...props} />;
}

function AvatarFallback({ style, ...props }: AvatarFallbackProps) {
  const theme = useRegistryTheme();
  const textStyle = React.useMemo<TextStyle>(
    () => ({ color: theme.mutedForeground, fontSize: 14, fontWeight: "500" }),
    [theme.mutedForeground],
  );

  return (
    <TextStyleContext.Provider value={textStyle}>
      <View style={[styles.fallback, { backgroundColor: theme.muted }, style]} {...props} />
    </TextStyleContext.Provider>
  );
}

export { Avatar, AvatarFallback, AvatarImage };
export type { AvatarFallbackProps, AvatarImageProps, AvatarProps };
