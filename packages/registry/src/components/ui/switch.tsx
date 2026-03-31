/** @jsxImportSource react */
import { useRegistryTheme } from '../../lib/theme';
import * as React from 'react';
import { Animated, Pressable, StyleSheet, type PressableProps } from 'react-native';

type SwitchProps = Omit<PressableProps, 'onChange'> & {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
};

function Switch({ checked = false, onCheckedChange, disabled, style, ...props }: SwitchProps) {
    const theme = useRegistryTheme();
    const translateX = React.useRef(new Animated.Value(checked ? 16 : 0)).current;

    React.useEffect(() => {
        Animated.timing(translateX, {
            toValue: checked ? 16 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [checked, translateX]);

    const handlePress = () => {
        if (disabled) return;
        onCheckedChange?.(!checked);
    };

    return (
        <Pressable
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onPress={handlePress}
            style={[
                styles.track,
                {
                    backgroundColor: checked ? theme.primary : theme.input,
                    opacity: disabled ? 0.5 : 1,
                },
                style as any,
            ]}
            {...props}
        >
            <Animated.View
                style={[
                    styles.thumb,
                    {
                        backgroundColor: theme.background,
                        transform: [{ translateX }],
                    },
                ]}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    track: {
        width: 36,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 2,
    },
    thumb: {
        width: 16,
        height: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
});

export { Switch };
