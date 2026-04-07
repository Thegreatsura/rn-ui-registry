/** @jsxImportSource react */
import * as React from 'react';
import { Animated } from 'react-native';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '../../../lib/theme';
import type { ButtonVariantProps } from './types';

/** Spring scale on press. */
export function ButtonVariantSpringScale(props: ButtonVariantProps) {
    const scale = React.useRef(new Animated.Value(1)).current;
    const theme = useRegistryTheme();

    const down = () => {
        Animated.spring(scale, { toValue: 0.94, useNativeDriver: true, friction: 5 }).start();
    };
    const up = () => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 5 }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale }] }}>
            <Button variant="default" onPressIn={down} onPressOut={up} {...props}>
                <Text style={{ color: theme.primaryForeground }}>Spring press</Text>
            </Button>
        </Animated.View>
    );
}
