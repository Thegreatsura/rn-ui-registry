/** @jsxImportSource react */
import { useRegistryTheme } from '../../lib/theme';
import * as React from 'react';
import { Animated, StyleSheet, ViewProps } from 'react-native';

function Skeleton({ style, ...props }: ViewProps) {
    const theme = useRegistryTheme();
    const pulseAnim = React.useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        const pulse = Animated.sequence([
            Animated.timing(pulseAnim, {
                toValue: 0.5,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]);

        Animated.loop(pulse).start();
    }, [pulseAnim]);

    return (
        <Animated.View
            style={[
                styles.skeleton,
                { backgroundColor: theme.muted, opacity: pulseAnim },
                style,
            ]}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    skeleton: {
        borderRadius: 6,
    },
});

export { Skeleton };
