import * as React from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    View,
    type LayoutChangeEvent,
    type PressableProps,
    type TextProps,
    type ViewProps,
} from 'react-native';

import { Text, TextStyleContext } from './text';
import { useRegistryTheme } from '../../lib/theme';

type DropdownMenuContextValue = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    triggerLayout: { x: number; y: number; width: number; height: number };
    setTriggerLayout: React.Dispatch<
        React.SetStateAction<{
            x: number;
            y: number;
            width: number;
            height: number;
        }>
    >;
    syncTriggerLayout: () => void;
};

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuContext() {
    const context = React.useContext(DropdownMenuContext);

    if (!context) {
        throw new Error('Dropdown menu components must be used inside DropdownMenu.');
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
            value={{
                open: resolvedOpen,
                setOpen,
                triggerLayout,
                setTriggerLayout,
                syncTriggerLayout,
            }}
        >
            <View ref={triggerRef} style={styles.root} collapsable={false}>
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
        (event: Parameters<NonNullable<PressableProps['onPress']>>[0]) => {
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
                {React.cloneElement(children as React.ReactElement<{ onPress?: PressableProps['onPress'] }>, {
                    onPress: handlePress,
                })}
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

    if (!open) {
        return null;
    }

    const screenWidth = 390;
    const screenHeight = 844;
    const margin = 16;
    const gap = 10;
    const preferredWidth = Math.max(triggerLayout.width + 48, 212);
    const contentWidth = Math.min(Math.max(contentLayout.width, preferredWidth), 228);
    const alignRightLeft = triggerLayout.x + triggerLayout.width - contentWidth;
    const left = Math.min(
        Math.max(
            triggerLayout.x + contentWidth > screenWidth - margin
                ? alignRightLeft
                : triggerLayout.x,
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
            <View style={styles.modalRoot} pointerEvents="box-none">
                <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />
                <View
                    style={[
                        styles.content,
                        {
                            top,
                            left,
                            width: contentWidth,
                            backgroundColor: theme.background,
                            borderColor: theme.border,
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
    return <View style={[styles.group, props.style]} {...props} />;
}

function DropdownMenuLabel(props: TextProps) {
    const theme = useRegistryTheme();

    return (
        <Text
            variant="muted"
            style={[styles.label, { color: theme.mutedForeground }, props.style]}
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
                if (disabled) {
                    return;
                }
                onPress?.(event);
                setOpen(false);
            }}
            style={({ pressed }) => [
                styles.item,
                {
                    backgroundColor: pressed ? theme.secondary : theme.background,
                    borderColor: 'transparent',
                    opacity: disabled ? 0.45 : 1,
                },
                style as any,
            ]}
            {...props}
        >
            <TextStyleContext.Provider
                value={{
                    color: theme.foreground,
                    fontSize: 15,
                    fontWeight: '400',
                    lineHeight: 20,
                }}
            >
                {typeof children === 'string' ? <Text>{children}</Text> : children}
            </TextStyleContext.Provider>
        </Pressable>
    );
}

function DropdownMenuSeparator({ style, ...props }: ViewProps) {
    const theme = useRegistryTheme();
    return <View style={[styles.separator, { backgroundColor: theme.border }, style]} {...props} />;
}

function DropdownMenuShortcut(props: React.ComponentProps<typeof Text>) {
    const theme = useRegistryTheme();

    return (
        <Text
            variant="muted"
            style={[styles.shortcut, { color: theme.mutedForeground }, props.style]}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    root: {
        alignSelf: 'flex-start',
    },
    modalRoot: {
        flex: 1,
    },
    content: {
        position: 'absolute',
        zIndex: 100,
        borderRadius: 12,
        borderWidth: 1,
        padding: 3,
        gap: 1,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 14,
        elevation: 6,
    },
    group: {
        gap: 0,
    },
    item: {
        minHeight: 32,
        borderRadius: 6,
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    label: {
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: 0,
        lineHeight: 16,
        paddingHorizontal: 8,
        paddingTop: 5,
        paddingBottom: 4,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        marginVertical: 3,
        marginHorizontal: -3,
    },
    shortcut: {
        marginLeft: 'auto',
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
    },
});

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
