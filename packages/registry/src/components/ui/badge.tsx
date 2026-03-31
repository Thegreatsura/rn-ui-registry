/** @jsxImportSource react */
import { TextStyleContext } from './text';
import { useRegistryTheme } from '../../lib/theme';
import * as React from 'react';
import { StyleSheet, View, type TextStyle, type ViewProps, type ViewStyle } from 'react-native';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

type BadgeProps = ViewProps & {
    className?: string;
    variant?: BadgeVariant;
};

const styles = StyleSheet.create({
    base: {
        alignItems: 'center',
        borderRadius: 999,
        borderWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    textBase: {
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 14,
    },
});

function getContainerStyle(variant: BadgeVariant, theme: ReturnType<typeof useRegistryTheme>): ViewStyle {
    switch (variant) {
        case 'secondary':
            return {
                backgroundColor: theme.secondary,
                borderColor: 'transparent',
            };
        case 'destructive':
            return {
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                borderColor: 'transparent',
            };
        case 'outline':
            return {
                backgroundColor: theme.background,
                borderColor: theme.border,
            };
        default:
            return {
                backgroundColor: theme.primary,
                borderColor: 'transparent',
            };
    }
}

function getTextStyle(variant: BadgeVariant, theme: ReturnType<typeof useRegistryTheme>): TextStyle {
    switch (variant) {
        case 'secondary':
            return { color: theme.secondaryForeground };
        case 'destructive':
            return { color: '#dc2626' };
        case 'outline':
            return { color: theme.foreground };
        default:
            return { color: theme.primaryForeground };
    }
}

function Badge({ style, variant = 'default', children, ...props }: BadgeProps) {
    const theme = useRegistryTheme();

    return (
        <TextStyleContext.Provider value={[styles.textBase, getTextStyle(variant, theme)]}>
            <View style={[styles.base, getContainerStyle(variant, theme), style]} {...props}>
                {children}
            </View>
        </TextStyleContext.Provider>
    );
}

export { Badge };
export type { BadgeProps };
