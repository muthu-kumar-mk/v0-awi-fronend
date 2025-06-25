"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface FilterState {
  customer: string
  warehouse: string
  location: string
  stockLevel: string
  palletId: string
}

interface InventoryFilterSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onFiltersChange: (filters: FilterState) => void
}

export function InventoryFilterSheet({ open, onOpenChange, onFiltersChange }: InventoryFilterSheetProps) {
  const [filters, setFilters] = useState<FilterState>({
    customer: "",
    warehouse: "",
    location: "",
    stockLevel: "",
    palletId: "",
  })

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
  }

  const handleReset = () => {
    const resetFilters = {
      customer: "",
      warehouse: "",
      location: "",
      stockLevel: "",
      palletId: "",
    }
    setFilters(resetFilters)
    onFiltersChange(resetFilters)
  }

  const handleApply = () => {
    onFiltersChange(filters)
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Filter Inventory</SheetTitle>
          <SheetDescription>Apply filters to narrow down your inventory view</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="customer-filter">Customer</Label>
              <Select value={filters.customer} onValueChange={(value) => handleFilterChange("customer", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="white-oak">White Oak</SelectItem>
                  <SelectItem value="blue-flag">Blue Flag</SelectItem>
                  <SelectItem value="customer-3">Customer 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="warehouse-filter">Warehouse</Label>
              <Select value={filters.warehouse} onValueChange={(value) => handleFilterChange("warehouse", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abicas">ABICAS</SelectItem>
                  <SelectItem value="abisec">ABISEC</SelectItem>
                  <SelectItem value="awi-la">AWI-LA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location-filter">Location</Label>
              <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-rack">IN RACK</SelectItem>
                  <SelectItem value="cas-b2c-shelf">CAS B2C SHELF</SelectItem>
                  <SelectItem value="sec-b2c-shelf">SEC B2C SHELF</SelectItem>
                  <SelectItem value="in-b2c-shelf">IN B2C SHELF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock-level-filter">Stock Level</Label>
              <Select value={filters.stockLevel} onValueChange={(value) => handleFilterChange("stockLevel", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stock level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Stock (&lt; 50)</SelectItem>
                  <SelectItem value="medium">Medium Stock (50-100)</SelectItem>
                  <SelectItem value="high">High Stock (&gt; 100)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pallet-id-filter">Pallet ID</Label>
              <Input
                id="pallet-id-filter"
                placeholder="Enter pallet ID"
                value={filters.palletId}
                onChange={(e) => handleFilterChange("palletId", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t bg-white">
          <Button variant="outline" onClick={handleReset}>
            Reset Filters
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply}>Apply Filters</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
