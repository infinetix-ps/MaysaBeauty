    import React, { forwardRef } from "react";
    import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

    // Utility function for conditional classNames
    const cn = (...classes) => classes.filter(Boolean).join(" ");

    // Button variants utility
    const buttonVariants = ({ variant, size }) => {
    const base = "inline-flex items-center justify-center rounded text-sm";
    const variants = {
        ghost: "bg-transparent hover:bg-gray-200",
        outline: "border border-gray-300 bg-white hover:bg-gray-100",
    };
    const sizes = {
        icon: "h-9 w-9",
        default: "h-10 px-4",
    };
    return cn(base, variants[variant], sizes[size]);
    };

    const Pagination = ({ className, ...props }) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
    />
    );

    const PaginationContent = forwardRef(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex flex-row items-center gap-1", className)}
        {...props}
    />
    ));

    const PaginationItem = forwardRef(({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
    ));

    const PaginationLink = ({ className, isActive, size = "icon", ...props }) => (
    <a
        aria-current={isActive ? "page" : undefined}
        className={cn(
        buttonVariants({
            variant: isActive ? "outline" : "ghost",
            size,
        }),
        className
        )}
        {...props}
    />
    );

    const PaginationPrevious = ({ className, ...props }) => (
    <PaginationLink
        aria-label="Go to previous page"
        size="default"
        className={cn("gap-1 pl-2.5", className)}
        {...props}
    >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
    </PaginationLink>
    );

    const PaginationNext = ({ className, ...props }) => (
    <PaginationLink
        aria-label="Go to next page"
        size="default"
        className={cn("gap-1 pr-2.5", className)}
        {...props}
    >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
    </PaginationLink>
    );

    const PaginationEllipsis = ({ className, ...props }) => (
    <span
        aria-hidden
        className={cn("flex h-9 w-9 items-center justify-center", className)}
        {...props}
    >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">More pages</span>
    </span>
    );

    export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    };
