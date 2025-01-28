    import React from "react";
    import { Root as SliderRoot, Track, Range, Thumb } from "@radix-ui/react-slider";

    const Slider = React.forwardRef(({ className, ...props }, ref) => (
    <SliderRoot
        ref={ref}
        className={`relative flex w-full touch-none select-none items-center ${className}`}
        {...props}
    >
        <Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <Range className="absolute h-full bg-primary" />
        </Track>
        <Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderRoot>
    ));

    Slider.displayName = SliderRoot.displayName;

    export { Slider };