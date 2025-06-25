import { Skeleton } from "@/components/ui/skeleton"

export function InventoryDetailsPageSkeleton() {
  return (
    <div className="bg-dashboard-background px-4">
      {/* Page Header Skeleton */}
      <div className="h-header mb-dashboard-gap">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-8 w-48" />
          </div>
        </div>
      </div>

      {/* Customer Details Card Skeleton */}
      <div className="mb-dashboard-gap">
        <div className="border border-dashboard-border bg-white rounded-dashboard p-6" style={{ height: "128px" }}>
          <div className="grid grid-cols-4 gap-6 h-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Table Skeleton */}
      <div className="border border-dashboard-border bg-white rounded-dashboard">
        <div className="p-6">
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-8 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>

            {/* Table Rows */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="grid grid-cols-8 gap-4">
                {Array.from({ length: 8 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-full" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
