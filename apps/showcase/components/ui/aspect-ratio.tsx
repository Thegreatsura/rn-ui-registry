import * as React from "react";
import { StyleSheet, View, type LayoutChangeEvent, type ViewProps } from "react-native";

type AspectRatioProps = ViewProps & {
  ratio?: number;
  children?: React.ReactNode;
};

function AspectRatio({
  ratio = 1,
  children,
  style,
  ...props
}: AspectRatioProps) {
  const [width, setWidth] = React.useState(0);

  const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  }, []);

  return (
    <View onLayout={handleLayout} style={[styles.root, style]} {...props}>
      <View style={{ width: "100%", height: width > 0 ? width / ratio : undefined }}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
  },
});

export { AspectRatio };
export type { AspectRatioProps };
