"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { PageHeader } from "@/features/shared/components/page-header"
import { OrdersFilter } from "./orders-filter"
import { TanStackTable } from "@/features/shared/components/tanstack-table"
import { ordersColumns, allOrdersData, inboundOrdersData, outboundOrdersData } from "../mocks/orders-data"

const breadcrumbItems = [{ label: "Home", href: "/dashboard" }, { label: "Order Management" }]

export function OrdersPageContent() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2025, 0, 23), // January 23, 2025
    to: new Date(2025, 3, 22), // April 22, 2025
  })

  const getTableData = () => {
    switch (activeTab) {
      case "inbound":
        return inboundOrdersData
      case "outbound":
        return outboundOrdersData
      default:
        return allOrdersData
    }
  }

  const handleRowClick = (orderId: string) => {
    router.push(`/order-details/${orderId}`)
  }

  return (
    <div className="bg-dashboard-background min-h-screen flex flex-col">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col px-4">
        <div className="flex flex-col h-full space-y-dashboard-gap">
          {/* Page Header - 72px - Full width */}
          <PageHeader
            title="Orders"
            breadcrumbItems={breadcrumbItems}
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          />

          {/* Filter Section - 928px width, responsive */}
          <div className="">
            <OrdersFilter
              activeTab={activeTab}
              onTabChange={setActiveTab}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>

          {/* Table Section - 928px width, responsive, remaining viewport */}
          <div className="flex-1 min-h-0 w-full mx-auto">
            <TanStackTable data={getTableData()} columns={ordersColumns} onRowClick={handleRowClick} />
          </div>
        </div>
      </div>
    </div>
  )
}
