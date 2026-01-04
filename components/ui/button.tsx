import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.99]", 
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-soft hover:brightness-105",
        secondary: "bg-secondary text-secondary-foreground shadow-soft hover:brightness-110",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        outline: "border border-border text-foreground hover:bg-muted"
      },
      size: {
        sm: "px-3 py-2",
        md: "px-4 py-2.5",
        lg: "px-5 py-3"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children: ReactNode;
}

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
