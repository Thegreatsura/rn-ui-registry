/** @jsxImportSource react */
import * as React from 'react';
import { View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '@/components/ui/theme';
import type { ButtonVariantProps } from './types';
import { variantLayoutStyles } from './shared-styles';

/** Label + count badge. */
export function ButtonVariantBadge(props: ButtonVariantProps) {
    const theme = useRegistryTheme();
    return (
        <Button variant="outline" {...props}>
            <MaterialIcons name="notifications-none" size={16} color={theme.foreground} />
            <Text style={{ color: theme.foreground }}>Alerts</Text>
            <View style={[variantLayoutStyles.badge, { backgroundColor: theme.destructive }]}>
                <Text style={{ color: theme.destructiveForeground, fontSize: 11, fontWeight: '700' }}>3</Text>
            </View>
        </Button>
    );
}
