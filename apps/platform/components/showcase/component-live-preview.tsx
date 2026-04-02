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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Progress } from "@/components/ui/progress";
import { OTPInput } from "@/components/ui/otp-input";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

function CollapsibleLivePreview() {
  const [open, setOpen] = useState(true);

  return (
    <PreviewShell>
      <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>{open ? "Hide release notes" : "Show release notes"}</span>
              <span className="text-muted-foreground text-base leading-none">
                {open ? "−" : "+"}
              </span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 rounded-xl border bg-card p-6 text-left">
            <div className="space-y-2">
              <p>Version 0.4 ships six new primitives for native and web.</p>
              <p className="text-muted-foreground text-sm leading-6">
                Keep this area for optional details, release notes, or inspector
                copy.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </PreviewShell>
  );
}

export function CollapsibleInlinePreview() {
  return (
    <PreviewShell className="min-h-[190px]">
      <CollapsibleLivePreview />
    </PreviewShell>
  );
}

function AccordionLivePreview() {
  return (
    <PreviewShell>
      <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>Getting started</span>
                <span className="text-muted-foreground text-base leading-none">
                  +
                </span>
              </Button>
            </AccordionTrigger>
            <AccordionContent className="pt-3">
              <p className="text-muted-foreground text-sm leading-7">
                Use accordion items to reveal grouped content one section at a
                time.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </PreviewShell>
  )
}

export function AccordionInlinePreview() {
  return (
    <PreviewShell className="min-h-[190px]">
      <AccordionLivePreview />
    </PreviewShell>
  )
}

function DialogLivePreview() {
  return (
    <PreviewShell>
      <div className="flex items-center justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open publish dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Publish changes?</DialogTitle>
              <DialogDescription>
                Ship the updated registry and refresh the showcase previews.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Publish</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PreviewShell>
  );
}

function AlertDialogLivePreview() {
  return (
    <PreviewShell>
      <div className="flex flex-col items-center gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Open destructive alert</Button>
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
                <Button variant="outline">Cancel</Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <p className="text-muted-foreground text-sm">
          Use an alert dialog for high-consequence decisions.
        </p>
      </div>
    </PreviewShell>
  )
}

export function AlertDialogInlinePreview() {
  return (
    <PreviewShell className="min-h-[190px]">
      <div className="flex items-center justify-center">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Reset analytics</Button>
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
                <Button variant="ghost">Keep data</Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button variant="destructive">Reset</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PreviewShell>
  )
}

function AspectRatioLivePreview() {
  return (
    <PreviewShell>
      <div className="mx-auto w-full max-w-md">
        <AspectRatio ratio={16 / 9}>
          <Card className="h-full rounded-[18px]">
            <CardContent className="flex h-full flex-col items-center justify-center gap-2">
              <p className="text-lg font-semibold">16:9</p>
              <p className="text-muted-foreground text-sm">
                Hero media or video previews.
              </p>
            </CardContent>
          </Card>
        </AspectRatio>
      </div>
    </PreviewShell>
  )
}

export function AspectRatioInlinePreview() {
  return (
    <PreviewShell className="min-h-[200px]">
      <div className="mx-auto w-full max-w-md">
        <AspectRatio ratio={1}>
          <Card className="h-full rounded-[18px]">
            <CardContent className="flex h-full items-center justify-center">
              <p className="text-lg font-semibold">1:1 avatar crop</p>
            </CardContent>
          </Card>
        </AspectRatio>
      </div>
    </PreviewShell>
  )
}

export function DialogInlinePreview() {
  return (
    <PreviewShell className="min-h-[180px]">
      <div className="flex items-center justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Archive project</Button>
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
                <Button variant="ghost">Keep active</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive">Archive</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PreviewShell>
  );
}

function DrawerLivePreview() {
  return (
    <PreviewShell>
      <div className="flex items-center justify-center">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open iOS-like drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Quick actions</DrawerTitle>
              <DrawerDescription>
                Stay in context while exposing a few focused actions from the
                bottom.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col gap-2">
              <Button variant="secondary">Share preview</Button>
              <Button variant="ghost">Duplicate draft</Button>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Done</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </PreviewShell>
  )
}

