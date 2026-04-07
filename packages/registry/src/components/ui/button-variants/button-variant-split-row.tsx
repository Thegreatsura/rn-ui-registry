/** @jsxImportSource react */
import * as React from 'react';
import { View } from 'react-native';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '../../../lib/theme';
import type { ButtonVariantProps } from './types';
import { variantLayoutStyles } from './shared-styles';

/** Split actions row. */
export function ButtonVariantSplitRow(props: ButtonVariantProps) {
    const theme = useRegistryTheme();
    return (
        <View style={variantLayoutStyles.splitRow}>
            <Button variant="outline" style={variantLayoutStyles.splitGrow} {...props}>
                <Text style={{ color: theme.foreground }}>Back</Text>
            </Button>
            <Button variant="default" style={variantLayoutStyles.splitGrow} {...props}>
                <Text style={{ color: theme.primaryForeground }}>Next</Text>
            </Button>
        </View>
    );
}
