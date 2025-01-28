    import * as React from "react";

    // Utility function for class names (replace with your implementation or library)
    const cn = (...classes) => classes.filter(Boolean).join(" ");

    // Badge variant configuration (replacing `class-variance-authority` with plain logic)
    const badgeVariants = (options = {}) => {
    const baseClasses =
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

    const variantClasses = {
        default:
        "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
        "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
        "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
    };

    const { variant = "default" } = options;

    return `${baseClasses} ${variantClasses[variant] || variantClasses.default}`;
    };

    function Badge({ className, variant, ...props }) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
    }

    export { Badge, badgeVariants };
