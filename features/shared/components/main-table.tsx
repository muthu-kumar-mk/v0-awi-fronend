"use client"

import type React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

export interface MainTableColumn<T> {
  key: keyof T | string
  header: string
  render?: (value: any, row: T) => React.ReactNode
  className?: string
  headerClassName?: string
  sortable?: boolean
}

interface MainTableProps<T> {
  data: T[]
  columns: MainTableColumn<T>[]
  className?: string
  onRowClick?: (row: T) => void
}

export function MainTable<T>({ data, columns, className, onRowClick }: MainTableProps<T>) {
  const getValue = (row: T, key: keyof T | string): any => {
    if (typeof key === "string" && key.includes(".")) {
      return key.split(".").reduce((obj: any, k) => obj?.[k], row)
    }
    return row[key as keyof T]
  }

  const handleRowClick = (row: T) => {
    if (onRowClick) {
      onRowClick(row)
    }
  }

  return (
    <div className={cn("flex-1 rounded-dashboard border border-dashboard-border bg-white overflow-hidden", className)}>
      <div className="h-full overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow className="h-12 border-b border-dashboard-border">
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={cn(
                    "h-12 px-4 text-left align-middle font-medium text-gray-600 bg-white",
                    column.headerClassName,
                  )}
                >
                  <div className="flex items-center gap-1">
                    {column.header}
                    {column.sortable && (
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={cn(
                  "h-12 border-b border-dashboard-border hover:bg-gray-50/50 transition-colors",
                  onRowClick ? "cursor-pointer" : "",
                )}
                onClick={() => handleRowClick(row)}
              >
                {columns.map((column, colIndex) => {
                  const value = getValue(row, column.key)
                  return (
                    <TableCell key={colIndex} className={cn("h-12 px-4 align-middle", column.className)}>
                      {column.render ? column.render(value, row) : value}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
