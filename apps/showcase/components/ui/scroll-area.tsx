/** @jsxImportSource react */
import { useRegistryTheme } from "@/components/ui/theme";
import * as React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    type ScrollViewProps,
    type ViewProps,
} from 'react-native';

type ScrollAreaProps = ScrollViewProps & {
    className?: string;
    /** Max height of the scroll region in px (shadcn-style bounded panel). */
    maxHeight?: number;
    containerStyle?: ViewProps['style'];
};

function ScrollArea({
    style,
    contentContainerStyle,
    maxHeight = 280,
    containerStyle,
    children,
    showsVerticalScrollIndicator = true,
    ...props
}: ScrollAreaProps) {
    const theme = useRegistryTheme();

    return (
        <View
            style={[
                styles.border,
                {
                    borderColor: theme.border,
                    backgroundColor: theme.background,
                    maxHeight,
                },
                containerStyle,
            ]}
        >
            <ScrollView
                style={[styles.scroll, style]}
                contentContainerStyle={[styles.content, contentContainerStyle]}
                showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                {...props}
            >
                {children}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    border: {
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth * 2,
        overflow: 'hidden',
        alignSelf: 'stretch',
    },
    scroll: {
        flexGrow: 0,
    },
    content: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 4,
    },
});

export { ScrollArea };
export type { ScrollAreaProps };
