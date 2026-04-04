import * as React from 'react';
import {
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    type LayoutChangeEvent,
    type PressableProps,
    type TextProps,
    type ViewProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text as UiText, TextStyleContext } from "@/components/ui/text";
import { useRegistryTheme } from "@/components/ui/theme";

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

type MenuRadioContextValue = {
    value?: string;
    onValueChange?: (value: string) => void;
};

const MenuRadioContext = React.createContext<MenuRadioContextValue | null>(null);

function useMenuRadioContext() {
    return React.useContext(MenuRadioContext);
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
            requestAnimationFrame(syncTriggerLayout);
            setTriggerLayout((current) => ({
                ...current,
                width: event.nativeEvent.layout.width,
                height: event.nativeEvent.layout.height,
            }));
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

type ContentAlign = 'start' | 'end' | 'center';

type DropdownMenuContentProps = ViewProps & {
    /** Horizontal alignment of the menu relative to the trigger (shadcn-style). */
    align?: ContentAlign;
    /** Gap between trigger and menu, in px. */
    sideOffset?: number;
    minWidth?: number;
    maxWidth?: number;
};

function DropdownMenuContent({
    children,
    style,
    align = 'start',
    sideOffset = 10,
    minWidth: minWidthProp,
    maxWidth: maxWidthProp,
    ...props
}: DropdownMenuContentProps) {
    const theme = useRegistryTheme();
    const insets = useSafeAreaInsets();
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const { open, triggerLayout, setOpen } = useDropdownMenuContext();
    const [contentHeight, setContentHeight] = React.useState(0);

    React.useEffect(() => {
        if (!open) {
            setContentHeight(0);
        }
    }, [open]);

    if (!open) {
        return null;
    }

    const edge = 16;
    const safeLeft = edge + insets.left;
    const safeRight = edge + insets.right;
    const safeTop = edge + insets.top;
    const safeBottom = edge + insets.bottom;
    const usableWidth = Math.max(0, screenWidth - safeLeft - safeRight);
    const maxW = maxWidthProp ?? usableWidth;
    const triggerW = triggerLayout.width || 0;
    const defaultMin = Math.min(Math.max(triggerW > 0 ? triggerW + 12 : 0, 204), maxW);
    const requestedMin =
        minWidthProp ?? (triggerW > 0 ? defaultMin : Math.min(260, maxW));
    const contentWidth = Math.min(maxW, Math.max(requestedMin, 0));

    const gap = sideOffset;

    let left = triggerLayout.x;
    if (align === 'end') {
        left = triggerLayout.x + triggerLayout.width - contentWidth;
    } else if (align === 'center') {
        left = triggerLayout.x + triggerLayout.width / 2 - contentWidth / 2;
    }

    const minLeft = safeLeft;
    const maxLeft = screenWidth - safeRight - contentWidth;
    left = Math.min(Math.max(left, minLeft), Math.max(maxLeft, minLeft));

    const belowTop = triggerLayout.y + triggerLayout.height + gap;
    const aboveTop = triggerLayout.y - contentHeight - gap;
    const top =
        contentHeight > 0 &&
        belowTop + contentHeight > screenHeight - safeBottom &&
        aboveTop >= safeTop
            ? aboveTop
            : Math.min(
                  Math.max(belowTop, safeTop),
                  Math.max(safeTop, screenHeight - safeBottom - contentHeight),
              );

    return (
        <Modal
            transparent
            visible
            animationType="fade"
            statusBarTranslucent
            onRequestClose={() => setOpen(false)}
        >
            <View style={styles.modalRoot} pointerEvents="box-none">
                <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />
                <View
                    style={[
                        styles.content,
                        {
                            top,
                            left,
                            width: contentWidth,
                            maxWidth: contentWidth,
                            backgroundColor: theme.background,
                            borderColor: theme.border,
                        },
                        style,
                    ]}
                    onLayout={(event) => {
                        const { height } = event.nativeEvent.layout;
                        setContentHeight(height);
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
        <UiText
            variant="muted"
            style={[styles.label, { color: theme.mutedForeground }, props.style]}
            {...props}
        />
    );
}

type ItemVariant = 'default' | 'destructive';

type DropdownMenuItemProps = PressableProps & {
    children?: React.ReactNode;
    /** Adds leading inset for icon rows (shadcn `inset`). */
    inset?: boolean;
    variant?: ItemVariant;
    /** When false, the menu stays open after press (default: true). */
    closeOnPress?: boolean;
};

function DropdownMenuItem({
    children,
    onPress,
    style,
    disabled,
    inset,
    variant = 'default',
    closeOnPress = true,
    ...props
}: DropdownMenuItemProps) {
    const theme = useRegistryTheme();
    const { setOpen } = useDropdownMenuContext();
    const destructive = variant === 'destructive';

    return (
        <Pressable
            disabled={disabled}
            onPress={(event) => {
                if (disabled) {
                    return;
                }
                onPress?.(event);
                if (closeOnPress) {
                    setOpen(false);
                }
            }}
            style={({ pressed }) => [
                styles.item,
                inset && styles.itemInset,
                {
                    backgroundColor: pressed
                        ? destructive
                            ? 'rgba(239, 68, 68, 0.12)'
                            : theme.secondary
                        : theme.background,
                    borderColor: 'transparent',
                    opacity: disabled ? 0.45 : 1,
                },
                style as object,
            ]}
            {...props}
        >
            <TextStyleContext.Provider
                value={{
                    color: destructive ? '#dc2626' : theme.foreground,
                    fontSize: 15,
                    fontWeight: '400',
                    lineHeight: 20,
                    flex: 1,
                }}
            >
                <View style={styles.itemInner}>
                    {typeof children === 'string' ? <UiText>{children}</UiText> : children}
                </View>
            </TextStyleContext.Provider>
        </Pressable>
    );
}

type DropdownMenuCheckboxItemProps = PressableProps & {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    children?: React.ReactNode;
};

function DropdownMenuCheckboxItem({
    children,
    checked = false,
    onCheckedChange,
    disabled,
    style,
    onPress,
    ...props
}: DropdownMenuCheckboxItemProps) {
    const theme = useRegistryTheme();

    return (
        <Pressable
            disabled={disabled}
            onPress={(event) => {
                if (disabled) return;
                onPress?.(event);
                onCheckedChange?.(!checked);
            }}
            style={({ pressed }) => [
                styles.item,
                styles.checkboxItem,
                {
                    backgroundColor: pressed ? theme.secondary : theme.background,
                    opacity: disabled ? 0.45 : 1,
                },
                style as object,
            ]}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: Boolean(checked), disabled: Boolean(disabled) }}
            {...props}
        >
            <View style={styles.checkboxItemInner}>
                <TextStyleContext.Provider
                    value={{
                        color: theme.foreground,
                        fontSize: 15,
                        fontWeight: '400',
                        lineHeight: 20,
                        flex: 1,
                    }}
                >
                    {typeof children === 'string' ? <UiText>{children}</UiText> : children}
                </TextStyleContext.Provider>
                <View style={styles.checkboxIndicatorSlot}>
                    {checked ? (
                        <Text style={[styles.checkMark, { color: theme.primary }]}>✓</Text>
                    ) : null}
                </View>
            </View>
        </Pressable>
    );
}

type DropdownMenuRadioGroupProps = ViewProps & {
    value?: string;
    onValueChange?: (value: string) => void;
};

function DropdownMenuRadioGroup({
    value,
    onValueChange,
    children,
    style,
    ...props
}: DropdownMenuRadioGroupProps) {
    const stable = React.useMemo(
        () => ({ value, onValueChange }),
        [value, onValueChange],
    );

    return (
        <MenuRadioContext.Provider value={stable}>
            <View style={style} {...props}>
                {children}
            </View>
        </MenuRadioContext.Provider>
    );
}

type DropdownMenuRadioItemProps = PressableProps & {
    value: string;
    children?: React.ReactNode;
};

function DropdownMenuRadioItem({
    value: itemValue,
    children,
    disabled,
    style,
    onPress,
    ...props
}: DropdownMenuRadioItemProps) {
    const theme = useRegistryTheme();
    const radio = useMenuRadioContext();
    const selected = radio?.value === itemValue;

    return (
        <Pressable
            disabled={disabled}
            onPress={(event) => {
                if (disabled) return;
                onPress?.(event);
                radio?.onValueChange?.(itemValue);
            }}
            style={({ pressed }) => [
                styles.item,
                styles.checkboxItem,
                {
                    backgroundColor: pressed ? theme.secondary : theme.background,
                    opacity: disabled ? 0.45 : 1,
                },
                style as object,
            ]}
            accessibilityRole="radio"
            accessibilityState={{ selected: Boolean(selected), disabled: Boolean(disabled) }}
            {...props}
        >
            <View style={styles.checkboxItemInner}>
                <TextStyleContext.Provider
                    value={{
                        color: theme.foreground,
                        fontSize: 15,
                        fontWeight: '400',
                        lineHeight: 20,
                        flex: 1,
                    }}
                >
                    {typeof children === 'string' ? <UiText>{children}</UiText> : children}
                </TextStyleContext.Provider>
                <View style={styles.checkboxIndicatorSlot}>
                    {selected ? (
                        <View style={[styles.radioDot, { backgroundColor: theme.primary }]} />
                    ) : (
                        <View
                            style={[
                                styles.radioRing,
                                { borderColor: theme.border },
                            ]}
                        />
                    )}
                </View>
            </View>
        </Pressable>
    );
}

function DropdownMenuSeparator({ style, ...props }: ViewProps) {
    const theme = useRegistryTheme();
    return <View style={[styles.separator, { backgroundColor: theme.border }, style]} {...props} />;
}

type DropdownMenuShortcutProps = React.ComponentProps<typeof UiText> & {
    /** When true, trailing glyphs (e.g. chevrons) still render on iOS/Android. Keyboard hints stay web-only by default. */
    showOnNative?: boolean;
};

function DropdownMenuShortcut({ showOnNative = false, ...props }: DropdownMenuShortcutProps) {
    const theme = useRegistryTheme();

    if (Platform.OS !== 'web' && !showOnNative) {
        return null;
    }

    return (
        <UiText
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
        padding: 8,
        gap: 2,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 8,
    },
    group: {
        gap: 0,
    },
    item: {
        minHeight: 44,
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    itemInset: {
        paddingLeft: 32,
    },
    itemInner: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        minWidth: 0,
    },
    checkboxItem: {
        paddingRight: 42,
    },
    checkboxItemInner: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 0,
    },
    checkboxIndicatorSlot: {
        position: 'absolute',
        right: 12,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 24,
    },
    checkMark: {
        fontSize: 15,
        fontWeight: '700',
    },
    radioRing: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
    },
    radioDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0,
        lineHeight: 16,
        paddingHorizontal: 0,
        paddingTop: 8,
        paddingBottom: 4,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        marginVertical: 6,
        marginHorizontal: -8,
    },
    shortcut: {
        marginLeft: 'auto',
        marginRight: 0,
        paddingLeft: 12,
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 16,
        flexShrink: 0,
    },
});

export {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
};
