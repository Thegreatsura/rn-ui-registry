/** @jsxImportSource react */
import * as React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '@/components/ui/theme';
import type { ButtonVariantProps } from './types';

/** Download with trailing icon. */
export function ButtonVariantDownloadTrailing(props: ButtonVariantProps) {
    const theme = useRegistryTheme();
    return (
        <Button variant="secondary" {...props}>
            <Text style={{ color: theme.secondaryForeground }}>Download</Text>
            <MaterialIcons name="file-download" size={16} color={theme.secondaryForeground} />
        </Button>
    );
}
