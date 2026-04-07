/** @jsxImportSource react */
import * as React from 'react';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '../../../lib/theme';
import type { ButtonVariantProps } from './types';

/** Compact micro label. */
export function ButtonVariantCompact(props: ButtonVariantProps) {
    const theme = useRegistryTheme();
    return (
        <Button variant="secondary" size="sm" {...props}>
            <Text style={{ color: theme.secondaryForeground, fontSize: 12 }}>Micro</Text>
        </Button>
    );
}
