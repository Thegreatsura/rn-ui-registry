/** @jsxImportSource react */
import * as React from 'react';
import { View } from 'react-native';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '../../../lib/theme';
import type { ButtonVariantProps } from './types';
import { variantLayoutStyles } from './shared-styles';

/** Raised primary with shadow container. */
export function ButtonVariantElevated(props: ButtonVariantProps) {
    const theme = useRegistryTheme();
    return (
        <View
            style={[
                variantLayoutStyles.elevWrap,
                {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.12,
                    shadowRadius: 8,
                    elevation: 4,
                },
            ]}
        >
            <Button variant="default" {...props}>
                <Text style={{ color: theme.primaryForeground }}>Elevated primary</Text>
            </Button>
        </View>
    );
}
