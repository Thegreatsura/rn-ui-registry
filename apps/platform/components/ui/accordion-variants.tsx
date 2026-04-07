"use client"

import * as React from "react"
import {
  Headphones,
  Package,
  RefreshCw,
  ChevronDown,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export type AccordionVariantFaqItem = {
  value: string
  title: string
  description: string
}

export const ACCORDION_VARIANT_FAQ_DEFAULT: AccordionVariantFaqItem[] = [
  {
    value: "track",
    title: "How do I track my order?",
    description:
      "Open Orders in your account and select the shipment to see live status and carrier tracking.",
  },
  {
    value: "returns",
    title: "What is your return policy?",
    description:
      "Unopened items can be returned within 30 days. Start a return from the order detail page.",
  },
  {
    value: "support",
    title: "How can I contact customer support?",
    description:
      "Use in-app chat weekdays 9–6, or email support@example.com—we reply within one business day.",
  },
]

type AccordionRootProps = React.ComponentProps<typeof Accordion>

/** Radix Accordion uses a discriminated union on `type`; this satisfies the checker for our defaults. */
function accordionVariantRootProps(
  type: "single" | "multiple",
  defaultValue: string | string[],
  rest: Record<string, unknown>,
): AccordionRootProps {
  return {
    type,
    defaultValue,
    collapsible: true,
    ...rest,
  } as AccordionRootProps
}

type VariantBaseProps = Partial<
  Omit<React.ComponentProps<typeof Accordion>, "children">
> & {
  items?: AccordionVariantFaqItem[]
}

function resolveDefaultValue(
  type: React.ComponentProps<typeof Accordion>["type"],
  items: { value: string }[],
  explicit?: string | string[],
) {
  if (explicit !== undefined) {
    return explicit
  }
  if (type === "multiple") {
    return [items[0]?.value].filter(Boolean) as string[]
  }
  return items[0]?.value ?? ""
}

function FaqContent({ text }: { text: string }) {
  return (
    <p className="text-muted-foreground pb-4 text-sm leading-7">{text}</p>
  )
}

/** Minimal list: hairline separators only. */
export function AccordionVariantList({
  items = ACCORDION_VARIANT_FAQ_DEFAULT,
  type = "single",
  defaultValue,
  ...rest
}: VariantBaseProps) {
  const dv = resolveDefaultValue(type, items, defaultValue)
  return (
    <Accordion
      {...accordionVariantRootProps(type, dv, { ...rest } as Record<string, unknown>)}
    >
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value} className="border-b px-1">
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>
            <FaqContent text={item.description} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

/** Each item is its own rounded card with gap between. */
export function AccordionVariantCards({
  items = ACCORDION_VARIANT_FAQ_DEFAULT,
  type = "single",
  defaultValue,
  ...rest
}: VariantBaseProps) {
  const dv = resolveDefaultValue(type, items, defaultValue)
  return (
    <Accordion
      {...accordionVariantRootProps(type, dv, { ...rest } as Record<string, unknown>)}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="border-border bg-card mb-3 overflow-hidden rounded-xl border last:mb-0"
        >
          <AccordionTrigger className="px-4">{item.title}</AccordionTrigger>
          <AccordionContent className="px-4">
            <FaqContent text={item.description} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

/** Single bordered container with internal dividers. */
export function AccordionVariantGrouped({
  items = ACCORDION_VARIANT_FAQ_DEFAULT,
  type = "single",
  defaultValue,
  ...rest
}: VariantBaseProps) {
  const dv = resolveDefaultValue(type, items, defaultValue)
  return (
    <div className="border-border bg-background overflow-hidden rounded-xl border">
      <Accordion
        {...accordionVariantRootProps(type, dv, { ...rest } as Record<string, unknown>)}
      >
        {items.map((item, index) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            className={cn(
              "border-border px-1",
              index < items.length - 1 && "border-b",
            )}
          >
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
              <FaqContent text={item.description} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

/** Bold titles with plus / minus on the right. */
export function AccordionVariantPlusMinus({
  items = ACCORDION_VARIANT_FAQ_DEFAULT,
  type = "single",
  defaultValue,
  ...rest
}: VariantBaseProps) {
  const dv = resolveDefaultValue(type, items, defaultValue)
  return (
    <Accordion
      {...accordionVariantRootProps(type, dv, { ...rest } as Record<string, unknown>)}
    >
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value} className="border-b px-1">
          <AccordionTrigger asChild>
            <button
              type="button"
              className="group hover:bg-muted/40 flex w-full items-center justify-between py-4 text-left text-[15px] font-semibold transition-colors"
            >
              <span>{item.title}</span>
              <span className="group-data-[state=open]:hidden text-xl leading-none">+</span>
              <span className="hidden group-data-[state=open]:inline text-xl leading-none">−</span>
            </button>
          </AccordionTrigger>
          <AccordionContent>
            <FaqContent text={item.description} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

/** Accent header and rule when expanded. */
export function AccordionVariantAccent({
  items = ACCORDION_VARIANT_FAQ_DEFAULT,
  type = "single",
  defaultValue,
  ...rest
}: VariantBaseProps) {
  const dv = resolveDefaultValue(type, items, defaultValue)
  return (
    <Accordion
      {...accordionVariantRootProps(type, dv, { ...rest } as Record<string, unknown>)}
    >
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value} className="border-b px-1">
          <AccordionTrigger asChild>
            <button
              type="button"
              className={cn(
                "group flex w-full items-center justify-between border-b py-4 text-left text-[15px] font-semibold transition-colors",
                "border-border data-[state=open]:border-orange-600 data-[state=open]:border-b-2",
                "text-foreground data-[state=open]:text-orange-600",
              )}
            >
              <span>{item.title}</span>
              <ChevronDown className="text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-orange-600" />
            </button>
          </AccordionTrigger>
          <AccordionContent>
            <FaqContent text={item.description} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

const LEAD_ICONS = [Package, RefreshCw, Headphones] as const

/** Leading stroke icon + title + chevron. */
export function AccordionVariantLeadIcons({
  items = ACCORDION_VARIANT_FAQ_DEFAULT,
  type = "single",
  defaultValue,
  ...rest
}: VariantBaseProps) {
  const dv = resolveDefaultValue(type, items, defaultValue)
  return (
    <Accordion
      {...accordionVariantRootProps(type, dv, { ...rest } as Record<string, unknown>)}
    >
      {items.map((item, index) => {
        const Icon = LEAD_ICONS[index % LEAD_ICONS.length]
        return (
          <AccordionItem key={item.value} value={item.value} className="border-b px-1">
            <AccordionTrigger asChild>
              <button
                type="button"
                className="group hover:bg-muted/40 flex w-full items-center justify-between gap-3 py-4 text-left transition-colors"
              >
                <span className="text-muted-foreground flex min-w-0 flex-1 items-center gap-2.5">
                  <Icon className="size-5 shrink-0" strokeWidth={2} />
                  <span className="text-foreground text-[15px] font-medium">{item.title}</span>
                </span>
                <ChevronDown className="text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </button>
            </AccordionTrigger>
            <AccordionContent>
              <FaqContent text={item.description} />
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export type AccordionVariantSubtitledItem = {
  value: string
  title: string
  subtitle: string
  description: string
}

export const ACCORDION_VARIANT_SUBTITLED_DEFAULT: AccordionVariantSubtitledItem[] = [
  {
    value: "ship",
    title: "Shipping updates",
    subtitle: "Shipping & delivery",
    description:
      "We ship within 2 business days. You will get an email when the label is created.",
  },
  {
    value: "intl",
    title: "International orders",
    subtitle: "Shipping & delivery",
    description:
      "Duties and taxes may apply based on your country. Estimates appear at checkout.",
  },
  {
    value: "pickup",
    title: "Pickup locations",
    subtitle: "Shipping & delivery",
    description: "Select a locker or store pickup during checkout where available.",
  },
]

type SubtitledProps = Partial<
  Omit<React.ComponentProps<typeof Accordion>, "children">
> & {
  items?: AccordionVariantSubtitledItem[]
}

/** Bordered group with circular icon, title, subtitle, and plus/minus. */
export function AccordionVariantSubtitled({
  items = ACCORDION_VARIANT_SUBTITLED_DEFAULT,
  type = "single",
  defaultValue,
  ...rest
}: SubtitledProps) {
  const dv = resolveDefaultValue(type, items, defaultValue)
  return (
    <div className="border-border bg-background overflow-hidden rounded-xl border">
      <Accordion
        {...accordionVariantRootProps(type, dv, { ...rest } as Record<string, unknown>)}
      >
        {items.map((item, index) => {
          const Icon = LEAD_ICONS[index % LEAD_ICONS.length]
          return (
            <AccordionItem
              key={item.value}
              value={item.value}
              className={cn(
                "border-border px-1",
                index < items.length - 1 && "border-b",
              )}
            >
              <AccordionTrigger asChild>
                <button
                  type="button"
                  className="group hover:bg-muted/40 flex w-full items-center justify-between gap-3 py-4 text-left transition-colors"
                >
                  <span className="flex min-w-0 flex-1 items-center gap-3">
                    <span className="bg-muted text-muted-foreground inline-flex size-9 shrink-0 items-center justify-center rounded-full">
                      <Icon className="size-[18px]" strokeWidth={2} />
                    </span>
                    <span className="min-w-0">
                      <span className="text-foreground block text-[15px] font-medium">
                        {item.title}
                      </span>
                      <span className="text-muted-foreground mt-0.5 block text-xs">
                        {item.subtitle}
                      </span>
                    </span>
                  </span>
                  <span className="text-foreground text-xl leading-none group-data-[state=open]:hidden">+</span>
                  <span className="text-foreground hidden text-xl leading-none group-data-[state=open]:inline">
                    −
                  </span>
                </button>
              </AccordionTrigger>
              <AccordionContent>
                <FaqContent text={item.description} />
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

export type AccordionVariantProfileItem = {
  value: string
  name: string
  email: string
  bio: string
}

export const ACCORDION_VARIANT_PROFILE_DEFAULT: AccordionVariantProfileItem[] = [
  {
    value: "u1",
    name: "Alex Morgan",
    email: "alex@example.com",
    bio: "Product designer focused on systems and accessibility. Previously at a commerce platform, now building mobile-first patterns.",
  },
  {
    value: "u2",
    name: "Jordan Lee",
    email: "jordan@example.com",
    bio: "Engineer working on performance and offline support. Open source contributor and conference speaker.",
  },
]

type ProfileProps = Partial<
  Omit<React.ComponentProps<typeof Accordion>, "children">
> & {
  items?: AccordionVariantProfileItem[]
}

/** Avatar, name, email in the header; bio in the panel. */
export function AccordionVariantProfile({
  items = ACCORDION_VARIANT_PROFILE_DEFAULT,
  type = "single",
  defaultValue,
  ...rest
}: ProfileProps) {
  const dv = resolveDefaultValue(type, items, defaultValue)
  return (
    <Accordion
      {...accordionVariantRootProps(type, dv, { ...rest } as Record<string, unknown>)}
    >
      {items.map((item) => {
        const initials = item.name
          .split(" ")
          .map((p) => p[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
        return (
          <AccordionItem key={item.value} value={item.value} className="border-b px-1">
            <AccordionTrigger asChild>
              <button
                type="button"
                className="group hover:bg-muted/40 flex w-full items-center justify-between gap-3 py-4 text-left transition-colors"
              >
                <span className="flex min-w-0 flex-1 items-center gap-3">
                  <Avatar className="size-11">
                    <AvatarFallback className="text-sm font-semibold">{initials}</AvatarFallback>
                  </Avatar>
                  <span className="min-w-0">
                    <span className="text-foreground block text-[15px] font-semibold">{item.name}</span>
                    <span className="text-muted-foreground mt-0.5 block text-[13px]">
                      {item.email}
                    </span>
                  </span>
                </span>
                <ChevronDown className="text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </button>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground pb-4 text-sm leading-7">{item.bio}</p>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

/** Outer categories with a nested accordion for detail questions. */
export function AccordionVariantNested(props: React.ComponentProps<"div">) {
  return (
    <div {...props}>
      <div className="border-border bg-background overflow-hidden rounded-xl border">
        <Accordion type="single" defaultValue="ship" collapsible>
          <AccordionItem value="ship" className="border-b px-1">
            <AccordionTrigger>Shipping & delivery</AccordionTrigger>
            <AccordionContent>
              <div className="border-border ml-1 border-l pl-3 pb-2">
                <Accordion type="single" defaultValue="track-n" collapsible>
                  <AccordionItem value="track-n" className="border-b border-dashed px-0">
                    <AccordionTrigger className="text-sm">How do I track my order?</AccordionTrigger>
                    <AccordionContent>
                      <FaqContent text="Use the tracking link in your shipment email or open the order in your account." />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="time-n" className="px-0">
                    <AccordionTrigger className="text-sm">When will my package arrive?</AccordionTrigger>
                    <AccordionContent>
                      <FaqContent text="Most domestic orders arrive within 3–5 business days after the carrier picks up." />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="returns" className="px-1">
            <AccordionTrigger>Returns & refunds</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground pb-4 text-sm leading-7">
                Start a return from your order history. Refunds post after we receive the item.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
