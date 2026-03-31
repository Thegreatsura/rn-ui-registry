/** @jsxImportSource react */
import { useRegistryTheme } from '../../lib/theme';
import * as React from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';

type LabelProps = TextProps & {
    className?: string;
};

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 14,
    },
});

function Label({ style, ...props }: LabelProps) {
    const theme = useRegistryTheme();
    return <Text style={[styles.label, { color: theme.foreground }, style]} {...props} />;
}

export { Label };
export type { LabelProps };
