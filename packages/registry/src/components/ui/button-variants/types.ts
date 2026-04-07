import type { ButtonProps } from '../button';

/** Props forwarded to the underlying `Button` (label/slots are fixed per variant). */
export type ButtonVariantProps = Omit<ButtonProps, 'children'>;
