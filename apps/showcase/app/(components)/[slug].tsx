import { useHeaderHeight } from "@react-navigation/elements";
import { Stack, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SpotlightButton } from "@/components/animated/spotlight-button";
import { useThemeColor } from "@/hooks/use-theme-color";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardDescription,
  HoverCardHeader,
  HoverCardTitle,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { OTPInput } from "@/components/ui/otp-input";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipText,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const COMPONENT_META = {
  accordion: { title: "Accordion" },
  alert: { title: "Alert" },
  "alert-dialog": { title: "Alert Dialog" },
  "aspect-ratio": { title: "Aspect Ratio" },
  avatar: { title: "Avatar" },
  badge: { title: "Badge" },
  breadcrumb: { title: "Breadcrumb" },
  carousel: { title: "Carousel" },
  button: { title: "Button" },
  checkbox: { title: "Checkbox" },
  collapsible: { title: "Collapsible" },
  command: { title: "Command" },
  dialog: { title: "Dialog" },
  drawer: { title: "Drawer" },
  "dropdown-menu": { title: "Dropdown Menu" },
  form: { title: "Form" },
  "hover-card": { title: "Hover Card" },
  "input-group": { title: "Input Group" },
  kbd: { title: "Kbd" },
  "spotlight-button": { title: "Spotlight Button" },
  card: { title: "Card" },
  input: { title: "Input" },
  label: { title: "Label" },
  "otp-input": { title: "OTP Input" },
  pagination: { title: "Pagination" },
  popover: { title: "Popover" },
  progress: { title: "Progress" },
  "radio-group": { title: "Radio Group" },
  separator: { title: "Separator" },
  "scroll-area": { title: "Scroll Area" },
  sheet: { title: "Sheet" },
  skeleton: { title: "Skeleton" },
  slider: { title: "Slider" },
  spinner: { title: "Spinner" },
  switch: { title: "Switch" },
  table: { title: "Table" },
  tabs: { title: "Tabs" },
  text: { title: "Typography" },
  textarea: { title: "Textarea" },
  toggle: { title: "Toggle" },
  "toggle-group": { title: "Toggle Group" },
  tooltip: { title: "Tooltip" },
} as const;

type ComponentSlug = keyof typeof COMPONENT_META;
function Block({
  title,
  children,
  style,
}: {
  title?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Card style={style}>
      {title ? (
        <CardHeader>
          <Text variant="large">{title}</Text>
        </CardHeader>
      ) : null}
      <CardContent>{children}</CardContent>
    </Card>
  );
}


function SpotlightButtonPreview({
  primarySurface,
  neutralSurface,
}: {
  primarySurface: string;
  neutralSurface: string;
}) {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.stackMd}>
      <View
        style={[styles.spotlightSurface, { backgroundColor: primarySurface }]}
      >
        <SpotlightButton
          size="lg"
          badge="Beta"
          onPress={() => setCount((value) => value + 1)}
        >
          {count === 0
            ? "Launch animation"
            : `Launched ${count} time${count === 1 ? "" : "s"}`}
        </SpotlightButton>
      </View>
      <View
        style={[styles.spotlightSurface, { backgroundColor: neutralSurface }]}
      >
        <SpotlightButton
          variant="neutral"
          badge="Update"
          onPress={() => setCount((value) => value + 1)}
        >
          View release notes
        </SpotlightButton>
      </View>
    </View>
  );
}

function SpotlightButtonExamples({
  primarySurface,
  neutralSurface,
}: {
  primarySurface: string;
  neutralSurface: string;
}) {
  const [count, setCount] = useState(0);

  return (
    <>
      <Block title="Interactive hero">
        <View style={styles.stackMd}>
          <Text variant="muted">
            Tap the button to test the shimmer, press state, and live action
            label.
          </Text>
          <View
            style={[
              styles.spotlightSurface,
              { backgroundColor: primarySurface },
            ]}
          >
            <SpotlightButton
              size="lg"
              badge="Live"
              onPress={() => setCount((value) => value + 1)}
            >
              {count === 0 ? "Start preview build" : `Preview taps ${count}`}
            </SpotlightButton>
          </View>
        </View>
      </Block>
      <Block title="Neutral surface">
        <View style={styles.stackMd}>
          <View
            style={[
              styles.spotlightSurface,
              { backgroundColor: neutralSurface },
            ]}
          >
            <SpotlightButton
              variant="neutral"
              badge="New"
              onPress={() => setCount((value) => value + 1)}
            >
              Open changelog
            </SpotlightButton>
          </View>
          <Button variant="outline" onPress={() => setCount(0)}>
            <Text>Reset counter</Text>
          </Button>
        </View>
      </Block>
    </>
  );
}

function ButtonPreview() {
  return (
    <View style={styles.stackMd}>
      <View style={styles.rowWrap}>
        <Button>
          <Text>Primary</Text>
        </Button>
        <Button variant="secondary">
          <Text>Secondary</Text>
        </Button>
        <Button variant="outline">
          <Text>Outline</Text>
        </Button>
        <Button variant="ghost">
          <Text>Ghost</Text>
        </Button>
        <Button variant="destructive">
          <Text>Delete</Text>
        </Button>
      </View>
      <View style={styles.rowWrap}>
        <Button size="sm">
          <Text>Small</Text>
        </Button>
        <Button size="default">
          <Text>Default</Text>
        </Button>
        <Button size="lg">
          <Text>Large</Text>
        </Button>
        <Button variant="outline" size="icon">
          <Text>+</Text>
        </Button>
      </View>
    </View>
  );
}

function ButtonExamples() {
  return (
    <>
      <Block title="Variants">
        <View style={styles.rowWrap}>
          <Button>
            <Text>Primary</Text>
          </Button>
          <Button variant="secondary">
            <Text>Secondary</Text>
          </Button>
          <Button variant="outline">
            <Text>Outline</Text>
          </Button>
          <Button variant="ghost">
            <Text>Ghost</Text>
          </Button>
          <Button variant="destructive">
            <Text>Delete</Text>
          </Button>
        </View>
      </Block>
      <Block title="Primary">
        <Button style={styles.fullWidthButton}>
          <Text>Create project</Text>
        </Button>
      </Block>
      <Block title="Sizes">
        <View style={styles.rowWrap}>
          <Button size="sm">
            <Text>Small</Text>
          </Button>
          <Button size="default">
            <Text>Default</Text>
          </Button>
          <Button size="lg">
            <Text>Large</Text>
          </Button>
          <Button variant="outline" size="icon">
            <Text>+</Text>
          </Button>
        </View>
      </Block>
      <Block title="States">
        <View style={styles.rowWrap}>
          <Button disabled>
            <Text>Disabled</Text>
          </Button>
          <Button variant="outline" disabled>
            <Text>Loading</Text>
          </Button>
        </View>
      </Block>
    </>
  );
}

function InputPreview() {
  const [inputValue, setInputValue] = useState("");

  return (
    <View style={styles.stackMd}>
      <Input
        placeholder="Email address"
        value={inputValue}
        onChangeText={setInputValue}
        leftSlot={
          <MaterialIcons name="mail-outline" size={16} color="#71717a" />
        }
      />
      <Input
        variant="ghost"
        placeholder="Search components..."
        leftSlot={<MaterialIcons name="search" size={16} color="#71717a" />}
      />
      <Input editable={false} value="Read only value" />
    </View>
  );
}

function InputExamples() {
  return (
    <>
      <Block title="Email">
        <View style={styles.stackMd}>
          <Label>Email</Label>
          <Input
            placeholder="name@example.com"
            leftSlot={
              <MaterialIcons name="mail-outline" size={16} color="#71717a" />
            }
          />
        </View>
      </Block>
      <Block title="Password">
        <View style={styles.stackMd}>
          <Label>Password</Label>
          <Input
            placeholder="Enter password"
            secureTextEntry
            rightSlot={
              <MaterialIcons name="visibility" size={16} color="#71717a" />
            }
          />
        </View>
      </Block>
      <Block title="Invalid state">
        <View style={styles.stackMd}>
          <Label>Email</Label>
          <Input
            invalid
            placeholder="name@example.com"
            value="broken-email"
            leftSlot={
              <MaterialIcons name="error-outline" size={16} color="#ef4444" />
            }
          />
          <Text variant="muted">
            Invalid, disabled, and slotted states now render through the same
            primitive.
          </Text>
        </View>
      </Block>
    </>
  );
}

