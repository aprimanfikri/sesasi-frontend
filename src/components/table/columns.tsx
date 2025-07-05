'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'isVerified',
    header: 'Status',
    filterFn: (row, columnId, filterValue) => {
      if (filterValue === undefined) return true;
      const value = row.getValue(columnId);
      return String(value) === filterValue;
    },
    cell: ({ row }) => {
      const { isVerified } = row.original;

      if (isVerified) {
        return <Badge className="bg-green-500 text-green-50">Verified</Badge>;
      }

      return (
        <Badge className="bg-yellow-500 text-yellow-50">Not Verified</Badge>
      );
    },
  },
  {
    accessorKey: 'createdPermissions',
    header: 'Permissions',
    cell: ({ row }) => {
      const permissions = row.original.createdPermissions ?? [];

      return <div>{permissions.length}</div>;
    },
  },
];

export const permissionColumns: ColumnDef<Permission>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) => {
      const user = row.original.user;
      console.log(user);
      return <div>{user?.name || '-'}</div>;
    },
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return <div>{format(createdAt, 'MMMM dd, yyyy')}</div>;
    },
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => {
      const endDate = row.original.endDate;
      return <div>{format(endDate, 'MMMM dd, yyyy')}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const { status } = row.original;

      switch (status) {
        case 'APPROVED':
          return <Badge className="bg-green-500 text-green-50">Approved</Badge>;
        case 'REJECTED':
          return <Badge className="bg-red-500 text-red-50">Rejected</Badge>;
        case 'PENDING':
          return (
            <Badge className="bg-yellow-500 text-yellow-50">Pending</Badge>
          );
        case 'REVISED':
          return <Badge className="bg-blue-500 text-blue-50">Revised</Badge>;
        case 'CANCELLED':
          return <Badge className="bg-gray-500 text-gray-50">Cancelled</Badge>;
        default:
          return (
            <Badge className="bg-neutral-500 text-neutral-50">Unknown</Badge>
          );
      }
    },
  },
];
