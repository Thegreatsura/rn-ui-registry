/** @jsxImportSource react */
import { Text } from './text';
import { useRegistryTheme } from '../../lib/theme';
import * as React from 'react';
import {
    Pressable,
    StyleSheet,
    View,
    type PressableProps,
    type StyleProp,
    type ViewStyle,
} from 'react-native';

type FabSize = 'default' | 'sm' | 'lg';

type FabProps = Omit<PressableProps, 'children' | 'style'> & {
    className?: string;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    size?: FabSize;
    variant?: 'default' | 'secondary';
};

const sizeMap: Record<FabSize, number> = {
    sm: 48,
    default: 56,
    lg: 64,
};

function Fab({ children, size = 'default', variant = 'default', style, disabled, ...props }: FabProps) {
    const theme = useRegistryTheme();
    const dim = sizeMap[size];

    const surface: StyleProp<ViewStyle> =
        variant === 'secondary'
            ? {
                  backgroundColor: theme.secondary,
                  borderColor: theme.border,
                  borderWidth: StyleSheet.hairlineWidth,
              }
            : {
                  backgroundColor: theme.primary,
                  borderColor: 'transparent',
                  borderWidth: 0,
              };

    return (
        <Pressable
            accessibilityRole="button"
            disabled={disabled}
            style={({ pressed }) => [
                styles.base,
                {
                    width: dim,
                    height: dim,
                    borderRadius: dim / 2,
                    opacity: disabled ? 0.45 : 1,
                    transform: [{ scale: pressed ? 0.96 : 1 }],
                },
                surface,
                styles.shadow,
                style,
            ]}
            {...props}
        >
            {children}
        </Pressable>
    );
}

export type FabMenuAction = {
    id: string;
    label: string;
    onPress?: () => void;
    /** Icon for the small action button (e.g. vector icon). */
    icon?: React.ReactNode;
};

type FabMenuProps = {
    actions: FabMenuAction[];
    /** Accessibility label for the main FAB when the menu is closed. */
    accessibilityLabel?: string;
    /** Main FAB content; toggle open/closed icon here. */
    renderMain?: (open: boolean) => React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
};

function FabMenu({
    actions,
    accessibilityLabel = 'Open actions menu',
    renderMain,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
}: FabMenuProps) {
    const theme = useRegistryTheme();
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isControlled = openProp !== undefined;
    const open = isControlled ? openProp : internalOpen;

    const setOpen = React.useCallback(
        (next: boolean) => {
            if (!isControlled) {
                setInternalOpen(next);
            }
            onOpenChange?.(next);
        },
        [isControlled, onOpenChange],
    );

    const defaultMain = (isOpen: boolean) => (
        <Text style={[styles.mainGlyph, { color: theme.primaryForeground }]}>{isOpen ? '×' : '+'}</Text>
    );

    return (
        <View style={styles.menuRoot}>
            {open ? (
                <Pressable
                    style={[styles.localBackdrop, { backgroundColor: 'rgba(9, 9, 11, 0.22)' }]}
                    onPress={() => setOpen(false)}
                    accessibilityLabel="Dismiss"
                />
            ) : null}
            <View style={styles.menuColumn} pointerEvents="box-none">
                {open
                    ? actions.map((action) => (
                          <View key={action.id} style={styles.actionRow}>
                              <View
                                  style={[
                                      styles.labelPill,
                                      { backgroundColor: theme.card, borderColor: theme.border },
                                  ]}
                              >
                                  <Text style={[styles.labelText, { color: theme.foreground }]}>
                                      {action.label}
                                  </Text>
                              </View>
                              <Fab
                                  size="sm"
                                  variant="secondary"
                                  accessibilityLabel={action.label}
                                  onPress={() => {
                                      action.onPress?.();
                                      setOpen(false);
                                  }}
                              >
                                  {action.icon ?? (
                                      <Text style={[styles.actionFallback, { color: theme.secondaryForeground }]}>
                                          •
                                      </Text>
                                  )}
                              </Fab>
                          </View>
                      ))
                    : null}
                <Fab
                    accessibilityLabel={open ? 'Close actions menu' : accessibilityLabel}
                    onPress={() => setOpen(!open)}
                >
                    {renderMain ? renderMain(open) : defaultMain(open)}
                </Fab>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 6,
    },
    menuRoot: {
        position: 'relative',
        width: '100%',
        minHeight: 220,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    localBackdrop: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
    },
    menuColumn: {
        zIndex: 1,
        gap: 12,
        alignItems: 'flex-end',
        width: '100%',
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    labelPill: {
        maxWidth: 200,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
    },
    labelText: {
        fontSize: 13,
        fontWeight: '600',
    },
    mainGlyph: {
        fontSize: 30,
        fontWeight: '300',
        lineHeight: 34,
    },
    actionFallback: {
        fontSize: 22,
        lineHeight: 24,
    },
});

export { Fab, FabMenu };
export type { FabProps, FabMenuProps };
