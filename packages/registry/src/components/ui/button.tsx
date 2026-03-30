import { TextStyleContext } from '@/registry/components/ui/text';
import { useRegistryTheme } from '@/registry/lib/theme';
import * as React from 'react';
import {
    Pressable,
    StyleSheet,
    View,
    type PressableProps,
    type StyleProp,
    type TextStyle,
    type ViewStyle,
} from 'react-native';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

type ButtonProps = Omit<PressableProps, 'children'> & {
    children?: React.ReactNode;
    className?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
};

function getButtonStyle(variant: ButtonVariant, theme: ReturnType<typeof useRegistryTheme>): StyleProp<ViewStyle> {
    switch (variant) {
        case 'destructive':
            return {
                backgroundColor: theme.destructive,
                borderColor: theme.destructive,
                borderWidth: 1,
            };
        case 'outline':
            return {
                backgroundColor: theme.background,
                borderColor: theme.border,
                borderWidth: 1,
            };
        case 'secondary':
            return {
                backgroundColor: theme.secondary,
                borderColor: 'transparent',
                borderWidth: 1,
            };
        case 'ghost':
            return {
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderWidth: 1,
            };
        case 'link':
            return {
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderWidth: 0,
                paddingHorizontal: 0,
                paddingVertical: 0,
            };
        default:
            return {
                backgroundColor: theme.primary,
                borderColor: theme.primary,
                borderWidth: 1,
            };
    }
}

function getButtonTextStyle(variant: ButtonVariant, theme: ReturnType<typeof useRegistryTheme>): TextStyle {
    switch (variant) {
        case 'destructive':
            return { color: theme.destructiveForeground };
        case 'outline':
            return { color: theme.foreground };
        case 'secondary':
            return { color: theme.secondaryForeground };
        case 'ghost':
            return { color: theme.foreground };
        case 'link':
            return { color: theme.foreground, textDecorationLine: 'underline' };
        default:
            return { color: theme.primaryForeground };
    }
}

function getSizeStyle(size: ButtonSize): StyleProp<ViewStyle> {
    switch (size) {
        case 'sm':
            return styles.smButton;
        case 'lg':
            return styles.lgButton;
        case 'icon':
            return styles.iconButton;
        default:
            return styles.mdButton;
    }
}

function Button({ style, variant = 'default', size = 'default', disabled, children, ...props }: ButtonProps) {
    const theme = useRegistryTheme();
    const resolvedStyle = style as StyleProp<ViewStyle>;

    return (
        <Pressable disabled={disabled} role="button" style={resolvedStyle} {...props}>
            {({ pressed }) => (
                <TextStyleContext.Provider value={[styles.buttonTextBase, getButtonTextStyle(variant, theme)]}>
                    <View
                        style={[
                            styles.baseButton,
                            getButtonStyle(variant, theme),
                            getSizeStyle(size),
                            pressed && variant !== 'link' ? styles.pressed : undefined,
                            disabled ? styles.disabled : undefined,
                        ]}
                    >
                        {children}
                    </View>
                </TextStyleContext.Provider>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    baseButton: {
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
    },
    mdButton: {
        minHeight: 40,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    smButton: {
        minHeight: 36,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    lgButton: {
        minHeight: 44,
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    iconButton: {
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 0,
        width: 40,
    },
    pressed: {
        opacity: 0.9,
    },
    disabled: {
        opacity: 0.5,
    },
    buttonTextBase: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export { Button };
export type { ButtonProps };
