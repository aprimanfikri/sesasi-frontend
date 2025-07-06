'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { accountFormSchema } from '@/lib/validation/auth';
import { updateAccountAction } from '@/lib/action/auth';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import SubmitButton from '../submit-button';

export const AccountForm = ({
  session,
  onSave,
}: {
  session: Session;
  onSave: () => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: session.name || '',
      email: session.email || '',
    },
  });

  const onSubmit = async (data: z.infer<typeof accountFormSchema>) => {
    startTransition(async () => {
      const response = await updateAccountAction(session, data);
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Name"
                  {...field}
                  disabled={isPending}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  disabled={isPending}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton
          isPending={isPending}
          text="Save changes"
          type="submit"
          className="w-full"
        />
      </form>
    </Form>
  );
};
