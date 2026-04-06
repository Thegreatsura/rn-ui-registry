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
    type ViewProps,
    type ViewStyle,
} from 'react-native';

type ListProps = ViewProps & {
    className?: string;
};

function List({ style, ...props }: ListProps) {
    const theme = useRegistryTheme();
    return (
        <View
            style={[styles.list, { borderColor: theme.border, backgroundColor: theme.card }, style]}
            {...props}
        />
    );
}

type ListItemProps = Omit<PressableProps, 'style' | 'children'> & {
    className?: string;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    /** When false, renders a static row (no press feedback). */
    pressable?: boolean;
};

function ListItem({ style, pressable = true, disabled, children, ...props }: ListItemProps) {
    const theme = useRegistryTheme();

    const content = (
        <View style={[styles.itemRow, disabled ? styles.itemDisabled : undefined]}>{children}</View>
    );

    if (!pressable) {
        return <View style={[styles.itemStatic, { borderBottomColor: theme.border }, style]}>{content}</View>;
    }

    return (
        <Pressable
            accessibilityRole="button"
            disabled={disabled}
            style={({ pressed }) => [
                styles.itemPressable,
                { borderBottomColor: theme.border },
                { backgroundColor: pressed ? theme.muted : 'transparent' },
                disabled ? styles.itemDisabled : undefined,
                style,
            ]}
            {...props}
        >
            {content}
        </Pressable>
    );
}

function ListItemIcon({ style, ...props }: ViewProps) {
    return <View style={[styles.leading, style]} {...props} />;
}

function ListItemContent({ style, ...props }: ViewProps) {
    return <View style={[styles.content, style]} {...props} />;
}

function ListItemTitle({ style, ...props }: React.ComponentProps<typeof Text>) {
    return <Text numberOfLines={2} style={[styles.title, style]} {...props} />;
}

function ListItemDescription({ style, ...props }: React.ComponentProps<typeof Text>) {
    return <Text variant="muted" numberOfLines={3} style={[styles.description, style]} {...props} />;
}

function ListItemTrailing({ style, ...props }: ViewProps) {
    return <View style={[styles.trailing, style]} {...props} />;
}

const styles = StyleSheet.create({
    list: {
        borderRadius: 12,
        borderWidth: StyleSheet.hairlineWidth,
        overflow: 'hidden',
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 52,
        paddingHorizontal: 16,
        paddingVertical: 10,
        gap: 12,
    },
    itemPressable: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    itemStatic: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    itemDisabled: {
        opacity: 0.45,
    },
    leading: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        gap: 2,
        minWidth: 0,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
    },
    description: {
        fontSize: 13,
        lineHeight: 18,
    },
    trailing: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});

export {
    List,
    ListItem,
    ListItemIcon,
    ListItemContent,
    ListItemTitle,
    ListItemDescription,
    ListItemTrailing,
};
