import * as React from "react";
import { Pressable, StyleSheet, View, type PressableProps, type ViewProps } from "react-native";

import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useRegistryTheme } from "@/components/ui/theme";

type CommandContextValue = {
  query: string;
  setQuery: (value: string) => void;
};

const CommandContext = React.createContext<CommandContextValue | null>(null);

function useCommandContext() {
  const context = React.useContext(CommandContext);

  if (!context) {
    throw new Error("Command components must be used inside Command.");
  }

  return context;
}

function Command({ children, ...props }: ViewProps) {
  const [query, setQuery] = React.useState("");

  return (
    <CommandContext.Provider value={{ query, setQuery }}>
      <View style={styles.command} {...props}>
        {children}
      </View>
    </CommandContext.Provider>
  );
}

function CommandInput(props: React.ComponentProps<typeof Input>) {
  const { query, setQuery } = useCommandContext();
  return (
    <Input
      value={query}
      onChangeText={setQuery}
      placeholder="Search commands..."
      {...props}
    />
  );
}

function CommandList({ style, ...props }: ViewProps) {
  return <View style={[styles.list, style]} {...props} />;
}

function CommandEmpty(props: React.ComponentProps<typeof Text>) {
  return <Text variant="muted" {...props} />;
}

function CommandGroup({ style, ...props }: ViewProps) {
  return <View style={[styles.group, style]} {...props} />;
}

function CommandSeparator({ style, ...props }: ViewProps) {
  const theme = useRegistryTheme();
  return <View style={[styles.separator, { backgroundColor: theme.border }, style]} {...props} />;
}

type CommandItemProps = PressableProps & {
  value: string;
  keywords?: string[];
  onSelect?: (value: string) => void;
  children?: React.ReactNode;
};

function CommandItem({ value, keywords, onPress, onSelect, children, style, ...props }: CommandItemProps) {
  const { query } = useCommandContext();
  const theme = useRegistryTheme();
  const haystack = [value, ...(keywords ?? [])].join(" ").toLowerCase();
  const visible = haystack.includes(query.trim().toLowerCase());

  if (!visible) {
    return null;
  }

  return (
    <Pressable
      onPress={(event) => {
        onPress?.(event);
        onSelect?.(value);
      }}
      style={({ pressed }) => [
        styles.item,
        { backgroundColor: pressed ? theme.muted : "transparent" },
        style as any,
      ]}
      {...props}
    >
      {typeof children === "string" ? <Text>{children}</Text> : children}
    </Pressable>
  );
}

function CommandShortcut(props: React.ComponentProps<typeof Text>) {
  return <Text variant="muted" style={[styles.shortcut, props.style]} {...props} />;
}

const styles = StyleSheet.create({
  command: {
    gap: 12,
  },
  list: {
    gap: 4,
  },
  group: {
    gap: 6,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
    marginVertical: 4,
  },
  item: {
    minHeight: 36,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  shortcut: {
    marginLeft: "auto",
  },
});

export {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
