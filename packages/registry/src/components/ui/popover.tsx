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
import { Text } from './text';
import { useRegistryTheme } from '../../lib/theme';

type PopoverContextValue = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    triggerLayout: { width: number; height: number };
    setTriggerLayout: (layout: { width: number; height: number }) => void;
};

type PopoverProps = {
    children?: React.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
};

type PopoverTriggerProps = PressableProps & {
    asChild?: boolean;
    children?: React.ReactNode;
};

type PopoverContentProps = ViewProps & {
    children?: React.ReactNode;
    sideOffset?: number;
};

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
    const context = React.useContext(PopoverContext);

    if (!context) {
        throw new Error('Popover components must be used inside Popover.');
    }

    return context;
}

function Popover({
    children,
    defaultOpen = false,
    open,
    onOpenChange,
}: PopoverProps) {
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
        <PopoverContext.Provider
            value={{ open: resolvedOpen, setOpen, triggerLayout, setTriggerLayout }}
        >
            <View style={styles.root}>{children}</View>
        </PopoverContext.Provider>
    );
}

function PopoverTrigger({
    asChild = false,
    children,
    onPress,
    ...props
}: PopoverTriggerProps) {
    const { setOpen, setTriggerLayout } = usePopoverContext();

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

function PopoverContent({
    children,
    style,
    sideOffset = 10,
    ...props
}: PopoverContentProps) {
    const theme = useRegistryTheme();
    const { open, triggerLayout } = usePopoverContext();

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
                    minWidth: Math.max(triggerLayout.width, 220),
                },
                style,
            ]}
            {...props}
        >
            {children}
        </View>
    );
}

function PopoverHeader({ style, ...props }: ViewProps) {
    return <View style={[styles.header, style]} {...props} />;
}

function PopoverTitle({ style, ...props }: TextProps) {
    return <Text variant="large" style={style} {...props} />;
}

function PopoverDescription({ style, ...props }: TextProps) {
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
        zIndex: 20,
        maxWidth: 320,
        borderRadius: 18,
        borderWidth: 1,
        padding: 16,
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 6,
    },
    header: {
        gap: 6,
    },
});

export {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
};
export type { PopoverContentProps, PopoverProps, PopoverTriggerProps };
