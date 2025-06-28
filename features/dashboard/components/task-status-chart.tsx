"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { cn } from "@/lib/utils"

interface TaskStatusChartProps {
  className?: string
}

const inboundData = [
  { name: "Waiting", value: 47, color: "#9AA5B1" },
  { name: "Yet to Start", value: 82, color: "#2D3748" },
  { name: "In Progress", value: 63, color: "#F6AD55" },
  { name: "On Hold", value: 15, color: "#F56565" },
  { name: "Paused", value: 15, color: "#ECC94B" },
  { name: "Completed", value: 29, color: "#38B2AC" },
]

const outboundData = [
  { name: "Waiting", value: 38, color: "#9AA5B1" },
  { name: "Yet to Start", value: 65, color: "#2D3748" },
  { name: "In Progress", value: 72, color: "#F6AD55" },
  { name: "On Hold", value: 12, color: "#F56565" },
  { name: "Paused", value: 18, color: "#ECC94B" },
  { name: "Completed", value: 35, color: "#38B2AC" },
]

export function TaskStatusChart({ className }: TaskStatusChartProps) {
  const [activeTab, setActiveTab] = useState("outbound")
  const data = activeTab === "outbound" ? outboundData : inboundData

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm">
          <p className="font-medium">{`${label}: ${payload[0].value}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Task Status</CardTitle>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="outbound">Outbound</TabsTrigger>
              <TabsTrigger value="inbound">Inbound</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100%-60px)]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={100}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              radius={[0, 4, 4, 0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}