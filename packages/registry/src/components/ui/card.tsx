/** @jsxImportSource react */
import { Text } from './text';
import { useRegistryTheme } from '../../lib/theme';
import * as React from 'react';
import { StyleSheet, View, type TextProps, type ViewProps } from 'react-native';

type CardProps = ViewProps & {
    className?: string;
};

type CardTextProps = TextProps & {
    className?: string;
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        borderWidth: 1,
        shadowColor: '#09090b',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
        elevation: 1,
    },
    header: {
        gap: 6,
        padding: 24,
    },
    content: {
        paddingBottom: 24,
        paddingHorizontal: 24,
    },
    footer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 24,
        paddingHorizontal: 24,
        paddingTop: 0,
    },
    title: {
        letterSpacing: -0.2,
        fontWeight: '600',
        lineHeight: 20,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
    },
});

function Card({ style, ...props }: CardProps) {
    const theme = useRegistryTheme();
    return <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }, style]} {...props} />;
}

function CardHeader({ style, ...props }: CardProps) {
    return <View style={[styles.header, style]} {...props} />;
}

function CardTitle({ style, ...props }: CardTextProps) {
    return <Text style={[styles.title, style]} {...props} />;
}

function CardDescription({ style, ...props }: CardTextProps) {
    const theme = useRegistryTheme();
    return <Text style={[styles.description, { color: theme.mutedForeground }, style]} {...props} />;
}

function CardContent({ style, ...props }: CardProps) {
    return <View style={[styles.content, style]} {...props} />;
}

function CardFooter({ style, ...props }: CardProps) {
    return <View style={[styles.footer, style]} {...props} />;
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
export type { CardProps };
