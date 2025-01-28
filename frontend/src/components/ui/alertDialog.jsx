    import * as React from "react";
    import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
    import { buttonVariants } from "./button";

    const AlertDialog = AlertDialogPrimitive.Root;
    const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
    const AlertDialogPortal = AlertDialogPrimitive.Portal;

    const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Overlay
        className={`fixed inset-0 z-50 bg-black/80 transition-opacity ${className}`}
        {...props}
        ref={ref}
    />
    ));
    AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

    const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => (
    <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content
        ref={ref}
        className={`fixed left-1/2 top-1/2 z-50 w-full max-w-lg transform -translate-x-1/2 -translate-y-1/2 border bg-white p-6 shadow-lg sm:rounded-lg ${className}`}
        {...props}
        />
    </AlertDialogPortal>
    ));
    AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

    const AlertDialogHeader = ({ className, ...props }) => (
    <div className={`flex flex-col space-y-2 text-center sm:text-left ${className}`} {...props} />
    );
    AlertDialogHeader.displayName = "AlertDialogHeader";

    const AlertDialogFooter = ({ className, ...props }) => (
    <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`} {...props} />
    );
    AlertDialogFooter.displayName = "AlertDialogFooter";

    const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Title
        ref={ref}
        className={`text-lg font-semibold ${className}`}
        {...props}
    />
    ));
    AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

    const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Description
        ref={ref}
        className={`text-sm text-gray-600 ${className}`}
        {...props}
    />
    ));
    AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

    const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Action
        ref={ref}
        className={`${buttonVariants()} ${className}`}
        {...props}
    />
    ));
    AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

    const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Cancel
        ref={ref}
        className={`${buttonVariants({ variant: "outline" })} mt-2 sm:mt-0 ${className}`}
        {...props}
    />
    ));
    AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

    export {
    AlertDialog,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
    };
