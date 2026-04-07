/** @jsxImportSource react */
import { Text } from './text';
import { useRegistryTheme } from '../../lib/theme';
import * as React from 'react';
import {
    Pressable,
    StyleSheet,
    TextInput,
    View,
    type TextInputProps,
    type ViewProps,
} from 'react-native';

type SearchBarProps = Omit<TextInputProps, 'style'> & {
    className?: string;
    containerStyle?: ViewProps['style'];
    /** Shown when `value` has length; clears the field. */
    onClear?: () => void;
    /** Optional leading slot (e.g. search icon). */
    leftSlot?: React.ReactNode;
    /** Optional node shown on the right when there is no clear button. */
    rightSlot?: React.ReactNode;
};

function SearchBar({
    value,
    onChangeText,
    onClear,
    leftSlot,
    rightSlot,
    editable = true,
    containerStyle,
    placeholder = 'Search…',
    onFocus,
    onBlur,
    ...props
}: SearchBarProps) {
    const theme = useRegistryTheme();
    const [focused, setFocused] = React.useState(false);
    const showClear = Boolean(value && String(value).length > 0 && onClear);

    return (
        <View
            style={[
                styles.field,
                {
                    backgroundColor: theme.background,
                    borderColor: focused ? theme.ring : theme.input,
                },
                editable === false ? styles.disabled : undefined,
                containerStyle,
            ]}
        >
            {leftSlot ? <View style={styles.slot}>{leftSlot}</View> : null}
            <TextInput
                value={value}
                onChangeText={onChangeText}
                editable={editable}
                placeholder={placeholder}
                placeholderTextColor={theme.mutedForeground}
                selectionColor={theme.ring}
                underlineColorAndroid="transparent"
                onFocus={(e) => {
                    setFocused(true);
                    onFocus?.(e);
                }}
                onBlur={(e) => {
                    setFocused(false);
                    onBlur?.(e);
                }}
                style={[styles.input, { color: theme.foreground }]}
                returnKeyType="search"
                clearButtonMode="never"
                {...props}
            />
            {showClear ? (
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Clear search"
                    hitSlop={10}
                    onPress={() => onClear?.()}
                    style={styles.clearHit}
                >
                    <Text variant="muted" style={styles.clearGlyph}>
                        ×
                    </Text>
                </Pressable>
            ) : rightSlot ? (
                <View style={styles.slot}>{rightSlot}</View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 48,
        borderRadius: 12,
        borderWidth: StyleSheet.hairlineWidth,
        paddingHorizontal: 12,
        gap: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 10,
        minHeight: 44,
    },
    slot: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearHit: {
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 36,
        minHeight: 36,
    },
    clearGlyph: {
        fontSize: 22,
        lineHeight: 24,
        fontWeight: '500',
    },
    disabled: {
        opacity: 0.45,
    },
});

export { SearchBar };
