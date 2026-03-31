"use client";

import { useState, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SpotlightButtonDemo } from "@/components/showcase/spotlight-button-demo";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Text } from "@/components/ui/text";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { OTPInput } from "@/components/ui/otp-input";

function PreviewShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

function ButtonLivePreview() {
  const [count, setCount] = useState(0);

  return (
    <PreviewShell>
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => setCount((value) => value + 1)}>
            {count === 0 ? "Create project" : `Created ${count}`}
          </Button>
          <Button variant="secondary">Preview</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <p className="text-muted-foreground text-sm">
          This preview is live. Click the primary button to change its label.
        </p>
      </div>
    </PreviewShell>
  );
}

export function ButtonBasicInlinePreview() {
  return (
    <PreviewShell className="min-h-[160px]">
      <div className="flex items-center justify-center">
        <Button>Continue</Button>
      </div>
    </PreviewShell>
  );
}

export function ButtonVariantsInlinePreview() {
  return (
    <PreviewShell className="min-h-[180px]">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </PreviewShell>
  );
}

export function ButtonSizesInlinePreview() {
  return (
    <PreviewShell className="min-h-[170px]">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>
    </PreviewShell>
  );
}

export function ButtonTextInlinePreview() {
  return (
    <PreviewShell className="min-h-[170px]">
      <div className="flex items-center justify-center">
        <Button variant="outline" size="lg">
          Open Preview
        </Button>
      </div>
    </PreviewShell>
  );
}

function InputLivePreview() {
  const [name, setName] = useState("");

  return (
    <PreviewShell>
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
        <Input placeholder="Search components..." />
        <p className="text-muted-foreground text-sm">
          {name ? `Hello, ${name}.` : "Start typing to test the field state."}
        </p>
      </div>
    </PreviewShell>
  );
}

export function InputBasicInlinePreview() {
  const [value, setValue] = useState("");

  return (
    <PreviewShell className="min-h-[170px]">
      <div className="mx-auto flex w-full max-w-md flex-col gap-3">
        <Input
          value={value}
          onChangeText={setValue}
          placeholder="Enter your name"
        />
      </div>
    </PreviewShell>
  );
}

export function InputGhostInlinePreview() {
  const [value, setValue] = useState("");

  return (
    <PreviewShell className="min-h-[170px]">
      <div className="bg-muted/70 mx-auto w-full max-w-md rounded-xl p-4">
        <Input
          value={value}
          onChangeText={setValue}
          variant="ghost"
          placeholder="Search..."
        />
      </div>
    </PreviewShell>
  );
}

export function InputDisabledInlinePreview() {
  return (
    <PreviewShell className="min-h-[170px]">
      <div className="mx-auto flex w-full max-w-md flex-col gap-3">
        <Input value="Read-only value" editable={false} />
      </div>
    </PreviewShell>
  );
}

export function InputSecureInlinePreview() {
  const [value, setValue] = useState("hunter2");

  return (
    <PreviewShell className="min-h-[170px]">
      <div className="mx-auto flex w-full max-w-md flex-col gap-3">
        <Input
          secureTextEntry
          value={value}
          onChangeText={setValue}
          placeholder="Password"
        />
      </div>
    </PreviewShell>
  );
}

function AvatarLivePreview() {
  return (
    <PreviewShell>
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Avatar size="lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="SC" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>WM</AvatarFallback>
          </Avatar>
        </div>
        <p className="text-muted-foreground text-sm">
          Image and fallback states are rendered directly in the docs preview.
        </p>
      </div>
    </PreviewShell>
  );
}

export function AvatarImageInlinePreview() {
  return (
    <PreviewShell className="min-h-[180px]">
      <div className="flex items-center justify-center">
        <Avatar size="lg">
          <AvatarImage src="https://github.com/shadcn.png" alt="SC" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </div>
    </PreviewShell>
  );
}

export function AvatarFallbackInlinePreview() {
  return (
    <PreviewShell className="min-h-[180px]">
      <div className="flex items-center justify-center">
        <Avatar size="lg">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </PreviewShell>
  );
}

export function AvatarSizeInlinePreview() {
  return (
    <PreviewShell className="min-h-[190px]">
      <div className="flex items-center justify-center">
        <Avatar size="lg" className="size-16">
          <AvatarFallback className="text-lg">AB</AvatarFallback>
        </Avatar>
      </div>
    </PreviewShell>
  );
}

