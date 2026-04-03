import * as React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type TextProps,
  type ViewProps,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@/components/ui/text";
import { useRegistryTheme } from "@/components/ui/theme";

type SheetSide = "top" | "right" | "bottom" | "left";

type SheetContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SheetContext = React.createContext<SheetContextValue | null>(null);

function useSheetContext() {
  const context = React.useContext(SheetContext);

  if (!context) {
    throw new Error("Sheet components must be used inside Sheet.");
  }

  return context;
}

function Sheet({
  children,
  defaultOpen = false,
  open,
  onOpenChange,
}: {
  children?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : internalOpen;

  const setOpen = React.useCallback<React.Dispatch<React.SetStateAction<boolean>>>(
    (value) => {
      const nextValue =
        typeof value === "function" ? value(resolvedOpen) : value;

      if (!isControlled) {
        setInternalOpen(nextValue);
      }

      onOpenChange?.(nextValue);
    },
    [isControlled, onOpenChange, resolvedOpen],
  );

  return (
    <SheetContext.Provider value={{ open: resolvedOpen, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

function SheetTrigger({
  asChild = false,
  children,
  onPress,
  ...props
}: PressableProps & { asChild?: boolean; children?: React.ReactNode }) {
  const { setOpen } = useSheetContext();

  const handlePress = React.useCallback(
    (event: Parameters<NonNullable<PressableProps["onPress"]>>[0]) => {
      onPress?.(event);
      setOpen(true);
    },
    [onPress, setOpen],
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{ onPress?: PressableProps["onPress"] }>,
      { onPress: handlePress },
    );
  }

  return (
    <Pressable onPress={handlePress} {...props}>
      {children}
    </Pressable>
  );
}

function SheetContent({
  children,
  style,
  side = "right",
  ...props
}: ViewProps & { side?: SheetSide; children?: React.ReactNode }) {
  const theme = useRegistryTheme();
  const insets = useSafeAreaInsets();
  const { open, setOpen } = useSheetContext();

  if (!open) {
    return null;
  }

  return (
    <Modal transparent animationType="fade" visible={open} onRequestClose={() => setOpen(false)}>
      <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
        <Pressable
          onPress={(event) => event.stopPropagation()}
          style={[
            styles.content,
            side === "right" ? styles.right : null,
            side === "left" ? styles.left : null,
            side === "top" ? styles.top : null,
            side === "bottom" ? styles.bottom : null,
            side === "right"
              ? {
                  paddingTop: 20 + insets.top,
                  paddingBottom: 20 + insets.bottom,
                }
              : null,
            side === "left"
              ? {
                  paddingTop: 20 + insets.top,
                  paddingBottom: 20 + insets.bottom,
                }
              : null,
            side === "top"
              ? {
                  top: 0,
                  paddingTop: 20 + insets.top,
                }
              : null,
            side === "bottom"
              ? {
                  bottom: 0,
                  paddingBottom: 20 + insets.bottom,
                }
              : null,
            { backgroundColor: theme.card, borderColor: theme.border },
            style,
          ]}
          {...props}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function SheetHeader({ style, ...props }: ViewProps) {
  return <View style={[styles.header, style]} {...props} />;
}

function SheetFooter({ style, ...props }: ViewProps) {
  return <View style={[styles.footer, style]} {...props} />;
}

function SheetTitle(props: TextProps) {
  return <Text variant="large" {...props} />;
}

function SheetDescription(props: TextProps) {
  return <Text variant="muted" {...props} />;
}

function SheetClose({
  asChild = false,
  children,
  onPress,
  ...props
}: PressableProps & { asChild?: boolean; children?: React.ReactNode }) {
  const { setOpen } = useSheetContext();

  const handlePress = React.useCallback(
    (event: Parameters<NonNullable<PressableProps["onPress"]>>[0]) => {
      onPress?.(event);
      setOpen(false);
    },
    [onPress, setOpen],
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{ onPress?: PressableProps["onPress"] }>,
      { onPress: handlePress },
    );
  }

  return (
    <Pressable onPress={handlePress} {...props}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(9, 9, 11, 0.24)",
  },
  content: {
    position: "absolute",
    borderWidth: 1,
    padding: 20,
    gap: 16,
  },
  right: {
    top: 0,
    right: 0,
    bottom: 0,
    width: "78%",
    maxWidth: 360,
  },
  left: {
    top: 0,
    left: 0,
    bottom: 0,
    width: "78%",
    maxWidth: 360,
  },
  top: {
    top: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  bottom: {
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  header: {
    gap: 8,
  },
  footer: {
    marginTop: "auto",
    gap: 10,
  },
});

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
