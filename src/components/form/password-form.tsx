'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { passwordFormSchema, PasswordFormValues } from '@/lib/validation/auth';
import { updatePasswordAction } from '@/lib/action/auth';
import SubmitButton from '../submit-button';
import PasswordInputField from '@/components/password-input-field';

export const PasswordForm = ({
  session,
  onSave,
}: {
  session: Session;
  onSave: () => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      newConfirmPassword: '',
    },
  });

  const onSubmit = async (values: PasswordFormValues) => {
    startTransition(async () => {
      const response = await updatePasswordAction(session, values);

      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        router.refresh();
        setTimeout(onSave, 500);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <PasswordInputField
          placeholder="Input password"
          disabled={isPending}
          name="password"
        />
        <PasswordInputField
          placeholder="Input new password"
          disabled={isPending}
          name="newPassword"
        />
        <PasswordInputField
          placeholder="Input new password confirmation"
          disabled={isPending}
          name="newConfirmPassword"
        />
        <SubmitButton
          isPending={isPending}
          text="Save password"
          type="submit"
          className="w-full"
        />
      </form>
    </Form>
  );
};
