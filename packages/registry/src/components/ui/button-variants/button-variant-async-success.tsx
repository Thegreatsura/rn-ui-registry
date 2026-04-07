/** @jsxImportSource react */
import * as React from 'react';

import { Button } from '../button';
import { Text } from '../text';
import { Spinner } from '../spinner';
import { useRegistryTheme } from '../../../lib/theme';
import type { ButtonVariantProps } from './types';

/** Async save → success label. */
export function ButtonVariantAsyncSuccess(props: ButtonVariantProps) {
    const [phase, setPhase] = React.useState<'idle' | 'busy' | 'done'>('idle');
    const theme = useRegistryTheme();

    return (
        <Button
            variant="default"
            disabled={phase === 'busy' || phase === 'done'}
            onPress={() => {
                setPhase('busy');
                setTimeout(() => setPhase('done'), 1200);
            }}
            {...props}
        >
            {phase === 'busy' ? (
                <Spinner size="sm" color={theme.primaryForeground} />
            ) : (
                <Text style={{ color: theme.primaryForeground }}>
                    {phase === 'done' ? 'Saved ✓' : 'Save changes'}
                </Text>
            )}
        </Button>
    );
}
