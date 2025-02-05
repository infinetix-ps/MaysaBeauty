import React from "react"
import { useToast } from "../ui/useToast.js"

const ExampleComponent = () => {
    const { toast } = useToast()

    const handleClick = () => {
        toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
        })
    }

    return <button onClick={handleClick}>Show Toast</button>
}

export default ExampleComponent

