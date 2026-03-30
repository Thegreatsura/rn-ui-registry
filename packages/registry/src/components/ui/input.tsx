import { useRegistryTheme } from '@/registry/lib/theme';
import * as React from 'react';
import {
    StyleSheet,
    View,
    type StyleProp,
    type TextInputProps,
    type TextStyle,
    type ViewStyle,
} from 'react-native';

const NativeTextInput = require('react-native').TextInput as React.ComponentType<any>;

type InputProps = TextInputProps & {
    className?: string;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    invalid?: boolean;
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
    size?: 'default' | 'sm' | 'lg';
    variant?: 'default' | 'ghost';
};

const Input = React.forwardRef<any, InputProps>(function Input(
    {
        style,
        containerStyle,
        inputStyle,
        variant = 'default',
        size = 'default',
        editable = true,
        invalid = false,
        leftSlot,
        rightSlot,
        onFocus,
        onBlur,
        placeholderTextColor,
        className: _className,
        value,
        defaultValue,
        placeholder,
        onChangeText,
        secureTextEntry,
        keyboardType,
        autoCapitalize,
        autoCorrect,
        autoComplete,
        textContentType,
        inputMode,
        returnKeyType,
        enterKeyHint,
        blurOnSubmit,
        onSubmitEditing,
        onChange,
        onEndEditing,
        onKeyPress,
        maxLength,
        numberOfLines,
        ...props
    },
    ref,
) {
    const [focused, setFocused] = React.useState(false);
    const theme = useRegistryTheme();

    const handleFocus = React.useCallback(
        (event: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) => {
            setFocused(true);
            onFocus?.(event);
        },
        [onFocus],
    );

    const handleBlur = React.useCallback(
        (event: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) => {
            setFocused(false);
            onBlur?.(event);
        },
        [onBlur],
    );

    return React.createElement(
        View,
        { style: containerStyle },
        React.createElement(
            View,
            {
                style: [
                    styles.field,
                    {
                        backgroundColor: variant === 'ghost' ? theme.muted : theme.background,
                        borderColor: invalid ? theme.destructive : focused ? theme.ring : variant === 'ghost' ? 'transparent' : theme.input,
                    },
                    size === 'sm' ? styles.sm : undefined,
                    size === 'lg' ? styles.lg : undefined,
                    editable === false ? styles.disabled : undefined,
                ],
            },
            leftSlot ? React.createElement(View, { style: styles.slot }, leftSlot) : null,
            React.createElement(NativeTextInput, {
                ...props,
                ref,
                style: [styles.input, { color: theme.foreground }, style, inputStyle],
                editable,
                value,
                defaultValue,
                placeholder,
                onChangeText,
                secureTextEntry,
                keyboardType,
                autoCapitalize,
                autoCorrect,
                autoComplete,
                textContentType,
                inputMode,
                returnKeyType,
                enterKeyHint,
                blurOnSubmit,
                onSubmitEditing,
                onChange,
                onEndEditing,
                onKeyPress,
                maxLength,
                numberOfLines,
                onBlur: handleBlur,
                onFocus: handleFocus,
                placeholderTextColor: placeholderTextColor ?? theme.mutedForeground,
                selectionColor: invalid ? theme.destructive : theme.ring,
            }),
            rightSlot ? React.createElement(View, { style: styles.slot }, rightSlot) : null,
        ),
    );
});

const styles = StyleSheet.create({
    field: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        minHeight: 40,
    },
    input: {
        flex: 1,
        fontSize: 14,
        minHeight: 20,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    sm: {
        minHeight: 36,
    },
    lg: {
        minHeight: 44,
    },
    disabled: {
        opacity: 0.5,
    },
    slot: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
});

export { Input };
export type { InputProps };
