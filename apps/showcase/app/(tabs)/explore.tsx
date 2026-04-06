import { View, ScrollView, StyleSheet } from "react-native";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";

const COMPONENTS = [
  {
    slug: "button",
    title: "Button",
    description: "Pressable with size and variant APIs.",
    category: "Buttons",
    badgeVariant: "default" as const,
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    description: "Selectable control for boolean form state.",
    category: "Forms",
    badgeVariant: "outline" as const,
  },
  {
    slug: "spotlight-button",
    title: "Spotlight Button",
    description: "Animated CTA with shimmer, glow, and live press feedback.",
    category: "Animated Components",
    badgeVariant: "secondary" as const,
  },
  {
    slug: "text",
    title: "Text",
    description: "Semantic typography primitive.",
    category: "Typography",
    badgeVariant: "secondary" as const,
  },
  {
    slug: "input",
    title: "Input",
    description: "Styled TextInput with focus ring and variants.",
    category: "Forms",
    badgeVariant: "outline" as const,
  },
  {
    slug: "otp-input",
    title: "OTP Input",
    description: "One-time passcode entry for verification flows.",
    category: "Forms",
    badgeVariant: "outline" as const,
  },
  {
    slug: "progress",
    title: "Progress",
    description: "Animated determinate progress bar.",
    category: "Feedback",
    badgeVariant: "secondary" as const,
  },
  {
    slug: "textarea",
    title: "Textarea",
    description: "Multiline field for longer notes and messages.",
    category: "Forms",
    badgeVariant: "outline" as const,
  },
  {
    slug: "alert",
    title: "Alert",
    description: "Inline status callout with title, description, and variants.",
    category: "Feedback",
    badgeVariant: "destructive" as const,
  },
  {
    slug: "badge",
    title: "Badge",
    description: "Compact label chip for status and categories.",
    category: "Feedback",
    badgeVariant: "destructive" as const,
  },
  {
    slug: "avatar",
    title: "Avatar",
    description: "Circular image with accessible fallback.",
    category: "Media",
    badgeVariant: "secondary" as const,
  },
  {
    slug: "card",
    title: "Card",
    description: "Content container with header, content, and footer slots.",
    category: "Layout",
    badgeVariant: "default" as const,
  },
  {
    slug: "separator",
    title: "Separator",
    description: "Subtle divider for grouping related content.",
    category: "Layout",
    badgeVariant: "secondary" as const,
  },
  {
    slug: "scroll-area",
    title: "Scroll Area",
    description: "Bordered region with max height and smooth vertical scroll.",
    category: "Layout",
    badgeVariant: "secondary" as const,
  },
  {
    slug: "skeleton",
    title: "Skeleton",
    description: "Loading placeholder with a soft pulse animation.",
    category: "Feedback",
    badgeVariant: "secondary" as const,
  },
  {
    slug: "switch",
    title: "Switch",
    description: "Animated toggle for on and off state.",
    category: "Forms",
    badgeVariant: "outline" as const,
  },
  {
    slug: "label",
    title: "Label",
    description: "Compact field label for forms and settings.",
    category: "Forms",
    badgeVariant: "outline" as const,
  },
  {
    slug: "form",
    title: "Form",
    description: "Field layout with label, control, description, and error map.",
    category: "Forms",
    badgeVariant: "outline" as const,
  },
  {
    slug: "pagination",
    title: "Pagination",
    description: "Previous, next, page links, and ellipsis for navigation.",
    category: "Navigation",
    badgeVariant: "secondary" as const,
  },
  {
    slug: "hover-card",
    title: "Hover Card",
    description: "Rich preview anchored to a trigger—tap on native, hover on web.",
    category: "Overlays",
    badgeVariant: "secondary" as const,
  },
  {
    slug: "table",
    title: "Table",
    description: "Scrollable header and body rows for dense data.",
    category: "Layout",
    badgeVariant: "secondary" as const,
  },
  {
    slug: "list",
    title: "List",
    description: "Settings-style rows with leading, title, description, and trailing slots.",
    category: "Layout",
    badgeVariant: "default" as const,
  },
  {
    slug: "segmented-control",
    title: "Segmented Control",
    description: "Single-choice segments with large touch targets for filters and modes.",
    category: "Forms",
    badgeVariant: "outline" as const,
  },
  {
    slug: "fab",
    title: "FAB",
    description: "Floating action button with elevation for one primary screen action.",
    category: "Buttons",
    badgeVariant: "default" as const,
  },
  {
    slug: "search-bar",
    title: "Search Bar",
    description: "Full-width search field with optional clear and accessory slots.",
    category: "Forms",
    badgeVariant: "outline" as const,
  },
  {
    slug: "chip",
    title: "Chip",
    description: "Selectable or dismissible pill for filters, tags, and compact choices.",
    category: "Feedback",
    badgeVariant: "secondary" as const,
  },
];

export default function ExploreScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text variant="h2">Components</Text>
        <Text variant="muted">
          {COMPONENTS.length} components in the showcase
        </Text>
      </View>

      {COMPONENTS.map((comp) => (
        <View key={comp.slug} style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.cardMeta}>
              <Text variant="large">{comp.title}</Text>
              <Text variant="muted" style={styles.description}>
                {comp.description}
              </Text>
            </View>
            <Badge variant={comp.badgeVariant}>
              <Text>{comp.category}</Text>
            </Badge>
          </View>
          <View style={styles.installRow}>
            <Text variant="code">watermelon add {comp.slug}</Text>
          </View>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
    gap: 12,
  },
  header: {
    marginBottom: 8,
    gap: 4,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    padding: 16,
    gap: 12,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  cardMeta: {
    flex: 1,
    gap: 4,
  },
  description: {
    lineHeight: 20,
  },
  installRow: {
    flexDirection: "row",
  },
});
