import React from "react"
import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts"

const data = [
    { name: "0-2 years", value: 400 },
    { name: "3-5 years", value: 300 },
    { name: "6-8 years", value: 300 },
    { name: "9-12 years", value: 200 },
]

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A"]

export const AgeGroupDistribution = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    )
}

