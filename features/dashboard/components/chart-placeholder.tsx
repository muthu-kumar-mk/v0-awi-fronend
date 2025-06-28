"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskStatusChart } from "./task-status-chart"
import { TaskStatusSummaryChart } from "./task-status-summary-chart"

interface ChartPlaceholderProps {
  title: string
  description?: string
  className?: string
}

export function ChartPlaceholder({ title, description, className }: ChartPlaceholderProps) {
  const [activeTab, setActiveTab] = useState("outbound")
  
  // Render the appropriate chart based on the title
  const renderChart = () => {
    if (title === "Task Status") {
      return <TaskStatusChart />
    } else if (title === "Task Status Summary") {
      return <TaskStatusSummaryChart />
    } else {
      // Fallback to placeholder content
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-500">
            <div className="text-sm font-medium">{title}</div>
            {description && <div className="text-xs mt-1">{description}</div>}
          </div>
        </div>
      )
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between">
          {title}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="outbound">Outbound</TabsTrigger>
              <TabsTrigger value="inbound">Inbound</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {renderChart()}
      </CardContent>
    </Card>
  )
}