/** @jsxImportSource react */
import { useRegistryTheme } from '../../lib/theme';
import * as React from 'react';
import { Pressable, StyleSheet, Text, View, type TextInputProps, type ViewProps } from 'react-native';

const NativeTextInput = require('react-native').TextInput as React.ComponentType<any>;

type OTPInputProps = ViewProps & {
    value?: string;
    onValueChange?: (value: string) => void;
    maxLength?: number;
    disabled?: boolean;
};

function OTPInput({ value = '', onValueChange, maxLength = 6, disabled, style, ...props }: OTPInputProps) {
    const theme = useRegistryTheme();
    const inputRef = React.useRef<any>(null);
    const [focused, setFocused] = React.useState(false);

    const digits = value.split('');
    const cells = Array.from({ length: maxLength }, (_, i) => digits[i] || '');
    const activeIndex = Math.min(value.length, maxLength - 1);

    const handleFocus = React.useCallback(
        (_event: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) => {
            setFocused(true);
        },
        [],
    );

    const handleBlur = React.useCallback(
        (_event: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) => {
            setFocused(false);
        },
        [],
    );

    const handlePress = () => {
        if (disabled) return;
        inputRef.current?.focus();
    };

    return (
        <View style={[styles.container, style]} {...props}>
            <Pressable
                accessibilityRole="button"
                disabled={disabled}
                onPress={handlePress}
                style={styles.cellsContainer}
            >
                {cells.map((digit, index) => {
                    const isActive = focused && activeIndex === index;
                    return (
                        <View
                            key={index}
                            style={[
                                styles.cell,
                                {
                                    borderColor: isActive ? theme.ring : theme.input,
                                    backgroundColor: theme.background,
                                    opacity: disabled ? 0.5 : 1,
                                },
                            ]}
                        >
                            <Text style={[styles.cellText, { color: theme.foreground }]}>
                                {digit}
                            </Text>
                            {isActive && (
                                <View style={[styles.cursor, { backgroundColor: theme.primary }]} />
                            )}
                        </View>
                    );
                })}
            </Pressable>
            {React.createElement(NativeTextInput, {
                ref: inputRef,
                value,
                onChangeText: (text: string) => {
                    const sanitized = text.replace(/\D/g, '').slice(0, maxLength);
                    if (sanitized.length <= maxLength) {
                        onValueChange?.(sanitized);
                    }
                },
                maxLength,
                keyboardType: 'number-pad',
                style: styles.hiddenInput,
                editable: !disabled,
                onFocus: handleFocus,
                onBlur: handleBlur,
                selectionColor: 'transparent',
                underlineColorAndroid: 'transparent',
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    cellsContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    cell: {
        width: 40,
        height: 48,
        borderRadius: 6,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    cellText: {
        fontSize: 20,
        fontWeight: '600',
    },
    cursor: {
        position: 'absolute',
        bottom: 10,
        width: 16,
        height: 2,
        borderRadius: 1,
    },
    hiddenInput: {
        position: 'absolute',
        opacity: 0,
        width: 1,
        height: 1,
    },
});

export { OTPInput };
