/** @jsxImportSource react */
import * as React from 'react';
import { Platform, StyleSheet, View, type ViewStyle } from 'react-native';

import { Button } from '../button';
import { Text } from '../text';
import { useRegistryTheme } from '../../../lib/theme';
import type { ButtonVariantProps } from './types';

function liquidGlassShell(theme: ReturnType<typeof useRegistryTheme>): ViewStyle {
    const rounded: ViewStyle = {
        borderRadius: 16,
        overflow: 'hidden',
        alignSelf: 'flex-start',
    };

    return Platform.select<ViewStyle>({
        web: {
            ...rounded,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.42)',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            boxShadow:
                '0 4px 24px rgba(15, 23, 42, 0.08), 0 14px 44px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.65), inset 0 -1px 0 rgba(15, 23, 42, 0.06)',
        } as ViewStyle,
        ios: {
            ...rounded,
            borderWidth: StyleSheet.hairlineWidth * 2,
            borderColor: 'rgba(255, 255, 255, 0.48)',
            backgroundColor: 'rgba(255, 255, 255, 0.72)',
            shadowColor: '#0f172a',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.14,
            shadowRadius: 26,
        },
        android: {
            ...rounded,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.38)',
            backgroundColor: 'rgba(255, 255, 255, 0.68)',
            elevation: 10,
        },
        default: {
            ...rounded,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: theme.border,
            backgroundColor: `${theme.card}e6`,
        },
    }) as ViewStyle;
}

const specularHighlight: ViewStyle = {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
};

/** Frosted liquid-glass frame (blur on web; soft shadows on native). */
export function ButtonVariantGlass(props: ButtonVariantProps) {
    const theme = useRegistryTheme();
    return (
        <View style={liquidGlassShell(theme)}>
            <View style={specularHighlight} pointerEvents="none">
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.72)',
                    }}
                />
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.22)',
                    }}
                />
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '65%',
                        height: '55%',
                        borderTopLeftRadius: 14,
                        backgroundColor: 'rgba(255, 255, 255, 0.28)',
                        opacity: 0.85,
                    }}
                />
            </View>
            <Button variant="ghost" {...props}>
                <Text style={{ color: theme.foreground }}>Glass</Text>
            </Button>
        </View>
    );
}
