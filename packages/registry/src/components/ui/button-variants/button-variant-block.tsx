/** @jsxImportSource react */
import * as React from 'react';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '../../../lib/theme';
import type { ButtonVariantProps } from './types';

/** Full-width CTA. */
export function ButtonVariantBlock(props: ButtonVariantProps) {
    const theme = useRegistryTheme();
    return (
        <Button variant="default" fullWidth {...props}>
            <Text style={{ color: theme.primaryForeground }}>Full width checkout</Text>
        </Button>
    );
}
