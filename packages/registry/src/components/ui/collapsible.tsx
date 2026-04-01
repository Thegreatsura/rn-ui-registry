import * as React from 'react';
import {
    Pressable,
    StyleSheet,
    View,
    type PressableProps,
    type ViewProps,
} from 'react-native';

type CollapsibleContextValue = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type CollapsibleProps = ViewProps & {
    children?: React.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
};

type CollapsibleTriggerProps = PressableProps & {
    asChild?: boolean;
    children?: React.ReactNode;
};

type CollapsibleContentProps = ViewProps & {
    children?: React.ReactNode;
};

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext() {
    const context = React.useContext(CollapsibleContext);

    if (!context) {
        throw new Error('Collapsible components must be used inside Collapsible.');
    }

    return context;
}

function Collapsible({
    children,
    defaultOpen = false,
    open,
    onOpenChange,
    ...props
}: CollapsibleProps) {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
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
        <CollapsibleContext.Provider value={{ open: resolvedOpen, setOpen }}>
            <View {...props}>{children}</View>
        </CollapsibleContext.Provider>
    );
}

function CollapsibleTrigger({
    asChild = false,
    children,
    onPress,
    ...props
}: CollapsibleTriggerProps) {
    const { open, setOpen } = useCollapsibleContext();

    const handlePress = React.useCallback(
        (event: Parameters<NonNullable<PressableProps['onPress']>>[0]) => {
            onPress?.(event);
            setOpen((value) => !value);
        },
        [onPress, setOpen],
    );

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(
            children as React.ReactElement<{
                onPress?: PressableProps['onPress'];
                accessibilityState?: { expanded?: boolean };
            }>,
            {
                onPress: handlePress,
                accessibilityState: { expanded: open },
            },
        );
    }

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: open }}
            onPress={handlePress}
            {...props}
        >
            {children}
        </Pressable>
    );
}

function CollapsibleContent({
    children,
    style,
    ...props
}: CollapsibleContentProps) {
    const { open } = useCollapsibleContext();

    if (!open) {
        return null;
    }

    return (
        <View style={[styles.content, style]} {...props}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        marginTop: 12,
    },
});

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
export type {
    CollapsibleContentProps,
    CollapsibleProps,
    CollapsibleTriggerProps,
};
