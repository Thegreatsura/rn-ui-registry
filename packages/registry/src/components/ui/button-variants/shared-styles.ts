import { StyleSheet } from 'react-native';

export const variantLayoutStyles = StyleSheet.create({
    elevWrap: {
        borderRadius: 10,
    },
    softPad: {
        alignSelf: 'flex-start',
        borderRadius: 10,
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    dashedOuter: {
        alignSelf: 'flex-start',
        borderRadius: 10,
        borderStyle: 'dashed',
        borderWidth: 1,
        padding: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepperValue: {
        minWidth: 28,
        alignItems: 'center',
    },
    badge: {
        marginLeft: 4,
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        paddingHorizontal: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    splitRow: {
        flexDirection: 'row',
        gap: 8,
        alignSelf: 'stretch',
        width: '100%',
    },
    splitGrow: {
        flex: 1,
    },
    showcase: {
        gap: 16,
        width: '100%',
    },
    showcaseRow: {
        gap: 8,
        width: '100%',
    },
    rowLabel: {
        fontSize: 12,
        marginBottom: 4,
    },
});
