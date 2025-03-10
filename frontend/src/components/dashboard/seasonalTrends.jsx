import React from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
    // { name: "Spring", dresses: 4000, accessories: 2400, shoes: 2400 },
    // { name: "Summer", dresses: 3000, accessories: 1398, shoes: 2210 },
    // { name: "Fall", dresses: 2000, accessories: 9800, shoes: 2290 },
    // { name: "Winter", dresses: 2780, accessories: 3908, shoes: 2000 },
]

export const SeasonalTrends = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="dresses" fill="#8884d8" />
                <Bar dataKey="accessories" fill="#82ca9d" />
                <Bar dataKey="shoes" fill="#ffc658" />
            </BarChart>
        </ResponsiveContainer>
    )
}

