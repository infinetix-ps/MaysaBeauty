    import React from "react";
    import { Toaster as Sonner } from "sonner";

    const Toaster = (props) => {
    // Assuming you have a custom theme management solution or context
    const theme = "light"; // Replace with your theme logic

    return (
        <Sonner
        theme={theme}
        className="toaster group"
        toastOptions={{
            classNames: {
            toast:
                "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            description: "group-[.toast]:text-muted-foreground",
            actionButton:
                "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            cancelButton:
                "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            },
        }}
        {...props}
        />
    );
    };

    export { Toaster };