'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  TableMeta,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserStatus } from '@/types';
import { Plus } from 'lucide-react';
import CustomDialog from '../custom-dialog';
import UserForm from '../form/user-form';
import PermissionForm from '../form/permission-form';

interface DataTableMeta<TData extends object> {
  session: Session;
  dataField?: keyof TData;
}

interface DataTableProps<TData extends object, TValue> {
  session: Session;
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  type: 'user' | 'permission';
  filter: string;
}

const DataTable = <TData extends object, TValue>({
  data,
  columns,
  filter,
  type,
  session,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    meta: {
      session: session,
    } as TableMeta<TData> & DataTableMeta<TData>,
  });

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-4">
        <Input
          placeholder={`Filter ${filter}...`}
          value={(table.getColumn(filter)?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn(filter)?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
        <div className="flex items-center justify-center gap-4">
          {session.role !== 'USER' && type === 'permission' && (
            <Select
              value={
                (table.getColumn('status')?.getFilterValue() as string) ?? ''
              }
              onValueChange={(value) =>
                table
                  .getColumn('status')
                  ?.setFilterValue(value === 'ALL' ? undefined : value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                {[
                  'PENDING',
                  'APPROVED',
                  'REJECTED',
                  'REVISED',
                  'CANCELLED',
                ].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0) + status.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {session.role !== 'USER' && type === 'user' && (
            <Select
              value={
                (table.getColumn('status')?.getFilterValue() as UserStatus) ??
                'ALL'
              }
              onValueChange={(value) =>
                table
                  .getColumn('status')
                  ?.setFilterValue(value === 'ALL' ? undefined : value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter Verified" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          )}
          {type === 'user' && session.role === 'ADMIN' && (
            <>
              <Button
                variant="ghost"
                onClick={() => setOpenDialog(true)}
                className="cursor-pointer"
              >
                <Plus /> Create User
              </Button>
              <CustomDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                title="Create User"
                description="Fill in the form to create a new user"
                showCloseButton={true}
              >
                <UserForm
                  session={session}
                  onSave={() => setOpenDialog(false)}
                />
              </CustomDialog>
            </>
          )}
          {type === 'permission' && session.role === 'USER' && (
            <>
              <Button
                variant="ghost"
                onClick={() => setOpenDialog(true)}
                className="cursor-pointer"
              >
                <Plus /> Create Permission
              </Button>
              <CustomDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                title="Create Permission"
                description="Fill in the form to create a new permission"
                showCloseButton={true}
              >
                <PermissionForm
                  session={session}
                  onSave={() => setOpenDialog(false)}
                />
              </CustomDialog>
            </>
          )}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
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
    </div>
  );
};

export default DataTable;
