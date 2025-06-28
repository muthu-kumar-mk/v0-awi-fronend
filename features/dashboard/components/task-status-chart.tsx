"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts"
import { cn } from "@/lib/utils"

interface TaskStatusChartProps {
  className?: string
}

// Data structure for stacked bar chart
interface TaskData {
  name: string;
  Waiting: number;
  "Yet to Start": number;
  Hold: number;
  Paused: number;
  "In Progress": number;
  Completed: number;
}

// Colors for each status
const statusColors = {
  "Waiting": "#9AA5B1",
  "Yet to Start": "#2D3748",
  "Hold": "#F56565",
  "Paused": "#ECC94B",
  "In Progress": "#F6AD55",
  "Completed": "#38B2AC"
};

// Inbound data with task types and their status distribution
const inboundData: TaskData[] = [
  { 
    name: "Unloading", 
    "Waiting": 12, 
    "Yet to Start": 8, 
    "Hold": 5, 
    "Paused": 7, 
    "In Progress": 10, 
    "Completed": 6 
  },
  { 
    name: "Sorting", 
    "Waiting": 10, 
    "Yet to Start": 9, 
    "Hold": 6, 
    "Paused": 8, 
    "In Progress": 15, 
    "Completed": 12 
  },
  { 
    name: "IB QA", 
    "Waiting": 8, 
    "Yet to Start": 7, 
    "Hold": 4, 
    "Paused": 5, 
    "In Progress": 9, 
    "Completed": 7 
  },
  { 
    name: "Receiving and Put away", 
    "Waiting": 9, 
    "Yet to Start": 10, 
    "Hold": 6, 
    "Paused": 8, 
    "In Progress": 14, 
    "Completed": 11 
  },
  { 
    name: "Review Overage / Underage", 
    "Waiting": 11, 
    "Yet to Start": 12, 
    "Hold": 8, 
    "Paused": 9, 
    "In Progress": 16, 
    "Completed": 14 
  }
];

// Outbound data with task types and their status distribution
const outboundData: TaskData[] = [
  { 
    name: "Unloading", 
    "Waiting": 10, 
    "Yet to Start": 7, 
    "Hold": 4, 
    "Paused": 6, 
    "In Progress": 9, 
    "Completed": 5 
  },
  { 
    name: "Sorting", 
    "Waiting": 9, 
    "Yet to Start": 8, 
    "Hold": 5, 
    "Paused": 7, 
    "In Progress": 13, 
    "Completed": 10 
  },
  { 
    name: "IB QA", 
    "Waiting": 7, 
    "Yet to Start": 6, 
    "Hold": 3, 
    "Paused": 4, 
    "In Progress": 8, 
    "Completed": 6 
  },
  { 
    name: "Receiving and Put away", 
    "Waiting": 8, 
    "Yet to Start": 9, 
    "Hold": 5, 
    "Paused": 7, 
    "In Progress": 12, 
    "Completed": 9 
  },
  { 
    name: "Review Overage / Underage", 
    "Waiting": 10, 
    "Yet to Start": 11, 
    "Hold": 7, 
    "Paused": 8, 
    "In Progress": 14, 
    "Completed": 12 
  }
];

export function TaskStatusChart({ className }: TaskStatusChartProps) {
  const [activeTab, setActiveTab] = useState("outbound")
  const data = activeTab === "outbound" ? outboundData : inboundData

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm">
          <p className="font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-${index}`} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-sm">{`${entry.name}: ${entry.value}`}</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  // Custom legend that matches the design
  const CustomLegend = () => {
    const statuses = ["Waiting", "Yet to Start", "Hold", "Paused", "In Progress", "Completed"];
    
    return (
      <div className="flex flex-wrap gap-6 mt-4">
        {statuses.map((status) => (
          <div key={status} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: statusColors[status as keyof typeof statusColors] }}
            ></div>
            <span className="text-sm text-gray-600">{status}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="70%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            barSize={8}
            barGap={2}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" className="bg-blue-900" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              tick={{ fontSize: 12 }}
              width={120}
              axisLine={false}
              style={{paddingLeft : 15px}}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Stacked bars for each status */}
            <Bar dataKey="Waiting" stackId="a" fill={statusColors["Waiting"]} radius={[8,0,0,8]} />
            <Bar dataKey="Yet to Start" stackId="a" fill={statusColors["Yet to Start"]} radius={0} />
            <Bar dataKey="Hold" stackId="a" fill={statusColors["Hold"]} radius={0} />
            <Bar dataKey="Paused" stackId="a" fill={statusColors["Paused"]} radius={0} />
            <Bar dataKey="In Progress" stackId="a" fill={statusColors["In Progress"]} radius={0} />
            <Bar dataKey="Completed" stackId="a" fill={statusColors["Completed"]} radius={[0,8,8,0]} />
          </BarChart>
        </ResponsiveContainer>
        
        <div className="mt-2">
          <CustomLegend />
        </div>
      </div>
    </div>
  )
}