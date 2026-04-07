/** @jsxImportSource react */
import * as React from 'react';
import { Heart } from 'lucide-react-native';

import { Button } from '../button';
import { useRegistryTheme } from '../../../lib/theme';
import type { ButtonVariantProps } from './types';

/** Icon heart favorite toggle. */
export function ButtonVariantIconFavorite(props: ButtonVariantProps) {
    const [liked, setLiked] = React.useState(false);
    const theme = useRegistryTheme();
    return (
        <Button variant={liked ? 'default' : 'outline'} size="icon" onPress={() => setLiked((l) => !l)} {...props}>
            <Heart size={18} color={liked ? theme.primaryForeground : theme.foreground} fill={liked ? theme.primaryForeground : 'transparent'} />
        </Button>
    );
}
