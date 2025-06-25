import { Suspense } from "react"
import { OrdersPageContent } from "@/features/orders/components/orders-page-content"
import { OrdersPageSkeleton } from "@/features/orders/components/orders-page-skeleton"

export default function OrdersPage() {
  return (
    <Suspense fallback={<OrdersPageSkeleton />}>
      <OrdersPageContent />
    </Suspense>
  )
}
