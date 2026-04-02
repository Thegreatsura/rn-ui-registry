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

import { Text } from "@/components/ui/text";
import { useRegistryTheme } from "@/components/ui/theme";

type DrawerContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type DrawerProps = {
  children?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type DrawerTriggerProps = PressableProps & {
  asChild?: boolean;
  children?: React.ReactNode;
};

type DrawerContentProps = ViewProps & {
  children?: React.ReactNode;
};

type DrawerCloseProps = PressableProps & {
  asChild?: boolean;
  children?: React.ReactNode;
};

const DrawerContext = React.createContext<DrawerContextValue | null>(null);

function useDrawerContext() {
  const context = React.useContext(DrawerContext);

  if (!context) {
    throw new Error("Drawer components must be used inside Drawer.");
  }

  return context;
}

function Drawer({ children, defaultOpen = false, open, onOpenChange }: DrawerProps) {
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
    <DrawerContext.Provider value={{ open: resolvedOpen, setOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}

function DrawerTrigger({
  asChild = false,
  children,
  onPress,
  ...props
}: DrawerTriggerProps) {
  const { setOpen } = useDrawerContext();

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

function DrawerContent({ children, style, ...props }: DrawerContentProps) {
  const theme = useRegistryTheme();
  const { open, setOpen } = useDrawerContext();

  if (!open) {
    return null;
  }

  return (
    <Modal
      transparent
      animationType="slide"
      visible={open}
      onRequestClose={() => setOpen(false)}
    >
      <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
        <Pressable
          style={[
            styles.content,
            { backgroundColor: theme.card, borderColor: theme.border },
            style,
          ]}
          onPress={(event) => event.stopPropagation()}
          {...props}
        >
          <View style={[styles.handle, { backgroundColor: theme.border }]} />
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function DrawerHeader({ style, ...props }: ViewProps) {
  return <View style={[styles.header, style]} {...props} />;
}

function DrawerFooter({ style, ...props }: ViewProps) {
  return <View style={[styles.footer, style]} {...props} />;
}

function DrawerTitle({ style, ...props }: TextProps) {
  return <Text variant="large" style={style} {...props} />;
}

function DrawerDescription({ style, ...props }: TextProps) {
  return <Text variant="muted" style={style} {...props} />;
}

function DrawerClose({
  asChild = false,
  children,
  onPress,
  ...props
}: DrawerCloseProps) {
  const { setOpen } = useDrawerContext();

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
    justifyContent: "flex-end",
    paddingTop: 48,
    backgroundColor: "rgba(9, 9, 11, 0.24)",
  },
  content: {
    width: "100%",
    flexGrow: 0,
    flexShrink: 1,
    alignSelf: "stretch",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 16,
    overflow: "hidden",
  },
  handle: {
    alignSelf: "center",
    width: 44,
    height: 5,
    borderRadius: 999,
    marginBottom: 6,
  },
  header: {
    gap: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 4,
  },
});

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
};
export type {
  DrawerCloseProps,
  DrawerContentProps,
  DrawerProps,
  DrawerTriggerProps,
};
