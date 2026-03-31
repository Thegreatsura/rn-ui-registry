/** @jsxImportSource react */
import * as React from "react";
import { Animated, StyleSheet, View, type ViewProps } from "react-native";

import { useRegistryTheme } from "@/components/ui/theme";

type ProgressProps = ViewProps & {
  value?: number;
  max?: number;
};

function Progress({ value = 0, max = 100, style, ...props }: ProgressProps) {
  const theme = useRegistryTheme();
  const widthAnim = React.useRef(new Animated.Value(0)).current;
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  React.useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: percentage,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [percentage, widthAnim]);

  const animatedStyle = {
    width: widthAnim.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
    }),
  };

  return (
    <View style={[styles.track, { backgroundColor: theme.secondary }, style]} {...props}>
      <Animated.View style={[styles.fill, { backgroundColor: theme.primary }, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 8, width: "100%", borderRadius: 4, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 999 },
});

export { Progress };
