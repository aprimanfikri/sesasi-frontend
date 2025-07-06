'use client';

import { Row } from '@tanstack/react-table';
import { useState } from 'react';
import { Button } from '../ui/button';
import { SquarePen, Trash, XIcon } from 'lucide-react';
import CustomDialog from '../custom-dialog';
import UserForm from '../form/user-form';
import DeleteButton from '../delete-button';
import PermissionForm from '../form/permission-form';
import PermissionStatusForm from '../form/permission-status-form';

export interface CellProps<T> {
  row: Row<T>;
  session: Session;
}

export const UserCell = ({ row, session }: CellProps<User>) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const user = row.original;

  if (user.role === 'ADMIN') {
    return null;
  }

  if (session.role === 'VERIFICATOR' && user.role !== 'USER') {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 w-full">
      <Button
        variant="ghost"
        onClick={() => setOpenEditDialog(true)}
        className="cursor-pointer"
      >
        <SquarePen /> Edit
      </Button>
      {session.role === 'ADMIN' && (
        <Button
          variant="ghost"
          onClick={() => setOpenDeleteDialog(true)}
          className="cursor-pointer"
        >
          <Trash /> Delete
        </Button>
      )}
      <CustomDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        showCloseButton={true}
        title="Edit User"
        description="Fill in the form to edit user"
      >
        <UserForm
          onSave={() => setOpenEditDialog(false)}
          session={session}
          user={user}
        />
      </CustomDialog>
      <CustomDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        showCloseButton={true}
        title="Delete User"
        description="Are you sure you want to delete this user?"
      >
        <DeleteButton
          id={user.id}
          setShowDeleteDialog={setOpenDeleteDialog}
          session={session}
          type="user"
          onDeleted={() => setOpenDeleteDialog(false)}
        />
      </CustomDialog>
    </div>
  );
};

export const UserPermissionCell = ({ row, session }: CellProps<Permission>) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const permission = row.original;

  const canEditOrDelete =
    permission.status === 'PENDING' || permission.status === 'REVISED';

  return (
    <div className="flex items-center justify-center gap-2 w-full">
      {canEditOrDelete && (
        <>
          <Button
            variant="ghost"
            onClick={() => setOpenEditDialog(true)}
            className="cursor-pointer"
          >
            <SquarePen /> Edit
          </Button>
          <Button
            variant="ghost"
            onClick={() => setOpenDeleteDialog(true)}
            className="cursor-pointer"
          >
            <Trash /> Delete
          </Button>
          <Button
            variant="ghost"
            onClick={() => setOpenCancelDialog(true)}
            className="cursor-pointer"
          >
            <XIcon /> Cancel
          </Button>
        </>
      )}
      <CustomDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        showCloseButton={true}
        title="Edit Permission"
        description="Fill in the form to edit permission"
      >
        <PermissionForm
          onSave={() => setOpenEditDialog(false)}
          session={session}
          permission={permission}
        />
      </CustomDialog>
      <CustomDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        showCloseButton={true}
        title="Delete Permission"
        description="Are you sure you want to delete this permission?"
      >
        <DeleteButton
          id={permission.id}
          setShowDeleteDialog={setOpenDeleteDialog}
          session={session}
          type="permission"
          onDeleted={() => setOpenDeleteDialog(false)}
        />
      </CustomDialog>
      <CustomDialog
        open={openCancelDialog}
        onOpenChange={setOpenCancelDialog}
        showCloseButton={true}
        title="Cancel Permission"
        description="Are you sure you want to cancel this permission?"
      >
        <DeleteButton
          id={permission.id}
          setShowDeleteDialog={setOpenCancelDialog}
          session={session}
          type="cancel"
          onDeleted={() => setOpenCancelDialog(false)}
        />
      </CustomDialog>
    </div>
  );
};

export const PermissionCell = ({ row, session }: CellProps<Permission>) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const permission = row.original;
  return (
    <div className="flex items-center justify-center gap-2 w-full">
      <Button
        variant="ghost"
        onClick={() => setOpenEditDialog(true)}
        className="cursor-pointer"
      >
        <SquarePen /> Edit
      </Button>
      <CustomDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        showCloseButton={true}
        title="Edit Permission"
        description="Fill in the form to edit permission"
      >
        <PermissionStatusForm
          onSave={() => setOpenEditDialog(false)}
          session={session}
          permission={permission}
        />
      </CustomDialog>
    </div>
  );
};
