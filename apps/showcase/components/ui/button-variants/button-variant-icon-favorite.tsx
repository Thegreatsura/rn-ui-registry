/** @jsxImportSource react */
import * as React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Button } from '../button';
import { useRegistryTheme } from '@/components/ui/theme';
import type { ButtonVariantProps } from './types';

/** Icon heart favorite toggle. */
export function ButtonVariantIconFavorite(props: ButtonVariantProps) {
    const [liked, setLiked] = React.useState(false);
    const theme = useRegistryTheme();
    return (
        <Button variant={liked ? 'default' : 'outline'} size="icon" onPress={() => setLiked((l) => !l)} {...props}>
            <MaterialIcons
                name={liked ? 'favorite' : 'favorite-border'}
                size={18}
                color={liked ? theme.primaryForeground : theme.foreground}
            />
        </Button>
    );
}
