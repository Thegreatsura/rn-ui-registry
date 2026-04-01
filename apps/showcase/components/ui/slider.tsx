import * as React from "react";
import {
  PanResponder,
  StyleSheet,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type ViewProps,
} from "react-native";

import { useRegistryTheme } from "@/components/ui/theme";

type SliderProps = ViewProps & {
  defaultValue?: number;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onValueChange?: (value: number) => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function snap(value: number, step: number, min: number) {
  return Math.round((value - min) / step) * step + min;
}

function Slider({
  defaultValue,
  value,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onValueChange,
  style,
  ...props
}: SliderProps) {
  const theme = useRegistryTheme();
  const trackRef = React.useRef<View>(null);
  const [trackMetrics, setTrackMetrics] = React.useState({ x: 0, width: 1 });
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? min);
  const isControlled = value !== undefined;
  const resolvedValue = clamp(isControlled ? value : internalValue, min, max);

  const updateValue = React.useCallback(
    (nextValue: number) => {
      const clamped = clamp(snap(nextValue, step, min), min, max);

      if (!isControlled) {
        setInternalValue(clamped);
      }

      onValueChange?.(clamped);
    },
    [isControlled, max, min, onValueChange, step],
  );

  const syncTrackMetrics = React.useCallback(() => {
    trackRef.current?.measureInWindow((x, _y, width) => {
      setTrackMetrics({
        x,
        width: Math.max(width, 1),
      });
    });
  }, []);

  const updateFromEvent = React.useCallback(
    (event: GestureResponderEvent, pointerX?: number) => {
      if (disabled) {
        return;
      }

      const absoluteX = pointerX ?? event.nativeEvent.pageX;
      const ratio = clamp(
        (absoluteX - trackMetrics.x) / trackMetrics.width,
        0,
        1,
      );
      updateValue(min + ratio * (max - min));
    },
    [disabled, max, min, trackMetrics.width, trackMetrics.x, updateValue],
  );

  const responder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: (event) => {
          syncTrackMetrics();
          updateFromEvent(event);
        },
        onPanResponderMove: (_event, gestureState) => {
          updateFromEvent(_event, gestureState.moveX);
        },
      }),
    [disabled, syncTrackMetrics, updateFromEvent],
  );

  const percentage = ((resolvedValue - min) / (max - min || 1)) * 100;

  const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
    setTrackMetrics((current) => ({
      ...current,
      width: Math.max(event.nativeEvent.layout.width, 1),
    }));
    requestAnimationFrame(syncTrackMetrics);
  }, [syncTrackMetrics]);

  return (
    <View
      style={[styles.root, disabled ? styles.disabled : null, style]}
      {...props}
    >
      <View
        ref={trackRef}
        onLayout={handleLayout}
        style={[styles.track, { backgroundColor: theme.secondary }]}
        {...responder.panHandlers}
      >
        <View
          style={[
            styles.range,
            { width: `${percentage}%`, backgroundColor: theme.primary },
          ]}
        />
        <View
          style={[
            styles.thumb,
            {
              left: `${percentage}%`,
              borderColor: theme.border,
              backgroundColor: theme.background,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    justifyContent: "center",
    paddingVertical: 10,
  },
  track: {
    width: "100%",
    height: 8,
    borderRadius: 999,
    justifyContent: "center",
  },
  range: {
    position: "absolute",
    left: 0,
    height: 8,
    borderRadius: 999,
  },
  thumb: {
    position: "absolute",
    width: 20,
    height: 20,
    marginLeft: -10,
    borderRadius: 999,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 1,
  },
  disabled: {
    opacity: 0.45,
  },
});

export { Slider };
export type { SliderProps };
