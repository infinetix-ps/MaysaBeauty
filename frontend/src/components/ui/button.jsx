import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const buttonVariants = ({ variant = "default", size = "default", className }) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:opacity-50";

  const variantClasses = {
    default: "bg-[#B78283] text-white hover:bg-[#A66467]", // No color change on click
  };

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
};

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={buttonVariants({ variant, size, className })} {...props} />;
});

Button.displayName = "Button";

export { Button, buttonVariants };
