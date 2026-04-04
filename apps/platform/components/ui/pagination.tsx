"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Pagination({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(
        "flex flex-row flex-wrap items-center justify-center gap-1.5 touch-manipulation",
        className,
      )}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="pagination-item"
      className={cn("flex shrink-0 items-center justify-center", className)}
      {...props}
    />
  );
}

type PaginationLinkProps = React.ComponentProps<"button"> & {
  active?: boolean;
};

function PaginationLink({
  className,
  active,
  disabled,
  ...props
}: PaginationLinkProps) {
  return (
    <button
      type="button"
      data-slot="pagination-link"
      data-active={active ? "" : undefined}
      disabled={disabled}
      className={cn(
        "border-border inline-flex h-11 min-h-11 min-w-11 items-center justify-center rounded-xl border px-3 text-base font-semibold transition-colors active:scale-[0.98]",
        active
          ? "bg-primary text-primary-foreground border-primary shadow-sm"
          : "bg-background text-foreground hover:bg-muted/70",
        disabled && "pointer-events-none opacity-[0.38]",
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label="Previous page"
      className={cn("size-11 min-w-11 max-w-11 shrink-0 px-0", className)}
      {...props}
    >
      {children ?? "‹"}
    </PaginationLink>
  );
}

function PaginationNext({ className, children, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label="Next page"
      className={cn("size-11 min-w-11 max-w-11 shrink-0 px-0", className)}
      {...props}
    >
      {children ?? "›"}
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "text-foreground/55 flex h-11 w-10 min-w-10 items-center justify-center text-[15px] font-semibold",
        className,
      )}
      {...props}
    >
      …
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
