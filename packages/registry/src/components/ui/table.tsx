import * as React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    type TextProps,
    type ViewProps,
} from 'react-native';

import { Text } from './text';
import { useRegistryTheme } from '../../lib/theme';

function Table({ style, children, ...props }: ViewProps) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator
            contentContainerStyle={styles.scrollContent}
        >
            <View style={[styles.table, style]} {...props}>
                {children}
            </View>
        </ScrollView>
    );
}

function TableHeader({ style, ...props }: ViewProps) {
    return <View style={[styles.thead, style]} {...props} />;
}

function TableBody({ style, ...props }: ViewProps) {
    return <View style={[styles.tbody, style]} {...props} />;
}

function TableFooter({ style, ...props }: ViewProps) {
    const theme = useRegistryTheme();

    return (
        <View
            style={[
                styles.tfoot,
                { borderTopColor: theme.border },
                style,
            ]}
            {...props}
        />
    );
}

function TableRow({ style, ...props }: ViewProps) {
    const theme = useRegistryTheme();

    return (
        <View
            style={[
                styles.row,
                { borderBottomColor: theme.border, borderBottomWidth: 1 },
                style,
            ]}
            {...props}
        />
    );
}

function TableHead({ style, children, ...props }: TextProps) {
    return (
        <View style={styles.thCell}>
            <Text style={[styles.thText, style]} {...props}>
                {children}
            </Text>
        </View>
    );
}

function TableCell({ style, children, ...props }: TextProps) {
    return (
        <View style={styles.tdCell}>
            <Text variant="muted" style={[styles.tdText, style]} {...props}>
                {children}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
    },
    table: {
        width: '100%',
        minWidth: '100%',
        alignSelf: 'stretch',
    },
    thead: {
        alignSelf: 'stretch',
    },
    tbody: {
        alignSelf: 'stretch',
    },
    tfoot: {
        alignSelf: 'stretch',
        borderTopWidth: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        width: '100%',
        minHeight: 48,
    },
    thCell: {
        flex: 1,
        flexBasis: 0,
        minWidth: 100,
        paddingVertical: 12,
        paddingHorizontal: 14,
        justifyContent: 'center',
    },
    thText: {
        width: '100%',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 18,
    },
    tdCell: {
        flex: 1,
        flexBasis: 0,
        minWidth: 100,
        paddingVertical: 12,
        paddingHorizontal: 14,
        justifyContent: 'center',
    },
    tdText: {
        width: '100%',
        fontSize: 15,
        lineHeight: 20,
    },
});

export {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
};
