/** @jsxImportSource react */
import * as React from 'react';
import { Animated, Easing } from 'react-native';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '../../../lib/theme';
import type { ButtonVariantProps } from './types';

/** Attention pulse (opacity loop). */
export function ButtonVariantPulse(props: ButtonVariantProps) {
    const opacity = React.useRef(new Animated.Value(1)).current;
    React.useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.55,
                    duration: 700,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 700,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true,
                }),
            ]),
        );
        loop.start();
        return () => loop.stop();
    }, [opacity]);

    const theme = useRegistryTheme();
    return (
        <Animated.View style={{ opacity }}>
            <Button variant="default" {...props}>
                <Text style={{ color: theme.primaryForeground }}>Pulse CTA</Text>
            </Button>
        </Animated.View>
    );
}
