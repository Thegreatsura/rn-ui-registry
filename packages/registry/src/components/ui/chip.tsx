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

type ChipProps = Omit<PressableProps, 'children' | 'style'> & {
    className?: string;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    selected?: boolean;
    variant?: 'default' | 'outline';
    /** Renders a remove affordance (filters, tags). */
    onRemove?: () => void;
};

function Chip({
    children,
    selected = false,
    variant = 'default',
    onRemove,
    disabled,
    style,
    ...props
}: ChipProps) {
    const theme = useRegistryTheme();
    const outline = variant === 'outline' || selected;

    const surface = outline
        ? {
              backgroundColor: selected ? theme.accent : theme.background,
              borderColor: selected ? theme.primary : theme.border,
          }
        : {
              backgroundColor: theme.secondary,
              borderColor: 'transparent',
          };

    const labelColor = outline
        ? selected
            ? theme.accentForeground
            : theme.foreground
        : theme.secondaryForeground;

    return (
        <View style={styles.row}>
            <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: Boolean(selected), disabled: Boolean(disabled) }}
                disabled={disabled}
                style={({ pressed }) => [
                    styles.chip,
                    surface,
                    {
                        opacity: disabled ? 0.45 : 1,
                        transform: [{ scale: pressed ? 0.98 : 1 }],
                    },
                    style,
                ]}
                {...props}
            >
                {typeof children === 'string' ? (
                    <Text numberOfLines={1} style={[styles.label, { color: labelColor }]}>
                        {children}
                    </Text>
                ) : (
                    children
                )}
            </Pressable>
            {onRemove ? (
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Remove"
                    hitSlop={8}
                    disabled={disabled}
                    onPress={onRemove}
                    style={({ pressed }) => [
                        styles.removeHit,
                        { opacity: pressed ? 0.6 : 1 },
                        disabled ? { opacity: 0.35 } : null,
                    ]}
                >
                    <Text variant="muted" style={styles.removeGlyph}>
                        ×
                    </Text>
                </Pressable>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chip: {
        borderRadius: 999,
        borderWidth: StyleSheet.hairlineWidth,
        paddingHorizontal: 14,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
    },
    removeHit: {
        marginLeft: 2,
        paddingHorizontal: 6,
        minHeight: 40,
        justifyContent: 'center',
    },
    removeGlyph: {
        fontSize: 20,
        lineHeight: 22,
        fontWeight: '600',
    },
});

export { Chip };
export type { ChipProps };
