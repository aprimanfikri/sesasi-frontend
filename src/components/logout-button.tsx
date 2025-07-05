'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/lib/action/auth';
import { toast } from 'sonner';
import SubmitButton from '@/components/submit-button';

interface LogOutButtonProps {
  setShowLogoutDialog: (show: boolean) => void;
}

const LogOutButton = ({ setShowLogoutDialog }: LogOutButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleLogout = async () => {
    startTransition(async () => {
      const response = await logoutAction();

      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);

        router.replace('/login');
      }
    });
  };

  return (
    <div className="flex justify-end gap-4 p-4">
      <SubmitButton
        onClick={() => setShowLogoutDialog(false)}
        isPending={isPending}
        text="Cancel"
        type="button"
        className="w-[100px]"
        variant="outline"
      />
      <SubmitButton
        onClick={handleLogout}
        isPending={isPending}
        text="Logout"
        type="button"
        className="w-[100px]"
        variant="destructive"
      />
    </div>
  );
};

export default LogOutButton;
