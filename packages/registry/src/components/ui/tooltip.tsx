import * as React from 'react';
import {
    Pressable,
    StyleSheet,
    View,
    type PressableProps,
    type TextProps,
    type ViewProps,
} from 'react-native';
import { Text } from './text';

type TooltipContextValue = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type TooltipProps = {
    children?: React.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
};

type TooltipTriggerProps = PressableProps & {
    asChild?: boolean;
    children?: React.ReactNode;
};

type TooltipContentProps = ViewProps & {
    children?: React.ReactNode;
};

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

function useTooltipContext() {
    const context = React.useContext(TooltipContext);

    if (!context) {
        throw new Error('Tooltip components must be used inside Tooltip.');
    }

    return context;
}

function Tooltip({
    children,
    defaultOpen = false,
    open,
    onOpenChange,
}: TooltipProps) {
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
        <TooltipContext.Provider value={{ open: resolvedOpen, setOpen }}>
            <View style={[styles.root, resolvedOpen ? styles.rootOpen : null]}>
                {children}
            </View>
        </TooltipContext.Provider>
    );
}

function TooltipProvider({ children }: { children?: React.ReactNode }) {
    return <>{children}</>;
}

function TooltipTrigger({
    asChild = false,
    children,
    onLongPress,
    onPressIn,
    onPressOut,
    ...props
}: TooltipTriggerProps) {
    const { setOpen } = useTooltipContext();

    const handleLongPress = React.useCallback(
        (event: Parameters<NonNullable<PressableProps['onLongPress']>>[0]) => {
            onLongPress?.(event);
            setOpen(true);
        },
        [onLongPress, setOpen],
    );

    const handlePressIn = React.useCallback(
        (event: Parameters<NonNullable<PressableProps['onPressIn']>>[0]) => {
            onPressIn?.(event);
            setOpen(true);
        },
        [onPressIn, setOpen],
    );

    const handlePressOut = React.useCallback(
        (event: Parameters<NonNullable<PressableProps['onPressOut']>>[0]) => {
            onPressOut?.(event);
            setOpen(false);
        },
        [onPressOut, setOpen],
    );

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(
            children as React.ReactElement<{
                onLongPress?: PressableProps['onLongPress'];
                onPressIn?: PressableProps['onPressIn'];
                onPressOut?: PressableProps['onPressOut'];
            }>,
            {
                onLongPress: handleLongPress,
                onPressIn: handlePressIn,
                onPressOut: handlePressOut,
            },
        );
    }

    return (
        <Pressable
            onLongPress={handleLongPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            {...props}
        >
            {children}
        </Pressable>
    );
}

function TooltipContent({ children, style, ...props }: TooltipContentProps) {
    const { open } = useTooltipContext();

    if (!open) {
        return null;
    }

    return (
        <View style={[styles.content, style]} {...props}>
            {children}
        </View>
    );
}

function TooltipText({ style, ...props }: TextProps) {
    return <Text style={[styles.text, style]} {...props} />;
}

const styles = StyleSheet.create({
    root: {
        alignSelf: 'flex-start',
    },
    content: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        zIndex: 60,
        marginTop: 8,
        minWidth: 120,
        marginLeft: -60,
        borderRadius: 10,
        backgroundColor: '#09090b',
        paddingHorizontal: 10,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 16,
        elevation: 60,
    },
    text: {
        color: '#fafafa',
        fontSize: 12,
        lineHeight: 16,
    },
    rootOpen: {
        zIndex: 50,
        elevation: 50,
    },
});

export {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipText,
    TooltipTrigger,
};
export type { TooltipContentProps, TooltipProps, TooltipTriggerProps };
