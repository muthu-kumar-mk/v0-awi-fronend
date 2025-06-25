import { Suspense } from "react"
import { TaskExecutionPageContent } from "@/features/tasks/components/task-execution-page-content"
import { TaskExecutionPageSkeleton } from "@/features/tasks/components/task-execution-page-skeleton"

interface TaskExecutionPageProps {
  params: { id: string }
  searchParams: { type?: string }
}

export default function TaskExecutionPage({ params, searchParams }: TaskExecutionPageProps) {
  return (
    <Suspense fallback={<></>}>
      <TaskExecutionPageContent taskId={params.id} taskType={searchParams.type} />
    </Suspense>
  )
}
