/** @jsxImportSource react */
import * as React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '@/components/ui/theme';
import type { ButtonVariantProps } from './types';

/** Link style with chevron. */
export function ButtonVariantLinkChevron(props: ButtonVariantProps) {
    const theme = useRegistryTheme();
    return (
        <Button variant="link" {...props}>
            <Text style={{ color: theme.primary }}>Continue</Text>
            <MaterialIcons name="chevron-right" size={16} color={theme.primary} />
        </Button>
    );
}
