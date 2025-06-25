"use client"

import { Card, CardContent } from "@/components/ui/card"
import { orderLogs, taskLogs } from "../mocks/log-data"
import type { LogEntry } from "../types"

interface LogTimelineProps {
  logs: LogEntry[]
  title: string
}

function LogTimeline({ logs, title }: LogTimelineProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-4">
        {logs.map((log, index) => (
          <div key={log.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-gray-400 rounded-full flex-shrink-0 mt-1" />
              {index < logs.length - 1 && <div className="w-px h-12 bg-gray-200 mt-2" />}
            </div>
            <div className="flex-1 pb-4">
              <div className="font-medium text-gray-900">{log.action}</div>
              <div className="text-sm text-gray-500 mt-1">By {log.user}</div>
              <div className="text-sm text-gray-500">{log.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LogsContent() {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-2 gap-8 h-full">
          <div className="border-r border-gray-200 pr-8">
            <LogTimeline logs={orderLogs} title="Order Logs" />
          </div>
          <div className="pl-8">
            <LogTimeline logs={taskLogs} title="Task Logs" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
