/** @jsxImportSource react */
import * as React from 'react';
import { Download } from 'lucide-react-native';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '../../../lib/theme';
import type { ButtonVariantProps } from './types';

/** Download with trailing icon. */
export function ButtonVariantDownloadTrailing(props: ButtonVariantProps) {
    const theme = useRegistryTheme();
    return (
        <Button variant="secondary" {...props}>
            <Text style={{ color: theme.secondaryForeground }}>Download</Text>
            <Download size={16} color={theme.secondaryForeground} />
        </Button>
    );
}