function TextareaPreview() {
  const [value, setValue] = useState(
    "Ship the preview first, then show each example full width.",
  );

  return (
    <View style={styles.stackMd}>
      <Textarea value={value} onChangeText={setValue} />
      <Textarea
        variant="ghost"
        placeholder="Drop in a draft or meeting notes..."
      />
    </View>
  );
}

function TextareaExamples() {
  return (
    <>
      <Block title="Default">
        <Textarea placeholder="What's on your mind?" />
      </Block>
      <Block title="Readonly">
        <Textarea
          editable={false}
          value="This project has been archived and is no longer editable."
        />
      </Block>
      <Block title="Validation">
        <Textarea invalid value="This field is required before publishing." />
      </Block>
    </>
  );
}

function BadgePreview() {
  return (
    <View style={styles.rowWrap}>
      <Badge>
        <Text>New</Text>
      </Badge>
      <Badge variant="secondary">
        <Text>Beta</Text>
      </Badge>
      <Badge variant="outline">
        <Text>Draft</Text>
      </Badge>
      <Badge variant="destructive">
        <Text>Blocked</Text>
      </Badge>
    </View>
  );
}

function BadgeExamples() {
  return (
    <>
      <Block title="Status">
        <View style={styles.rowWrap}>
          <Badge>
            <Text>Published</Text>
          </Badge>
          <Badge variant="secondary">
            <Text>Internal</Text>
          </Badge>
          <Badge variant="outline">
            <Text>Review</Text>
          </Badge>
          <Badge variant="destructive">
            <Text>Deprecated</Text>
          </Badge>
        </View>
      </Block>
      <Block title="Metadata">
        <View style={styles.rowWrap}>
          <Badge variant="outline">
            <Text>@watermelon/registry</Text>
          </Badge>
          <Badge variant="secondary">
            <Text>9 primitives</Text>
          </Badge>
        </View>
      </Block>
    </>
  );
}

function AvatarPreview() {
  return (
    <View style={styles.avatarRow}>
      <Avatar alt="shadcn avatar">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>
          <Text variant="small">SC</Text>
        </AvatarFallback>
      </Avatar>
      <Avatar alt="JD avatar">
        <AvatarFallback>
          <Text variant="small">JD</Text>
        </AvatarFallback>
      </Avatar>
      <Avatar alt="XL avatar" size="lg">
        <AvatarFallback>
          <Text>XL</Text>
        </AvatarFallback>
      </Avatar>
    </View>
  );
}

function AvatarExamples() {
  return (
    <>
      <Block title="Fallbacks">
        <View style={styles.avatarRow}>
          <Avatar alt="Designer">
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>
              <Text variant="small">PD</Text>
            </AvatarFallback>
          </Avatar>
          <Avatar alt="Engineer">
            <AvatarFallback>
              <Text variant="small">EN</Text>
            </AvatarFallback>
          </Avatar>
        </View>
      </Block>
      <Block title="Sizes">
        <View style={styles.avatarRow}>
          <Avatar size="sm" alt="Small">
            <AvatarFallback>
              <Text variant="small">SM</Text>
            </AvatarFallback>
          </Avatar>
          <Avatar alt="Medium">
            <AvatarFallback>
              <Text>MD</Text>
            </AvatarFallback>
          </Avatar>
          <Avatar size="lg" alt="Large">
            <AvatarFallback>
              <Text>LG</Text>
            </AvatarFallback>
          </Avatar>
        </View>
      </Block>
    </>
  );
}

function TypographyPreview() {
  return (
    <View style={styles.stackMd}>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="lead">Lead text</Text>
      <Text variant="small">Small label</Text>
      <Text variant="code">registry add text</Text>
    </View>
  );
}

function TypographyExamples() {
  return (
    <>
      <Block title="Headings">
        <View style={styles.stackMd}>
          <Text variant="h1">Design System</Text>
          <Text variant="h2">Foundations</Text>
          <Text variant="h3">Components</Text>
          <Text variant="h4">Buttons</Text>
        </View>
      </Block>
      <Block title="Body">
        <View style={styles.stackMd}>
          <Text variant="lead">Lead text for section intros.</Text>
          <Text variant="p">
            Paragraph text for longer product explanation.
          </Text>
          <Text variant="muted">Muted helper copy.</Text>
          <Text variant="small">Small labels.</Text>
        </View>
      </Block>
    </>
  );
}

function CardPreview() {
  return (
    <Card>
      <CardHeader>
        <Text variant="large">Starter Card</Text>
      </CardHeader>
      <CardContent>
        <Text>Use the content slot for the main body.</Text>
      </CardContent>
      <CardFooter style={styles.footerEnd}>
        <Button size="sm">
          <Text>Action</Text>
        </Button>
      </CardFooter>
    </Card>
  );
}

function CardExamples() {
  return (
    <>
      <Block title="Product">
        <Card>
          <CardHeader>
            <Text variant="large">Watermelon Pro</Text>
          </CardHeader>
          <CardContent style={styles.stackMd}>
            <Text>
              Includes shared primitives, docs, and a live showcase app.
            </Text>
            <View style={styles.badgeWrap}>
              <Badge variant="secondary">
                <Text>Popular</Text>
              </Badge>
            </View>
          </CardContent>
          <CardFooter style={styles.footerGapEnd}>
            <Button variant="ghost" size="sm">
              <Text>Later</Text>
            </Button>
            <Button size="sm">
              <Text>Upgrade</Text>
            </Button>
          </CardFooter>
        </Card>
      </Block>
      <Block title="Metrics">
        <Card>
          <CardHeader>
            <Text variant="large">Weekly usage</Text>
          </CardHeader>
          <CardContent style={styles.stackLg}>
            <View style={styles.rowBetween}>
              <Text>Components shipped</Text>
              <Text variant="large">12</Text>
            </View>
            <Separator />
            <View style={styles.rowBetween}>
              <Text>Open feedback items</Text>
              <Text variant="large">4</Text>
            </View>
          </CardContent>
        </Card>
      </Block>
    </>
  );
}

function SeparatorPreview() {
  return (
    <View style={styles.stackLg}>
      <Separator />
      <View style={styles.separatorRow}>
        <Text>Left</Text>
        <Separator
          orientation="vertical"
          style={styles.verticalSeparatorTall}
        />
        <Text>Center</Text>
        <Separator
          orientation="vertical"
          style={styles.verticalSeparatorTall}
        />
        <Text>Right</Text>
      </View>
    </View>
  );
}

function SeparatorExamples() {
  return (
    <>
      <Block title="List">
        <View style={styles.stackMd}>
          <Text>Profile</Text>
          <Separator />
          <Text>Notifications</Text>
          <Separator />
          <Text>Billing</Text>
        </View>
      </Block>
      <Block title="Inline">
        <View style={styles.separatorRow}>
          <Text>Overview</Text>
          <Separator
            orientation="vertical"
            style={styles.verticalSeparatorShort}
          />
          <Text>Activity</Text>
          <Separator
            orientation="vertical"
            style={styles.verticalSeparatorShort}
          />
          <Text>Settings</Text>
        </View>
      </Block>
    </>
  );
}

function ScrollAreaPreview() {
  return (
    <ScrollArea maxHeight={160}>
      {Array.from({ length: 14 }, (_, i) => (
        <Text key={i}>
          Line {i + 1} — scroll inside the bordered region.
        </Text>
      ))}
    </ScrollArea>
  );
}

function ScrollAreaExamples() {
  return (
    <>
      <Block title="Dense list">
        <ScrollArea maxHeight={200}>
          {Array.from({ length: 24 }, (_, i) => (
            <Text key={i} variant="muted">
              Registry entry {String(i + 1).padStart(2, "0")}
            </Text>
          ))}
        </ScrollArea>
      </Block>
    </>
  );
}

function LabelPreview() {
  return (
    <View style={styles.stackLg}>
      <View style={styles.stackSm}>
        <Label>Email</Label>
        <Input placeholder="team@watermelon.dev" />
      </View>
      <View style={styles.stackSm}>
        <Label>Password</Label>
        <Input secureTextEntry placeholder="Enter a secure password" />
      </View>
    </View>
  );
}

function LabelExamples() {
  return (
    <>
      <Block title="Form">
        <View style={styles.stackLg}>
          <View style={styles.stackSm}>
            <Label>Display name</Label>
            <Input placeholder="Watermelon UI" />
          </View>
          <View style={styles.stackSm}>
            <Label>Project description</Label>
            <Textarea placeholder="Describe what this project is for..." />
          </View>
        </View>
      </Block>
      <Block title="Readonly">
        <View style={styles.stackSm}>
          <Label>API key</Label>
          <Input value="wm_live_••••••••••" editable={false} />
        </View>
      </Block>
    </>
  );
}

