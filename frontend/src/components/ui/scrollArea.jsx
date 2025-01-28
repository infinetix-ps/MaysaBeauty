    import React from "react";
    import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

    // Replace this with your utility for merging class names or implement it as needed.
    const cn = (...classes) => classes.filter(Boolean).join(" ");

    const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}
    >
        <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
    ));
    ScrollArea.displayName = "ScrollArea";

    const ScrollBar = React.forwardRef(
    ({ className, orientation = "vertical", ...props }, ref) => (
        <ScrollAreaPrimitive.ScrollAreaScrollbar
        ref={ref}
        orientation={orientation}
        className={cn(
            "flex touch-none select-none transition-colors",
            orientation === "vertical" &&
            "h-full w-2.5 border-l border-l-transparent p-[1px]",
            orientation === "horizontal" &&
            "h-2.5 flex-col border-t border-t-transparent p-[1px]",
            className
        )}
        {...props}
        >
        <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
        </ScrollAreaPrimitive.ScrollAreaScrollbar>
    )
    );
    ScrollBar.displayName = "ScrollBar";

    export { ScrollArea, ScrollBar };
