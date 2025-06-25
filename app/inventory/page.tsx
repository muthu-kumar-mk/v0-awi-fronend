import { Suspense } from "react"
import { InventoryPageContent } from "@/features/inventory/components/inventory-page-content"
import { InventoryPageSkeleton } from "@/features/inventory/components/inventory-page-skeleton"

export default function InventoryPage() {
  return (
    <Suspense fallback={<InventoryPageSkeleton />}>
      <InventoryPageContent />
    </Suspense>
  )
}
