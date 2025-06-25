export interface OrderStatus {
  title: string
  value: string | number
  variant: "purple" | "pink" | "blue" | "orange" | "green"
}

export interface Task {
  employee: string
  transactionId: string
  task: string
  timeElapsed: string
}

export interface AttentionItem {
  transactionId: string
  orderType: string
  task: string
  assignedTo: string
  status: string
  issue: string
  details: string
}

export interface BreadcrumbItem {
  label: string
  href?: string
}
