"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface FilterSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function FilterSheet({ isOpen, onClose }: FilterSheetProps) {
  const [filters, setFilters] = useState({
    orderType: "",
    task: "",
    assignedTo: "",
    priority: "",
    status: "",
  })

  const handleReset = () => {
    setFilters({
      orderType: "",
      task: "",
      assignedTo: "",
      priority: "",
      status: "",
    })
  }

  const handleSave = () => {
    // Apply filters logic here
    console.log("Applying filters:", filters)
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80 flex flex-col p-0">
        {/* Fixed Header */}
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-4 border-b">
          <SheetTitle>Filter</SheetTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-6">
            {/* Order Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Order Type</label>
              <Select value={filters.orderType} onValueChange={(value) => setFilters({ ...filters, orderType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="b2b">B2B</SelectItem>
                  <SelectItem value="b2c">B2C</SelectItem>
                  <SelectItem value="b2b-returns">B2B Returns</SelectItem>
                  <SelectItem value="b2c-returns">B2C Returns</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Task */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Task</label>
              <Select value={filters.task} onValueChange={(value) => setFilters({ ...filters, task: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="picking">Picking</SelectItem>
                  <SelectItem value="packing">Packing</SelectItem>
                  <SelectItem value="loading">Loading</SelectItem>
                  <SelectItem value="unloading">Unloading</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Assigned To */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Assigned To</label>
              <Select
                value={filters.assignedTo}
                onValueChange={(value) => setFilters({ ...filters, assignedTo: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-doe">John Doe</SelectItem>
                  <SelectItem value="jane-smith">Jane Smith</SelectItem>
                  <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select value={filters.priority} onValueChange={(value) => setFilters({ ...filters, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="initialized">Initialized</SelectItem>
                  <SelectItem value="ready-to-process">Ready to Process</SelectItem>
                  <SelectItem value="unloading">Unloading</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Add more space at bottom for scrolling */}
            <div className="h-20" />
          </div>
        </div>

        {/* Fixed Action Buttons */}
        <div className="border-t p-6 bg-white">
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleReset} className="flex-1">
              Reset
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white">
              Save
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
