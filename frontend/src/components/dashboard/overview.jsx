import React from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
    {
        revenue: 10400,
        dresses: 240,
        accessories: 180,
    },
    {
        revenue: 14405,
        dresses: 300,
        accessories: 250,
    },
    {
        revenue: 9400,
        dresses: 200,
        accessories: 220,
    },
    {
        revenue: 12000,
        dresses: 280,
        accessories: 230,
    },
    {
        revenue: 11000,
        dresses: 220,
        accessories: 260,
    },
    {
        revenue: 16780,
        dresses: 340,
        accessories: 310,
    },
    {
        revenue: 13890,
        dresses: 280,
        accessories: 290,
    },
    {
        revenue: 18000,
        dresses: 360,
        accessories: 340,
    },
]

export const Overview = () => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="dresses" stroke="#82ca9d" strokeWidth={2} />
                <Line type="monotone" dataKey="accessories" stroke="#ffc658" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    )
}

