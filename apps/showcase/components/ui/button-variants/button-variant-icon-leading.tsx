/** @jsxImportSource react */
import * as React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '@/components/ui/theme';
import type { ButtonVariantProps } from './types';

/** Leading icon + label. */
export function ButtonVariantIconLeading(props: ButtonVariantProps) {
    const theme = useRegistryTheme();
    return (
        <Button variant="outline" {...props}>
            <MaterialIcons name="mail-outline" size={16} color={theme.foreground} />
            <Text style={{ color: theme.foreground }}>Email invite</Text>
        </Button>
    );
}