export function DrawerInlinePreview() {
  return (
    <PreviewShell className="min-h-[190px]">
      <div className="flex items-center justify-center">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="secondary">Manage project</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Project actions</DrawerTitle>
              <DrawerDescription>
                Choose the next step without leaving the current screen.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col gap-2">
              <Button variant="outline">Edit details</Button>
              <Button variant="outline">Invite collaborators</Button>
              <Button variant="destructive">Archive project</Button>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </PreviewShell>
  )
}

function PopoverLivePreview() {
  return (
    <PreviewShell>
      <div className="flex items-center justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open quick summary</Button>
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
      </div>
    </PreviewShell>
  );
}

export function PopoverInlinePreview() {
  return (
    <PreviewShell className="min-h-[180px]">
      <div className="flex items-center justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">Inspect package</Button>
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
      </div>
    </PreviewShell>
  );
}

function RadioGroupLivePreview() {
  const [value, setValue] = useState("starter");

  return (
    <PreviewShell>
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <RadioGroup value={value} onValueChange={setValue}>
          <label className="flex items-center gap-3">
            <RadioGroupItem value="starter" id="starter-plan" />
            <span>Starter plan</span>
          </label>
          <label className="flex items-center gap-3">
            <RadioGroupItem value="pro" id="pro-plan" />
            <span>Pro plan</span>
          </label>
          <label className="flex items-center gap-3">
            <RadioGroupItem value="enterprise" id="enterprise-plan" />
            <span>Enterprise plan</span>
          </label>
        </RadioGroup>
        <p className="text-muted-foreground text-sm">Selected: {value}</p>
      </div>
    </PreviewShell>
  );
}

export function RadioGroupInlinePreview() {
  return (
    <PreviewShell className="min-h-[220px]">
      <RadioGroupLivePreview />
    </PreviewShell>
  );
}

function SliderLivePreview() {
  const [value, setValue] = useState([42]);

  return (
    <PreviewShell>
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
        <p className="text-muted-foreground text-sm">Progress: {value[0]}%</p>
      </div>
    </PreviewShell>
  );
}

export function SliderInlinePreview() {
  const [value, setValue] = useState([20]);

  return (
    <PreviewShell className="min-h-[180px]">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <Slider value={value} onValueChange={setValue} max={80} step={10} />
        <p className="text-muted-foreground text-sm">Current value: {value[0]}</p>
      </div>
    </PreviewShell>
  );
}

function SpinnerLivePreview() {
  return (
    <PreviewShell>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Spinner />
        <p className="text-muted-foreground text-sm">
          Showing a compact loading indicator.
        </p>
      </div>
    </PreviewShell>
  )
}

export function SpinnerInlinePreview() {
  return (
    <PreviewShell className="min-h-[170px]">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex items-center gap-5">
          <Spinner size="sm" />
          <Spinner size="default" />
          <Spinner size="lg" />
        </div>
        <div className="bg-muted flex w-full max-w-sm items-center justify-center gap-3 rounded-[18px] p-6">
          <Spinner className="border-t-foreground border-foreground/25" />
          <p className="text-muted-foreground text-sm">Syncing registry data…</p>
        </div>
      </div>
    </PreviewShell>
  )
}

function TabsLivePreview() {
  return (
    <PreviewShell>
      <div className="mx-auto w-full max-w-md">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="text-muted-foreground text-sm leading-7">
              Tab content swaps in place without leaving the screen.
            </p>
          </TabsContent>
          <TabsContent value="activity">
            <p className="text-muted-foreground text-sm leading-7">
              Recent deploys, edits, and release notes appear here.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </PreviewShell>
  )
}

