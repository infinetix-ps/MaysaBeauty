    import * as React from "react";
    import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
    import { Check, ChevronRight, Circle } from "lucide-react";

    const DropdownMenu = DropdownMenuPrimitive.Root;
    const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
    const DropdownMenuGroup = DropdownMenuPrimitive.Group;
    const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
    const DropdownMenuSub = DropdownMenuPrimitive.Sub;
    const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

    const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger
        ref={ref}
        className={`${inset ? 'pl-8' : ''} flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${className}`}
        {...props}
    >
        {children}
        <ChevronRight className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
    ));

    const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.SubContent
        ref={ref}
        className={`z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-lg ${className}`}
        {...props}
    />
    ));

    const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={`z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md ${className}`}
        {...props}
        />
    </DropdownMenuPrimitive.Portal>
    ));

    const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
        ref={ref}
        className={`${inset ? 'pl-8' : ''} relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground ${className}`}
        {...props}
    />
    ));

    const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem
        ref={ref}
        className={`relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground ${className}`}
        checked={checked}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
            <Check className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
    </DropdownMenuPrimitive.CheckboxItem>
    ));

    export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup,
    };