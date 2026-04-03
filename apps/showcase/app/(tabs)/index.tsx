import { View, ScrollView, Pressable } from "react-native";
import { Link } from "expo-router";
import { Text } from "@/components/ui/text";
import { IconSymbol } from "@/components/ui/icon-symbol";

const CATEGORIES = [
  { id: "accordion", name: "Accordion", icon: "list.bullet.indent" as const },
  {
    id: "alert-dialog",
    name: "Alert Dialog",
    icon: "exclamationmark.triangle" as const,
  },
  {
    id: "aspect-ratio",
    name: "Aspect Ratio",
    icon: "rectangle.compress.vertical" as const,
  },
  { id: "carousel", name: "Carousel", icon: "rectangle.on.rectangle" as const },
  { id: "breadcrumb", name: "Breadcrumb", icon: "point.topleft.down.curvedto.point.bottomright.up" as const },
  { id: "button", name: "Button", icon: "square.and.pencil" as const },
  { id: "checkbox", name: "Checkbox", icon: "checkmark.square" as const },
  { id: "collapsible", name: "Collapsible", icon: "chevron.down" as const },
  { id: "command", name: "Command", icon: "magnifyingglass" as const },
  {
    id: "dialog",
    name: "Dialog",
    icon: "rectangle.portrait.on.rectangle.portrait" as const,
  },
  {
    id: "drawer",
    name: "Drawer",
    icon: "rectangle.bottomthird.inset.filled" as const,
  },
  {
    id: "dropdown-menu",
    name: "Dropdown Menu",
    icon: "ellipsis.circle" as const,
  },
  { id: "input-group", name: "Input Group", icon: "link" as const },
  { id: "kbd", name: "Kbd", icon: "command" as const },
  {
    id: "popover",
    name: "Popover",
    icon: "bubble.left.and.bubble.right" as const,
  },
  {
    id: "radio-group",
    name: "Radio Group",
    icon: "smallcircle.filled.circle" as const,
  },
  { id: "slider", name: "Slider", icon: "slider.horizontal.3" as const },
  {
    id: "spinner",
    name: "Spinner",
    icon: "arrow.triangle.2.circlepath" as const,
  },
  {
    id: "spotlight-button",
    name: "Spotlight Button",
    icon: "sparkles" as const,
  },
  { id: "tabs", name: "Tabs", icon: "square.split.2x1" as const },
  { id: "toggle", name: "Toggle", icon: "circle.lefthalf.filled" as const },
  {
    id: "toggle-group",
    name: "Toggle Group",
    icon: "rectangle.3.group" as const,
  },
  { id: "input", name: "Input", icon: "keyboard" as const },
  { id: "otp-input", name: "OTP Input", icon: "number.square" as const },
  { id: "progress", name: "Progress", icon: "chart.bar.fill" as const },
  { id: "textarea", name: "Textarea", icon: "note.text" as const },
  { id: "badge", name: "Badge", icon: "app.badge" as const },
  { id: "avatar", name: "Avatar", icon: "person.circle" as const },
  { id: "card", name: "Card", icon: "rectangle.stack.fill" as const },
  { id: "separator", name: "Separator", icon: "rectangle.split.3x1" as const },
  { id: "sheet", name: "Sheet", icon: "sidebar.right" as const },
  { id: "skeleton", name: "Skeleton", icon: "square.grid.2x2" as const },
  { id: "switch", name: "Switch", icon: "switch.2" as const },
  { id: "label", name: "Label", icon: "tag.fill" as const },
  { id: "text", name: "Typography", icon: "textformat" as const },
  { id: "tooltip", name: "Tooltip", icon: "info.bubble" as const },
];

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingTop: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8">
          <Text variant="h1">Watermelon RN</Text>
          <Text variant="muted" style={{ marginTop: 4 }}>
            shadcn-like components for React Native
          </Text>
        </View>

        <Text variant="h3" style={{ marginBottom: 16 }}>
          Components
        </Text>

        <View className="gap-3">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/(components)/${category.id}`}
              asChild
            >
              <Pressable className="flex-row items-center justify-between rounded-xl border border-border bg-card p-4 active:bg-secondary/50">
                <View className="flex-row items-center gap-3">
                  <View className="h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <IconSymbol
                      name={category.icon}
                      size={20}
                      className="text-primary"
                    />
                  </View>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    {category.name}
                  </Text>
                </View>
                <IconSymbol
                  name="chevron.right"
                  size={16}
                  className="text-muted-foreground"
                />
              </Pressable>
            </Link>
          ))}
        </View>

        <View className="h-20" />
      </ScrollView>
    </View>
  );
}
