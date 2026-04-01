import { Stack, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { SpotlightButton } from "@/components/animated/spotlight-button";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipText,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const COMPONENT_META = {
  avatar: { title: "Avatar" },
  badge: { title: "Badge" },
  button: { title: "Button" },
  checkbox: { title: "Checkbox" },
  collapsible: { title: "Collapsible" },
  dialog: { title: "Dialog" },
  "spotlight-button": { title: "Spotlight Button" },
  card: { title: "Card" },
  input: { title: "Input" },
  label: { title: "Label" },
  "otp-input": { title: "OTP Input" },
  popover: { title: "Popover" },
  progress: { title: "Progress" },
  "radio-group": { title: "Radio Group" },
  separator: { title: "Separator" },
  skeleton: { title: "Skeleton" },
  slider: { title: "Slider" },
  switch: { title: "Switch" },
  text: { title: "Typography" },
  textarea: { title: "Textarea" },
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
              6 new base components are now available in showcase, registry,
              and platform docs.
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
          {resolvedSlug === "dialog" && <DialogPreview />}
          {resolvedSlug === "text" && <TypographyPreview />}
          {resolvedSlug === "card" && <CardPreview />}
          {resolvedSlug === "separator" && <SeparatorPreview />}
          {resolvedSlug === "label" && <LabelPreview />}
          {resolvedSlug === "popover" && <PopoverPreview />}
          {resolvedSlug === "progress" && <ProgressPreview />}
          {resolvedSlug === "radio-group" && <RadioGroupPreview />}
          {resolvedSlug === "skeleton" && <SkeletonPreview />}
          {resolvedSlug === "slider" && <SliderPreview />}
          {resolvedSlug === "switch" && <SwitchPreview />}
          {resolvedSlug === "otp-input" && <OTPInputPreview />}
          {resolvedSlug === "tooltip" && <TooltipPreview />}
        </View>

        <View style={styles.stackXl}>
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
          {resolvedSlug === "dialog" && <DialogExamples />}
          {resolvedSlug === "text" && <TypographyExamples />}
          {resolvedSlug === "card" && <CardExamples />}
          {resolvedSlug === "separator" && <SeparatorExamples />}
          {resolvedSlug === "label" && <LabelExamples />}
          {resolvedSlug === "popover" && <PopoverExamples />}
          {resolvedSlug === "progress" && <ProgressExamples />}
          {resolvedSlug === "radio-group" && <RadioGroupExamples />}
          {resolvedSlug === "skeleton" && <SkeletonExamples />}
          {resolvedSlug === "slider" && <SliderExamples />}
          {resolvedSlug === "switch" && <SwitchExamples />}
          {resolvedSlug === "otp-input" && <OTPInputExamples />}
          {resolvedSlug === "tooltip" && <TooltipExamples />}
        </View>
      </ScrollView>
    </View>
  );
}
