"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function AccountSummary() {
  const [data] = useState([
    { name: "يناير", balance: 24000 },
    { name: "فبراير", balance: 26500 },
    { name: "مارس", balance: 25800 },
    { name: "أبريل", balance: 27000 },
    { name: "مايو", balance: 28500 },
    { name: "يونيو", balance: 30000 },
    { name: "يوليو", balance: 32000 },
    { name: "أغسطس", balance: 34000 },
    { name: "سبتمبر", balance: 36500 },
    { name: "أكتوبر", balance: 38000 },
    { name: "نوفمبر", balance: 41000 },
    { name: "ديسمبر", balance: 45000 },
  ])

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs text-muted-foreground" />
          <YAxis
            tickFormatter={(value) => `$${value / 1000}k`}
            tickLine={false}
            axisLine={false}
            className="text-xs text-muted-foreground"
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">الشهر</span>
                        <span className="font-bold text-sm">{payload[0].payload.name}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">الرصيد</span>
                        <span className="font-bold text-sm">${payload[0].value.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="balance"
            strokeWidth={2}
            activeDot={{
              r: 6,
              className: "fill-primary stroke-background stroke-2",
            }}
            className="stroke-primary"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

