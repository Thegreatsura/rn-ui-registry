/** @jsxImportSource react */
import { TextStyleContext } from './text';
import { useRegistryTheme } from '../../lib/theme';
import * as React from 'react';
import {
    Pressable,
    StyleSheet,
    View,
    type PressableProps,
    type PressableStateCallbackType,
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
    /** Fully rounded control (pill). */
    shape?: 'default' | 'pill';
    /** Stretch to parent width (e.g. stacked CTAs). */
    fullWidth?: boolean;
};

function getButtonStyle(variant: ButtonVariant, theme: ReturnType<typeof useRegistryTheme>): StyleProp<ViewStyle> {
    switch (variant) {
        case 'destructive':
            return {
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                borderColor: 'transparent',
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
                minHeight: undefined,
            };
        default:
            return {
                backgroundColor: theme.primary,
                borderColor: 'transparent',
                borderWidth: 1,
            };
    }
}

function getButtonTextStyle(variant: ButtonVariant, theme: ReturnType<typeof useRegistryTheme>): TextStyle {
    switch (variant) {
        case 'destructive':
            return { color: '#dc2626' };
        case 'outline':
            return { color: theme.foreground };
        case 'secondary':
            return { color: theme.secondaryForeground };
        case 'ghost':
            return { color: theme.foreground };
        case 'link':
            return { color: theme.primary, textDecorationLine: 'underline' };
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

function Button({
    style,
    variant = 'default',
    size = 'default',
    shape = 'default',
    fullWidth = false,
    disabled,
    children,
    ...props
}: ButtonProps) {
    const theme = useRegistryTheme();

    return (
        <Pressable
            disabled={disabled}
            role="button"
            style={(state: PressableStateCallbackType) => {
                const resolvedStyle =
                    typeof style === 'function'
                        ? style(state)
                        : (style as StyleProp<ViewStyle>);

                return [
                    styles.pressable,
                    fullWidth && styles.pressableFullWidth,
                    resolvedStyle,
                ];
            }}
            {...props}
        >
            {({ pressed }) => (
                <TextStyleContext.Provider value={[styles.buttonTextBase, getButtonTextStyle(variant, theme)]}>
                    <View
                        style={[
                            styles.baseButton,
                            shape === 'pill' && styles.pillShape,
                            getButtonStyle(variant, theme),
                            getSizeStyle(size),
                            pressed && variant !== 'link'
                                ? variant === 'ghost'
                                    ? styles.ghostPressed
                                    : styles.pressed
                                : undefined,
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
    pressable: {
        alignSelf: 'flex-start',
    },
    pressableFullWidth: {
        alignSelf: 'stretch',
        width: '100%',
    },
    pillShape: {
        borderRadius: 999,
    },
    baseButton: {
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0,
        shadowRadius: 0,
    },
    mdButton: {
        gap: 6,
        minHeight: 32,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    smButton: {
        gap: 4,
        minHeight: 28,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    lgButton: {
        gap: 6,
        minHeight: 36,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    iconButton: {
        height: 32,
        justifyContent: 'center',
        paddingHorizontal: 0,
        width: 32,
    },
    pressed: {
        opacity: 0.96,
        transform: [{ translateY: 1 }],
    },
    ghostPressed: {
        backgroundColor: 'rgba(0,0,0,0.04)',
    },
    disabled: {
        opacity: 0.5,
    },
    buttonTextBase: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 18,
    },
});

export { Button };
export type { ButtonProps };
