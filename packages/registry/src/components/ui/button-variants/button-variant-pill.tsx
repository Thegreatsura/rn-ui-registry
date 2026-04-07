/** @jsxImportSource react */
import * as React from 'react';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '../../../lib/theme';
import type { ButtonVariantProps } from './types';

/** Pill shape secondary. */
export function ButtonVariantPill(props: ButtonVariantProps) {
    const theme = useRegistryTheme();
    return (
        <Button variant="secondary" shape="pill" {...props}>
            <Text style={{ color: theme.secondaryForeground }}>Pill secondary</Text>
        </Button>
    );
}