function SkeletonPreview() {
  return (
    <View style={styles.stackMd}>
      <Skeleton style={styles.skeletonLineLg} />
      <Skeleton style={styles.skeletonLineMd} />
      <View style={styles.skeletonRow}>
        <Skeleton style={styles.skeletonCircle} />
        <View style={styles.stackSm}>
          <Skeleton style={styles.skeletonLineSm} />
          <Skeleton style={styles.skeletonLineXs} />
        </View>
      </View>
    </View>
  );
}

function SkeletonExamples() {
  return (
    <>
      <Block title="Content loading">
        <View style={styles.stackMd}>
          <Skeleton style={styles.skeletonCard} />
          <Skeleton style={styles.skeletonLineLg} />
          <Skeleton style={styles.skeletonLineMd} />
        </View>
      </Block>
      <Block title="Profile row">
        <View style={styles.skeletonRow}>
          <Skeleton style={styles.skeletonCircle} />
          <View style={styles.stackSm}>
            <Skeleton style={styles.skeletonLineSm} />
            <Skeleton style={styles.skeletonLineXs} />
          </View>
        </View>
      </Block>
    </>
  );
}

function SwitchPreview() {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.rowBetween}>
      <Text>
        {checked ? "Notifications enabled" : "Notifications disabled"}
      </Text>
      <Switch checked={checked} onCheckedChange={setChecked} />
    </View>
  );
}

function SwitchExamples() {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Block title="Interactive">
        <View style={styles.rowBetween}>
          <Text>Push notifications</Text>
          <Switch checked={checked} onCheckedChange={setChecked} />
        </View>
      </Block>
      <Block title="Disabled states">
        <View style={styles.rowWrap}>
          <Switch disabled />
          <Switch checked disabled />
        </View>
      </Block>
    </>
  );
}

function CheckboxPreview() {
  const [checked, setChecked] = useState(true);

  return (
    <View style={styles.checkboxRow}>
      <Checkbox checked={checked} onCheckedChange={setChecked} />
      <Text>
        {checked ? "I agree to the terms." : "Tap to accept the terms."}
      </Text>
    </View>
  );
}

function CheckboxExamples() {
  const [checked, setChecked] = useState(true);

  return (
    <>
      <Block title="Consent">
        <View style={styles.checkboxRow}>
          <Checkbox checked={checked} onCheckedChange={setChecked} />
          <Text>Receive release updates for this workspace.</Text>
        </View>
      </Block>
      <Block title="Disabled states">
        <View style={styles.rowWrap}>
          <Checkbox disabled />
          <Checkbox checked disabled />
        </View>
      </Block>
    </>
  );
}

function CollapsiblePreview() {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" style={styles.fullWidthButton}>
          <View style={styles.rowBetween}>
            <Text>{open ? "Hide release notes" : "Show release notes"}</Text>
            <MaterialIcons
              name={open ? "expand-less" : "expand-more"}
              size={18}
              color="#71717a"
            />
          </View>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Card>
          <CardContent style={styles.stackSm}>
            <Text>Version 0.4 ships six new primitives for native and web.</Text>
            <Text variant="muted">
              Keep this area for optional details, release notes, or inspector
              copy.
            </Text>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}

function CollapsibleExamples() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Block title="Simple disclosure">
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost">
              <Text>{open ? "Collapse details" : "Expand details"}</Text>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Text variant="muted">
              Use a collapsible to progressively reveal secondary context
              without forcing an extra route or modal.
            </Text>
          </CollapsibleContent>
        </Collapsible>
      </Block>
      <Block title="Settings summary">
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <Button variant="outline" style={styles.fullWidthButton}>
              <View style={styles.rowBetween}>
                <Text>Deployment settings</Text>
                <MaterialIcons name="tune" size={18} color="#71717a" />
              </View>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <View style={styles.stackSm}>
              <Text>Runtime: Expo / React Native</Text>
              <Text>Platform: iOS, Android, Web</Text>
              <Text variant="muted">
                Keep grouped configuration close to the primary action.
              </Text>
            </View>
          </CollapsibleContent>
        </Collapsible>
      </Block>
    </>
  );
}

function DialogPreview() {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.stackMd}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Text>Open publish dialog</Text>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish changes?</DialogTitle>
            <DialogDescription>
              Ship the updated component registry and refresh the preview app in
              one step.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                <Text>Cancel</Text>
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>
                <Text>Publish</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Text variant="muted">
        Dialogs keep the action focused while preserving the current screen
        context.
      </Text>
    </View>
  );
}

function DialogExamples() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Block title="Confirmation dialog">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Text>Archive project</Text>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Archive workspace</DialogTitle>
              <DialogDescription>
                Archived projects stay accessible, but editing and deployments
                are paused.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">
                  <Text>Keep active</Text>
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive">
                  <Text>Archive</Text>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Block>
      <Block title="Content layout">
        <Text variant="muted">
          Combine `DialogHeader`, `DialogFooter`, `DialogTitle`, and
          `DialogDescription` to keep copy and actions aligned.
        </Text>
      </Block>
    </>
  );
}

function DrawerPreview() {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.stackMd}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <Text>Open iOS-like drawer</Text>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Quick actions</DrawerTitle>
            <DrawerDescription>
              Stay in context while exposing a few focused actions from the bottom.
            </DrawerDescription>
          </DrawerHeader>
          <View style={styles.stackSm}>
            <Button variant="secondary">
              <Text>Share preview</Text>
            </Button>
            <Button variant="ghost">
              <Text>Duplicate draft</Text>
            </Button>
          </View>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">
                <Text>Done</Text>
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Text variant="muted">Drawers feel natural for mobile-first action sheets.</Text>
    </View>
  );
}

function DrawerExamples() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Block title="Bottom sheet actions">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="secondary">
              <Text>Manage project</Text>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Project actions</DrawerTitle>
              <DrawerDescription>
                Choose the next step without leaving the current screen.
              </DrawerDescription>
            </DrawerHeader>
            <View style={styles.stackSm}>
              <Button variant="outline">
                <Text>Edit details</Text>
              </Button>
              <Button variant="outline">
                <Text>Invite collaborators</Text>
              </Button>
              <Button variant="destructive">
                <Text>Archive project</Text>
              </Button>
            </View>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="ghost">
                  <Text>Cancel</Text>
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Block>
    </>
  );
}

function PopoverPreview() {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.stackMd}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Text>Open quick summary</Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Today&apos;s rollout</PopoverTitle>
            <PopoverDescription>
              Layout primitives keep spacing predictable across native and web
              previews.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
      <Text variant="muted">
        A popover is great for compact context and quick actions.
      </Text>
    </View>
  );
}

function PopoverExamples() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Block title="Compact details" style={open ? styles.overlayBlock : null}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="secondary">
              <Text>Inspect package</Text>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>@watermelon/registry</PopoverTitle>
              <PopoverDescription>
                Shared React Native building blocks with Expo-friendly
                primitives and mirrored docs previews.
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </Block>
      <Block title="Guidance">
        <Text variant="muted">
          Use popovers for low-friction disclosure when the user should stay in
          flow on the current surface.
        </Text>
      </Block>
    </>
  );
}

function RadioGroupPreview() {
  const [value, setValue] = useState("starter");

  return (
    <View style={styles.stackMd}>
      <RadioGroup value={value} onValueChange={setValue}>
        <RadioGroupItem value="starter">
          <Text>Starter plan</Text>
        </RadioGroupItem>
        <RadioGroupItem value="pro">
          <Text>Pro plan</Text>
        </RadioGroupItem>
        <RadioGroupItem value="enterprise">
          <Text>Enterprise plan</Text>
        </RadioGroupItem>
      </RadioGroup>
      <Text variant="muted">Selected: {value}</Text>
    </View>
  );
}

function RadioGroupExamples() {
  const [value, setValue] = useState("starter");

  return (
    <>
      <Block title="Plan selector">
        <RadioGroup value={value} onValueChange={setValue}>
          <RadioGroupItem value="starter">
            <View style={styles.stackSm}>
              <Text>Starter</Text>
              <Text variant="muted">For side projects and prototypes.</Text>
            </View>
          </RadioGroupItem>
          <RadioGroupItem value="pro">
            <View style={styles.stackSm}>
              <Text>Pro</Text>
              <Text variant="muted">Extra polish for production apps.</Text>
            </View>
          </RadioGroupItem>
        </RadioGroup>
      </Block>
      <Block title="Disabled option">
        <RadioGroup value="ios">
          <RadioGroupItem value="ios">
            <Text>iOS</Text>
          </RadioGroupItem>
          <RadioGroupItem value="android" disabled>
            <Text>Android beta</Text>
          </RadioGroupItem>
        </RadioGroup>
      </Block>
    </>
  );
}

