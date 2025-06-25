"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronRight } from "lucide-react"
import { warehouseItems } from "../mocks/warehouse-data"
import type { WarehouseItem } from "../types"

interface WarehouseRowProps {
  item: WarehouseItem
  isExpanded: boolean
  onToggle: () => void
}

function WarehouseRow({ item, isExpanded, onToggle }: WarehouseRowProps) {
  return (
    <>
      <TableRow className="hover:bg-gray-50">
        <TableCell className="w-12">
          <Button variant="ghost" size="sm" onClick={onToggle} className="p-0 h-auto">
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </TableCell>
        <TableCell className="font-medium">{item.sku}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.primaryUPC}</TableCell>
        <TableCell>{item.lotNumber}</TableCell>
        <TableCell>{item.expirationDate}</TableCell>
        <TableCell className="text-center">{item.orderQty}</TableCell>
        <TableCell className="text-center">{item.actualQty}</TableCell>
      </TableRow>
      {isExpanded && item.details && (
        <TableRow className="bg-gray-50 hover:bg-gray-50">
          <TableCell colSpan={8} className="p-0">
            <div className="bg-white rounded-lg border m-4 p-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Pallet ID</div>
                  <div className="font-medium">{item.details.palletId}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Cartons / Boxes on Pallet</div>
                  <div className="font-medium">{item.details.cartonsOnPallet}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Pallet</div>
                  <div className="font-medium">{item.details.pallet}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Location</div>
                  <div className="font-medium">{item.details.location}</div>
                </div>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

export function WarehouseAction() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const toggleRow = (itemId: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedRows(newExpanded)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-4">
        <CardTitle>Warehouse Action</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-4">
        <div className="h-full overflow-auto border rounded">
          <Table>
            <TableHeader className="sticky top-0 bg-white">
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Primary UPC</TableHead>
                <TableHead>Lot #</TableHead>
                <TableHead>Expiration Date</TableHead>
                <TableHead className="text-center">Order Qty</TableHead>
                <TableHead className="text-center">Actual Qty</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warehouseItems.map((item) => (
                <WarehouseRow
                  key={item.id}
                  item={item}
                  isExpanded={expandedRows.has(item.id)}
                  onToggle={() => toggleRow(item.id)}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
