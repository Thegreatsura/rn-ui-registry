"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import type { TOCItemType } from "fumadocs-core/toc";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useTOC } from "@/components/core/toc-context";
import { GlassContainer } from "@/components/core/3d-container";

export function DocSection({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("min-w-0 scroll-mt-24 space-y-2", className)}
    >
      {children}
    </section>
  );
}

export function DocSubsection({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("min-w-0 scroll-mt-24 space-y-1", className)}
    >
      {children}
    </section>
  );
}

export function ApiTable({
  rows,
}: {
  rows: Array<{
    prop: string;
    type: string;
    default?: string;
    description: string;
  }>;
}) {
  return (
    <GlassContainer variant="strong" className="w-full rounded-[20px] p-0.5">
      <div className="border-border/70 bg-card/86 w-full max-w-full overflow-x-auto rounded-[18px] border">
        <table className="w-full min-w-160 text-left text-sm">
          <thead className="bg-muted/54 text-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">prop</th>
              <th className="px-4 py-3 font-medium">type</th>
              <th className="px-4 py-3 font-medium">default</th>
              <th className="px-4 py-3 font-medium">description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.prop}
                className="border-border/70 border-t align-top"
              >
                <td className="text-foreground px-4 py-3 font-mono text-xs">
                  <span className="bg-muted rounded-md px-1.5 py-0.5">
                    {row.prop}
                  </span>
                </td>
                <td className="text-muted-foreground px-4 py-3 font-mono text-xs">
                  {row.type}
                </td>
                <td className="text-muted-foreground px-4 py-3 font-mono text-xs">
                  {row.default || "-"}
                </td>
                <td className="text-muted-foreground px-4 py-3 leading-7">
                  {row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassContainer>
  );
}

export function OnThisPage({ items }: { items: TOCItemType[] }) {
  const { setItems } = useTOC();

  useEffect(() => {
    setItems(items);
    return () => setItems([]);
  }, [items, setItems]);

  return null;
}

export function PreviewCard({
  qrValue,
  appStoreHref,
  playStoreHref,
}: {
  qrValue: string;
  appStoreHref: string;
  playStoreHref: string;
}) {
  return (
    <div>
      <p className="text-foreground mt-5 text-center text-xs">
        Scan this QR code with your camera app to preview the Watermelon native
        component pages.
      </p>
      <div className="mt-2 flex justify-center rounded-[1.5rem] bg-white p-2">
        <QRCodeSVG value={qrValue} size={220} marginSize={2} />
      </div>
      <p className="text-muted-foreground mt-2 text-center text-sm leading-7">
        Install Expo Go on your device if you are previewing the local showcase
        build through an Expo link.
      </p>
      <div className="mt-2 flex flex-col gap-3">
        <a
          href={appStoreHref}
          target="_blank"
          rel="noreferrer"
          className="bg-foreground text-background inline-flex min-h-12 items-center justify-center rounded-full px-4 text-base font-medium transition hover:opacity-90"
        >
          Download on App Store
        </a>
        <a
          href={playStoreHref}
          target="_blank"
          rel="noreferrer"
          className="bg-muted text-foreground hover:bg-muted/80 inline-flex min-h-12 items-center justify-center rounded-full px-4 text-base font-medium transition"
        >
          Download on Play Store
        </a>
      </div>
    </div>
  );
}

export function PreviewVideo({ src, title }: { src: string; title: string }) {
  return (
    <div className="h-[400px] w-[200px] overflow-hidden bg-black">
      <video aria-labelledby={title} src={src} className="w-fit" />
    </div>
  );
}

import { ChevronLeft, ChevronRight } from "lucide-react";

export function DocsPager({
  previous,
  next,
}: {
  previous?: { href: string; title: string; description: string };
  next?: { href: string; title: string; description: string };
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:px-4">
      {previous ? (
        <GlassContainer variant="default">
          <Link
            href={previous.href}
            className="group hover:bg-muted/50 bg-card/50 flex items-center gap-4 rounded-[18px] border border-neutral-400/20 p-4 transition-colors"
          >
            <ChevronLeft className="text-muted-foreground group-hover:text-foreground size-4 transition-colors" />
            <div className="flex flex-col gap-0.5">
              <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
                Previous
              </span>
              <span className="text-foreground text-sm font-medium">
                {previous.title}
              </span>
            </div>
          </Link>
        </GlassContainer>
      ) : (
        <div />
      )}
      {next ? (
        <GlassContainer variant="default">
          <Link
            href={next.href}
            className="group hover:bg-muted/50 bg-card/50 flex items-center justify-end gap-4 rounded-[18px] border border-neutral-400/20 p-4 text-right transition-colors"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
                Next
              </span>
              <span className="text-foreground text-sm font-medium">
                {next.title}
              </span>
            </div>
            <ChevronRight className="text-muted-foreground group-hover:text-foreground size-4 transition-colors" />
          </Link>
        </GlassContainer>
      ) : null}
    </div>
  );
}