function BadgeChip({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "secondary" | "outline" | "destructive";
}) {
  const styles = {
    default: "border-transparent bg-primary text-primary-foreground",
    secondary: "border-transparent bg-secondary text-secondary-foreground",
    outline: "border-border bg-background text-foreground",
    destructive: "border-transparent bg-destructive text-white",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

function BadgeLivePreview() {
  return (
    <PreviewShell>
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <BadgeChip>Published</BadgeChip>
          <BadgeChip variant="secondary">Beta</BadgeChip>
          <BadgeChip variant="outline">Draft</BadgeChip>
          <BadgeChip variant="destructive">Blocked</BadgeChip>
        </div>
        <p className="text-muted-foreground text-sm">
          Badge states adapt automatically to the current site theme.
        </p>
      </div>
    </PreviewShell>
  );
}

export function BadgeVariantsInlinePreview() {
  return (
    <PreviewShell className="min-h-[170px]">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <BadgeChip>New</BadgeChip>
        <BadgeChip variant="secondary">Beta</BadgeChip>
        <BadgeChip variant="destructive">Error</BadgeChip>
        <BadgeChip variant="outline">Draft</BadgeChip>
      </div>
    </PreviewShell>
  );
}

export function BadgeStatusInlinePreview() {
  return (
    <PreviewShell className="min-h-[170px]">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <BadgeChip variant="secondary">In Progress</BadgeChip>
        <BadgeChip>Shipped</BadgeChip>
      </div>
    </PreviewShell>
  );
}

function TextLivePreview() {
  return (
    <PreviewShell>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">Heading 1</h1>
        <h2 className="border-border border-b pb-2 text-2xl font-semibold tracking-tight">
          Heading 2
        </h2>
        <p className="text-muted-foreground text-lg">
          Lead text for introductions and high-signal summaries.
        </p>
        <p className="text-muted-foreground leading-7">
          Paragraph text lets you judge rhythm, spacing, and contrast in both
          light and dark mode without leaving the docs page.
        </p>
        <code className="bg-muted text-foreground w-fit rounded-md px-2 py-1 font-mono text-sm">
          watermelon add text
        </code>
      </div>
    </PreviewShell>
  );
}

export function TextHeadingsInlinePreview() {
  return (
    <PreviewShell className="min-h-[220px]">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Ship native UI faster.
        </h1>
        <h2 className="border-border border-b pb-2 text-2xl font-semibold tracking-tight">
          Overview
        </h2>
        <h3 className="text-xl font-semibold tracking-tight">Installation</h3>
      </div>
    </PreviewShell>
  );
}

export function TextBodyInlinePreview() {
  return (
    <PreviewShell className="min-h-[220px]">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
        <p className="text-muted-foreground text-lg">
          A composable type system for React Native.
        </p>
        <p className="text-muted-foreground leading-7">
          Build headings, helper text, and long-form copy from one primitive.
        </p>
        <p className="text-muted-foreground text-sm">Updated 2 minutes ago</p>
      </div>
    </PreviewShell>
  );
}

export function TextCodeInlinePreview() {
  return (
    <PreviewShell className="min-h-[180px]">
      <div className="text-muted-foreground mx-auto flex w-full max-w-2xl items-center justify-center text-center">
        Install{" "}
        <code className="bg-muted text-foreground mx-1 rounded-md px-1.5 py-0.5 font-mono text-sm">
          watermelon add text
        </code>{" "}
        to copy the primitive into your project.
      </div>
    </PreviewShell>
  );
}

export function CardInlinePreview() {
  return (
    <PreviewShell>
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <Text variant="h3">Card Title</Text>
          <Text variant="muted">Description or subtitle goes here.</Text>
        </CardHeader>
        <CardContent>
          <Text>Main content area for your card data.</Text>
        </CardContent>
        <CardFooter>
          <Text variant="small">Footer Action Area</Text>
        </CardFooter>
      </Card>
    </PreviewShell>
  );
}

export function LabelInlinePreview() {
  return (
    <PreviewShell>
      <div className="flex flex-col gap-2">
        <Label>Email Address</Label>
        <Input placeholder="Enter your email" />
      </div>
    </PreviewShell>
  );
}

export function SeparatorInlinePreview() {
  return (
    <PreviewShell>
      <div className="flex flex-col gap-4">
        <Text>Section Top</Text>
        <Separator />
        <Text>Section Bottom</Text>
      </div>
    </PreviewShell>
  );
}

export function TextareaInlinePreview() {
  return (
    <PreviewShell>
      <Textarea placeholder="Describe your issue..." className="min-h-[120px]" />
    </PreviewShell>
  );
}

export function SkeletonBasicInlinePreview() {
  return (
    <PreviewShell className="min-h-[160px]">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </PreviewShell>
  );
}

export function SkeletonCircleInlinePreview() {
  return (
    <PreviewShell className="min-h-[160px]">
      <div className="flex items-center justify-center gap-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </PreviewShell>
  );
}

export function SkeletonGridInlinePreview() {
  return (
    <PreviewShell className="min-h-[200px]">
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
      </div>
    </PreviewShell>
  );
}

function SkeletonLivePreview() {
  return (
    <PreviewShell>
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <div className="flex items-center gap-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
        <Skeleton className="h-[200px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
        </div>
      </div>
    </PreviewShell>
  );
}

function SwitchLivePreview() {
  const [checked, setChecked] = useState(false);

  return (
    <PreviewShell>
      <div className="flex flex-col items-center gap-4">
        <label className="flex items-center gap-3">
          <Switch checked={checked} onCheckedChange={setChecked} />
          <span className="text-sm font-medium">
            Notifications: {checked ? "On" : "Off"}
          </span>
        </label>
      </div>
    </PreviewShell>
  );
}

export function SwitchBasicInlinePreview() {
  return (
    <PreviewShell className="min-h-[160px]">
      <div className="flex items-center justify-center">
        <Switch defaultChecked />
      </div>
    </PreviewShell>
  );
}

export function SwitchDisabledInlinePreview() {
  return (
    <PreviewShell className="min-h-[160px]">
      <div className="flex items-center justify-center gap-8">
        <Switch disabled />
        <Switch checked disabled />
      </div>
    </PreviewShell>
  );
}

function CheckboxLivePreview() {
  const [checked, setChecked] = useState(false);

  return (
    <PreviewShell>
      <div className="flex flex-col items-center gap-4">
        <label className="flex items-center gap-3">
          <Checkbox checked={checked} onCheckedChange={(val) => setChecked(val === true)} />
          <span className="text-sm font-medium">
            I agree to the terms and conditions
          </span>
        </label>
        <p className="text-muted-foreground text-xs">
          State: {checked ? "Checked" : "Unchecked"}
        </p>
      </div>
    </PreviewShell>
  );
}

export function CheckboxBasicInlinePreview() {
  return (
    <PreviewShell className="min-h-[160px]">
      <div className="flex items-center justify-center">
        <Checkbox defaultChecked />
      </div>
    </PreviewShell>
  );
}

export function CheckboxDisabledInlinePreview() {
  return (
    <PreviewShell className="min-h-[160px]">
      <div className="flex items-center justify-center gap-8">
        <Checkbox disabled />
        <Checkbox checked disabled />
      </div>
    </PreviewShell>
  );
}

function ProgressLivePreview() {
  const [value, setValue] = useState(33);

  useEffect(() => {
    const timer = setTimeout(() => setValue(66), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PreviewShell>
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <Progress value={value} />
        <p className="text-muted-foreground text-center text-xs">
          Loading... {value}%
        </p>
      </div>
    </PreviewShell>
  );
}

export function ProgressBasicInlinePreview() {
  return (
    <PreviewShell className="min-h-[160px]">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <Progress value={45} />
        <Progress value={80} />
      </div>
    </PreviewShell>
  );
}

export function ProgressIndeterminateInlinePreview() {
  return (
    <PreviewShell className="min-h-[160px]">
      <div className="mx-auto flex w-full max-w-md flex-col gap-3">
        <Progress value={100} className="bg-primary/20" />
      </div>
    </PreviewShell>
  );
}

function OTPLivePreview() {
  const [value, setValue] = useState("");

  return (
    <PreviewShell>
      <div className="flex flex-col items-center gap-6">
        <OTPInput value={value} onValueChange={setValue} maxLength={6} />
        <p className="text-muted-foreground text-xs font-mono">
          Current: {value || "______"}
        </p>
        <Button size="sm" onClick={() => setValue("")} variant="outline">
          Clear Code
        </Button>
      </div>
    </PreviewShell>
  );
}

export function OTPBasicInlinePreview() {
  return (
    <PreviewShell className="min-h-[160px]">
      <div className="flex items-center justify-center">
        <OTPInput value="1234" maxLength={4} />
      </div>
    </PreviewShell>
  );
}

export function ComponentLivePreview({ slug }: { slug: string }) {
  switch (slug) {
    case "button":
      return <ButtonLivePreview />;
    case "input":
      return <InputLivePreview />;
    case "avatar":
      return <AvatarLivePreview />;
    case "badge":
      return <BadgeLivePreview />;
    case "text":
      return <TextLivePreview />;
    case "card":
      return <CardInlinePreview />;
    case "label":
      return <LabelInlinePreview />;
    case "separator":
      return <SeparatorInlinePreview />;
    case "textarea":
      return <TextareaInlinePreview />;
    case "spotlight-button":
      return <SpotlightButtonDemo />;
    case "skeleton":
      return <SkeletonLivePreview />;
    case "switch":
      return <SwitchLivePreview />;
    case "checkbox":
      return <CheckboxLivePreview />;
    case "progress":
      return <ProgressLivePreview />;
    case "otp-input":
      return <OTPLivePreview />;
    default:
      return null;
  }
}
