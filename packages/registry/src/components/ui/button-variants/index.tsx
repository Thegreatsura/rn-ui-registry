/** @jsxImportSource react */
import * as React from 'react';
import { View } from 'react-native';

import { Text } from '../text';
import { variantLayoutStyles } from './shared-styles';

import { ButtonVariantElevated } from './button-variant-elevated';
import { ButtonVariantSoft } from './button-variant-soft';
import { ButtonVariantPill } from './button-variant-pill';
import { ButtonVariantDashedFrame } from './button-variant-dashed-frame';
import { ButtonVariantIconLeading } from './button-variant-icon-leading';
import { ButtonVariantLoading } from './button-variant-loading';
import { ButtonVariantAsyncSuccess } from './button-variant-async-success';
import { ButtonVariantToggle } from './button-variant-toggle';
import { ButtonVariantStepper } from './button-variant-stepper';
import { ButtonVariantDestructiveSolid } from './button-variant-destructive-solid';
import { ButtonVariantLinkChevron } from './button-variant-link-chevron';
import { ButtonVariantBlock } from './button-variant-block';
import { ButtonVariantCompact } from './button-variant-compact';
import { ButtonVariantPulse } from './button-variant-pulse';
import { ButtonVariantSpringScale } from './button-variant-spring-scale';
import { ButtonVariantBadge } from './button-variant-badge';
import { ButtonVariantSplitRow } from './button-variant-split-row';
import { ButtonVariantGlass } from './button-variant-glass';
import { ButtonVariantIconFavorite } from './button-variant-icon-favorite';
import { ButtonVariantDownloadTrailing } from './button-variant-download-trailing';

export { ButtonVariantElevated } from './button-variant-elevated';
export { ButtonVariantSoft } from './button-variant-soft';
export { ButtonVariantPill } from './button-variant-pill';
export { ButtonVariantDashedFrame } from './button-variant-dashed-frame';
export { ButtonVariantIconLeading } from './button-variant-icon-leading';
export { ButtonVariantLoading } from './button-variant-loading';
export { ButtonVariantAsyncSuccess } from './button-variant-async-success';
export { ButtonVariantToggle } from './button-variant-toggle';
export { ButtonVariantStepper } from './button-variant-stepper';
export { ButtonVariantDestructiveSolid } from './button-variant-destructive-solid';
export { ButtonVariantLinkChevron } from './button-variant-link-chevron';
export { ButtonVariantBlock } from './button-variant-block';
export { ButtonVariantCompact } from './button-variant-compact';
export { ButtonVariantPulse } from './button-variant-pulse';
export { ButtonVariantSpringScale } from './button-variant-spring-scale';
export { ButtonVariantBadge } from './button-variant-badge';
export { ButtonVariantSplitRow } from './button-variant-split-row';
export { ButtonVariantGlass } from './button-variant-glass';
export { ButtonVariantIconFavorite } from './button-variant-icon-favorite';
export { ButtonVariantDownloadTrailing } from './button-variant-download-trailing';

export type { ButtonVariantProps } from './types';

export const BUTTON_VARIANT_ROWS: {
    id: string;
    label: string;
    render: () => React.ReactElement;
}[] = [
    { id: 'elevated', label: 'Elevated', render: () => <ButtonVariantElevated /> },
    { id: 'soft', label: 'Soft muted', render: () => <ButtonVariantSoft /> },
    { id: 'pill', label: 'Pill', render: () => <ButtonVariantPill /> },
    { id: 'dashed', label: 'Dashed frame', render: () => <ButtonVariantDashedFrame /> },
    { id: 'iconLead', label: 'Icon + text', render: () => <ButtonVariantIconLeading /> },
    { id: 'loading', label: 'Loading', render: () => <ButtonVariantLoading /> },
    { id: 'async', label: 'Async save', render: () => <ButtonVariantAsyncSuccess /> },
    { id: 'toggle', label: 'Toggle', render: () => <ButtonVariantToggle /> },
    { id: 'stepper', label: 'Stepper', render: () => <ButtonVariantStepper /> },
    { id: 'destructive', label: 'Destructive', render: () => <ButtonVariantDestructiveSolid /> },
    { id: 'link', label: 'Link + chevron', render: () => <ButtonVariantLinkChevron /> },
    { id: 'block', label: 'Block', render: () => <ButtonVariantBlock /> },
    { id: 'compact', label: 'Compact', render: () => <ButtonVariantCompact /> },
    { id: 'pulse', label: 'Pulse', render: () => <ButtonVariantPulse /> },
    { id: 'spring', label: 'Spring scale', render: () => <ButtonVariantSpringScale /> },
    { id: 'badge', label: 'Badge', render: () => <ButtonVariantBadge /> },
    { id: 'split', label: 'Split row', render: () => <ButtonVariantSplitRow /> },
    { id: 'glass', label: 'Glass', render: () => <ButtonVariantGlass /> },
    { id: 'heart', label: 'Icon toggle', render: () => <ButtonVariantIconFavorite /> },
    { id: 'download', label: 'Trailing icon', render: () => <ButtonVariantDownloadTrailing /> },
];

export function ButtonVariantsShowcase() {
    return (
        <View style={variantLayoutStyles.showcase}>
            {BUTTON_VARIANT_ROWS.map((row) => (
                <View key={row.id} style={variantLayoutStyles.showcaseRow}>
                    <Text variant="muted" style={variantLayoutStyles.rowLabel}>
                        {row.label}
                    </Text>
                    {row.render()}
                </View>
            ))}
        </View>
    );
}
