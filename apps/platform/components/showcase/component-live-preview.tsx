"use client";

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ButtonVariantsShowcase } from "@/components/ui/button-variants";
import { Input } from "@/components/ui/input";
import { SpotlightButtonDemo } from "@/components/showcase/spotlight-button-demo";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Text } from "@/components/ui/text";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Chip } from "@/components/ui/chip";
import { FabMenu } from "@/components/ui/fab";
import {
  ChevronRight,
  ImagePlus,
  ListTodo,
  MessageSquare,
  Plus,
  Search,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionVariantGrouped } from "@/components/ui/accordion-variants";
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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  HoverCard,
  HoverCardContent,
  HoverCardDescription,
  HoverCardHeader,
  HoverCardTitle,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
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

function ButtonVariantsLivePreview() {
  return (
    <PreviewShell>
      <div className="mx-auto max-h-[min(520px,70vh)] w-full max-w-lg overflow-y-auto pr-1">
        <ButtonVariantsShowcase />
      </div>
    </PreviewShell>
  );
}

export function ButtonVariantsPresetsInlinePreview() {
  return (
    <PreviewShell className="min-h-[320px]">
      <div className="mx-auto max-h-[400px] w-full max-w-lg overflow-y-auto">
        <ButtonVariantsShowcase />
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

function BreadcrumbLivePreview() {
  return (
    <PreviewShell>
      <div className="flex justify-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Components</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </PreviewShell>
  );
}

export function BreadcrumbInlinePreview() {
  return (
    <PreviewShell className="min-h-[160px]">
      <div className="flex justify-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Workspace</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Registry</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
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

function InputGroupLivePreview() {
  return (
    <PreviewShell>
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="watermelon.dev" />
        </InputGroup>
      </div>
    </PreviewShell>
  );
}

export function InputGroupInlinePreview() {
  return (
    <PreviewShell className="min-h-[180px]">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="workspace-url" />
          <InputGroupAddon>
            <InputGroupText>.com</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="Invite a teammate" />
          <InputGroupAddon>
            <InputGroupButton>Send</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </PreviewShell>
  );
}

function KbdLivePreview() {
  return (
    <PreviewShell>
      <div className="flex items-center justify-center">
        <KbdGroup>
          <Kbd>Cmd</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
    </PreviewShell>
  );
}

export function KbdInlinePreview() {
  return (
    <PreviewShell className="min-h-[160px]">
      <div className="flex flex-col items-center justify-center gap-4">
        <KbdGroup>
          <Kbd>Shift</Kbd>
          <Kbd>Enter</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>Cmd</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>
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

function CommandLivePreview() {
  const [open, setOpen] = useState(false);
  const [commandKey, setCommandKey] = useState(0);
  const [lastRun, setLastRun] = useState("Publish changes");

  return (
    <PreviewShell>
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <Dialog
          open={open}
          onOpenChange={(next) => {
            setOpen(next);
            if (next) setCommandKey((k) => k + 1);
          }}
        >
          <DialogTrigger asChild>
            <Button type="button">Quick actions</Button>
          </DialogTrigger>
          <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md">
            <DialogHeader className="border-border border-b px-4 py-3 text-left">
              <DialogTitle>Quick actions</DialogTitle>
              <DialogDescription>
                Dialog on web, bottom sheet on native—search, then tap an action.
              </DialogDescription>
            </DialogHeader>
            <Command
              key={commandKey}
              className="bg-background rounded-none border-0 shadow-none"
            >
              <CommandInput placeholder="Search actions…" />
              <CommandList>
                <CommandGroup heading="Actions">
                  <CommandItem
                    value="publish changes"
                    onSelect={() => {
                      setLastRun("Publish changes");
                      setOpen(false);
                    }}
                  >
                    Publish changes
                    <ChevronRight
                      aria-hidden
                      className="text-muted-foreground ml-auto size-4 shrink-0"
                    />
                  </CommandItem>
                  <CommandItem
                    value="open previews"
                    onSelect={() => {
                      setLastRun("Open previews");
                      setOpen(false);
                    }}
                  >
                    Open previews
                    <ChevronRight
                      aria-hidden
                      className="text-muted-foreground ml-auto size-4 shrink-0"
                    />
                  </CommandItem>
                </CommandGroup>
                <CommandEmpty>No matching actions.</CommandEmpty>
              </CommandList>
            </Command>
            <DialogFooter className="border-border border-t px-4 py-3 sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <p className="text-muted-foreground text-center text-sm">
          Last run: {lastRun}
        </p>
      </div>
    </PreviewShell>
  );
}

export function CommandInlinePreview() {
  return (
    <PreviewShell className="min-h-[240px]">
      <CommandLivePreview />
    </PreviewShell>
  );
}

function AccordionLivePreview() {
  return (
    <PreviewShell>
      <div className="mx-auto w-full max-w-lg">
        <Accordion type="single" defaultValue="item-1" collapsible>
          <AccordionItem value="item-1" className="border-b px-1">
            <AccordionTrigger>Getting started</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground pb-4 text-sm leading-7">
                Use accordion items to reveal grouped content one section at a
                time.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b px-1">
            <AccordionTrigger>Details</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground pb-4 text-sm leading-7">
                Open and close each section—animations use the Radix content
                height variable.
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

function AccordionVariantsLivePreview() {
  return (
    <PreviewShell>
      <div className="mx-auto w-full max-w-lg">
        <AccordionVariantGrouped />
      </div>
    </PreviewShell>
  )
}

export function AccordionVariantsInlinePreview() {
  return (
    <PreviewShell className="min-h-[260px]">
      <div className="mx-auto w-full max-w-lg">
        <AccordionVariantGrouped />
      </div>
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

function CarouselLivePreview() {
  return (
    <PreviewShell>
      <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
        <Carousel>
          <CarouselContent>
            {[
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
            ].map((slide) => (
              <CarouselItem key={slide.title}>
                <Card>
                  <CardHeader>
                    <Text className="text-lg font-semibold">{slide.title}</Text>
                  </CardHeader>
                  <CardContent>
                    <Text className="text-muted-foreground text-sm">
                      {slide.body}
                    </Text>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-between">
            <CarouselPrevious />
            <Text className="text-muted-foreground text-sm">
              Swipe or click through
            </Text>
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </PreviewShell>
  )
}

export function CarouselInlinePreview() {
  return (
    <PreviewShell className="min-h-[240px]">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
        <Carousel>
          <CarouselContent>
            {["Starter template", "Shared tokens", "Touch-friendly"].map((title) => (
              <CarouselItem key={title}>
                <Card>
                  <CardContent className="space-y-2 p-6">
                    <Text className="text-base font-semibold">{title}</Text>
                    <Text className="text-muted-foreground text-sm">
                      A shadcn-style card slide that feels at home on mobile and web.
                    </Text>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-between">
            <CarouselPrevious />
            <Text className="text-muted-foreground text-sm">
              Feature spotlight
            </Text>
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </PreviewShell>
  )
}

function DropdownMenuLivePreview() {
  const [notifications, setNotifications] = useState(true);
  const [position, setPosition] = useState("bottom");

  return (
    <PreviewShell>
      <div className="flex items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8}>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Team</DropdownMenuLabel>
              <DropdownMenuItem>
                Invite users
                <DropdownMenuShortcut>{">"}</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Preferences</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={notifications}
              onCheckedChange={setNotifications}
            >
              Push notifications
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Panel dock</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Remove workspace</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </PreviewShell>
  );
}

export function DropdownMenuInlinePreview() {
  const [showStatus, setShowStatus] = useState(false);
  const [density, setDensity] = useState("comfortable");

  return (
    <PreviewShell className="min-h-[280px]">
      <div className="flex items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">Open</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" sideOffset={6}>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={showStatus}
              onCheckedChange={setShowStatus}
            >
              Show status bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Density</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
              <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="comfortable">
                Comfortable
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
              Destructive (stays open)
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </PreviewShell>
  );
}

export function AlertInlinePreview() {
  const [kind, setKind] = useState<null | "default" | "destructive">(null);

  useEffect(() => {
    if (!kind) {
      return undefined;
    }
    const id = window.setTimeout(() => setKind(null), 4200);
    return () => window.clearTimeout(id);
  }, [kind]);

  useEffect(() => {
    if (!kind) {
      return undefined;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setKind(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [kind]);

  return (
    <PreviewShell className="min-h-[140px]">
      <div className="flex w-full flex-wrap gap-3">
        <Button type="button" onClick={() => setKind("default")}>
          Show status alert
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={() => setKind("destructive")}
        >
          Show error alert
        </Button>
      </div>
      {kind ? (
        <>
          <button
            type="button"
            aria-label="Dismiss alert"
            className="fixed inset-0 z-[100] cursor-default bg-zinc-950/45"
            onClick={() => setKind(null)}
          />
          <div className="pointer-events-none fixed inset-x-0 top-0 z-[101] flex justify-center px-4 pt-[max(1.25rem,calc(env(safe-area-inset-top)+3.5rem))]">
            <div className="pointer-events-auto w-full max-w-md">
              {kind === "default" ? (
                <Alert>
                  <AlertTitle>Heads up</AlertTitle>
                  <AlertDescription>
                    Alerts surface status without blocking the rest of the
                    screen.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertTitle>Payment failed</AlertTitle>
                  <AlertDescription>
                    Update your billing method and try the charge again.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </>
      ) : null}
    </PreviewShell>
  );
}

export function ScrollAreaInlinePreview() {
  return (
    <PreviewShell className="min-h-[200px]">
      <ScrollArea maxHeight={160} className="w-full max-w-sm">
        {Array.from({ length: 14 }, (_, i) => (
          <p key={i} className="text-muted-foreground text-sm">
            Line {i + 1} — scroll inside the bordered region.
          </p>
        ))}
      </ScrollArea>
    </PreviewShell>
  );
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
                Layout primitives keep spacing predictable across native and web
                previews.
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

function SheetLivePreview() {
  return (
    <PreviewShell>
      <div className="flex items-center justify-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open side sheet</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Project settings</SheetTitle>
              <SheetDescription>
                Adjust a few focused options without leaving the screen.
              </SheetDescription>
            </SheetHeader>
            <Input placeholder="Project name" />
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="ghost">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </PreviewShell>
  );
}

export function SheetInlinePreview() {
  return (
    <PreviewShell className="min-h-[190px]">
      <div className="flex items-center justify-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary">Open workspace panel</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Workspace panel</SheetTitle>
              <SheetDescription>
                Good for navigation, filters, or settings.
              </SheetDescription>
            </SheetHeader>
            <Button variant="outline">General</Button>
            <Button variant="outline">Members</Button>
          </SheetContent>
        </Sheet>
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

type PaginationSlot = number | "ellipsis";

function buildPaginationSlots(page: number, total: number): PaginationSlot[] {
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

function PaginationLivePreview() {
  const totalPages = 8;
  const [page, setPage] = useState(6);
  const slots = useMemo(
    () => buildPaginationSlots(page, totalPages),
    [page, totalPages],
  );

  return (
    <PreviewShell>
      <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-3">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
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
                    onClick={() => setPage(slot)}
                  >
                    {slot}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <p className="text-muted-foreground w-full text-center text-sm">
          Current page: {page}
        </p>
      </div>
    </PreviewShell>
  );
}

function HoverCardLivePreview() {
  return (
    <PreviewShell className="min-h-[200px]">
      <div className="flex items-center justify-center pt-6">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">@watermelon</Button>
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
      </div>
    </PreviewShell>
  )
}

function TableLivePreview() {
  return (
    <PreviewShell>
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
    </PreviewShell>
  )
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

function FormLivePreview() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [signedIn, setSignedIn] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignedIn(false);
    const next = validateLoginFields(email, password);
    setErrors(next);
    const hasErr = Object.keys(next).some((k) => Boolean(next[k]));
    if (!hasErr) {
      setSignedIn(true);
    }
  };

  return (
    <PreviewShell>
      <Form
        errors={errors}
        className="mx-auto w-full max-w-sm"
        onSubmit={submit}
      >
        <div className="mb-1 space-y-1">
          <p className="text-lg font-semibold">Sign in</p>
          <p className="text-muted-foreground text-sm">
            Use your workspace email and password.
          </p>
        </div>
        <FormField name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                size="lg"
                autoComplete="email"
                invalid={Boolean(errors.email)}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }}
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
                autoComplete="current-password"
                invalid={Boolean(errors.password)}
                placeholder="••••••••"
                secureTextEntry
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button className="w-full" size="lg" type="submit">
          Sign in
        </Button>
        {signedIn ? (
          <p className="text-muted-foreground text-center text-sm">
            Signed in successfully (demo).
          </p>
        ) : null}
      </Form>
    </PreviewShell>
  );
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

export {
  FormLivePreview as FormInlinePreview,
  HoverCardLivePreview as HoverCardInlinePreview,
  PaginationLivePreview as PaginationInlinePreview,
  TableLivePreview as TableInlinePreview,
};

function ListLivePreview() {
  const rows = [
    { title: "Notifications", sub: "Push, email, and in-app" },
    { title: "Privacy", sub: "Who can see your activity" },
  ];
  return (
    <PreviewShell>
      <div className="bg-card text-card-foreground divide-border w-full max-w-lg divide-y overflow-hidden rounded-xl border">
        {rows.map((row) => (
          <button
            key={row.title}
            type="button"
            className="hover:bg-muted/50 flex min-h-[52px] w-full items-center gap-3 px-4 text-left transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold">{row.title}</div>
              <div className="text-muted-foreground text-xs">{row.sub}</div>
            </div>
            <ChevronRight className="text-muted-foreground size-4 shrink-0" />
          </button>
        ))}
      </div>
    </PreviewShell>
  );
}

function SegmentedControlLivePreview() {
  const [value, setValue] = useState("list");
  const options = [
    { value: "list", label: "List" },
    { value: "map", label: "Map" },
  ];
  return (
    <PreviewShell>
      <div className="flex w-full max-w-md flex-col gap-3">
        <div className="bg-muted text-muted-foreground inline-flex h-10 w-full rounded-lg border p-1">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setValue(opt.value)}
              className={cn(
                "flex-1 rounded-md text-sm font-semibold transition-all",
                value === opt.value
                  ? "bg-background text-foreground shadow-sm"
                  : "hover:text-foreground",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <p className="text-muted-foreground text-sm">Selected: {value}</p>
      </div>
    </PreviewShell>
  );
}

function FabLivePreview() {
  const fabMenuActions = useMemo(
    () => [
      {
        id: "msg",
        label: "New message",
        onPress: () => {},
        icon: <MessageSquare className="text-secondary-foreground size-5" strokeWidth={2} />,
      },
      {
        id: "photo",
        label: "New photo",
        onPress: () => {},
        icon: <ImagePlus className="text-secondary-foreground size-5" strokeWidth={2} />,
      },
      {
        id: "task",
        label: "New task",
        onPress: () => {},
        icon: <ListTodo className="text-secondary-foreground size-5" strokeWidth={2} />,
      },
    ],
    [],
  );

  return (
    <PreviewShell>
      <div className="flex w-full min-h-[220px] items-end justify-end">
        <FabMenu
          actions={fabMenuActions}
          accessibilityLabel="Create"
          renderMain={(open) =>
            open ? (
              <X className="text-primary-foreground size-7" strokeWidth={2.5} />
            ) : (
              <Plus className="text-primary-foreground size-7" strokeWidth={2.5} />
            )
          }
        />
      </div>
    </PreviewShell>
  );
}

function SearchBarLivePreview() {
  const [q, setQ] = useState("");
  return (
    <PreviewShell>
      <div className="flex w-full max-w-md flex-col gap-3">
        <div className="border-input flex min-h-12 w-full items-center gap-2 rounded-xl border bg-background px-3">
          <Search className="text-muted-foreground size-5 shrink-0" />
          <Input
            className="h-10 flex-1 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            placeholder="Search places, people…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {q ? (
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground text-lg leading-none"
              onClick={() => setQ("")}
              aria-label="Clear search"
            >
              ×
            </button>
          ) : null}
        </div>
        <p className="text-muted-foreground text-sm">
          {q ? `Query: ${q}` : "Type to see the clear affordance."}
        </p>
      </div>
    </PreviewShell>
  );
}

function ChipLivePreview() {
  const [on, setOn] = useState(true);
  return (
    <PreviewShell>
      <div className="flex min-h-[100px] flex-wrap items-center justify-center gap-3">
        <Chip selected={on} onClick={() => setOn((v) => !v)}>
          {on ? "Enabled" : "Disabled"}
        </Chip>
        <Chip variant="outline">Outline</Chip>
        <Chip onRemove={() => {}}>Removable</Chip>
      </div>
    </PreviewShell>
  );
}

export function ComponentLivePreview({ slug }: { slug: string }) {
  switch (slug) {
    case "button":
      return <ButtonLivePreview />;
    case "button-variants":
      return <ButtonVariantsLivePreview />;
    case "breadcrumb":
      return <BreadcrumbLivePreview />;
    case "accordion":
      return <AccordionLivePreview />;
    case "accordion-variants":
      return <AccordionVariantsLivePreview />;
    case "alert":
      return <AlertInlinePreview />;
    case "alert-dialog":
      return <AlertDialogLivePreview />;
    case "aspect-ratio":
      return <AspectRatioLivePreview />;
    case "carousel":
      return <CarouselLivePreview />;
    case "collapsible":
      return <CollapsibleLivePreview />;
    case "command":
      return <CommandLivePreview />;
    case "dialog":
      return <DialogLivePreview />;
    case "drawer":
      return <DrawerLivePreview />;
    case "form":
      return <FormLivePreview />;
    case "hover-card":
      return <HoverCardLivePreview />;
    case "dropdown-menu":
      return <DropdownMenuLivePreview />;
    case "input":
      return <InputLivePreview />;
    case "input-group":
      return <InputGroupLivePreview />;
    case "kbd":
      return <KbdLivePreview />;
    case "avatar":
      return <AvatarLivePreview />;
    case "badge":
      return <BadgeLivePreview />;
    case "popover":
      return <PopoverLivePreview />;
    case "pagination":
      return <PaginationLivePreview />;
    case "radio-group":
      return <RadioGroupLivePreview />;
    case "slider":
      return <SliderLivePreview />;
    case "sheet":
      return <SheetLivePreview />;
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
    case "scroll-area":
      return <ScrollAreaInlinePreview />;
    case "textarea":
      return <TextareaInlinePreview />;
    case "spotlight-button":
      return <SpotlightButtonDemo />;
    case "skeleton":
      return <SkeletonLivePreview />;
    case "switch":
      return <SwitchLivePreview />;
    case "table":
      return <TableLivePreview />;
    case "checkbox":
      return <CheckboxLivePreview />;
    case "tooltip":
      return <TooltipLivePreview />;
    case "progress":
      return <ProgressLivePreview />;
    case "otp-input":
      return <OTPLivePreview />;
    case "list":
      return <ListLivePreview />;
    case "segmented-control":
      return <SegmentedControlLivePreview />;
    case "fab":
      return <FabLivePreview />;
    case "search-bar":
      return <SearchBarLivePreview />;
    case "chip":
      return <ChipLivePreview />;
    default:
      return (
        <PreviewShell>
          <p className="text-muted-foreground max-w-md text-center text-sm leading-7">
            No web preview is registered for this slug yet. Use{" "}
            <span className="text-foreground font-medium">Scan to preview</span>{" "}
            to open the native Expo showcase, or switch to the{" "}
            <span className="text-foreground font-medium">Code</span> tab for the
            source.
          </p>
        </PreviewShell>
      );
  }
}
