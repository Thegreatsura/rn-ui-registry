/** @jsxImportSource react */
import * as React from 'react';

import { Button } from '../button';
import { Text } from '../text';
import { Spinner } from '../spinner';
import { useRegistryTheme } from '@/components/ui/theme';
import type { ButtonVariantProps } from './types';

/** Loading state (tap to simulate). */
export function ButtonVariantLoading(props: ButtonVariantProps) {
    const [loading, setLoading] = React.useState(false);
    const theme = useRegistryTheme();

    return (
        <Button
            variant="default"
            disabled={loading}
            onPress={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 1600);
            }}
            {...props}
        >
            {loading ? (
                <Spinner size="sm" color={theme.primaryForeground} />
            ) : (
                <Text style={{ color: theme.primaryForeground }}>Tap to load</Text>
            )}
        </Button>
    );
}
