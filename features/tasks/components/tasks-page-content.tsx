"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Info, Search, Filter, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Sidebar } from "@/components/layout/sidebar"
import { PageHeader } from "@/features/shared/components/page-header"
import { MainTable, type MainTableColumn } from "@/features/shared/components/main-table"
import { TasksColumnCustomizationSheet } from "./tasks-column-customization-sheet"
import { TasksFilterSheet } from "./tasks-filter-sheet"
import { getFilteredTasks } from "../mocks/tasks-data"
import type { Task, TaskFilters } from "../types"

export function TasksPageContent() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filters, setFilters] = useState<TaskFilters>({
    search: "",
    assignmentFilter: "all",
    includeClosed: false,
    status: "all",
    priority: "all",
    orderType: "all",
  })
  const [columnSheetOpen, setColumnSheetOpen] = useState(false)
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)

  const filteredTasks = getFilteredTasks(filters)

  const columns: MainTableColumn<Task>[] = [
    {
      key: "transactionId",
      header: "Transaction ID",
      render: (value: string) => <span className="font-medium text-gray-900">{value}</span>,
      sortable: true,
    },
    {
      key: "orderType",
      header: "Order Type",
      render: (value: string) => <span className="text-gray-900">{value}</span>,
      sortable: true,
    },
    {
      key: "task",
      header: "Task",
      render: (value: string) => <span className="text-gray-900">{value}</span>,
      sortable: true,
    },
    {
      key: "assignedTo",
      header: "Assigned To",
      render: (value: string | null) =>
        value ? (
          <span className="text-gray-900">{value}</span>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-4 bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300 rounded-md"
            onClick={(e) => {
              e.stopPropagation()
              // Handle assign action
            }}
          >
            Assign
          </Button>
        ),
      sortable: true,
    },
    {
      key: "priority",
      header: "Priority",
      render: (value: string) => <span className="text-gray-900">{value}</span>,
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => {
        const getStatusStyle = (status: string) => {
          switch (status) {
            case "In Progress":
              return "bg-orange-100 text-orange-800 border-orange-200"
            case "Waiting":
              return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "Paused":
              return "bg-purple-100 text-purple-800 border-purple-200"
            case "Yet to Start":
              return "bg-cyan-100 text-cyan-800 border-cyan-200"
            case "Completed":
              return "bg-green-100 text-green-800 border-green-200"
            case "On Hold":
              return "bg-gray-100 text-gray-800 border-gray-200"
            default:
              return "bg-gray-100 text-gray-800 border-gray-200"
          }
        }
        return (
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(value)}`}>{value}</span>
        )
      },
      sortable: true,
    },
  ]

  const handleRowClick = (task: Task) => {
    router.push(`/tasks/${task.id}/execute?type=${task.taskType}`)
  }

  const handleMenuClick = () => {
    setSidebarOpen(true)
  }

  return (
    <div className="bg-dashboard-background min-h-screen flex flex-col">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 px-4">
        <div className="max-w-dashboard mx-auto w-full space-y-dashboard-gap">
          {/* Page Header Section */}
          <PageHeader
            title="Task Management"
            breadcrumbItems={[
              { label: "Home", href: "/" },
              { label: "Task", href: "/tasks" },
            ]}
            onMenuClick={handleMenuClick}
            actions={
              <div className="flex items-center gap-3">
                <Button variant="outline" className="text-black  bg-[#D6D3D1] border-gray-300 px-4 py-2">
                  Misc. Task
                </Button>
                <Button className="bg-[#FBBF24] text-black px-4 py-2 rounded-md">
                  + Perform B2C Task
                </Button>
              </div>
            }
          />

          {/* Controls Section */}
          <div className="flex items-center justify-between">
            {/* Left side - Tab filters and checkbox */}
            <div className="flex items-center gap-6">
              {/* Tab Filters */}
              <div className="flex items-center h-9 bg-[#F5F5F4] rounded rounded-md border border-[#D6D3D1]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilters((prev) => ({ ...prev, assignmentFilter: "all" }))}
                  className={`h-8 px-4 rounded-md text-sm font-medium ${
                    filters.assignmentFilter === "all"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilters((prev) => ({ ...prev, assignmentFilter: "assigned-to-me" }))}
                  className={`h-8 px-4 rounded-md text-sm font-medium ${
                    filters.assignmentFilter === "assigned-to-me"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Assigned to me
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilters((prev) => ({ ...prev, assignmentFilter: "unassigned" }))}
                  className={`h-8 px-4 rounded-md text-sm font-medium ${
                    filters.assignmentFilter === "unassigned"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Unassigned
                </Button>
              </div>

              
             
            </div>

            {/* Right side - Search and Filter buttons */}
            <div className="flex items-center gap-3">
            {/* Include Closed Tasks Checkbox */}
             <div className="flex items-center gap-2">
                <Checkbox
                  id="include-closed"
                  checked={filters.includeClosed}
                  onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, includeClosed: checked as boolean }))}
                />
                <label htmlFor="include-closed" className="text-sm text-gray-700 flex items-center gap-1">
                  Include Closed Tasks
                  <Info className="h-4 w-4 text-gray-400" />
                </label>
              </div>
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search"
                  value={filters.search}
                  onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                  className="pl-10 w-64 h-9"
                />
              </div>

              {/* Column Customization Button */}
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-gray-300 hover:bg-gray-50"
                onClick={() => setColumnSheetOpen(true)}
              >
                <Settings2 className="h-4 w-4 text-gray-600" />
              </Button>

              {/* Filter Button */}
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-gray-300 hover:bg-gray-50"
                onClick={() => setFilterSheetOpen(true)}
              >
                <Filter className="h-4 w-4 text-gray-600" />
              </Button>
            </div>
          </div>

          {/* Table Section */}
          <div className="flex-1 min-h-0">
            <MainTable data={filteredTasks} columns={columns} onRowClick={handleRowClick} />
          </div>
        </div>
      </div>

      {/* Sheets */}
      <TasksColumnCustomizationSheet
        open={columnSheetOpen}
        onOpenChange={setColumnSheetOpen}
        columns={columns}
        onColumnsChange={() => {}}
      />

      <TasksFilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  )
}
