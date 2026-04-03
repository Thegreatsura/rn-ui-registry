import * as React from "react";
import {
  Modal,
  Pressable,
  View,
  type LayoutChangeEvent,
  type PressableProps,
  type TextProps,
  type ViewProps,
} from "react-native";

import { Text, TextStyleContext } from "@/components/ui/text";
import { useRegistryTheme } from "@/components/ui/theme";

type DropdownMenuContextValue = {
  open: boolean;
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  triggerLayout: { x: number; y: number; width: number; height: number };
  setTriggerLayout: (
    value:
      | { x: number; y: number; width: number; height: number }
      | ((prev: { x: number; y: number; width: number; height: number }) => {
          x: number;
          y: number;
          width: number;
          height: number;
        })
  ) => void;
  syncTriggerLayout: () => void;
};

const DropdownMenuContext =
  React.createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuContext() {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("Dropdown menu components must be used inside DropdownMenu.");
  }
  return context;
}

function DropdownMenu({
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
  const [triggerLayout, setTriggerLayout] = React.useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : internalOpen;
  const triggerRef = React.useRef<View>(null);

  const setOpen = React.useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const nextValue = typeof value === "function" ? value(resolvedOpen) : value;
      if (!isControlled) setInternalOpen(nextValue);
      onOpenChange?.(nextValue);
    },
    [isControlled, onOpenChange, resolvedOpen],
  );

  const syncTriggerLayout = React.useCallback(() => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({
        x,
        y,
        width: Math.max(width, 0),
        height: Math.max(height, 0),
      });
    });
  }, []);

  return (
    <DropdownMenuContext.Provider
      value={{ open: resolvedOpen, setOpen, triggerLayout, setTriggerLayout, syncTriggerLayout }}
    >
      <View ref={triggerRef} className="self-start" collapsable={false}>
        {children}
      </View>
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuTrigger({
  asChild = false,
  children,
  onPress,
  ...props
}: PressableProps & { asChild?: boolean; children?: React.ReactNode }) {
  const { setOpen, setTriggerLayout, syncTriggerLayout } = useDropdownMenuContext();

  const handlePress = React.useCallback(
    (event: Parameters<NonNullable<PressableProps["onPress"]>>[0]) => {
      onPress?.(event);
      syncTriggerLayout();
      setOpen((value) => !value);
    },
    [onPress, setOpen, syncTriggerLayout],
  );

  const handleLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      requestAnimationFrame(syncTriggerLayout);
      setTriggerLayout((current) => ({ ...current, width, height }));
    },
    [setTriggerLayout, syncTriggerLayout],
  );

  if (asChild && React.isValidElement(children)) {
    return (
      <View onLayout={handleLayout} collapsable={false}>
        {React.cloneElement(
          children as React.ReactElement<{ onPress?: PressableProps["onPress"] }>,
          { onPress: handlePress },
        )}
      </View>
    );
  }

  return (
    <View onLayout={handleLayout} collapsable={false}>
      <Pressable onPress={handlePress} {...props}>
        {children}
      </Pressable>
    </View>
  );
}

function DropdownMenuContent({ children, style, ...props }: ViewProps) {
  const theme = useRegistryTheme();
  const { open, triggerLayout, setOpen } = useDropdownMenuContext();
  const [contentLayout, setContentLayout] = React.useState({ width: 212, height: 0 });

  if (!open) return null;

  const screenWidth = 390;
  const screenHeight = 844;
  const margin = 16;
  const gap = 10;
  const preferredWidth = Math.max(triggerLayout.width + 48, 212);
const contentWidth = Math.max(contentLayout.width, preferredWidth);
  const alignRightLeft = triggerLayout.x + triggerLayout.width - contentWidth;
  const left = Math.min(
    Math.max(
      triggerLayout.x + contentWidth > screenWidth - margin ? alignRightLeft : triggerLayout.x,
      margin,
    ),
    screenWidth - contentWidth - margin,
  );
  const belowTop = triggerLayout.y + triggerLayout.height + gap;
  const aboveTop = triggerLayout.y - contentLayout.height - gap;
  const top =
    contentLayout.height > 0 &&
    belowTop + contentLayout.height > screenHeight - margin &&
    aboveTop >= margin
      ? aboveTop
      : Math.min(Math.max(belowTop, margin), screenHeight - contentLayout.height - margin);

  return (
    <Modal transparent visible animationType="fade" onRequestClose={() => setOpen(false)}>
      <View className="flex-1" pointerEvents="box-none">
        <Pressable
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          onPress={() => setOpen(false)}
        />
        <View
          className="absolute z-50 overflow-hidden rounded-xl p-1 border border-neutral-300 dark:border-neutral-800"
          style={[
            {
              top,
              left,
              width: contentWidth,
              backgroundColor: theme.background,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 16,
              elevation: 6,
            },
            style,
          ]}
          onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;
            setContentLayout({ width, height });
          }}
          {...props}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}

function DropdownMenuGroup(props: ViewProps) {
  return <View {...props} />;
}

function DropdownMenuLabel({ style, ...props }: TextProps) {
  return (
    <Text
      className="px-2 py-1.5 text-xs font-semibold text-muted-foreground"
      style={style}
      {...props}
    />
  );
}

function DropdownMenuItem({
  children,
  onPress,
  style,
  disabled,
  ...props
}: PressableProps & { children?: React.ReactNode }) {
  const theme = useRegistryTheme();
  const { setOpen } = useDropdownMenuContext();

  return (
    <Pressable
      disabled={disabled}
      onPress={(event) => {
        if (disabled) return;
        onPress?.(event);
        setOpen(false);
      }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? theme.accent : "transparent",
          opacity: disabled ? 0.45 : 1,
        },
        style as never,
      ]}
      className="min-h-8 flex-row items-center gap-2 rounded-md px-2 py-1.5"
      {...props}
    >
      <TextStyleContext.Provider
        value={{
          color: theme.foreground,
          fontSize: 14,
          fontWeight: "400",
          lineHeight: 20,
          flex: 1,
        }}
      >
        {typeof children === "string" ? <Text>{children}</Text> : children}
      </TextStyleContext.Provider>
    </Pressable>
  );
}

function DropdownMenuSeparator({ style, ...props }: ViewProps) {
  return (
    <View
      className="-mx-1 my-1 h-px bg-border"
      style={style}
      {...props}
    />
  );
}

function DropdownMenuShortcut({ style, ...props }: React.ComponentProps<typeof Text>) {
  return (
    <Text
      className="ml-auto text-xs font-normal text-muted-foreground"
      style={style}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
};