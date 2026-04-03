import * as React from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    View,
    type NativeScrollEvent,
    type NativeSyntheticEvent,
    type PressableProps,
    type ScrollViewProps,
    type StyleProp,
    type ViewProps,
    type ViewStyle,
} from 'react-native';
import { Text } from './text';
import { useRegistryTheme } from '../../lib/theme';

type CarouselContextValue = {
    count: number;
    setCount: (count: number) => void;
    index: number;
    viewportWidth: number;
    setViewportWidth: (width: number) => void;
    scrollToIndex: (index: number) => void;
    loop: boolean;
    scrollRef: React.RefObject<ScrollView | null>;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarouselContext() {
    const context = React.useContext(CarouselContext);

    if (!context) {
        throw new Error('Carousel components must be used inside Carousel.');
    }

    return context;
}

function clampIndex(index: number, count: number, loop: boolean) {
    if (count <= 0) {
        return 0;
    }

    if (loop) {
        return (index + count) % count;
    }

    return Math.min(Math.max(index, 0), count - 1);
}

type CarouselProps = ViewProps & {
    defaultIndex?: number;
    index?: number;
    loop?: boolean;
    onIndexChange?: (index: number) => void;
};

function Carousel({
    children,
    defaultIndex = 0,
    index,
    loop = false,
    onIndexChange,
    style,
    ...props
}: CarouselProps) {
    const scrollRef = React.useRef<ScrollView>(null);
    const [internalIndex, setInternalIndex] = React.useState(defaultIndex);
    const [count, setCount] = React.useState(0);
    const [viewportWidth, setViewportWidth] = React.useState(0);
    const isControlled = index !== undefined;
    const resolvedIndex = clampIndex(isControlled ? index : internalIndex, count, loop);

    const setIndex = React.useCallback(
        (nextIndex: number) => {
            const clamped = clampIndex(nextIndex, count, loop);

            if (!isControlled) {
                setInternalIndex(clamped);
            }

            onIndexChange?.(clamped);
        },
        [count, isControlled, loop, onIndexChange],
    );

    const scrollToIndex = React.useCallback(
        (nextIndex: number) => {
            const clamped = clampIndex(nextIndex, count, loop);

            if (viewportWidth > 0) {
                scrollRef.current?.scrollTo({
                    x: clamped * viewportWidth,
                    animated: true,
                });
            }

            setIndex(clamped);
        },
        [count, loop, setIndex, viewportWidth],
    );

    React.useEffect(() => {
        if (viewportWidth > 0) {
            scrollRef.current?.scrollTo({
                x: resolvedIndex * viewportWidth,
                animated: false,
            });
        }
    }, [resolvedIndex, viewportWidth]);

    return (
        <CarouselContext.Provider
            value={{
                count,
                setCount,
                index: resolvedIndex,
                viewportWidth,
                setViewportWidth,
                scrollToIndex,
                loop,
                scrollRef,
            }}
        >
            <View style={[styles.root, style]} {...props}>
                {children}
            </View>
        </CarouselContext.Provider>
    );
}

function CarouselContent({
    children,
    onMomentumScrollEnd,
    showsHorizontalScrollIndicator = false,
    horizontal = true,
    pagingEnabled = true,
    decelerationRate = 'fast',
    style,
    contentContainerStyle,
    ...props
}: ScrollViewProps) {
    const { setCount, setViewportWidth, viewportWidth, scrollToIndex, scrollRef } =
        useCarouselContext();

    React.useEffect(() => {
        setCount(React.Children.count(children));
    }, [children, setCount]);

    const handleMomentumEnd = React.useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (viewportWidth > 0) {
                const nextIndex = Math.round(
                    event.nativeEvent.contentOffset.x / viewportWidth,
                );
                scrollToIndex(nextIndex);
            }

            onMomentumScrollEnd?.(event);
        },
        [onMomentumScrollEnd, scrollToIndex, viewportWidth],
    );

    return (
        <ScrollView
            ref={scrollRef}
            horizontal={horizontal}
            pagingEnabled={pagingEnabled}
            decelerationRate={decelerationRate}
            showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
            onLayout={(event) => {
                setViewportWidth(event.nativeEvent.layout.width);
            }}
            onMomentumScrollEnd={handleMomentumEnd}
            style={[styles.content, style]}
            contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
            {...props}
        >
            {children}
        </ScrollView>
    );
}

function CarouselItem({ children, style, ...props }: ViewProps) {
    const { viewportWidth } = useCarouselContext();

    return (
        <View
            style={[
                styles.item,
                viewportWidth > 0 ? { width: viewportWidth } : styles.itemPending,
                style,
            ]}
            {...props}
        >
            {children}
        </View>
    );
}

function CarouselPrevious({
    children,
    disabled,
    onPress,
    style,
    ...props
}: Omit<PressableProps, 'style'> & {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}) {
    const theme = useRegistryTheme();
    const { index, count, loop, scrollToIndex } = useCarouselContext();
    const resolvedDisabled = disabled ?? (!loop && index <= 0);

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel="Previous slide"
            disabled={resolvedDisabled || count <= 1}
            onPress={(event) => {
                onPress?.(event);
                scrollToIndex(index - 1);
            }}
            style={({ pressed }) => [
                styles.control,
                {
                    borderColor: theme.border,
                    backgroundColor: pressed ? theme.secondary : theme.background,
                    opacity: resolvedDisabled || count <= 1 ? 0.45 : 1,
                },
                style,
            ]}
            {...props}
        >
            {children ?? <Text style={styles.controlText}>{'<'}</Text>}
        </Pressable>
    );
}

function CarouselNext({
    children,
    disabled,
    onPress,
    style,
    ...props
}: Omit<PressableProps, 'style'> & {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}) {
    const theme = useRegistryTheme();
    const { index, count, loop, scrollToIndex } = useCarouselContext();
    const resolvedDisabled = disabled ?? (!loop && index >= count - 1);

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel="Next slide"
            disabled={resolvedDisabled || count <= 1}
            onPress={(event) => {
                onPress?.(event);
                scrollToIndex(index + 1);
            }}
            style={({ pressed }) => [
                styles.control,
                {
                    borderColor: theme.border,
                    backgroundColor: pressed ? theme.secondary : theme.background,
                    opacity: resolvedDisabled || count <= 1 ? 0.45 : 1,
                },
                style,
            ]}
            {...props}
        >
            {children ?? <Text style={styles.controlText}>{'>'}</Text>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        gap: 12,
    },
    content: {
        width: '100%',
    },
    contentContainer: {
        alignItems: 'stretch',
    },
    item: {
        justifyContent: 'center',
    },
    itemPending: {
        width: '100%',
    },
    control: {
        width: 40,
        height: 40,
        borderRadius: 999,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlText: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 18,
    },
});

export {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
};
export type { CarouselProps };
