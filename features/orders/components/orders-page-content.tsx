"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { PageHeader } from "@/features/shared/components/page-header"
import { OrdersFilter } from "./orders-filter"
import { MainTable, type MainTableColumn } from "@/features/shared/components/main-table"
import { useGetOrderListQuery } from "@/lib/redux/api/orderManagement"
import { isEmpty } from 'lodash';

export const filterToPayload = (filter: any, tabId: string) => {
  const payload = { ...filter };
  Object.entries(payload)?.forEach(([key, value]: [string, any]) => {
    if (Array.isArray(value)) payload[key] = value.map((v) => v?.id);
    else if (value?.id !== undefined) payload[key] = value?.id;
  });
  payload.orderListingFilterType = payload.fromDate && payload.orderListingFilterType;
  payload.orderListingFilterTypeOption = payload.fromDate && payload.orderListingFilterTypeOption;
  
  // Convert tab to moveType
  if (tabId === 'inbound') {
    payload.moveType = 'Inbound';
  } else if (tabId === 'outbound') {
    payload.moveType = 'Outbound';
  } else {
    payload.moveType = '';
  }
  
  return payload;
};

export const inPast = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + 1 - n);
  return d;
};

export const dateFrom = inPast(240);
dateFrom.setHours(0, 0, 0, 0);

export const dateCurrent = new Date();
dateCurrent.setHours(23, 59, 59, 999);

export const defaultOrderFilter = {
  pageIndex: 1,
  pageSize: 20, // Reduced page size for better performance
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
  orderId: string
  transactionId: string
  customer: string
  orderType: string
  referenceId: string
  channel?: string
  appointmentDate: string
  status: string
  moveType: string
  serviceType: string
  location: string
  trackingNo?: string
  createdOn: string
}

const breadcrumbItems = [{ label: "Home", href: "/dashboard" }, { label: "Order Management" }]

export function OrdersPageContent() {
  const { push } = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2025, 0, 23), // January 23, 2025
    to: new Date(2025, 3, 22), // April 22, 2025
  })
  const [hasNextPage, setHasNextPage] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])

  // Initialize from localStorage if available
  const storedFilter = typeof window !== 'undefined' ? localStorage.getItem('orderListFilter') : null;
  const parsedFilter = storedFilter && JSON.parse(storedFilter);
  const storedCurrentTab: any = typeof window !== 'undefined' ? localStorage.getItem('orderCurrentTab') : null;
  
  const [currentTab, setCurrentTab] = useState<string>(
    !isEmpty(storedCurrentTab) ? storedCurrentTab : 'all'
  );
  
  const [filter, setFilter] = useState<any>(
    !isEmpty(parsedFilter)
      ? { ...parsedFilter, sortColumn: '', sortDirection: '', searchKey: '' }
      : { ...defaultOrderFilter, searchKey: '' }
  );
  
  const [searchTrigger, setSearchTrigger] = useState(0);
  
  // Update filter when tab changes
  useEffect(() => {
    if (activeTab !== currentTab) {
      setCurrentTab(activeTab);
      if (typeof window !== 'undefined') {
        localStorage.setItem('orderCurrentTab', activeTab);
      }
      
      setFilter(prev => ({
        ...prev,
        pageIndex: 1 // Reset to first page on tab change
      }));
      setSearchTrigger(prev => prev + 1);
    }
  }, [activeTab, currentTab]);

  // Update filter when search changes
  useEffect(() => {
    if (searchQuery !== filter.searchKey) {
      setFilter(prev => ({
        ...prev,
        searchKey: searchQuery,
        pageIndex: 1 // Reset to first page on search
      }));
      setSearchTrigger(prev => prev + 1);
    }
  }, [searchQuery, filter.searchKey]);

  // Update filter when date range changes
  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);
      
      const toDate = new Date(dateRange.to);
      toDate.setHours(23, 59, 59, 999);
      
      setFilter(prev => ({
        ...prev,
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
        pageIndex: 1 // Reset to first page on date change
      }));
      setSearchTrigger(prev => prev + 1);
    }
  }, [dateRange]);

  // Create the API payload
  const apiPayload = useCallback(() => {
    return filterToPayload(filter, currentTab);
  }, [filter, currentTab]);

  const {
    data: ordersData,
    isFetching,
    refetch,
  } = useGetOrderListQuery(apiPayload(), {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  // Process API response and update orders state
  useEffect(() => {
    if (ordersData?.items) {
      const { items, totalCount } = ordersData;
      
      // Map API response to our Order interface
      const mappedOrders = items.map((item: any) => ({
        transactionId: item.transactionId,
        customer: item.customer,
        orderType: item.orderType,
        referenceId: item.referenceId,
        channel: item.orderCreationTypeId || 'Manual',
        appointmentDate: item.appointmentDate ? new Date(item.appointmentDate).toLocaleDateString() : '-',
        status: item.status,
      }));
      
      // If it's the first page, replace orders; otherwise append
      if (filter.pageIndex === 1) {
        setOrders(mappedOrders);
      } else {
        setOrders(prev => [...prev, ...mappedOrders]);
      }
      
      // Check if there are more pages to load
      const hasMore = items.length > 0 && (filter.pageIndex * filter.pageSize) < totalCount;
      setHasNextPage(hasMore);
    }
  }, [ordersData, filter.pageIndex, filter.pageSize]);

  // Function to load more data
  const fetchNextPage = async () => {
    if (isLoadingMore || !hasNextPage) return;
    
    setIsLoadingMore(true);
    
    try {
      const nextPage = filter.pageIndex + 1;
      setFilter(prev => ({
        ...prev,
        pageIndex: nextPage
      }));
      
      // Trigger refetch with new page
      await refetch();
    } finally {
      setIsLoadingMore(false);
    }
  };

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
            value.includes("B2B") || value.includes("B2C") ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
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
            case "Pending Carrier Details":
              return "bg-amber-100 text-amber-800 border-amber-200"
            case "Packing":
              return "bg-cyan-100 text-cyan-800 border-cyan-200"
            case "Picking":
              return "bg-teal-100 text-teal-800 border-teal-200"
            case "Ready to Ship":
              return "bg-emerald-100 text-emerald-800 border-emerald-200"
            case "Loading":
              return "bg-lime-100 text-lime-800 border-lime-200"
            case "Print Shipping Document":
              return "bg-sky-100 text-sky-800 border-sky-200"
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

  // Save filter to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('orderListFilter', JSON.stringify(filter));
    }
  }, [filter]);

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
              data={orders}
              columns={columns}
              onRowClick={handleRowClick}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isLoadingMore}
              isLoading={isFetching && filter.pageIndex === 1}
              emptyMessage={isFetching ? "Loading orders..." : "No orders found matching your criteria"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}