export function TabsInlinePreview() {
  return (
    <PreviewShell className="min-h-[210px]">
      <div className="mx-auto w-full max-w-md">
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <p className="text-muted-foreground text-sm leading-7">
              Account owner, project name, and public details.
            </p>
          </TabsContent>
          <TabsContent value="billing">
            <p className="text-muted-foreground text-sm leading-7">
              Invoices, plan changes, and renewal settings.
            </p>
          </TabsContent>
          <TabsContent value="members">
            <p className="text-muted-foreground text-sm leading-7">
              Collaborators with access to the workspace.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </PreviewShell>
  )
}

function ToggleLivePreview() {
  return (
    <PreviewShell>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Toggle defaultPressed variant="default">
          Bold
        </Toggle>
        <Toggle>Italic</Toggle>
      </div>
    </PreviewShell>
  )
}

export function ToggleInlinePreview() {
  return (
    <PreviewShell className="min-h-[170px]">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Toggle defaultPressed variant="default">
          Bold
        </Toggle>
        <Toggle>Italic</Toggle>
        <Toggle>Underline</Toggle>
      </div>
    </PreviewShell>
  )
}

function ToggleGroupLivePreview() {
  const [value, setValue] = useState("grid")

  return (
    <PreviewShell>
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <ToggleGroup type="single" value={value} onValueChange={setValue}>
          <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
          <ToggleGroupItem value="list">List</ToggleGroupItem>
        </ToggleGroup>
        <p className="text-muted-foreground text-sm">Selected: {value}</p>
      </div>
    </PreviewShell>
  )
}

export function ToggleGroupInlinePreview() {
  const [value, setValue] = useState(["ios"])

  return (
    <PreviewShell className="min-h-[190px]">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <ToggleGroup
          type="multiple"
          value={value}
          onValueChange={(nextValue) => setValue(nextValue as string[])}
        >
          <ToggleGroupItem value="ios">iOS</ToggleGroupItem>
          <ToggleGroupItem value="android">Android</ToggleGroupItem>
          <ToggleGroupItem value="web">Web</ToggleGroupItem>
        </ToggleGroup>
        <p className="text-muted-foreground text-sm">
          Enabled: {value.join(", ")}
        </p>
      </div>
    </PreviewShell>
  )
}

function TooltipLivePreview() {
  return (
    <PreviewShell>
      <div className="flex items-center justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Press and hold</Button>
          </TooltipTrigger>
          <TooltipContent>Helpful hints fit nicely inside a tooltip.</TooltipContent>
        </Tooltip>
      </div>
    </PreviewShell>
  );
}

export function TooltipInlinePreview() {
  return (
    <PreviewShell className="min-h-[170px]">
      <div className="flex items-center justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">Hold for keyboard shortcut</Button>
          </TooltipTrigger>
          <TooltipContent>Shortcut: Cmd + K</TooltipContent>
        </Tooltip>
      </div>
    </PreviewShell>
  );
}

export function ComponentLivePreview({ slug }: { slug: string }) {
  switch (slug) {
    case "button":
      return <ButtonLivePreview />;
    case "accordion":
      return <AccordionLivePreview />;
    case "alert-dialog":
      return <AlertDialogLivePreview />;
    case "aspect-ratio":
      return <AspectRatioLivePreview />;
    case "collapsible":
      return <CollapsibleLivePreview />;
    case "dialog":
      return <DialogLivePreview />;
    case "drawer":
      return <DrawerLivePreview />;
    case "input":
      return <InputLivePreview />;
    case "avatar":
      return <AvatarLivePreview />;
    case "badge":
      return <BadgeLivePreview />;
    case "popover":
      return <PopoverLivePreview />;
    case "radio-group":
      return <RadioGroupLivePreview />;
    case "slider":
      return <SliderLivePreview />;
    case "spinner":
      return <SpinnerLivePreview />;
    case "tabs":
      return <TabsLivePreview />;
    case "text":
      return <TextLivePreview />;
    case "toggle":
      return <ToggleLivePreview />;
    case "toggle-group":
      return <ToggleGroupLivePreview />;
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
    case "tooltip":
      return <TooltipLivePreview />;
    case "progress":
      return <ProgressLivePreview />;
    case "otp-input":
      return <OTPLivePreview />;
    default:
      return null;
  }
}
