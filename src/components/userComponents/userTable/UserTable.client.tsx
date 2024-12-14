'use client';

import { getUsers } from '@/app/action/userActions/getUsers';
import { UserFilterForm } from '@/components/forms/UserFilterForm';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User } from '@prisma/client';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useEffect } from 'react';
import { UserActionsCell } from './cells/UserActionsCell.client';
import { UserProfileImageCell } from './cells/UserProfileImageCell.client';

export const columns: ColumnDef<User>[] = [
  {
    header: 'Avatar',
    accessorKey: 'id',
    id: 'avatar',
    cell: UserProfileImageCell,
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Phone',
    accessorKey: 'phone',
  },
  {
    header: 'Actions',
    accessorKey: 'id',
    cell: UserActionsCell,
  },
];

export function UsersTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const [totalRecords, setTotalRecords] = React.useState<number>();
  const [data, setData] = React.useState<User[]>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch data from the server
  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const result = await getUsers(
          pageIndex + 1,
          pageSize,
          globalFilter || '',
        );

        setData(result.users);
        setTotalRecords(result.total);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [pageIndex, pageSize, globalFilter]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(), // Correct usage
    getPaginationRowModel: getPaginationRowModel(), // Correct usage
    getSortedRowModel: getSortedRowModel(), // Correct usage
    getFilteredRowModel: getFilteredRowModel(), // Correct usage
    meta: {
      removeRow: (rowIndex) => {
        const setFilterFunc = (old: User[]) =>
          old.filter((_row: User, index: number) => index !== rowIndex);

        setData(setFilterFunc);
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <UserFilterForm
          disabled={isLoading}
          onSubmitForm={(d) => {
            setGlobalFilter(d.name || '');
          }}
        />
      </div>
      <div className="rounded-md border dark:border-slate-700">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  {isLoading ? <Spinner /> : 'No users to show.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap items-center gap-4 py-4">
        <div className="text-sm text-gray-400">
          <span>Total: {totalRecords ?? '-'}</span>&nbsp;|&nbsp;
          <span>
            Page {pageIndex + 1} / {Math.ceil((totalRecords || 0) / pageSize)}
          </span>
        </div>
        <div className="ml-auto space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
            disabled={isLoading || pageIndex === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPageIndex((old) =>
                old < Math.ceil((totalRecords || 0) / pageSize) - 1
                  ? old + 1
                  : old,
              )
            }
            disabled={
              isLoading ||
              pageIndex >= Math.ceil((totalRecords || 0) / pageSize) - 1
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
