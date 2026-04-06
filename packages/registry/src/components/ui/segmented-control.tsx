/** @jsxImportSource react */
import { Text } from './text';
import { useRegistryTheme } from '../../lib/theme';
import * as React from 'react';
import { Pressable, StyleSheet, View, type ViewProps } from 'react-native';

export type SegmentedOption = {
    value: string;
    label: string;
};

type SegmentedControlProps = ViewProps & {
    className?: string;
    options: SegmentedOption[];
    value: string;
    onValueChange: (value: string) => void;
    disabled?: boolean;
};

function SegmentedControl({
    options,
    value,
    onValueChange,
    disabled = false,
    style,
    ...props
}: SegmentedControlProps) {
    const theme = useRegistryTheme();

    return (
        <View
            style={[
                styles.track,
                {
                    backgroundColor: theme.muted,
                    borderColor: theme.border,
                },
                style,
            ]}
            accessibilityRole="tablist"
            {...props}
        >
            {options.map((opt) => {
                const selected = opt.value === value;
                return (
                    <Pressable
                        key={opt.value}
                        accessibilityRole="tab"
                        accessibilityState={{ selected }}
                        disabled={disabled}
                        onPress={() => onValueChange(opt.value)}
                        style={({ pressed }) => [
                            styles.segment,
                            selected && {
                                backgroundColor: theme.background,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.06,
                                shadowRadius: 2,
                                elevation: 1,
                            },
                            !selected && pressed ? { backgroundColor: theme.accent } : null,
                            disabled ? styles.segmentDisabled : null,
                        ]}
                    >
                        <Text
                            numberOfLines={1}
                            style={[
                                styles.segmentLabel,
                                { color: selected ? theme.foreground : theme.mutedForeground },
                            ]}
                        >
                            {opt.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    track: {
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 3,
        gap: 4,
    },
    segment: {
        flex: 1,
        minHeight: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    segmentDisabled: {
        opacity: 0.45,
    },
    segmentLabel: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export { SegmentedControl };
