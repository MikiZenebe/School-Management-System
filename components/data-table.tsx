"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TableSearch from "@/components/TableSearch";
import { ArrowDownUp, Funnel } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableTitle: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  tableTitle,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <div className="text-xl font-semibold hidden md:block">
          {tableTitle}
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-2 self-end md:self-center">
            <Button className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300">
              <Funnel size={16} className="text-gray-500 hover:text-white" />
            </Button>
            <Button className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300">
              <ArrowDownUp
                size={16}
                className="text-gray-500 hover:text-white"
              />
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-md border">
        <Table className="min-w-[780px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isStickyColumn = Boolean(
                    (header.column.columnDef as { meta?: { sticky?: boolean } })
                      .meta?.sticky,
                  );

                  return (
                    <TableHead
                      key={header.id}
                      className={
                        isStickyColumn
                          ? "sticky right-0 z-10 bg-white shadow-[-1px_0_0_0_hsl(var(--border))]"
                          : ""
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/50 transition-colors duration-200 odd:bg-primary/5"
                >
                  {row.getVisibleCells().map((cell) => {
                    const isStickyColumn = Boolean(
                      (cell.column.columnDef as { meta?: { sticky?: boolean } })
                        .meta?.sticky,
                    );

                    return (
                      <TableCell
                        key={cell.id}
                        className={
                          isStickyColumn ? "sticky right-0 z-10 bg-white" : ""
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        {Array.from({ length: table.getPageCount() }, (_, index) => (
          <Button
            key={index}
            variant={
              index === table.getState().pagination.pageIndex
                ? "default"
                : "outline"
            }
            size="sm"
            onClick={() => table.setPageIndex(index)}
          >
            {index + 1}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
