import * as React from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    View,
    type PressableProps,
    type TextProps,
    type ViewProps,
} from 'react-native';
import { Text } from './text';
import { useRegistryTheme } from '../../lib/theme';

type DialogContextValue = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type DialogProps = {
    children?: React.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
};

type DialogTriggerProps = PressableProps & {
    asChild?: boolean;
    children?: React.ReactNode;
};

type DialogContentProps = ViewProps & {
    children?: React.ReactNode;
};

type DialogCloseProps = PressableProps & {
    asChild?: boolean;
    children?: React.ReactNode;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext() {
    const context = React.useContext(DialogContext);

    if (!context) {
        throw new Error('Dialog components must be used inside Dialog.');
    }

    return context;
}

function Dialog({
    children,
    defaultOpen = false,
    open,
    onOpenChange,
}: DialogProps) {
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
        <DialogContext.Provider value={{ open: resolvedOpen, setOpen }}>
            {children}
        </DialogContext.Provider>
    );
}

function DialogTrigger({
    asChild = false,
    children,
    onPress,
    ...props
}: DialogTriggerProps) {
    const { setOpen } = useDialogContext();

    const handlePress = React.useCallback(
        (event: Parameters<NonNullable<PressableProps['onPress']>>[0]) => {
            onPress?.(event);
            setOpen(true);
        },
        [onPress, setOpen],
    );

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(
            children as React.ReactElement<{ onPress?: PressableProps['onPress'] }>,
            { onPress: handlePress },
        );
    }

    return (
        <Pressable onPress={handlePress} {...props}>
            {children}
        </Pressable>
    );
}

function DialogContent({ children, style, ...props }: DialogContentProps) {
    const theme = useRegistryTheme();
    const { open, setOpen } = useDialogContext();

    if (!open) {
        return null;
    }

    return (
        <Modal
            transparent
            animationType="fade"
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
                    {children}
                </Pressable>
            </Pressable>
        </Modal>
    );
}

function DialogHeader({ style, ...props }: ViewProps) {
    return <View style={[styles.header, style]} {...props} />;
}

function DialogFooter({ style, ...props }: ViewProps) {
    return <View style={[styles.footer, style]} {...props} />;
}

function DialogTitle({ style, ...props }: TextProps) {
    return <Text variant="large" style={style} {...props} />;
}

function DialogDescription({ style, ...props }: TextProps) {
    return <Text variant="muted" style={style} {...props} />;
}

function DialogClose({
    asChild = false,
    children,
    onPress,
    ...props
}: DialogCloseProps) {
    const { setOpen } = useDialogContext();

    const handlePress = React.useCallback(
        (event: Parameters<NonNullable<PressableProps['onPress']>>[0]) => {
            onPress?.(event);
            setOpen(false);
        },
        [onPress, setOpen],
    );

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(
            children as React.ReactElement<{ onPress?: PressableProps['onPress'] }>,
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: 'rgba(9, 9, 11, 0.45)',
    },
    content: {
        width: '100%',
        maxWidth: 360,
        borderRadius: 20,
        borderWidth: 1,
        padding: 20,
        gap: 16,
    },
    header: {
        gap: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
});

export {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
};
export type {
    DialogCloseProps,
    DialogContentProps,
    DialogProps,
    DialogTriggerProps,
};
