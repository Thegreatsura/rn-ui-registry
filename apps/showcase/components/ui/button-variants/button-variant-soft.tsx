/** @jsxImportSource react */
import * as React from 'react';
import { View } from 'react-native';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '@/components/ui/theme';
import type { ButtonVariantProps } from './types';
import { variantLayoutStyles } from './shared-styles';

/** Soft muted surface. */
export function ButtonVariantSoft(props: ButtonVariantProps) {
    const theme = useRegistryTheme();
    return (
        <View style={[variantLayoutStyles.softPad, { backgroundColor: theme.muted }]}>
            <Button variant="ghost" {...props}>
                <Text style={{ color: theme.foreground }}>Soft action</Text>
            </Button>
        </View>
    );
}
