/** @jsxImportSource react */
import { useRegistryTheme } from '../../lib/theme';
import * as React from 'react';
import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

type CheckboxProps = Omit<PressableProps, 'onChange'> & {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
};

function Checkbox({ checked = false, onCheckedChange, disabled, style, ...props }: CheckboxProps) {
    const theme = useRegistryTheme();

    const handlePress = () => {
        if (disabled) return;
        onCheckedChange?.(!checked);
    };

    return (
        <Pressable
            role="checkbox"
            aria-checked={checked}
            disabled={disabled}
            onPress={handlePress}
            style={[
                styles.checkbox,
                {
                    backgroundColor: checked ? theme.primary : 'transparent',
                    borderColor: checked ? theme.primary : theme.input,
                    opacity: disabled ? 0.5 : 1,
                },
                style as any,
            ]}
            {...props}
        >
            {checked ? (
                <Text style={[styles.indicator, { color: theme.primaryForeground }]}>✓</Text>
            ) : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 1,
    },
    indicator: {
        fontSize: 11,
        fontWeight: '700',
        lineHeight: 12,
        includeFontPadding: false,
        textAlign: 'center',
    },
});

export { Checkbox };
