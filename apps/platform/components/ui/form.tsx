"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

type FormErrors = Record<string, string | undefined>;

type FormContextValue = {
  errors: FormErrors;
};

const FormContext = React.createContext<FormContextValue>({ errors: {} });

function useFormContext() {
  return React.useContext(FormContext);
}

const FormFieldContext = React.createContext<{ name: string } | null>(null);

function Form({
  errors = {},
  className,
  children,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement> & { errors?: FormErrors }) {
  const value = React.useMemo(() => ({ errors }), [errors]);

  return (
    <FormContext.Provider value={value}>
      <form
        data-slot="form"
        className={cn("flex w-full flex-col gap-4", className)}
        {...props}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

function FormField({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      {children}
    </FormFieldContext.Provider>
  );
}

function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="form-item"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return <Label data-slot="form-label" className={className} {...props} />;
}

function FormControl({ children }: { children: React.ReactNode }) {
  return <div data-slot="form-control">{children}</div>;
}

function FormDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="form-description"
      className={cn("text-muted-foreground text-[13px] leading-snug", className)}
      {...props}
    />
  );
}

type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement> & {
  name?: string;
};

function FormMessage({ name: nameProp, className, ...props }: FormMessageProps) {
  const { errors } = useFormContext();
  const field = React.useContext(FormFieldContext);
  const fieldName = nameProp ?? field?.name;

  if (!fieldName) {
    return null;
  }

  const msg = errors[fieldName];
  if (!msg) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      className={cn("text-destructive text-[13px] leading-snug", className)}
      {...props}
    >
      {msg}
    </p>
  );
}

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
};
