import { Input } from "../uiDashboard/input.jsx"

export const Search = () => {
    return (
        <div>
            <Input
                type="search"
                placeholder="Search..."
                className="md:w-[100px] lg:w-[300px] border-pink-200 focus:border-pink-400"
            />
        </div>
    )
}

