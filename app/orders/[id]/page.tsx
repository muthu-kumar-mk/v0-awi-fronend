import { Suspense } from "react"
import { OrderDetailsPageContent } from "@/features/orders/components/order-details-page-content"
import { OrderDetailsPageSkeleton } from "@/features/orders/components/order-details-page-skeleton"

interface OrderDetailsPageProps {
  params: {
    id: string
  }
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  return (
    <Suspense fallback={<OrderDetailsPageSkeleton />}>
      <OrderDetailsPageContent orderId={params.id} />
    </Suspense>
  )
}
