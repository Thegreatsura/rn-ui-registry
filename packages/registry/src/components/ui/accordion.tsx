/** @jsxImportSource react */
import * as React from 'react';
import { View, StyleSheet, type PressableProps, type ViewProps, type StyleProp, type ViewStyle } from "react-native";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';
import { Text } from './text';
import { useRegistryTheme } from '../../lib/theme';
import { TextStyleContext } from './text';
import { ChevronDown } from 'lucide-react-native';

type AccordionContextValue = {
    type: 'single' | 'multiple';
    value: string | string[] | undefined;
    onItemToggle: (value: string) => void;
};

type AccordionItemContextValue = {
    value: string;
    open: boolean;
};

type AccordionProps = ViewProps & {
    children?: React.ReactNode;
    type?: 'single' | 'multiple';
    value?: string | string[];
    defaultValue?: string | string[];
    onValueChange?: (value: string | string[]) => void;
};

type AccordionItemProps = ViewProps & {
    children?: React.ReactNode;
    value: string;
};

type AccordionTriggerProps = PressableProps & {
    asChild?: boolean;
    children?: React.ReactNode;
};

type AccordionContentProps = ViewProps & {
    children?: React.ReactNode;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);
const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

function useAccordionContext() {
    const context = React.useContext(AccordionContext);

    if (!context) {
        throw new Error('Accordion components must be used inside Accordion.');
    }

    return context;
}

function useAccordionItemContext() {
    const context = React.useContext(AccordionItemContext);

    if (!context) {
        throw new Error('Accordion item components must be used inside AccordionItem.');
    }

    return context;
}

function Accordion({
    children,
    type = 'single',
    value,
    defaultValue,
    onValueChange,
    ...props
}: AccordionProps) {
    const [internalValue, setInternalValue] = React.useState<string | string[] | undefined>(
        defaultValue,
    );
    const isControlled = value !== undefined;
    const resolvedValue = isControlled ? value : internalValue;

    const onItemToggle = React.useCallback(
        (item: string) => {
            let nextValue: string | string[];

            if (type === 'single') {
                nextValue = resolvedValue === item ? '' : item;
            } else {
                const current = Array.isArray(resolvedValue) ? resolvedValue : [];
                nextValue = current.includes(item)
                    ? current.filter((entry) => entry !== item)
                    : [...current, item];
            }

            if (!isControlled) {
                setInternalValue(nextValue);
            }

            onValueChange?.(nextValue);
        },
        [isControlled, onValueChange, resolvedValue, type],
    );

    return (
        <AccordionContext.Provider value={{ type, value: resolvedValue, onItemToggle }}>
            <View {...props}>{children}</View>
        </AccordionContext.Provider>
    );
}

function AccordionItem({ children, value, style, ...props }: AccordionItemProps) {
    const context = useAccordionContext();
    const theme = useRegistryTheme();
    const open = Array.isArray(context.value)
        ? context.value.includes(value)
        : context.value === value;

    return (
        <AccordionItemContext.Provider value={{ value, open }}>
            <Collapsible 
                open={open} 
                onOpenChange={() => context.onItemToggle(value)} 
                style={[styles.item, { borderBottomColor: theme.border }, style]} 
                {...props}
            >
                {children}
            </Collapsible>
        </AccordionItemContext.Provider>
    );
}

function AccordionTrigger({ style, children, asChild = false, ...props }: AccordionTriggerProps) {
    const context = useAccordionItemContext();
    const theme = useRegistryTheme();
    const content =
        typeof children === 'string' || typeof children === 'number' ? (
            <Text>{children}</Text>
        ) : (
            children
        );

    return (
        <CollapsibleTrigger
            asChild={asChild}
            style={(state) => {
                const resolvedStyle = typeof style === "function" ? style(state) : style;
                return asChild ? (resolvedStyle as StyleProp<ViewStyle>) : [
                    state.pressed && styles.triggerPressed,
                    resolvedStyle as StyleProp<ViewStyle>,
                ];
            }}
            {...props}
        >
            {asChild ? (
                children
            ) : (
                <View style={styles.triggerInner}>
                    <TextStyleContext.Provider
                        value={{
                            fontSize: 16,
                            fontWeight: "500",
                            color: theme.foreground,
                        }}
                    >
                        {content}
                    </TextStyleContext.Provider>
                    <ChevronDown
                        size={18}
                        color={theme.mutedForeground}
                        style={{
                            transform: [{ rotate: context.open ? "180deg" : "0deg" }],
                        }}
                    />
                </View>
            )}
        </CollapsibleTrigger>
    );
}

function AccordionContent({ style, children, ...props }: AccordionContentProps) {
    useAccordionItemContext();
    return (
        <CollapsibleContent style={[styles.content, style]} {...props}>
            {children}
        </CollapsibleContent>
    );
}

const styles = StyleSheet.create({
    item: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    triggerInner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 16,
        width: "100%",
    },
    triggerPressed: {
        opacity: 0.8,
    },
    content: {
        paddingBottom: 16,
    },
});

function useAccordionItemOpen(): boolean {
    return useAccordionItemContext().open;
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, useAccordionItemOpen };
export type {
    AccordionContentProps,
    AccordionItemProps,
    AccordionProps,
    AccordionTriggerProps,
};
