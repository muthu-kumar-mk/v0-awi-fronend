"use client"

import { useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { PageHeader } from "@/features/shared/components/page-header"
import { OrdersFilter } from "./orders-filter"
import { TanStackTable } from "@/features/shared/components/tanstack-table"
import { ordersColumns, allOrdersData, inboundOrdersData, outboundOrdersData } from "../mocks/orders-data"
import { useGetOrderListQuery } from "@/lib/redux/api/orderManagement"
import { isEmpty } from 'lodash';
import { MainTable, type MainTableColumn } from "@/features/shared/components/main-table"


export const filterToPayload = (filter: any, tabId: string) => {
  const payload = { ...filter };
  Object.entries(payload)?.forEach(([key, value]: [string, any]) => {
    if (Array.isArray(value)) payload[key] = value.map((v) => v?.id);
    else if (value?.id !== undefined) payload[key] = value?.id;
  });
  payload.orderListingFilterType = payload.fromDate && payload.orderListingFilterType;
  payload.orderListingFilterTypeOption = payload.fromDate && payload.orderListingFilterTypeOption;
  payload.moveType = tabId === 'All' ? payload?.moveType : tabId;
  return payload;
};


export const inPast = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + 1 - n);
  return d;
};

export const dateFrom = inPast(90);
dateFrom.setHours(0, 0, 0, 0);

export const dateCurrent = new Date();
dateCurrent.setHours(23, 59, 59, 999);

export const defaultOrderFilter = {
  pageIndex: 1,
  pageSize: 50,
  searchKey: '',
  sortColumn: '',
  sortDirection: '',
  //
  orderListingFilterType: 'RequestCreated',
  orderListingFilterTypeOption: 'Custom',
  fromDate: dateFrom.toISOString(),
  toDate: dateCurrent.toISOString(),
  transactionId: '',
  serviceTypeId: '',
  moveType: '',
  orderTypes: [],
  customerId: '',
  locationId: '',
  referenceId: '',
  statuses: [],
  sku: '',
  taskId: '',
  trackingNumber: '',
  transportationArrangementId: '',
  recipientName: '',
  recipientCompany: '',
  recipientAddress1: '',
  recipientAddress2: '',
  recipientCity: '',
  recipientState: '',
  recipientCountry: '',
  recipientZipCode: '',
  shipperName: '',
  shipperCompany: '',
  shipperAddress1: '',
  shipperAddress2: '',
  shipperCity: '',
  shipperState: '',
  shipperCountry: '',
  shipperZipCode: '',
  appointmentDate: '',
  createdOn: '',
  transportationMethodId: '',
  loadTypeId: '',
  cargoTypeId: '',
  trailerTypeId: '',
  trailerNumber: '',
  createdByName: '',
  channel: '',
  tags: '',
};


export interface Order {
  transactionId: string
  customer: string
  orderType: string
  referenceId: string
  channel: string
  appointmentDate: string
  status: string
}

const breadcrumbItems = [{ label: "Home", href: "/dashboard" }, { label: "Order Management" }]

export function OrdersPageContent() {
  const { push  } = useRouter();
  const { search }: any = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2025, 0, 23), // January 23, 2025
    to: new Date(2025, 3, 22), // April 22, 2025
  })

  const storedFilter = localStorage.getItem('orderListFilter');
  const parsedFilter = storedFilter && JSON.parse(storedFilter);
  const storedCurrentTab: any = localStorage.getItem('orderCurrentTab');
  const [currentTab, setCurrentTab] = useState<string>(
    !isEmpty(storedCurrentTab) ? storedCurrentTab : 'All'
  );
  const [filter, setFilter] = useState<any>(
    !isEmpty(parsedFilter)
      ? { ...parsedFilter, sortColumn: '', sortDirection: '', searchKey: search }
      : { ...defaultOrderFilter, searchKey: search }
  );
  const [searchTrigger, setSearchTrigger] = useState(0);
  const ApplyFilter = useCallback(
    () => filterToPayload(filter, currentTab),
    [searchTrigger, currentTab]
  );

  const {
    data: getOrders,
    isFetching,
    refetch,
  } = useGetOrderListQuery(ApplyFilter(), {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  console.log("getOrders", getOrders);
  console.log("isFetching", isFetching);
  
  const getTableData = (activeTab:string) => {
    switch (activeTab) {
      case "inbound":
        return inboundOrdersData
      case "outbound":
        return outboundOrdersData
      default:
        return getOrders
    }
  }

  const columns: MainTableColumn<Order>[] = [
    {
      key: "transactionId",
      header: "Transaction ID",
      render: (value: string) => <span className="font-medium text-blue-600">{value}</span>,
      sortable: true,
      minWidth: 140,
    },
    {
      key: "customer",
      header: "Customer",
      render: (value: string) => <span className="text-gray-900">{value}</span>,
      sortable: true,
      minWidth: 136,
    },
    {
      key: "orderType",
      header: "Order Type",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "B2B" || value === "B2C" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
          }`}
        >
          {value}
        </span>
      ),
      sortable: true,
      minWidth: 110,
    },
    {
      key: "referenceId",
      header: "Reference ID",
      render: (value: string) => <span className="text-gray-700">{value}</span>,
      sortable: true,
      minWidth: 136,
    },
    {
      key: "channel",
      header: "Channel",
      render: (value: string) => {
        const getChannelStyle = (channel: string) => {
          switch (channel) {
            case "EDI":
              return "bg-purple-100 text-purple-800"
            case "Shopify":
              return "bg-green-100 text-green-800"
            case "Manual":
              return "bg-orange-100 text-orange-800"
            default:
              return "bg-gray-100 text-gray-800"
          }
        }
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${getChannelStyle(value)}`}>{value}</span>
      },
      sortable: true,
      minWidth: 110,
    },
    {
      key: "appointmentDate",
      header: "Appointment Date",
      render: (value: string) => <span className="text-gray-700">{value}</span>,
      sortable: true,
      minWidth: 160,
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => {
        const getStatusStyle = (status: string) => {
          switch (status) {
            case "Initialized":
              return "bg-blue-100 text-blue-800 border-blue-200"
            case "Ready to Process":
              return "bg-purple-100 text-purple-800 border-purple-200"
            case "Unloading":
              return "bg-orange-100 text-orange-800 border-orange-200"
            case "Delivered":
              return "bg-green-100 text-green-800 border-green-200"
            case "Receiving":
              return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "Putaway":
              return "bg-indigo-100 text-indigo-800 border-indigo-200"
            case "Completed":
              return "bg-green-100 text-green-800 border-green-200"
            case "Closed":
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
      minWidth: 140,
    },
  ]

  const handleRowClick = (order: Order) => {
    push(`/order-details/${order.transactionId}`)
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
          <div className="flex-1">
            <MainTable
              data={getTableData(currentTab)}
              columns={columns}
              onRowClick={handleRowClick}
              hasNextPage={false} // Add infinite scroll later if needed
              emptyMessage="No orders found matching your criteria"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
