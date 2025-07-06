'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import SubmitButton from '@/components/submit-button';
import { deleteUserAction } from '@/lib/action/user';
import { deletePermissionAction } from '@/lib/action/permission';

type Type = 'user' | 'permission';

interface DeleteButtonProps {
  id: string;
  setShowDeleteDialog: (show: boolean) => void;
  session: Session;
  type: Type;
  onDeleted?: () => void;
}

const DeleteButton = ({
  id,
  setShowDeleteDialog,
  session,
  type,
  onDeleted,
}: DeleteButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const actions = {
        user: deleteUserAction,
        permission: deletePermissionAction,
      };
      const deleteAction = actions[type];

      if (!deleteAction) return;

      const response = await deleteAction(session, id);

      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        onDeleted?.();
        setTimeout(setShowDeleteDialog, 100);
      }
    });
  };

  return (
    <div className="flex justify-end gap-4 p-4">
      <SubmitButton
        onClick={() => setShowDeleteDialog(false)}
        isPending={isPending}
        text="Cancel"
        type="button"
        className="w-[100px]"
        variant="outline"
      />
      <SubmitButton
        onClick={handleDelete}
        isPending={isPending}
        text="Delete"
        type="button"
        className="w-[100px]"
        variant="destructive"
      />
    </div>
  );
};

export default DeleteButton;
