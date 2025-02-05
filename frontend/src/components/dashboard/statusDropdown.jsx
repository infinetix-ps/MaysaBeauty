import { Check, Loader2, Package, PackageX, Truck } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropDownMenu.jsx"
import { Button } from "../ui/button.jsx"

const statusConfig = {
    Processing: {
        label: "Processing",
        icon: Loader2,
        color: "text-yellow-600 bg-yellow-50 border-yellow-200",
        iconClassName: "animate-spin",
    },
    Shipped: {
        label: "Shipped",
        icon: Truck,
        color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    Delivered: {
        label: "Delivered",
        icon: Package,
        color: "text-green-600 bg-green-50 border-green-200",
    },
    Cancelled: {
        label: "Cancelled",
        icon: PackageX,
        color: "text-red-600 bg-red-50 border-red-200",
    },
}

export function StatusDropdown({ value, onValueChange }) {
    const currentStatus = statusConfig[value]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className={`w-[140px] justify-start border-2 transition-colors ${currentStatus?.color}`}
                >
                    {currentStatus && (
                        <div className="flex items-center gap-2">
                            <currentStatus.icon className={`h-4 w-4 ${currentStatus.iconClassName}`} />
                            {currentStatus.label}
                        </div>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {Object.entries(statusConfig).map(([key, status]) => (
                    <DropdownMenuItem
                        key={key}
                        onClick={() => onValueChange(key)}
                        className="transition-colors hover:cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            <status.icon className={`h-4 w-4 ${status.iconClassName}`} />
                            {status.label}
                            {value === key && <Check className="h-4 w-4 ml-auto" />}
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

