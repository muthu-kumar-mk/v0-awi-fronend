"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InventoryTable } from "./inventory-table"
import { Sidebar } from "@/components/layout/sidebar"
import { PageHeader } from "@/features/shared/components/page-header"
import { InventoryEmptyState } from "./inventory-empty-state"
import { InventoryColumnCustomizationSheet } from "./inventory-column-customization-sheet"
import { InventoryFilterSheet } from "./inventory-filter-sheet"
import { mockInventoryData, calculateTotals } from "../mocks/inventory-data"
import type { InventoryFilters } from "../types"

const breadcrumbItems = [{ label: "Home", href: "/dashboard" }, { label: "Real Time Inventory" }]

export function InventoryPageContent() {
  const [filters, setFilters] = useState<InventoryFilters>({
    customer: "",
    search: "",
  })
  const [columnSheetOpen, setColumnSheetOpen] = useState(false)
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filteredData = mockInventoryData.filter((item) => {
    if (filters.search) {
      return item.sku.toLowerCase().includes(filters.search.toLowerCase())
    }
    return true
  })

  const totals = calculateTotals(filteredData)
  const showTable = filters.customer !== "" && filters.customer !== "default"

  const handleFiltersChange = (newFilters: any) => {
    // Apply additional filters from filter sheet
    console.log("Applying filters:", newFilters)
  }

  return (
    <div className="bg-dashboard-background px-4">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Page Header Section */}
      <PageHeader
        title="Real Time Inventory"
        breadcrumbItems={breadcrumbItems}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        action={
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search SKU"
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                className="pl-10 w-64"
              />
            </div>
          </div>
        }
      />

      {/* Filters Section */}
      <div className="mb-dashboard-gap">
        <div className="flex items-center space-x-4">
          <Select
            value={filters.customer}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, customer: value }))}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Select Customer</SelectItem>
              <SelectItem value="white-oak">White Oak</SelectItem>
              <SelectItem value="customer-2">Customer 2</SelectItem>
              <SelectItem value="customer-3">Customer 3</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="h-9 w-9 rounded" onClick={() => setColumnSheetOpen(true)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.5928 1.56665V14.4329H14.2061V1.56665H14.5928ZM10.3262 1.56665V14.4329H9.93945V1.56665H10.3262ZM6.05957 1.56665V14.4329H5.67285V1.56665H6.05957ZM1.79297 1.56665V14.4329H1.40625V1.56665H1.79297Z"
                fill="#0C0A09"
                stroke="#0C0A09"
              />
            </svg>
          </Button>

          <Button variant="outline" size="icon" className="h-9 w-9 rounded" onClick={() => setFilterSheetOpen(true)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.728923 1.71946C0.838161 1.48401 1.07412 1.33337 1.33367 1.33337H14.667C14.9266 1.33337 15.1625 1.48401 15.2717 1.71946C15.381 1.9549 15.3436 2.23234 15.176 2.43052L10.0003 8.55081V14C10.0003 14.2311 9.8807 14.4457 9.68415 14.5671C9.48761 14.6886 9.24218 14.6997 9.03553 14.5963L6.36886 13.263C6.143 13.1501 6.00033 12.9192 6.00033 12.6667V8.55081L0.824621 2.43052C0.657023 2.23234 0.619684 1.9549 0.728923 1.71946ZM2.77054 2.66671L7.17605 7.87622C7.27782 7.99657 7.33367 8.14909 7.33367 8.30671V12.2547L8.667 12.9214V8.30671C8.667 8.14909 8.72284 7.99657 8.82462 7.87622L13.2301 2.66671H2.77054Z"
                fill="#0C0A09"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="border border-dashboard-border bg-white rounded-dashboard">
        {showTable ? (
          <InventoryTable data={filteredData} totals={totals} showCustomerColumns={false} />
        ) : (
          <InventoryEmptyState />
        )}
      </div>

      {/* Sheets */}
      <InventoryColumnCustomizationSheet open={columnSheetOpen} onOpenChange={setColumnSheetOpen} />

      <InventoryFilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        onFiltersChange={handleFiltersChange}
      />
    </div>
  )
}
