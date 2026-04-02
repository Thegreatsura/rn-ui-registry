import { TextStyleContext } from './text';
import { useRegistryTheme } from '../../lib/theme';
import * as React from 'react';
import {
    Pressable,
    StyleSheet,
    View,
    type PressableProps,
    type StyleProp,
    type ViewProps,
    type ViewStyle,
} from 'react-native';

type TabsContextValue = {
    value?: string;
    setValue: (value: string) => void;
};

type TabsProps = ViewProps & {
    children?: React.ReactNode;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
};

type TabsTriggerProps = Omit<PressableProps, 'children' | 'style'> & {
    value: string;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

type TabsContentProps = ViewProps & {
    value: string;
    children?: React.ReactNode;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
    const context = React.useContext(TabsContext);

    if (!context) {
        throw new Error('Tabs components must be used inside Tabs.');
    }

    return context;
}

function Tabs({
    children,
    value,
    defaultValue,
    onValueChange,
    ...props
}: TabsProps) {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = value !== undefined;
    const resolvedValue = isControlled ? value : internalValue;

    const setValue = React.useCallback(
        (nextValue: string) => {
            if (!isControlled) {
                setInternalValue(nextValue);
            }

            onValueChange?.(nextValue);
        },
        [isControlled, onValueChange],
    );

    return (
        <TabsContext.Provider value={{ value: resolvedValue, setValue }}>
            <View {...props}>{children}</View>
        </TabsContext.Provider>
    );
}

function TabsList({ style, ...props }: ViewProps) {
    const theme = useRegistryTheme();

    return (
        <View
            style={[
                styles.list,
                { backgroundColor: theme.muted, borderColor: theme.border },
                style,
            ]}
            {...props}
        />
    );
}

function TabsTrigger({ value, children, style, ...props }: TabsTriggerProps) {
    const theme = useRegistryTheme();
    const context = useTabsContext();
    const active = context.value === value;

    return (
        <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => context.setValue(value)}
            style={[
                styles.trigger,
                {
                    backgroundColor: active ? theme.background : 'transparent',
                    borderColor: active ? theme.border : 'transparent',
                },
                style,
            ]}
            {...props}
        >
            <TextStyleContext.Provider
                value={{
                    color: theme.foreground,
                    fontSize: 14,
                    fontWeight: '500',
                    lineHeight: 18,
                }}
            >
                {children}
            </TextStyleContext.Provider>
        </Pressable>
    );
}

function TabsContent({ value, children, ...props }: TabsContentProps) {
    const context = useTabsContext();

    if (context.value !== value) {
        return null;
    }

    return <View style={styles.content} {...props}>{children}</View>;
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        padding: 4,
        gap: 4,
    },
    trigger: {
        flex: 1,
        minHeight: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    content: {
        marginTop: 14,
    },
});

export { Tabs, TabsContent, TabsList, TabsTrigger };
export type { TabsContentProps, TabsProps, TabsTriggerProps };
