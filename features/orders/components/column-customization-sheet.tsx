"use client"

import { useState } from "react"
import { X, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface ColumnCustomizationSheetProps {
  isOpen: boolean
  onClose: () => void
}

interface ColumnConfig {
  id: string
  label: string
  visible: boolean
}

interface SortableColumnItemProps {
  column: ColumnConfig
  onToggle: (columnId: string) => void
}

function SortableColumnItem({ column, onToggle }: SortableColumnItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: column.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between py-3 px-3 hover:bg-gray-50 rounded-md border border-transparent ${
        isDragging ? "bg-gray-50 border-gray-200 shadow-sm" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
        >
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
        <span className="text-sm font-medium">{column.label}</span>
      </div>
      <Switch checked={column.visible} onCheckedChange={() => onToggle(column.id)} />
    </div>
  )
}

export function ColumnCustomizationSheet({ isOpen, onClose }: ColumnCustomizationSheetProps) {
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { id: "warehouse", label: "Warehouse", visible: false },
    { id: "location", label: "Location", visible: true },
    { id: "locationType", label: "Location type", visible: false },
    { id: "sku", label: "SKU", visible: true },
    { id: "boxId", label: "Box ID", visible: true },
    { id: "palletId", label: "Pallet ID", visible: false },
    { id: "inboundQty", label: "Inbound Qty", visible: true },
    { id: "outboundQty", label: "Outbound Qty", visible: true },
    { id: "adjustmentQty", label: "Adjustment Qty", visible: true },
    { id: "onHandQty", label: "On Hand Qty", visible: true },
  ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setColumns((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleToggle = (columnId: string) => {
    setColumns(columns.map((col) => (col.id === columnId ? { ...col, visible: !col.visible } : col)))
  }

  const handleReset = () => {
    setColumns([
      { id: "warehouse", label: "Warehouse", visible: false },
      { id: "location", label: "Location", visible: true },
      { id: "locationType", label: "Location type", visible: false },
      { id: "sku", label: "SKU", visible: true },
      { id: "boxId", label: "Box ID", visible: true },
      { id: "palletId", label: "Pallet ID", visible: false },
      { id: "inboundQty", label: "Inbound Qty", visible: true },
      { id: "outboundQty", label: "Outbound Qty", visible: true },
      { id: "adjustmentQty", label: "Adjustment Qty", visible: true },
      { id: "onHandQty", label: "On Hand Qty", visible: true },
    ])
  }

  const handleSave = () => {
    // Apply column configuration logic here
    console.log("Applying column configuration:", columns)
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80 flex flex-col p-0">
        {/* Fixed Header */}
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-4 border-b">
          <SheetTitle>Columns</SheetTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={columns.map((col) => col.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-1">
                {columns.map((column) => (
                  <SortableColumnItem key={column.id} column={column} onToggle={handleToggle} />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {/* Add more space at bottom for scrolling */}
          <div className="h-20" />
        </div>

        {/* Fixed Action Buttons */}
        <div className="border-t p-6 bg-white">
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleReset} className="flex-1">
              Reset
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white">
              Save
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
