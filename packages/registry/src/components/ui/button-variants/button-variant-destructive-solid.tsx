/** @jsxImportSource react */
import * as React from 'react';

import { Button } from '../button';
import { Text } from '../text';
import type { ButtonVariantProps } from './types';

/** Destructive label emphasis. */
export function ButtonVariantDestructiveSolid(props: ButtonVariantProps) {
    return (
        <Button variant="destructive" {...props}>
            <Text style={{ color: '#dc2626' }}>Remove item</Text>
        </Button>
    );
}
