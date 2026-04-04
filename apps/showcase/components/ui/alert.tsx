/** @jsxImportSource react */
import { useRegistryTheme } from "@/components/ui/theme";
import * as React from 'react';
import { StyleSheet, View, type TextProps, type ViewProps } from 'react-native';

import { Text } from "@/components/ui/text";

type AlertVariant = 'default' | 'destructive';

const AlertVariantContext = React.createContext<AlertVariant>('default');

function useAlertVariant() {
    return React.useContext(AlertVariantContext);
}

type AlertProps = ViewProps & {
    className?: string;
    variant?: AlertVariant;
};

function Alert({ style, variant = 'default', children, ...props }: AlertProps) {
    const theme = useRegistryTheme();
    const destructive = variant === 'destructive';

    return (
        <AlertVariantContext.Provider value={variant}>
            <View
                role="alert"
                style={[
                    styles.root,
                    destructive ? styles.rootDestructive : null,
                    {
                        backgroundColor: destructive ? '#fef2f2' : theme.muted,
                        borderColor: destructive ? 'rgba(220, 38, 38, 0.45)' : theme.border,
                    },
                    style,
                ]}
                {...props}
            >
                {children}
            </View>
        </AlertVariantContext.Provider>
    );
}

function AlertTitle({ style, ...props }: TextProps & { className?: string }) {
    const theme = useRegistryTheme();
    const variant = useAlertVariant();
    return (
        <Text
            style={[
                styles.title,
                {
                    color: variant === 'destructive' ? '#991b1b' : theme.foreground,
                },
                style,
            ]}
            {...props}
        />
    );
}

function AlertDescription({ style, ...props }: TextProps & { className?: string }) {
    const theme = useRegistryTheme();
    const variant = useAlertVariant();
    return (
        <Text
            variant="muted"
            style={[
                styles.description,
                {
                    color:
                        variant === 'destructive'
                            ? '#b91c1c'
                            : theme.mutedForeground,
                },
                style,
            ]}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    root: {
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 18,
        paddingVertical: 16,
        gap: 8,
        alignSelf: 'stretch',
    },
    rootDestructive: {
        borderWidth: 1.5,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 22,
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
    },
});

export { Alert, AlertDescription, AlertTitle };
export type { AlertProps };
