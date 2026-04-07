/** @jsxImportSource react */
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as React from "react";
import { Pressable, StyleSheet, View, type ViewProps } from "react-native";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  useAccordionItemOpen,
  type AccordionProps,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { useRegistryTheme } from "@/components/ui/theme";

const ACCENT = "#ea580c";

const LEAD_ICON_NAMES = ["inventory-2", "refresh", "headset"] as const;

export type AccordionVariantFaqItem = {
  value: string;
  title: string;
  description: string;
};

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
];

type VariantBaseProps = Omit<AccordionProps, "children"> & {
  items?: AccordionVariantFaqItem[];
};

function resolveDefaultValue(
  type: AccordionProps["type"],
  items: { value: string }[],
  explicit?: string | string[],
) {
  if (explicit !== undefined) {
    return explicit;
  }
  if (type === "multiple") {
    return [items[0]?.value].filter(Boolean) as string[];
  }
  return items[0]?.value ?? "";
}

function FaqContent({ text }: { text: string }) {
  return (
    <Text variant="muted" style={styles.faqBody}>
      {text}
    </Text>
  );
}

/** Minimal list: hairline separators only (default accordion rhythm). */
export function AccordionVariantList({
  items = ACCORDION_VARIANT_FAQ_DEFAULT,
  type = "single",
  defaultValue,
  ...rest
}: VariantBaseProps) {
  const dv = resolveDefaultValue(type, items, defaultValue);
  return (
    <Accordion type={type} defaultValue={dv} {...rest}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>
            <FaqContent text={item.description} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/** Each item is its own rounded card with gap between. */
export function AccordionVariantCards({
  items = ACCORDION_VARIANT_FAQ_DEFAULT,
  type = "single",
  defaultValue,
  ...rest
}: VariantBaseProps) {
  const theme = useRegistryTheme();
  const dv = resolveDefaultValue(type, items, defaultValue);
  return (
    <View style={styles.cardsStack}>
      <Accordion type={type} defaultValue={dv} {...rest}>
        {items.map((item) => (
          <View
            key={item.value}
            style={[
              styles.cardWrap,
              { borderColor: theme.border, backgroundColor: theme.card },
            ]}
          >
            <AccordionItem value={item.value} style={styles.cardItem}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>
                <FaqContent text={item.description} />
              </AccordionContent>
            </AccordionItem>
          </View>
        ))}
      </Accordion>
    </View>
  );
}

/** Single bordered container with internal dividers. */
export function AccordionVariantGrouped({
  items = ACCORDION_VARIANT_FAQ_DEFAULT,
  type = "single",
  defaultValue,
  ...rest
}: VariantBaseProps) {
  const theme = useRegistryTheme();
  const dv = resolveDefaultValue(type, items, defaultValue);
  return (
    <View
      style={[
        styles.groupedOuter,
        { borderColor: theme.border, backgroundColor: theme.background },
      ]}
    >
      <Accordion type={type} defaultValue={dv} {...rest}>
        {items.map((item, index) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            style={{
              borderBottomWidth:
                index === items.length - 1 ? 0 : StyleSheet.hairlineWidth,
              borderBottomColor: theme.border,
            }}
          >
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
              <FaqContent text={item.description} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </View>
  );
}

function PlusMinusTrigger({ title }: { title: string }) {
  const open = useAccordionItemOpen();
  const theme = useRegistryTheme();
  return (
    <AccordionTrigger asChild>
      <Pressable style={({ pressed }) => [styles.triggerRow, pressed && styles.pressed]}>
        <Text style={[styles.titleSemibold, { color: theme.foreground }]}>{title}</Text>
        <Text style={[styles.plusMinus, { color: theme.foreground }]}>
          {open ? "−" : "+"}
        </Text>
      </Pressable>
    </AccordionTrigger>
  );
}

/** Bold titles with plus / minus on the right. */
export function AccordionVariantPlusMinus({
  items = ACCORDION_VARIANT_FAQ_DEFAULT,
  type = "single",
  defaultValue,
  ...rest
}: VariantBaseProps) {
  const dv = resolveDefaultValue(type, items, defaultValue);
  return (
    <Accordion type={type} defaultValue={dv} {...rest}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <PlusMinusTrigger title={item.title} />
          <AccordionContent>
            <FaqContent text={item.description} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function AccentTrigger({ title }: { title: string }) {
  const open = useAccordionItemOpen();
  const theme = useRegistryTheme();
  return (
    <AccordionTrigger asChild>
      <Pressable style={({ pressed }) => [pressed && styles.pressed]}>
        <View
          style={[
            styles.triggerRow,
            {
              borderBottomWidth: open ? 2 : StyleSheet.hairlineWidth,
              borderBottomColor: open ? ACCENT : theme.border,
            },
          ]}
        >
          <Text style={[styles.titleSemibold, { color: open ? ACCENT : theme.foreground }]}>
            {title}
          </Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={18}
            color={open ? ACCENT : theme.mutedForeground}
            style={{
              transform: [{ rotate: open ? "180deg" : "0deg" }],
            }}
          />
        </View>
      </Pressable>
    </AccordionTrigger>
  );
}

/** Accent header and rule when expanded. */
export function AccordionVariantAccent({
  items = ACCORDION_VARIANT_FAQ_DEFAULT,
  type = "single",
  defaultValue,
  ...rest
}: VariantBaseProps) {
  const dv = resolveDefaultValue(type, items, defaultValue);
  return (
    <Accordion type={type} defaultValue={dv} {...rest}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccentTrigger title={item.title} />
          <AccordionContent>
            <FaqContent text={item.description} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function LeadIconTrigger({
  title,
  iconName,
}: {
  title: string;
  iconName: (typeof LEAD_ICON_NAMES)[number];
}) {
  const open = useAccordionItemOpen();
  const theme = useRegistryTheme();
  return (
    <AccordionTrigger asChild>
      <Pressable style={({ pressed }) => [styles.triggerRow, pressed && styles.pressed]}>
        <View style={styles.leadLeft}>
          <MaterialIcons name={iconName} size={20} color={theme.mutedForeground} />
          <Text style={[styles.titleMedium, { color: theme.foreground }]}>{title}</Text>
        </View>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={18}
          color={theme.mutedForeground}
          style={{
            transform: [{ rotate: open ? "180deg" : "0deg" }],
          }}
        />
      </Pressable>
    </AccordionTrigger>
  );
}

/** Leading stroke icon + title + chevron. */
export function AccordionVariantLeadIcons({
  items = ACCORDION_VARIANT_FAQ_DEFAULT,
  type = "single",
  defaultValue,
  ...rest
}: VariantBaseProps) {
  const dv = resolveDefaultValue(type, items, defaultValue);
  return (
    <Accordion type={type} defaultValue={dv} {...rest}>
      {items.map((item, index) => {
        const iconName = LEAD_ICON_NAMES[index % LEAD_ICON_NAMES.length];
        return (
          <AccordionItem key={item.value} value={item.value}>
            <LeadIconTrigger title={item.title} iconName={iconName} />
            <AccordionContent>
              <FaqContent text={item.description} />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export type AccordionVariantSubtitledItem = {
  value: string;
  title: string;
  subtitle: string;
  description: string;
};

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
];

type SubtitledProps = Omit<AccordionProps, "children"> & {
  items?: AccordionVariantSubtitledItem[];
};

function SubtitledTrigger({
  title,
  subtitle,
  iconName,
}: {
  title: string;
  subtitle: string;
  iconName: (typeof LEAD_ICON_NAMES)[number];
}) {
  const open = useAccordionItemOpen();
  const theme = useRegistryTheme();
  return (
    <AccordionTrigger asChild>
      <Pressable style={({ pressed }) => [styles.triggerRow, pressed && styles.pressed]}>
        <View style={styles.leadLeft}>
          <View style={[styles.iconCircle, { backgroundColor: theme.muted }]}>
            <MaterialIcons name={iconName} size={18} color={theme.mutedForeground} />
          </View>
          <View>
            <Text style={[styles.titleMedium, { color: theme.foreground }]}>{title}</Text>
            <Text style={{ fontSize: 12, color: theme.mutedForeground, marginTop: 2 }}>
              {subtitle}
            </Text>
          </View>
        </View>
        <Text style={[styles.plusMinus, { color: theme.foreground }]}>{open ? "−" : "+"}</Text>
      </Pressable>
    </AccordionTrigger>
  );
}

/** Bordered group with circular icon, title, subtitle, and plus/minus. */
export function AccordionVariantSubtitled({
  items = ACCORDION_VARIANT_SUBTITLED_DEFAULT,
  type = "single",
  defaultValue,
  ...rest
}: SubtitledProps) {
  const theme = useRegistryTheme();
  const dv = resolveDefaultValue(type, items, defaultValue);
  return (
    <View
      style={[
        styles.groupedOuter,
        { borderColor: theme.border, backgroundColor: theme.background },
      ]}
    >
      <Accordion type={type} defaultValue={dv} {...rest}>
        {items.map((item, index) => {
          const iconName = LEAD_ICON_NAMES[index % LEAD_ICON_NAMES.length];
          return (
            <AccordionItem
              key={item.value}
              value={item.value}
              style={{
                borderBottomWidth:
                  index === items.length - 1 ? 0 : StyleSheet.hairlineWidth,
                borderBottomColor: theme.border,
              }}
            >
              <SubtitledTrigger title={item.title} subtitle={item.subtitle} iconName={iconName} />
              <AccordionContent>
                <FaqContent text={item.description} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </View>
  );
}

export type AccordionVariantProfileItem = {
  value: string;
  name: string;
  email: string;
  bio: string;
};

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
];

type ProfileProps = Omit<AccordionProps, "children"> & {
  items?: AccordionVariantProfileItem[];
};

function ProfileTrigger({ name, email }: { name: string; email: string }) {
  const theme = useRegistryTheme();
  const open = useAccordionItemOpen();
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <AccordionTrigger asChild>
      <Pressable style={({ pressed }) => [styles.triggerRow, pressed && styles.pressed]}>
        <View style={styles.leadLeft}>
          <Avatar style={styles.avatar}>
            <AvatarFallback>
              <Text style={{ color: theme.foreground, fontWeight: "600", fontSize: 14 }}>
                {initials}
              </Text>
            </AvatarFallback>
          </Avatar>
          <View>
            <Text style={[styles.titleSemibold, { color: theme.foreground }]}>{name}</Text>
            <Text style={{ fontSize: 13, color: theme.mutedForeground, marginTop: 2 }}>{email}</Text>
          </View>
        </View>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={18}
          color={theme.mutedForeground}
          style={{
            transform: [{ rotate: open ? "180deg" : "0deg" }],
          }}
        />
      </Pressable>
    </AccordionTrigger>
  );
}

/** Avatar, name, email in the header; bio in the panel. */
export function AccordionVariantProfile({
  items = ACCORDION_VARIANT_PROFILE_DEFAULT,
  type = "single",
  defaultValue,
  ...rest
}: ProfileProps) {
  const dv = resolveDefaultValue(type, items, defaultValue);
  return (
    <Accordion type={type} defaultValue={dv} {...rest}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <ProfileTrigger name={item.name} email={item.email} />
          <AccordionContent>
            <Text variant="muted" style={styles.faqBody}>
              {item.bio}
            </Text>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/** Outer categories with a nested accordion for detail questions. */
export function AccordionVariantNested(props: ViewProps) {
  const theme = useRegistryTheme();
  return (
    <View {...props}>
      <View
        style={[
          styles.groupedOuter,
          { borderColor: theme.border, backgroundColor: theme.background },
        ]}
      >
        <Accordion type="single" defaultValue="ship">
          <AccordionItem
            value="ship"
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: theme.border,
            }}
          >
            <AccordionTrigger>Shipping & delivery</AccordionTrigger>
            <AccordionContent>
              <View style={styles.nestedPad}>
                <Accordion type="single" defaultValue="track-n">
                  <AccordionItem value="track-n">
                    <AccordionTrigger>How do I track my order?</AccordionTrigger>
                    <AccordionContent>
                      <FaqContent text="Use the tracking link in your shipment email or open the order in your account." />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="time-n">
                    <AccordionTrigger>When will my package arrive?</AccordionTrigger>
                    <AccordionContent>
                      <FaqContent text="Most domestic orders arrive within 3–5 business days after the carrier picks up." />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </View>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="returns">
            <AccordionTrigger>Returns & refunds</AccordionTrigger>
            <AccordionContent>
              <Text variant="muted" style={styles.faqBody}>
                Start a return from your order history. Refunds post after we receive the item.
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  faqBody: {
    lineHeight: 22,
    fontSize: 14,
  },
  cardsStack: {
    gap: 12,
  },
  cardWrap: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
  cardItem: {
    borderBottomWidth: 0,
  },
  groupedOuter: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
  triggerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    width: "100%",
  },
  pressed: {
    opacity: 0.85,
  },
  titleSemibold: {
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
    paddingRight: 12,
  },
  titleMedium: {
    fontSize: 15,
    fontWeight: "500",
  },
  plusMinus: {
    fontSize: 22,
    fontWeight: "400",
    width: 28,
    textAlign: "center",
  },
  leadLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 44,
    height: 44,
  },
  nestedPad: {
    paddingLeft: 4,
    paddingBottom: 8,
  },
});
