import * as React from "react";
import {
  ActivityIndicator,
  type ActivityIndicatorProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useRegistryTheme } from "@/components/ui/theme";

type SpinnerSize = "sm" | "default" | "lg";

type SpinnerProps = Omit<ActivityIndicatorProps, "size" | "color"> & {
  size?: SpinnerSize;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const SIZE_MAP: Record<SpinnerSize, number> = {
  sm: 16,
  default: 22,
  lg: 30,
};

function Spinner({
  size = "default",
  color,
  style,
  ...props
}: SpinnerProps) {
  const theme = useRegistryTheme();

  return (
    <ActivityIndicator
      size={SIZE_MAP[size]}
      color={color ?? theme.primary}
      style={style}
      {...props}
    />
  );
}

export { Spinner };
export type { SpinnerProps };
