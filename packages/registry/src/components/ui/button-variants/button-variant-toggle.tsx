/** @jsxImportSource react */
import * as React from 'react';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '../../../lib/theme';
import type { ButtonVariantProps } from './types';

/** Toggle selection (subscribe). */
export function ButtonVariantToggle(props: ButtonVariantProps) {
    const [on, setOn] = React.useState(false);
    const theme = useRegistryTheme();
    return (
        <Button variant={on ? 'default' : 'outline'} onPress={() => setOn((v) => !v)} {...props}>
            <Text style={{ color: on ? theme.primaryForeground : theme.foreground }}>
                {on ? 'Subscribed' : 'Subscribe'}
            </Text>
        </Button>
    );
}
