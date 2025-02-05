import React, { forwardRef } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority"; // Ensure this package is installed
import { cn } from "../../lib/utils.ts"; // Adjust the import based on your utils location

const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = forwardRef(({ className, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants(), className)}
        {...props}
    />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