function SliderPreview() {
  const [value, setValue] = useState(42);

  return (
    <View style={styles.stackMd}>
      <Slider value={value} onValueChange={setValue} />
      <Text variant="muted">Progress: {Math.round(value)}%</Text>
    </View>
  );
}

function SliderExamples() {
  const [value, setValue] = useState(42);

  return (
    <>
      <Block title="Continuous">
        <View style={styles.stackMd}>
          <Slider value={value} onValueChange={setValue} />
          <Text variant="muted">
            Drag the thumb or tap the track to set a value.
          </Text>
        </View>
      </Block>
      <Block title="Stepped">
        <View style={styles.stackMd}>
          <Slider defaultValue={20} min={0} max={80} step={10} />
          <Text variant="muted">
            Use steps for discrete ranges like volume or zoom.
          </Text>
        </View>
      </Block>
    </>
  );
}

function SpinnerPreview() {
  return (
    <View style={[styles.rowWrap, styles.alignCenter]}>
      <Spinner />
      <Text variant="muted">Showing a compact loading indicator.</Text>
    </View>
  );
}

function SpinnerExamples() {
  return (
    <>
      <Block title="Sizes">
        <View style={[styles.rowWrap, styles.alignCenter]}>
          <Spinner size="sm" />
          <Spinner size="default" />
          <Spinner size="lg" />
        </View>
      </Block>
      <Block title="Muted surface">
        <View style={styles.spinnerCard}>
          <Spinner color="#18181b" size="lg" />
          <Text variant="muted">Syncing registry data…</Text>
        </View>
      </Block>
    </>
  );
}

function ProgressPreview() {
  const value = 48;

  return (
    <View style={styles.stackMd}>
      <Progress value={value} />
      <Text variant="muted">{value}% uploaded</Text>
    </View>
  );
}

function ProgressExamples() {
  const [value, setValue] = useState(33);

  return (
    <>
      <Block title="Upload progress">
        <View style={styles.stackMd}>
          <Progress value={value} />
          <View style={styles.rowWrap}>
            <Button
              size="sm"
              onPress={() =>
                setValue((current) => (current >= 100 ? 20 : current + 20))
              }
            >
              <Text>Advance</Text>
            </Button>
            <Button size="sm" variant="outline" onPress={() => setValue(0)}>
              <Text>Reset</Text>
            </Button>
          </View>
        </View>
      </Block>
      <Block title="Static values">
        <View style={styles.stackMd}>
          <Progress value={45} />
          <Progress value={80} />
        </View>
      </Block>
    </>
  );
}

function OTPInputPreview() {
  const [value, setValue] = useState("");

  return (
    <View style={styles.stackMd}>
      <OTPInput value={value} onValueChange={setValue} maxLength={6} />
      <Text variant="muted">
        {value ? `Code: ${value}` : "Enter a 6-digit code."}
      </Text>
    </View>
  );
}

function OTPInputExamples() {
  const [value, setValue] = useState("");

  return (
    <>
      <Block title="Verification code">
        <View style={styles.stackMd}>
          <OTPInput value={value} onValueChange={setValue} maxLength={6} />
          <Button size="sm" variant="outline" onPress={() => setValue("")}>
            <Text>Clear</Text>
          </Button>
        </View>
      </Block>
      <Block title="Four-digit variant">
        <OTPInput value="1234" maxLength={4} />
      </Block>
    </>
  );
}

function TooltipPreview() {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.stackMd}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <Text>Press and hold</Text>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipText>Helpful hints fit nicely inside a tooltip.</TooltipText>
        </TooltipContent>
      </Tooltip>
      <Text variant="muted">
        Tooltips are ideal for brief, non-blocking guidance.
      </Text>
    </View>
  );
}

function TooltipExamples() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Block title="Inline help">
        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <Text>Hold for keyboard shortcut</Text>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipText>Shortcut: Cmd + K</TooltipText>
          </TooltipContent>
        </Tooltip>
      </Block>
      <Block title="Best for">
        <Text variant="muted">
          Use tooltips for short descriptions, labels, and shortcut hints. Keep
          the content concise.
        </Text>
      </Block>
    </>
  );
}

function AccordionPreview() {
  return (
    <Accordion type="single" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Getting started</AccordionTrigger>
        <AccordionContent>
          <Text variant="muted">
            Use accordion items to reveal grouped content one section at a time.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function AccordionExamples() {
  return (
    <>
      <Block title="Single mode">
        <Accordion type="single" defaultValue="setup">
          <AccordionItem value="setup">
            <AccordionTrigger>Setup</AccordionTrigger>
            <AccordionContent>
              <Text variant="muted">
                Keep setup notes, deployment tips, or FAQs grouped under clear headings.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="publish">
            <AccordionTrigger>Publish</AccordionTrigger>
            <AccordionContent>
              <Text variant="muted">Review changes, then ship the updated registry.</Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Block>
      <Block title="Multiple mode">
        <Accordion type="multiple" defaultValue={["ios"]}>
          <AccordionItem value="ios">
            <AccordionTrigger>iOS notes</AccordionTrigger>
            <AccordionContent>
              <Text variant="muted">Matches the same API as other disclosure primitives.</Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Block>
    </>
  );
}

function AlertDialogPreview() {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.stackMd}>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            <Text>Open destructive alert</Text>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete release?</AlertDialogTitle>
            <AlertDialogDescription>
              This action removes the release notes and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">
                <Text>Cancel</Text>
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive">
                <Text>Delete</Text>
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Text variant="muted">Use an alert dialog for high-consequence decisions.</Text>
    </View>
  );
}

function AlertDialogExamples() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Block title="Destructive confirmation">
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="outline">
              <Text>Reset analytics</Text>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset analytics?</AlertDialogTitle>
              <AlertDialogDescription>
                Existing charts will clear and rebuild from the next event.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="ghost">
                  <Text>Keep data</Text>
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button variant="destructive">
                  <Text>Reset</Text>
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Block>
    </>
  );
}

type AlertToastLauncherProps = {
  variant?: "default" | "destructive";
  title: string;
  description: string;
  triggerLabel: string;
  triggerVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
};

function AlertToastLauncher({
  variant = "default",
  title,
  description,
  triggerLabel,
  triggerVariant = "default",
}: AlertToastLauncherProps) {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const [visible, setVisible] = useState(false);

  const headerOffset = headerHeight > 0 ? headerHeight : 56;

  useEffect(() => {
    if (!visible) {
      return undefined;
    }
    const id = setTimeout(() => setVisible(false), 4200);
    return () => clearTimeout(id);
  }, [visible]);

  return (
    <>
      <Button variant={triggerVariant} onPress={() => setVisible(true)}>
        <Text>{triggerLabel}</Text>
      </Button>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setVisible(false)}
      >
        <View style={alertToastStyles.modalRoot}>
          <Pressable
            accessibilityLabel="Dismiss alert"
            accessibilityRole="button"
            style={[StyleSheet.absoluteFillObject, alertToastStyles.backdrop]}
            onPress={() => setVisible(false)}
          />
          <View
            pointerEvents="box-none"
            style={[
              StyleSheet.absoluteFillObject,
              {
                paddingTop: insets.top + headerOffset + 14,
                paddingHorizontal: 16,
                paddingBottom: insets.bottom + 16,
                justifyContent: "flex-start",
              },
            ]}
          >
            <Alert
              variant={variant}
              style={[
                alertToastStyles.toastElevated,
                variant === "destructive"
                  ? alertToastStyles.toastElevatedDestructive
                  : null,
              ]}
            >
              <AlertTitle>{title}</AlertTitle>
              <AlertDescription>{description}</AlertDescription>
            </Alert>
          </View>
        </View>
      </Modal>
    </>
  );
}

function AlertPreview() {
  return (
    <View style={styles.alertPreviewRow}>
      <AlertToastLauncher
        triggerLabel="Show status alert"
        title="Heads up"
        description="Alerts surface status without blocking the rest of the screen."
      />
      <AlertToastLauncher
        variant="destructive"
        triggerVariant="destructive"
        triggerLabel="Show error alert"
        title="Payment failed"
        description="Update your billing method and try the charge again."
      />
    </View>
  );
}

