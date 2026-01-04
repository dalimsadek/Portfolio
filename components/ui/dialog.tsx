"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogOverlay = DialogPrimitive.Overlay;
export const DialogContent = DialogPrimitive.Content;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
        <DialogContent
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-card p-6 shadow-glow focus:outline-none"
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
              {description ? (
                <DialogDescription className="text-sm text-mutedForeground">
                  {description}
                </DialogDescription>
              ) : null}
            </div>
            <DialogPrimitive.Close asChild>
              <button
                aria-label="Close"
                className="rounded-full border border-border bg-muted p-2 text-foreground transition hover:bg-muted/80"
              >
                <X className="h-4 w-4" />
              </button>
            </DialogPrimitive.Close>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-mutedForeground">{children}</div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export function ModalTrigger(props: ComponentProps<typeof DialogTrigger>) {
  return <DialogTrigger {...props} />;
}
