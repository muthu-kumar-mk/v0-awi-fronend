import { Skeleton } from "@/components/ui/skeleton"

export function InventoryPageSkeleton() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32 mt-2" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <div className="ml-auto">
          <Skeleton className="h-10 w-64" />
        </div>
      </div>

      <div className="rounded-md border">
        <div className="p-4">
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
