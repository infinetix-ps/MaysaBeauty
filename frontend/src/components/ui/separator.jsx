    import React from "react";
    import * as SeparatorPrimitive from "@radix-ui/react-separator";

    // Replace this with your utility for merging class names, or implement it as needed.
    const cn = (...classes) => classes.filter(Boolean).join(" ");

    const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
        )}
        {...props}
    />
    ));

    Separator.displayName = "Separator";

    export { Separator };
