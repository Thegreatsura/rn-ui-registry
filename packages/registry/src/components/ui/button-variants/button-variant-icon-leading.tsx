/** @jsxImportSource react */
import * as React from 'react';
import { Mail } from 'lucide-react-native';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '../../../lib/theme';
import type { ButtonVariantProps } from './types';

/** Leading icon + label. */
export function ButtonVariantIconLeading(props: ButtonVariantProps) {
    const theme = useRegistryTheme();
    return (
        <Button variant="outline" {...props}>
            <Mail size={16} color={theme.foreground} />
            <Text style={{ color: theme.foreground }}>Email invite</Text>
        </Button>
    );
}