function AlertExamples() {
  return (
    <>
      <Block title="Default">
        <AlertToastLauncher
          triggerLabel="Show default alert"
          title="New version"
          description="Install the latest registry CLI for improved install times."
        />
      </Block>
      <Block title="Destructive">
        <AlertToastLauncher
          variant="destructive"
          triggerVariant="destructive"
          triggerLabel="Show destructive alert"
          title="Could not save"
          description="Check your connection and retry. No data was written."
        />
      </Block>
    </>
  );
}

function AspectRatioPreview() {
  return (
    <AspectRatio ratio={16 / 9}>
      <Card style={styles.aspectCard}>
        <CardContent style={styles.aspectContent}>
          <Text variant="large">16:9</Text>
          <Text variant="muted">Hero media or video previews.</Text>
        </CardContent>
      </Card>
    </AspectRatio>
  );
}

function AspectRatioExamples() {
  return (
    <>
      <Block title="Video frame">
        <AspectRatio ratio={16 / 9}>
          <Card style={styles.aspectCard}>
            <CardContent style={styles.aspectContent}>
              <Text variant="large">16:9 preview</Text>
            </CardContent>
          </Card>
        </AspectRatio>
      </Block>
      <Block title="Square">
        <AspectRatio ratio={1}>
          <Card style={styles.aspectCard}>
            <CardContent style={styles.aspectContent}>
              <Text variant="large">1:1 avatar crop</Text>
            </CardContent>
          </Card>
        </AspectRatio>
      </Block>
    </>
  );
}

const CAROUSEL_SLIDES = [
  {
    title: "Launch faster",
    body: "Ship polished mobile surfaces with shared registry primitives and mirrored docs.",
  },
  {
    title: "Preview in context",
    body: "Swipe across onboarding, marketing, or product cards without leaving the screen.",
  },
  {
    title: "Reuse everywhere",
    body: "Keep the same API across Expo demos, registry exports, and the platform site.",
  },
];

