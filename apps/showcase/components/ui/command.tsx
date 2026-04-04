import * as React from "react";
import { Pressable, StyleSheet, View, type PressableProps, type ViewProps } from "react-native";

import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useRegistryTheme } from "@/components/ui/theme";

type CommandContextValue = {
  query: string;
  setQuery: (value: string) => void;
  visibleMatchCount: number;
  setItemMatch: (id: string, matched: boolean | null) => void;
};

const CommandContext = React.createContext<CommandContextValue | null>(null);

function useCommandContext() {
  const context = React.useContext(CommandContext);

  if (!context) {
    throw new Error("Command components must be used inside Command.");
  }

  return context;
}

type CommandProps = ViewProps & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

function Command({ value, defaultValue = "", onValueChange, children, ...props }: CommandProps) {
  const [internalQuery, setInternalQuery] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const query = isControlled ? value : internalQuery;
  const setQuery = React.useCallback(
    (next: string) => {
      if (!isControlled) {
        setInternalQuery(next);
      }
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const matchesRef = React.useRef(new Map<string, boolean>());
  const [visibleMatchCount, setVisibleMatchCount] = React.useState(0);

  const setItemMatch = React.useCallback((id: string, matched: boolean | null) => {
    if (matched === null) {
      matchesRef.current.delete(id);
    } else {
      matchesRef.current.set(id, matched);
    }
    let count = 0;
    for (const v of matchesRef.current.values()) {
      if (v) count += 1;
    }
    setVisibleMatchCount(count);
  }, []);

  return (
    <CommandContext.Provider value={{ query, setQuery, visibleMatchCount, setItemMatch }}>
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
  const { query, visibleMatchCount } = useCommandContext();
  if (!query.trim() || visibleMatchCount > 0) {
    return null;
  }
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
  const { query, setItemMatch } = useCommandContext();
  const theme = useRegistryTheme();
  const id = React.useId();
  const haystack = [value, ...(keywords ?? [])].join(" ").toLowerCase();
  const visible = haystack.includes(query.trim().toLowerCase());

  React.useEffect(() => {
    setItemMatch(id, visible);
    return () => setItemMatch(id, null);
  }, [id, setItemMatch, visible]);

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
    minHeight: 48,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
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
