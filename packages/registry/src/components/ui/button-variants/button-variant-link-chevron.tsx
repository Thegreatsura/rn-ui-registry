/** @jsxImportSource react */
import * as React from 'react';
import { ChevronRight } from 'lucide-react-native';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '../../../lib/theme';
import type { ButtonVariantProps } from './types';

/** Link style with chevron. */
export function ButtonVariantLinkChevron(props: ButtonVariantProps) {
    const theme = useRegistryTheme();
    return (
        <Button variant="link" {...props}>
            <Text style={{ color: theme.primary }}>Continue</Text>
            <ChevronRight size={16} color={theme.primary} />
        </Button>
    );
}
