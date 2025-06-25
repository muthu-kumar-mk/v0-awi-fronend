import { Suspense } from "react"
import { InventoryDetailsPageContent } from "@/features/inventory/components/inventory-details-page-content"
import { InventoryDetailsPageSkeleton } from "@/features/inventory/components/inventory-details-page-skeleton"

interface InventoryDetailsPageProps {
  params: {
    sku: string
  }
}

export default function InventoryDetailsPage({ params }: InventoryDetailsPageProps) {
  return (
    <Suspense fallback={<InventoryDetailsPageSkeleton />}>
      <InventoryDetailsPageContent sku={params.sku} />
    </Suspense>
  )
}
