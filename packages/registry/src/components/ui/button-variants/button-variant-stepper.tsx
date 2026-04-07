/** @jsxImportSource react */
import * as React from 'react';
import { View } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '../../../lib/theme';
import type { ButtonVariantProps } from './types';
import { variantLayoutStyles } from './shared-styles';

/** Quantity stepper. */
export function ButtonVariantStepper(props: ButtonVariantProps) {
    const [n, setN] = React.useState(1);
    const theme = useRegistryTheme();
    return (
        <View style={variantLayoutStyles.row}>
            <Button
                variant="outline"
                size="icon"
                onPress={() => setN((x) => Math.max(0, x - 1))}
                {...props}
            >
                <Minus size={16} color={theme.foreground} />
            </Button>
            <View style={variantLayoutStyles.stepperValue}>
                <Text style={{ color: theme.foreground }}>{n}</Text>
            </View>
            <Button variant="outline" size="icon" onPress={() => setN((x) => x + 1)} {...props}>
                <Plus size={16} color={theme.foreground} />
            </Button>
        </View>
    );
}
