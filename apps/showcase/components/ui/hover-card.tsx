import * as React from 'react';
import {
    Pressable,
    StyleSheet,
    View,
    type LayoutChangeEvent,
    type PressableProps,
    type TextProps,
    type ViewProps,
} from 'react-native';

import { Text } from "@/components/ui/text";
import { useRegistryTheme } from "@/components/ui/theme";

type HoverCardContextValue = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    triggerLayout: { width: number; height: number };
    setTriggerLayout: (layout: { width: number; height: number }) => void;
};

type HoverCardProps = {
    children?: React.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
};

type HoverCardTriggerProps = PressableProps & {
    asChild?: boolean;
    children?: React.ReactNode;
};

type HoverCardContentProps = ViewProps & {
    children?: React.ReactNode;
    sideOffset?: number;
};

const HoverCardContext = React.createContext<HoverCardContextValue | null>(null);

function useHoverCardContext() {
    const context = React.useContext(HoverCardContext);

    if (!context) {
        throw new Error('Hover Card components must be used inside HoverCard.');
    }

    return context;
}

function HoverCard({
    children,
    defaultOpen = false,
    open,
    onOpenChange,
}: HoverCardProps) {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const [triggerLayout, setTriggerLayout] = React.useState({
        width: 0,
        height: 0,
    });
    const isControlled = open !== undefined;
    const resolvedOpen = isControlled ? open : internalOpen;

    const setOpen = React.useCallback<React.Dispatch<React.SetStateAction<boolean>>>(
        (value) => {
            const nextValue =
                typeof value === 'function' ? value(resolvedOpen) : value;

            if (!isControlled) {
                setInternalOpen(nextValue);
            }

            onOpenChange?.(nextValue);
        },
        [isControlled, onOpenChange, resolvedOpen],
    );

    return (
        <HoverCardContext.Provider
            value={{ open: resolvedOpen, setOpen, triggerLayout, setTriggerLayout }}
        >
            <View style={styles.root}>{children}</View>
        </HoverCardContext.Provider>
    );
}

function HoverCardTrigger({
    asChild = false,
    children,
    onPress,
    ...props
}: HoverCardTriggerProps) {
    const { setOpen, setTriggerLayout } = useHoverCardContext();

    const handlePress = React.useCallback(
        (event: Parameters<NonNullable<PressableProps['onPress']>>[0]) => {
            onPress?.(event);
            setOpen((value) => !value);
        },
        [onPress, setOpen],
    );

    const handleLayout = React.useCallback(
        (event: LayoutChangeEvent) => {
            const { width, height } = event.nativeEvent.layout;
            setTriggerLayout({ width, height });
        },
        [setTriggerLayout],
    );

    if (asChild && React.isValidElement(children)) {
        return (
            <View onLayout={handleLayout} collapsable={false}>
                {React.cloneElement(
                    children as React.ReactElement<{ onPress?: PressableProps['onPress'] }>,
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

function HoverCardContent({
    children,
    style,
    sideOffset = 10,
    ...props
}: HoverCardContentProps) {
    const theme = useRegistryTheme();
    const { open, triggerLayout } = useHoverCardContext();

    if (!open) {
        return null;
    }

    return (
        <View
            style={[
                styles.content,
                {
                    top: triggerLayout.height + sideOffset,
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                    minWidth: Math.max(triggerLayout.width, 260),
                },
                style,
            ]}
            {...props}
        >
            {children}
        </View>
    );
}

function HoverCardHeader({ style, ...props }: ViewProps) {
    return <View style={[styles.header, style]} {...props} />;
}

function HoverCardTitle({ style, ...props }: TextProps) {
    return <Text variant="large" style={style} {...props} />;
}

function HoverCardDescription({ style, ...props }: TextProps) {
    return <Text variant="muted" style={style} {...props} />;
}

const styles = StyleSheet.create({
    root: {
        position: 'relative',
        alignSelf: 'flex-start',
    },
    content: {
        position: 'absolute',
        left: 0,
        zIndex: 25,
        maxWidth: 340,
        borderRadius: 16,
        borderWidth: 1,
        padding: 20,
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
        elevation: 8,
    },
    header: {
        gap: 6,
    },
});

export {
    HoverCard,
    HoverCardContent,
    HoverCardDescription,
    HoverCardHeader,
    HoverCardTitle,
    HoverCardTrigger,
};
