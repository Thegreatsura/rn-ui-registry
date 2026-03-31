/** @jsxImportSource react */
import { useRegistryTheme } from '../../lib/theme';
import * as React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    type StyleProp,
    type TextInputProps,
    type TextStyle,
    type ViewStyle,
} from 'react-native';

type TextareaProps = TextInputProps & {
    className?: string;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    invalid?: boolean;
    variant?: 'default' | 'ghost';
};

const Textarea = React.forwardRef<TextInput, TextareaProps>(function Textarea(
    {
        style,
        containerStyle,
        inputStyle,
        variant = 'default',
        editable = true,
        invalid = false,
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

    return (
        <View style={containerStyle}>
            <View
                style={[
                    styles.field,
                    {
                        backgroundColor: variant === 'ghost' ? theme.muted : theme.background,
                        borderColor: invalid ? theme.destructive : focused ? theme.ring : variant === 'ghost' ? 'transparent' : theme.input,
                    },
                    editable === false ? styles.disabled : undefined,
                ]}
            >
                {React.createElement(TextInput, {
                    ...props,
                    ref,
                    multiline: true,
                    textAlignVertical: 'top',
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
                    underlineColorAndroid: 'transparent',
                })}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    field: {
        width: '100%',
        borderRadius: 8,
        borderWidth: 1,
    },
    input: {
        minHeight: 128,
        fontSize: 14,
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    disabled: {
        opacity: 0.5,
    },
});

export { Textarea };
export type { TextareaProps };
