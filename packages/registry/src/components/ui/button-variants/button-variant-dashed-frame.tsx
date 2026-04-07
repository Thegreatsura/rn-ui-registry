/** @jsxImportSource react */
import * as React from 'react';
import { View } from 'react-native';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '../../../lib/theme';
import type { ButtonVariantProps } from './types';
import { variantLayoutStyles } from './shared-styles';

/** Dashed border frame. */
export function ButtonVariantDashedFrame(props: ButtonVariantProps) {
    const theme = useRegistryTheme();
    return (
        <View style={[variantLayoutStyles.dashedOuter, { borderColor: theme.border }]}>
            <Button variant="ghost" {...props}>
                <Text style={{ color: theme.foreground }}>Dashed frame</Text>
            </Button>
        </View>
    );
}
