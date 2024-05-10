import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx } from "clsx";
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  clsx("inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    // "focus-visible:outline-offset-0",
    "disabled:pointer-events-none disabled:opacity-50"
  ),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        blue: "bg-[linear-gradient(94.26deg,rgb(32,121,222)_6.45%,rgb(28,93,192)_100%)] hover:bg-[linear-gradient(94.26deg,rgb(63,140,227)_6.45%,rgb(32,108,223)_100%)] text-[rgb(235_235_240)] border-[0.5px_solid_rgba(255_255_255_0.12)] shadow  ",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline",

      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, 
    VariantProps<typeof buttonVariants> { asChild?: boolean }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
