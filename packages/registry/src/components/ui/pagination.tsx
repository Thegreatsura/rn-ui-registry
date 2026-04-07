import * as React from 'react';
import {
    Pressable,
    StyleSheet,
    View,
    type PressableProps,
    type PressableStateCallbackType,
    type StyleProp,
    type TextProps,
    type ViewProps,
    type ViewStyle,
} from 'react-native';

import { Text as UiText, TextStyleContext } from './text';
import { useRegistryTheme } from '../../lib/theme';

function Pagination({ style, ...props }: ViewProps) {
    return <View style={[styles.pagination, style]} {...props} />;
}

function PaginationContent({ style, ...props }: ViewProps) {
    return <View style={[styles.content, style]} {...props} />;
}

function PaginationItem({ style, ...props }: ViewProps) {
    return <View style={[styles.item, style]} {...props} />;
}

type PaginationLinkProps = PressableProps & {
    active?: boolean;
    children?: React.ReactNode;
};

function PaginationLink({ style, active, disabled, children, ...props }: PaginationLinkProps) {
    const theme = useRegistryTheme();

    const resolveStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> =>
        typeof style === 'function' ? style(state) : style;

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: Boolean(disabled), selected: Boolean(active) }}
            disabled={disabled}
            hitSlop={4}
            style={(state) => [
                styles.link,
                {
                    backgroundColor: active
                        ? theme.primary
                        : state.pressed
                          ? theme.muted
                          : theme.background,
                    borderColor: active ? theme.primary : theme.border,
                    opacity: disabled ? 0.38 : 1,
                },
                resolveStyle(state),
            ]}
            {...props}
        >
            <TextStyleContext.Provider
                value={{
                    color: active ? theme.primaryForeground : theme.foreground,
                    fontSize: 16,
                    fontWeight: active ? '700' : '600',
                }}
            >
                {typeof children === 'string' ? <UiText>{children}</UiText> : children}
            </TextStyleContext.Provider>
        </Pressable>
    );
}

function chevronMergedStyle(
    style: PaginationLinkProps['style'],
): (state: PressableStateCallbackType) => StyleProp<ViewStyle> {
    return (state) => [styles.chevronSlot, typeof style === 'function' ? style(state) : style];
}

function PaginationPrevious({ children, style, ...props }: PaginationLinkProps) {
    return (
        <PaginationLink accessibilityLabel="Previous page" style={chevronMergedStyle(style)} {...props}>
            {children ?? <UiText style={styles.chevron}>‹</UiText>}
        </PaginationLink>
    );
}

function PaginationNext({ children, style, ...props }: PaginationLinkProps) {
    return (
        <PaginationLink accessibilityLabel="Next page" style={chevronMergedStyle(style)} {...props}>
            {children ?? <UiText style={styles.chevron}>›</UiText>}
        </PaginationLink>
    );
}

function PaginationEllipsis({ style, ...props }: TextProps) {
    const theme = useRegistryTheme();

    return (
        <View style={styles.ellipsis} accessibilityRole="text">
            <UiText
                variant="muted"
                style={[
                    {
                        color: theme.foreground,
                        fontSize: 15,
                        fontWeight: '600',
                        opacity: 0.55,
                    },
                    style,
                ]}
                {...props}
            >
                …
            </UiText>
        </View>
    );
}

const styles = StyleSheet.create({
    pagination: {
        alignSelf: 'stretch',
    },
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 6,
        rowGap: 8,
    },
    item: {
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    link: {
        minWidth: 44,
        minHeight: 44,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chevronSlot: {
        width: 44,
        minWidth: 44,
        maxWidth: 44,
        paddingHorizontal: 0,
    },
    chevron: {
        fontSize: 22,
        lineHeight: 26,
        fontWeight: '700',
    },
    ellipsis: {
        width: 40,
        minWidth: 40,
        minHeight: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
};
