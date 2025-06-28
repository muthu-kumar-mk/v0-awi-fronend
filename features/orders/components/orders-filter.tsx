"use client"

import { useState } from "react"
import { Search, Filter, Settings2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { FilterSheet } from "./filter-sheet"
import { ColumnCustomizationSheet } from "./column-customization-sheet"

interface OrdersFilterProps {
  activeTab: string
  onTabChange: (tab: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  dateRange: { from: Date | undefined; to: Date | undefined }
  onDateRangeChange: (range: { from: Date | undefined; to: Date | undefined }) => void
}

export function OrdersFilter({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
}: OrdersFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isColumnCustomizationOpen, setIsColumnCustomizationOpen] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  return (
    <>
      <div className="h-9 flex items-center justify-between gap-4 w-full">
        {/* Left side - Tabs */}
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className="h-9 bg-[#F5F5F4] border border-[#D6D3D1]">
            <TabsTrigger value="all" className="h-7 ">
              All
            </TabsTrigger>
            <TabsTrigger value="inbound" className="h-7">
              Inbound
            </TabsTrigger>
            <TabsTrigger value="outbound" className="h-7">
              Outbound
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Right side - Search, Date, Actions - Responsive */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Search Box - Responsive width */}
          <div className="relative w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-[250px] h-9 pl-9 pr-4"
            />
          </div>

          {/* Date Picker - Responsive width */}
          <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-9 justify-start text-left font-normal w-[250px]",
                  !dateRange?.from && "text-muted-foreground",
                )}
              >
                <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="truncate">
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        <span className="hidden orders-md:inline">
                          {format(dateRange.from, "M/d/yyyy")} - {format(dateRange.to, "M/d/yyyy")}
                        </span>
                        <span className="orders-md:hidden">
                          {format(dateRange.from, "M/d")} - {format(dateRange.to, "M/d")}
                        </span>
                      </>
                    ) : (
                      format(dateRange.from, "M/d/yyyy")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={(range) => {
                  onDateRangeChange({
                    from: range?.from,
                    to: range?.to,
                  })
                  if (range?.from && range?.to) {
                    setIsDatePickerOpen(false)
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          {/* Filter Icon - 36px */}
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 p-0 flex-shrink-0"
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter className="h-4 w-4" />
          </Button>

          {/* Column Customization Icon - 36px */}
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 p-0 flex-shrink-0"
            onClick={() => setIsColumnCustomizationOpen(true)}
          >
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filter Sheet */}
      <FilterSheet isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

      {/* Column Customization Sheet */}
      <ColumnCustomizationSheet
        isOpen={isColumnCustomizationOpen}
        onClose={() => setIsColumnCustomizationOpen(false)}
      />
    </>
  )
}