"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function ScrollArea({
  className,
  children,
  maxHeight = 280,
  ...props
}: React.ComponentProps<"div"> & {
  maxHeight?: number;
}) {
  return (
    <div
      data-slot="scroll-area"
      className={cn(
        "border-border bg-background w-full overflow-hidden rounded-lg border",
        className,
      )}
      {...props}
    >
      <div
        className="overflow-y-auto overscroll-contain p-3"
        style={{ maxHeight }}
      >
        <div className="flex flex-col gap-1">{children}</div>
      </div>
    </div>
  );
}

export { ScrollArea };
