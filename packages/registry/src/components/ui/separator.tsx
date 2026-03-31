/** @jsxImportSource react */
import { useRegistryTheme } from '../../lib/theme';
import * as React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

type SeparatorProps = ViewProps & {
    className?: string;
    decorative?: boolean;
    orientation?: 'horizontal' | 'vertical';
};

const styles = StyleSheet.create({
    base: {
        flexShrink: 0,
    },
    horizontal: {
        height: StyleSheet.hairlineWidth,
        width: '100%',
    },
    vertical: {
        height: '100%',
        width: StyleSheet.hairlineWidth,
    },
});

function Separator({ orientation = 'horizontal', style, ...props }: SeparatorProps) {
    const theme = useRegistryTheme();

    return <View style={[styles.base, { backgroundColor: theme.border }, orientation === 'vertical' ? styles.vertical : styles.horizontal, style]} {...props} />;
}

export { Separator };
export type { SeparatorProps };
