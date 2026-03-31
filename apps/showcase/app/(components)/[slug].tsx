import { Stack, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OTPInput } from "@/components/ui/otp-input";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";

const COMPONENT_META = {
  avatar: { title: "Avatar" },
  badge: { title: "Badge" },
  button: { title: "Button" },
  checkbox: { title: "Checkbox" },
  "spotlight-button": { title: "Spotlight Button" },
  card: { title: "Card" },
  input: { title: "Input" },
  label: { title: "Label" },
  "otp-input": { title: "OTP Input" },
  progress: { title: "Progress" },
  separator: { title: "Separator" },
  skeleton: { title: "Skeleton" },
  switch: { title: "Switch" },
  text: { title: "Typography" },
  textarea: { title: "Textarea" },
} as const;

type ComponentSlug = keyof typeof COMPONENT_META;
function Block({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      {title ? (
        <CardHeader>
          <Text variant="large">{title}</Text>
        </CardHeader>
      ) : null}
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default function ComponentScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState(
    "Ship the preview first, then show each example full width.",
  );
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [progressValue, setProgressValue] = useState(33);
  const [otpValue, setOtpValue] = useState("");
  const [spotlightCount, setSpotlightCount] = useState(0);
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
              count={spotlightCount}
              onPress={() => setSpotlightCount((value) => value + 1)}
              primarySurface={primarySurface}
              neutralSurface={neutralSurface}
            />
          )}
          {resolvedSlug === "input" && (
            <InputPreview
              inputValue={inputValue}
              onChangeText={setInputValue}
            />
          )}
          {resolvedSlug === "textarea" && (
            <TextareaPreview
              value={textareaValue}
              onChangeText={setTextareaValue}
            />
          )}
          {resolvedSlug === "badge" && <BadgePreview />}
          {resolvedSlug === "avatar" && <AvatarPreview />}
          {resolvedSlug === "checkbox" && (
            <CheckboxPreview
              checked={checkboxChecked}
              onCheckedChange={setCheckboxChecked}
            />
          )}
          {resolvedSlug === "text" && <TypographyPreview />}
          {resolvedSlug === "card" && <CardPreview />}
          {resolvedSlug === "separator" && <SeparatorPreview />}
          {resolvedSlug === "label" && <LabelPreview />}
          {resolvedSlug === "progress" && (
            <ProgressPreview value={progressValue} />
          )}
          {resolvedSlug === "skeleton" && <SkeletonPreview />}
          {resolvedSlug === "switch" && (
            <SwitchPreview
              checked={switchChecked}
              onCheckedChange={setSwitchChecked}
            />
          )}
          {resolvedSlug === "otp-input" && (
            <OTPInputPreview value={otpValue} onValueChange={setOtpValue} />
          )}
        </View>

        <View style={styles.stackXl}>
          {resolvedSlug === "button" && <ButtonExamples />}
          {resolvedSlug === "spotlight-button" && (
            <SpotlightButtonExamples
              count={spotlightCount}
              onPrimaryPress={() => setSpotlightCount((value) => value + 1)}
              onReset={() => setSpotlightCount(0)}
              primarySurface={primarySurface}
              neutralSurface={neutralSurface}
            />
          )}
          {resolvedSlug === "input" && (
            <InputExamples
              inputValue={inputValue}
              onChangeText={setInputValue}
            />
          )}
          {resolvedSlug === "textarea" && (
            <TextareaExamples
              value={textareaValue}
              onChangeText={setTextareaValue}
            />
          )}
          {resolvedSlug === "badge" && <BadgeExamples />}
          {resolvedSlug === "avatar" && <AvatarExamples />}
          {resolvedSlug === "checkbox" && (
            <CheckboxExamples
              checked={checkboxChecked}
              onCheckedChange={setCheckboxChecked}
            />
          )}
          {resolvedSlug === "text" && <TypographyExamples />}
          {resolvedSlug === "card" && <CardExamples />}
          {resolvedSlug === "separator" && <SeparatorExamples />}
          {resolvedSlug === "label" && <LabelExamples />}
          {resolvedSlug === "progress" && (
            <ProgressExamples
              value={progressValue}
              onAdvance={() =>
                setProgressValue((current) =>
                  current >= 100 ? 20 : current + 20,
                )
              }
              onReset={() => setProgressValue(0)}
            />
          )}
          {resolvedSlug === "skeleton" && <SkeletonExamples />}
          {resolvedSlug === "switch" && (
            <SwitchExamples
              checked={switchChecked}
              onCheckedChange={setSwitchChecked}
            />
          )}
          {resolvedSlug === "otp-input" && (
            <OTPInputExamples value={otpValue} onValueChange={setOtpValue} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function SpotlightButtonPreview({
  count,
  onPress,
  primarySurface,
  neutralSurface,
}: {
  count: number;
  onPress: () => void;
  primarySurface: string;
  neutralSurface: string;
}) {
  return (
    <View style={styles.stackMd}>
      <View
        style={[styles.spotlightSurface, { backgroundColor: primarySurface }]}
      >
        <SpotlightButton size="lg" badge="Beta" onPress={onPress}>
          {count === 0
            ? "Launch animation"
            : `Launched ${count} time${count === 1 ? "" : "s"}`}
        </SpotlightButton>
      </View>
      <View
        style={[styles.spotlightSurface, { backgroundColor: neutralSurface }]}
      >
        <SpotlightButton variant="neutral" badge="Update" onPress={onPress}>
          View release notes
        </SpotlightButton>
      </View>
    </View>
  );
}

function SpotlightButtonExamples({
  count,
  onPrimaryPress,
  onReset,
  primarySurface,
  neutralSurface,
}: {
  count: number;
  onPrimaryPress: () => void;
  onReset: () => void;
  primarySurface: string;
  neutralSurface: string;
}) {
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
            <SpotlightButton size="lg" badge="Live" onPress={onPrimaryPress}>
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
              onPress={onPrimaryPress}
            >
              Open changelog
            </SpotlightButton>
          </View>
          <Button variant="outline" onPress={onReset}>
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

function InputPreview({
  inputValue,
  onChangeText,
}: {
  inputValue: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.stackMd}>
      <Input
        placeholder="Email address"
        value={inputValue}
        onChangeText={onChangeText}
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

function InputExamples({
  inputValue,
  onChangeText,
}: {
  inputValue: string;
  onChangeText: (value: string) => void;
}) {
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

function TextareaPreview({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.stackMd}>
      <Textarea value={value} onChangeText={onChangeText} />
      <Textarea
        variant="ghost"
        placeholder="Drop in a draft or meeting notes..."
      />
    </View>
  );
}

function TextareaExamples({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (value: string) => void;
}) {
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

function SwitchPreview({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <View style={styles.rowBetween}>
      <Text>
        {checked ? "Notifications enabled" : "Notifications disabled"}
      </Text>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </View>
  );
}

function SwitchExamples({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <>
      <Block title="Interactive">
        <View style={styles.rowBetween}>
          <Text>Push notifications</Text>
          <Switch checked={checked} onCheckedChange={onCheckedChange} />
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

function CheckboxPreview({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <View style={styles.checkboxRow}>
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <Text>
        {checked ? "I agree to the terms." : "Tap to accept the terms."}
      </Text>
    </View>
  );
}

function CheckboxExamples({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <>
      <Block title="Consent">
        <View style={styles.checkboxRow}>
          <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
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

function ProgressPreview({ value }: { value: number }) {
  return (
    <View style={styles.stackMd}>
      <Progress value={value} />
      <Text variant="muted">{value}% uploaded</Text>
    </View>
  );
}

function ProgressExamples({
  value,
  onAdvance,
  onReset,
}: {
  value: number;
  onAdvance: () => void;
  onReset: () => void;
}) {
  return (
    <>
      <Block title="Upload progress">
        <View style={styles.stackMd}>
          <Progress value={value} />
          <View style={styles.rowWrap}>
            <Button size="sm" onPress={onAdvance}>
              <Text>Advance</Text>
            </Button>
            <Button size="sm" variant="outline" onPress={onReset}>
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

function OTPInputPreview({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <View style={styles.stackMd}>
      <OTPInput value={value} onValueChange={onValueChange} maxLength={6} />
      <Text variant="muted">
        {value ? `Code: ${value}` : "Enter a 6-digit code."}
      </Text>
    </View>
  );
}

function OTPInputExamples({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <>
      <Block title="Verification code">
        <View style={styles.stackMd}>
          <OTPInput value={value} onValueChange={onValueChange} maxLength={6} />
          <Button size="sm" variant="outline" onPress={() => onValueChange("")}>
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
});