function CarouselPreview() {
  const [index, setIndex] = useState(0);

  return (
    <View style={styles.stackMd}>
      <Carousel index={index} onIndexChange={setIndex}>
        <CarouselContent>
          {CAROUSEL_SLIDES.map((slide) => (
            <CarouselItem key={slide.title}>
              <Card>
                <CardHeader>
                  <Text variant="large">{slide.title}</Text>
                </CardHeader>
                <CardContent>
                  <Text variant="muted">{slide.body}</Text>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <View style={styles.rowBetween}>
          <CarouselPrevious />
          <Text variant="muted">
            Slide {index + 1} of {CAROUSEL_SLIDES.length}
          </Text>
          <CarouselNext />
        </View>
      </Carousel>
      <Text variant="muted">
        Swipe horizontally or use the controls to move between slides.
      </Text>
    </View>
  );
}

function CarouselExamples() {
  const [featureIndex, setFeatureIndex] = useState(0);
  const [releaseIndex, setReleaseIndex] = useState(0);

  return (
    <>
      <Block title="Feature spotlight">
        <Carousel index={featureIndex} onIndexChange={setFeatureIndex}>
          <CarouselContent>
            {[
              {
                title: "Starter template",
                body: "A compact hero carousel for announcing new releases or onboarding steps.",
              },
              {
                title: "Shared tokens",
                body: "Keep spacing, copy, and actions aligned across native demos and web previews.",
              },
              {
                title: "Touch-friendly",
                body: "External arrows and paging feel more natural on mobile than tiny inset controls.",
              },
            ].map((slide) => (
              <CarouselItem key={slide.title}>
                <Card>
                  <CardHeader>
                    <Text variant="large">{slide.title}</Text>
                  </CardHeader>
                  <CardContent>
                    <Text variant="muted">{slide.body}</Text>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <View style={styles.rowBetween}>
            <CarouselPrevious />
            <Text variant="muted">{featureIndex + 1} / 3</Text>
            <CarouselNext />
          </View>
        </Carousel>
      </Block>
      <Block title="Release notes rail">
        <Carousel index={releaseIndex} onIndexChange={setReleaseIndex} loop>
          <CarouselContent>
            {[
              "New dropdown, drawer, and sheet primitives.",
              "Web previews mirror the mobile showcase more closely.",
              "Registry exports stay aligned with the demo app.",
            ].map((message, messageIndex) => (
              <CarouselItem key={message}>
                <Card>
                  <CardContent style={styles.stackSm}>
                    <Text>Update {messageIndex + 1}</Text>
                    <Text>{message}</Text>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <View style={styles.rowBetween}>
            <CarouselPrevious />
            <Text variant="muted">Looping preview</Text>
            <CarouselNext />
          </View>
        </Carousel>
      </Block>
    </>
  );
}

function TabsPreview() {
  const [value, setValue] = useState("overview");

  return (
    <Tabs value={value} onValueChange={setValue}>
      <TabsList>
        <TabsTrigger value="overview">
          <Text>Overview</Text>
        </TabsTrigger>
        <TabsTrigger value="activity">
          <Text>Activity</Text>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Text variant="muted">Tab content swaps in place without leaving the screen.</Text>
      </TabsContent>
      <TabsContent value="activity">
        <Text variant="muted">Recent deploys, edits, and release notes appear here.</Text>
      </TabsContent>
    </Tabs>
  );
}

function TabsExamples() {
  const [value, setValue] = useState("profile");

  return (
    <>
      <Block title="Profile tabs">
        <Tabs value={value} onValueChange={setValue}>
          <TabsList>
            <TabsTrigger value="profile">
              <Text>Profile</Text>
            </TabsTrigger>
            <TabsTrigger value="billing">
              <Text>Billing</Text>
            </TabsTrigger>
            <TabsTrigger value="members">
              <Text>Members</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Text variant="muted">Account owner, project name, and public details.</Text>
          </TabsContent>
          <TabsContent value="billing">
            <Text variant="muted">Invoices, plan changes, and renewal settings.</Text>
          </TabsContent>
          <TabsContent value="members">
            <Text variant="muted">Collaborators with access to the workspace.</Text>
          </TabsContent>
        </Tabs>
      </Block>
    </>
  );
}

function TogglePreview() {
  return (
    <View style={styles.rowWrap}>
      <Toggle defaultPressed variant="default">
        <Text>Bold</Text>
      </Toggle>
      <Toggle>
        <Text>Italic</Text>
      </Toggle>
    </View>
  );
}

function ToggleExamples() {
  return (
    <>
      <Block title="Formatting">
        <View style={styles.rowWrap}>
          <Toggle defaultPressed variant="default">
            <Text>Bold</Text>
          </Toggle>
          <Toggle>
            <Text>Italic</Text>
          </Toggle>
          <Toggle>
            <Text>Underline</Text>
          </Toggle>
        </View>
      </Block>
      <Block title="Disabled">
        <Toggle disabled>
          <Text>Archived</Text>
        </Toggle>
      </Block>
    </>
  );
}

function ToggleGroupPreview() {
  const [value, setValue] = useState<string | string[]>("grid");

  return (
    <View style={styles.stackMd}>
      <ToggleGroup type="single" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="grid">
          <Text>Grid</Text>
        </ToggleGroupItem>
        <ToggleGroupItem value="list">
          <Text>List</Text>
        </ToggleGroupItem>
      </ToggleGroup>
      <Text variant="muted">Selected: {Array.isArray(value) ? value.join(", ") : value}</Text>
    </View>
  );
}

function ToggleGroupExamples() {
  const [value, setValue] = useState<string | string[]>(["ios"]);

  return (
    <>
      <Block title="Single select">
        <ToggleGroup type="single" defaultValue="preview">
          <ToggleGroupItem value="preview">
            <Text>Preview</Text>
          </ToggleGroupItem>
          <ToggleGroupItem value="code">
            <Text>Code</Text>
          </ToggleGroupItem>
        </ToggleGroup>
      </Block>
      <Block title="Multi select">
        <View style={styles.stackMd}>
          <ToggleGroup type="multiple" value={value} onValueChange={setValue}>
            <ToggleGroupItem value="ios">
              <Text>iOS</Text>
            </ToggleGroupItem>
            <ToggleGroupItem value="android">
              <Text>Android</Text>
            </ToggleGroupItem>
            <ToggleGroupItem value="web">
              <Text>Web</Text>
            </ToggleGroupItem>
          </ToggleGroup>
          <Text variant="muted">
            Enabled: {Array.isArray(value) ? value.join(", ") : value}
          </Text>
        </View>
      </Block>
    </>
  );
}

function BreadcrumbPreview() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function BreadcrumbExamples() {
  return (
    <>
      <Block title="Nested path">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>Workspace</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Registry</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Block>
    </>
  );
}

function CommandPreview() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [lastAction, setLastAction] = useState<string | null>(null);
  const chevronColor = useThemeColor({}, "icon");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <View style={styles.stackMd}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="default">
            <Text>Quick actions</Text>
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" style={styles.commandSheetContent}>
          <SheetHeader>
            <SheetTitle>Quick actions</SheetTitle>
            <SheetDescription>Search or pick a task—same pattern as a mobile action sheet.</SheetDescription>
          </SheetHeader>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={styles.commandSheetScroll}
          >
            <Command value={query} onValueChange={setQuery}>
              <CommandInput placeholder="Search actions…" />
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    value="publish changes"
                    onSelect={() => {
                      setLastAction("Published changes");
                      setOpen(false);
                    }}
                  >
                    <Text>Publish changes</Text>
                    <MaterialIcons
                      name="chevron-right"
                      size={22}
                      color={chevronColor}
                      style={styles.commandItemTrailingIcon}
                    />
                  </CommandItem>
                  <CommandItem
                    value="open previews"
                    onSelect={() => {
                      setLastAction("Opened previews");
                      setOpen(false);
                    }}
                  >
                    <Text>Open previews</Text>
                    <MaterialIcons
                      name="chevron-right"
                      size={22}
                      color={chevronColor}
                      style={styles.commandItemTrailingIcon}
                    />
                  </CommandItem>
                </CommandGroup>
                <CommandEmpty>No matching actions.</CommandEmpty>
              </CommandList>
            </Command>
          </ScrollView>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">
                <Text>Cancel</Text>
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Text variant="muted">
        {lastAction ? `Last run: ${lastAction}` : "Opens a searchable list in a bottom sheet."}
      </Text>
    </View>
  );
}

function CommandExamples() {
  const [query, setQuery] = useState("");
  const chevronColor = useThemeColor({}, "icon");

  return (
    <>
      <Block title="Inline search (embedded)">
        <Command value={query} onValueChange={setQuery}>
          <CommandInput placeholder="Filter workspace actions…" />
          <CommandList>
            <CommandGroup>
              <CommandItem value="new project">
                <Text>New project</Text>
                <MaterialIcons
                  name="chevron-right"
                  size={22}
                  color={chevronColor}
                  style={styles.commandItemTrailingIcon}
                />
              </CommandItem>
              <CommandItem value="invite teammate">
                <Text>Invite teammate</Text>
                <MaterialIcons
                  name="chevron-right"
                  size={22}
                  color={chevronColor}
                  style={styles.commandItemTrailingIcon}
                />
              </CommandItem>
              <CommandItem value="view changelog">
                <Text>View changelog</Text>
                <MaterialIcons
                  name="chevron-right"
                  size={22}
                  color={chevronColor}
                  style={styles.commandItemTrailingIcon}
                />
              </CommandItem>
            </CommandGroup>
            <CommandEmpty>No matching actions.</CommandEmpty>
          </CommandList>
        </Command>
      </Block>
    </>
  );
}

function DropdownMenuPreview() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [position, setPosition] = useState("bottom");

  return (
    <View style={styles.stackMd}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Text>Open</Text>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" sideOffset={8}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <Text>Profile</Text>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Text>Billing</Text>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Text>Settings</Text>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Team</DropdownMenuLabel>
            <DropdownMenuItem>
              <Text>Invite users</Text>
              <DropdownMenuShortcut showOnNative>›</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Text>New Team</Text>
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Preferences</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={notifications}
            onCheckedChange={setNotifications}
          >
            <Text>Push notifications</Text>
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Panel dock</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">
              <Text>Top</Text>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">
              <Text>Bottom</Text>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">
              <Text>Right</Text>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Links</DropdownMenuLabel>
            <DropdownMenuItem>
              <Text>GitHub</Text>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Text>Support</Text>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Text>API</Text>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Text>Remove workspace</Text>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Text>Log out</Text>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Text variant="muted">
        Menus respect safe-area insets, cap width to the usable screen, and use
        larger touch targets. Keyboard shortcuts render on web only; pass{" "}
        <Text variant="muted" style={{ fontWeight: "600" }}>
          showOnNative
        </Text>{" "}
        on <Text variant="muted" style={{ fontWeight: "600" }}>DropdownMenuShortcut</Text> for
        trailing chevrons on native.
      </Text>
    </View>
  );
}

function DropdownMenuExamples() {
  const [open, setOpen] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [density, setDensity] = useState("comfortable");

  return (
    <>
      <Block title="Quick actions" style={open ? styles.overlayBlock : null}>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">
              <Text>Open</Text>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <Text>Profile</Text>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Text>Billing</Text>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Text>Settings</Text>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={showStatus}
              onCheckedChange={setShowStatus}
            >
              <Text>Show status bar</Text>
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Density</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
              <DropdownMenuRadioItem value="compact">
                <Text>Compact</Text>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="comfortable">
                <Text>Comfortable</Text>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" closeOnPress={false}>
              <Text>Destructive (stays open)</Text>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Text>Log out</Text>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Block>
    </>
  );
}

type PaginationPageSlot = number | "ellipsis";

function buildPaginationSlots(page: number, total: number): PaginationPageSlot[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (page <= 3) {
    return [1, 2, 3, "ellipsis", total];
  }
  if (page >= total - 2) {
    return [1, "ellipsis", total - 2, total - 1, total];
  }
  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", total];
}

function PaginationPreview() {
  const totalPages = 8;
  const [page, setPage] = useState(6);
  const slots = React.useMemo(
    () => buildPaginationSlots(page, totalPages),
    [page, totalPages],
  );

  return (
    <View style={styles.stackMd}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={page <= 1}
              onPress={() => setPage((p) => Math.max(1, p - 1))}
            />
          </PaginationItem>
          {slots.map((slot, index) => (
            <PaginationItem
              key={slot === "ellipsis" ? `ellipsis-${index}` : `page-${slot}`}
            >
              {slot === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  active={page === slot}
                  onPress={() => setPage(slot)}
                >
                  {String(slot)}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              disabled={page >= totalPages}
              onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Text variant="muted" style={styles.paginationStatus}>
        Current page: {page}
      </Text>
    </View>
  );
}

function PaginationExamples() {
  const [page, setPage] = useState(2);

  return (
    <Block title="Compact">
      <View style={styles.paginationCompactBody}>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={page <= 1}
                onPress={() => setPage((p) => Math.max(1, p - 1))}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink active={page === 1} onPress={() => setPage(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink active={page === 2} onPress={() => setPage(2)}>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                disabled={page >= 2}
                onPress={() => setPage((p) => Math.min(2, p + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </View>
    </Block>
  );
}

function HoverCardPreview() {
  const [open, setOpen] = useState(false);

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger asChild>
        <Button variant="outline">
          <Text>@watermelon</Text>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <HoverCardHeader>
          <HoverCardTitle>Watermelon UI</HoverCardTitle>
          <HoverCardDescription>
            shadcn-style building blocks for React Native and Expo.
          </HoverCardDescription>
        </HoverCardHeader>
      </HoverCardContent>
    </HoverCard>
  );
}

function HoverCardExamples() {
  const [open, setOpen] = useState(false);

  return (
    <Block title="Profile peek" style={open ? styles.overlayBlock : null}>
      <HoverCard open={open} onOpenChange={setOpen}>
        <HoverCardTrigger asChild>
          <Button variant="secondary">
            <Text>Hover card trigger</Text>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <HoverCardHeader>
            <HoverCardTitle>Team member</HoverCardTitle>
            <HoverCardDescription>
              Tap the trigger again to dismiss. On web, use pointer hover in
              docs.
            </HoverCardDescription>
          </HoverCardHeader>
        </HoverCardContent>
      </HoverCard>
    </Block>
  );
}

function TablePreview() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Owner</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Registry CLI</TableCell>
          <TableCell>Shipped</TableCell>
          <TableCell>Core</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Showcase</TableCell>
          <TableCell>Beta</TableCell>
          <TableCell>Mobile</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Platform</TableCell>
          <TableCell>Live</TableCell>
          <TableCell>Web</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function TableExamples() {
  return (
    <Block title="Invoices">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead style={{ textAlign: "right" }}>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>WM-1024</TableCell>
            <TableCell style={{ textAlign: "right" }}>$120.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>WM-1025</TableCell>
            <TableCell style={{ textAlign: "right" }}>$48.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Block>
  );
}

function validateLoginFields(
  email: string,
  password: string,
): Record<string, string | undefined> {
  const next: Record<string, string | undefined> = {};
  const trimmed = email.trim();
  if (!trimmed) {
    next.email = "Enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    next.email = "Enter a valid email address.";
  }
  if (!password) {
    next.password = "Enter your password.";
  } else if (password.length < 8) {
    next.password = "Use at least 8 characters.";
  }
  return next;
}

function FormPreview() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [signedIn, setSignedIn] = useState(false);

  const submit = () => {
    setSignedIn(false);
    const next = validateLoginFields(email, password);
    setErrors(next);
    const hasErr = Object.keys(next).some((k) => Boolean(next[k]));
    if (!hasErr) {
      setSignedIn(true);
    }
  };

  return (
    <Form errors={errors} style={styles.stackMd}>
      <View style={styles.formLoginHeader}>
        <Text variant="large">Sign in</Text>
        <Text variant="muted">Use your workspace email and password.</Text>
      </View>
      <FormField name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              size="lg"
              invalid={Boolean(errors.email)}
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                setErrors((e) => ({ ...e, email: undefined }));
              }}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
            />
          </FormControl>
          <FormDescription>
            We&apos;ll never share your email with third parties.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              size="lg"
              invalid={Boolean(errors.password)}
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setErrors((e) => ({ ...e, password: undefined }));
              }}
              placeholder="••••••••"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              textContentType="password"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button
        size="lg"
        style={styles.formLoginSubmit}
        onPress={submit}
      >
        <Text>Sign in</Text>
      </Button>
      {signedIn ? (
        <Text variant="muted" style={styles.formLoginSuccess}>
          Signed in successfully (demo).
        </Text>
      ) : null}
    </Form>
  );
}

function FormExamples() {
  const [serverErrors, setServerErrors] = useState<
    Record<string, string | undefined>
  >({
    email: "No account uses this email address.",
    password: "Incorrect password.",
  });
  const [emailA, setEmailA] = useState("");
  const [passwordA, setPasswordA] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [emailB, setEmailB] = useState("");
  const [passwordB, setPasswordB] = useState("");
  const [errorsB, setErrorsB] = useState<Record<string, string | undefined>>({});
  const [signedInB, setSignedInB] = useState(false);

  const submitB = () => {
    setSignedInB(false);
    const next = validateLoginFields(emailB, passwordB);
    setErrorsB(next);
    const hasErr = Object.keys(next).some((k) => Boolean(next[k]));
    if (!hasErr) {
      setSignedInB(true);
    }
  };

  return (
    <>
      <Block title="Server-style errors">
        <Form errors={serverErrors} style={styles.stackMd}>
          <Text variant="muted">
            Typical failed sign-in: both fields can carry messages from your API.
            Editing a field clears that field&apos;s error.
          </Text>
          <FormField name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  size="lg"
                  invalid={Boolean(serverErrors.email)}
                  value={emailA}
                  onChangeText={(value) => {
                    setEmailA(value);
                    setServerErrors((e) => ({ ...e, email: undefined }));
                  }}
                  placeholder="you@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  size="lg"
                  invalid={Boolean(serverErrors.password)}
                  value={passwordA}
                  onChangeText={(value) => {
                    setPasswordA(value);
                    setServerErrors((e) => ({ ...e, password: undefined }));
                  }}
                  placeholder="••••••••"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button
            variant="outline"
            style={styles.formLoginSubmit}
            onPress={() =>
              setServerErrors({
                email: "No account uses this email address.",
                password: "Incorrect password.",
              })
            }
          >
            <Text>Replay demo errors</Text>
          </Button>
        </Form>
      </Block>
      <Block title="Show password">
        <Form errors={errorsB} style={styles.stackMd}>
          <Text variant="muted">
            Use <Text style={{ fontWeight: "600" }}>rightSlot</Text> on{" "}
            <Text style={{ fontWeight: "600" }}>Input</Text> for a reveal toggle.
          </Text>
          <FormField name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  size="lg"
                  invalid={Boolean(errorsB.email)}
                  value={emailB}
                  onChangeText={(value) => {
                    setEmailB(value);
                    setErrorsB((e) => ({ ...e, email: undefined }));
                  }}
                  placeholder="you@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  size="lg"
                  invalid={Boolean(errorsB.password)}
                  value={passwordB}
                  onChangeText={(value) => {
                    setPasswordB(value);
                    setErrorsB((e) => ({ ...e, password: undefined }));
                  }}
                  placeholder="••••••••"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  rightSlot={
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={
                        showPassword ? "Hide password" : "Show password"
                      }
                      hitSlop={8}
                      onPress={() => setShowPassword((s) => !s)}
                      style={styles.formShowPasswordHit}
                    >
                      <Text variant="muted">{showPassword ? "Hide" : "Show"}</Text>
                    </Pressable>
                  }
                />
              </FormControl>
              <FormDescription>At least 8 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button
            size="lg"
            style={styles.formLoginSubmit}
            onPress={submitB}
          >
            <Text>Sign in</Text>
          </Button>
          {signedInB ? (
            <Text variant="muted" style={styles.formLoginSuccess}>
              Signed in successfully (demo).
            </Text>
          ) : null}
        </Form>
      </Block>
    </>
  );
}

function InputGroupPreview() {
  return (
    <InputGroup>
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="watermelon.dev" />
    </InputGroup>
  );
}

function InputGroupExamples() {
  return (
    <>
      <Block title="Domain field">
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="workspace-url" />
          <InputGroupAddon>
            <InputGroupText>.com</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Block>
      <Block title="With action">
        <InputGroup>
          <InputGroupInput placeholder="Invite a teammate" />
          <InputGroupAddon>
            <InputGroupButton>
              <Text>Send</Text>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Block>
    </>
  );
}

function KbdPreview() {
  return (
    <KbdGroup>
      <Kbd>Cmd</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  );
}

function KbdExamples() {
  return (
    <>
      <Block title="Shortcuts">
        <View style={styles.stackMd}>
          <KbdGroup>
            <Kbd>Shift</Kbd>
            <Kbd>Enter</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd>Cmd</Kbd>
            <Kbd>P</Kbd>
          </KbdGroup>
        </View>
      </Block>
    </>
  );
}

function SheetPreview() {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.stackMd}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Text>Open side sheet</Text>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Project settings</SheetTitle>
            <SheetDescription>Adjust a few focused options without leaving the screen.</SheetDescription>
          </SheetHeader>
          <Input placeholder="Project name" />
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="ghost">
                <Text>Close</Text>
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </View>
  );
}

function SheetExamples() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Block title="Left panel">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="secondary">
              <Text>Open workspace panel</Text>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Workspace panel</SheetTitle>
              <SheetDescription>Good for navigation, filters, or settings.</SheetDescription>
            </SheetHeader>
            <Button variant="outline">
              <Text>General</Text>
            </Button>
            <Button variant="outline">
              <Text>Members</Text>
            </Button>
          </SheetContent>
        </Sheet>
      </Block>
    </>
  );
}

const alertToastStyles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: "rgba(9, 9, 11, 0.45)",
  },
  toastElevated: {
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 12,
  },
  toastElevatedDestructive: {
    shadowColor: "#7f1d1d",
    shadowOpacity: 0.22,
  },
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    gap: 32,
    padding: 20,
    paddingBottom: 56,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  hero: {
    gap: 8,
    paddingTop: 4,
  },
  badgeWrap: {
    alignSelf: "flex-start",
  },
  stackSm: {
    gap: 10,
  },
  stackMd: {
    gap: 14,
  },
  alertPreviewRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    alignItems: "center",
  },
  formLoginHeader: {
    gap: 6,
    marginBottom: 4,
    alignSelf: "stretch",
  },
  formLoginSubmit: {
    alignSelf: "stretch",
    width: "100%",
  },
  formLoginSuccess: {
    textAlign: "center",
  },
  formShowPasswordHit: {
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 4,
  },
  paginationStatus: {
    textAlign: "center",
    alignSelf: "stretch",
    marginTop: 4,
  },
  paginationCompactBody: {
    alignItems: "center",
    paddingTop: 4,
    marginTop: -8,
  },
  commandSheetContent: {
    width: "100%",
    maxHeight: "78%",
  },
  commandSheetScroll: {
    maxHeight: 320,
  },
  commandItemTrailingIcon: {
    marginLeft: "auto",
  },
  stackLg: {
    gap: 18,
  },
  stackXl: {
    gap: 22,
  },
  spotlightSurface: {
    borderRadius: 20,
    padding: 20,
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  alignCenter: {
    alignItems: "center",
  },
  avatarRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 18,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  fullWidthButton: {
    alignSelf: "stretch",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  skeletonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  skeletonCard: {
    height: 120,
    width: "100%",
    borderRadius: 16,
  },
  skeletonCircle: {
    height: 48,
    width: 48,
    borderRadius: 999,
  },
  skeletonLineLg: {
    height: 14,
    width: "100%",
    borderRadius: 999,
  },
  skeletonLineMd: {
    height: 14,
    width: "82%",
    borderRadius: 999,
  },
  skeletonLineSm: {
    height: 12,
    width: 140,
    borderRadius: 999,
  },
  skeletonLineXs: {
    height: 12,
    width: 96,
    borderRadius: 999,
  },
  footerEnd: {
    justifyContent: "flex-end",
  },
  footerGapEnd: {
    gap: 12,
    justifyContent: "flex-end",
  },
  separatorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  verticalSeparatorTall: {
    height: 32,
  },
  verticalSeparatorShort: {
    height: 24,
  },
  aspectCard: {
    flex: 1,
  },
  aspectContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  spinnerCard: {
    minHeight: 120,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: "#f4f4f5",
  },
  menuItemBody: {
    flex: 1,
    gap: 2,
  },
  overlayBlock: {
    zIndex: 40,
    elevation: 40,
  },
});
export default function ComponentScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const backgroundColor = useThemeColor({}, "background");
  const primarySurface = useThemeColor(
    { light: "#082f49", dark: "#0f172a" },
    "background",
  );
  const neutralSurface = useThemeColor(
    { light: "#e4e4e7", dark: "#27272a" },
    "background",
  );

  const resolvedSlug = (slug ?? "button") as ComponentSlug;
  const meta = COMPONENT_META[resolvedSlug];

  if (!meta) {
    return (
      <View style={styles.emptyState}>
        <Text variant="h3">Component not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor }]}>
      <Stack.Screen options={{ title: meta.title, headerShown: true }} />
      <ScrollView
        style={[styles.screen, { backgroundColor }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text variant="h1">{meta.title}</Text>
        </View>

        <View style={styles.stackLg}>
          <Text variant="large">Preview</Text>
          {resolvedSlug === "accordion" && <AccordionPreview />}
          {resolvedSlug === "alert-dialog" && <AlertDialogPreview />}
          {resolvedSlug === "alert" && <AlertPreview />}
          {resolvedSlug === "aspect-ratio" && <AspectRatioPreview />}
          {resolvedSlug === "carousel" && <CarouselPreview />}
          {resolvedSlug === "breadcrumb" && <BreadcrumbPreview />}
          {resolvedSlug === "button" && <ButtonPreview />}
          {resolvedSlug === "spotlight-button" && (
            <SpotlightButtonPreview
              primarySurface={primarySurface}
              neutralSurface={neutralSurface}
            />
          )}
          {resolvedSlug === "input" && <InputPreview />}
          {resolvedSlug === "textarea" && <TextareaPreview />}
          {resolvedSlug === "badge" && <BadgePreview />}
          {resolvedSlug === "avatar" && <AvatarPreview />}
          {resolvedSlug === "checkbox" && <CheckboxPreview />}
          {resolvedSlug === "collapsible" && <CollapsiblePreview />}
          {resolvedSlug === "command" && <CommandPreview />}
          {resolvedSlug === "dialog" && <DialogPreview />}
          {resolvedSlug === "drawer" && <DrawerPreview />}
          {resolvedSlug === "form" && <FormPreview />}
          {resolvedSlug === "hover-card" && <HoverCardPreview />}
          {resolvedSlug === "dropdown-menu" && <DropdownMenuPreview />}
          {resolvedSlug === "text" && <TypographyPreview />}
          {resolvedSlug === "card" && <CardPreview />}
          {resolvedSlug === "separator" && <SeparatorPreview />}
          {resolvedSlug === "scroll-area" && <ScrollAreaPreview />}
          {resolvedSlug === "label" && <LabelPreview />}
          {resolvedSlug === "popover" && <PopoverPreview />}
          {resolvedSlug === "pagination" && <PaginationPreview />}
          {resolvedSlug === "progress" && <ProgressPreview />}
          {resolvedSlug === "radio-group" && <RadioGroupPreview />}
          {resolvedSlug === "input-group" && <InputGroupPreview />}
          {resolvedSlug === "kbd" && <KbdPreview />}
          {resolvedSlug === "skeleton" && <SkeletonPreview />}
          {resolvedSlug === "sheet" && <SheetPreview />}
          {resolvedSlug === "slider" && <SliderPreview />}
          {resolvedSlug === "spinner" && <SpinnerPreview />}
          {resolvedSlug === "switch" && <SwitchPreview />}
          {resolvedSlug === "table" && <TablePreview />}
          {resolvedSlug === "tabs" && <TabsPreview />}
          {resolvedSlug === "otp-input" && <OTPInputPreview />}
          {resolvedSlug === "toggle" && <TogglePreview />}
          {resolvedSlug === "toggle-group" && <ToggleGroupPreview />}
          {resolvedSlug === "tooltip" && <TooltipPreview />}
        </View>

        <View style={styles.stackXl}>
          {resolvedSlug === "accordion" && <AccordionExamples />}
          {resolvedSlug === "alert-dialog" && <AlertDialogExamples />}
          {resolvedSlug === "alert" && <AlertExamples />}
          {resolvedSlug === "aspect-ratio" && <AspectRatioExamples />}
          {resolvedSlug === "carousel" && <CarouselExamples />}
          {resolvedSlug === "breadcrumb" && <BreadcrumbExamples />}
          {resolvedSlug === "button" && <ButtonExamples />}
          {resolvedSlug === "spotlight-button" && (
            <SpotlightButtonExamples
              primarySurface={primarySurface}
              neutralSurface={neutralSurface}
            />
          )}
          {resolvedSlug === "input" && <InputExamples />}
          {resolvedSlug === "textarea" && <TextareaExamples />}
          {resolvedSlug === "badge" && <BadgeExamples />}
          {resolvedSlug === "avatar" && <AvatarExamples />}
          {resolvedSlug === "checkbox" && <CheckboxExamples />}
          {resolvedSlug === "collapsible" && <CollapsibleExamples />}
          {resolvedSlug === "command" && <CommandExamples />}
          {resolvedSlug === "dialog" && <DialogExamples />}
          {resolvedSlug === "drawer" && <DrawerExamples />}
          {resolvedSlug === "form" && <FormExamples />}
          {resolvedSlug === "hover-card" && <HoverCardExamples />}
          {resolvedSlug === "dropdown-menu" && <DropdownMenuExamples />}
          {resolvedSlug === "text" && <TypographyExamples />}
          {resolvedSlug === "card" && <CardExamples />}
          {resolvedSlug === "separator" && <SeparatorExamples />}
          {resolvedSlug === "scroll-area" && <ScrollAreaExamples />}
          {resolvedSlug === "label" && <LabelExamples />}
          {resolvedSlug === "popover" && <PopoverExamples />}
          {resolvedSlug === "pagination" && <PaginationExamples />}
          {resolvedSlug === "progress" && <ProgressExamples />}
          {resolvedSlug === "radio-group" && <RadioGroupExamples />}
          {resolvedSlug === "input-group" && <InputGroupExamples />}
          {resolvedSlug === "kbd" && <KbdExamples />}
          {resolvedSlug === "skeleton" && <SkeletonExamples />}
          {resolvedSlug === "sheet" && <SheetExamples />}
          {resolvedSlug === "slider" && <SliderExamples />}
          {resolvedSlug === "spinner" && <SpinnerExamples />}
          {resolvedSlug === "switch" && <SwitchExamples />}
          {resolvedSlug === "table" && <TableExamples />}
          {resolvedSlug === "tabs" && <TabsExamples />}
          {resolvedSlug === "otp-input" && <OTPInputExamples />}
          {resolvedSlug === "toggle" && <ToggleExamples />}
          {resolvedSlug === "toggle-group" && <ToggleGroupExamples />}
          {resolvedSlug === "tooltip" && <TooltipExamples />}
        </View>
      </ScrollView>
    </View>
  );
}
