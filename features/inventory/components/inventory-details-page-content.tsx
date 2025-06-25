"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { PageHeader } from "@/features/shared/components/page-header"
import { DataTable } from "@/features/shared/components/data-table"
import { CustomerDetailsCard } from "./customer-details-card"
import { mockInventoryDetails, mockTransactionHistory } from "../mocks/inventory-details-data"
import type { InventoryDetails, TransactionHistory, DataTableColumn } from "../types"

interface InventoryDetailsPageContentProps {
  sku: string
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Inventory Management", href: "/inventory" },
  { label: "Real Time Inventory", href: "/inventory" },
  { label: "White Oak", href: "/inventory" },
]

export function InventoryDetailsPageContent({ sku }: InventoryDetailsPageContentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [details, setDetails] = useState<InventoryDetails | null>(null)
  const [transactions, setTransactions] = useState<TransactionHistory[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      setIsLoading(true)

      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 50))

      const inventoryDetails = mockInventoryDetails[sku] || mockInventoryDetails["sku-yza2233"]
      const transactionHistory = mockTransactionHistory[sku] || mockTransactionHistory["sku-yza2233"]

      setDetails(inventoryDetails)
      setTransactions(transactionHistory)
      setIsLoading(false)
    }
    loadData()
   
  }, [sku])

  if (isLoading || !details) {
    return <div></div>
  }

  const columns: DataTableColumn<TransactionHistory>[] = [
    {
      key: "dateTime",
      header: "Date & Time",
      className: "font-medium",
    },
    {
      key: "type",
      header: "Type",
    },
    {
      key: "transactionId",
      header: "Transaction ID",
    },
    {
      key: "referenceId",
      header: "Reference ID",
    },
    {
      key: "location",
      header: "Location",
    },
    {
      key: "inbound",
      header: "Inbound",
      className: "text-right",
      headerClassName: "text-right",
    },
    {
      key: "outbound",
      header: "Outbound",
      className: "text-right",
      headerClassName: "text-right",
    },
    {
      key: "adjustment",
      header: "Adjustment",
      className: "text-right",
      headerClassName: "text-right",
    },
  ]

  return (
    <div className="bg-dashboard-background min-h-screen flex flex-col">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <div className="px-4">
          <div className="max-w-dashboard mx-auto w-full">
            {/* Page Header - 72px */}
            <div className="mb-dashboard-gap">
              <PageHeader
                title={`${details.sku} (${details.name})`}
                breadcrumbItems={[...breadcrumbItems, { label: details.sku }]}
                onMenuClick={() => setSidebarOpen(!sidebarOpen)}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-4">
          <div className="max-w-dashboard mx-auto w-full">
            {/* Customer Details Card */}
            <div className="mb-dashboard-gap">
              <CustomerDetailsCard details={details} />
            </div>

            {/* Transaction History Table */}
            <div className="border border-dashboard-border bg-white rounded-dashboard">
              <DataTable columns={columns} data={transactions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
