'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  updatePermissionStatusFormSchema,
  UpdatePermissionStatusFormValues,
} from '@/lib/validation/permission';
import { useTransition } from 'react';
import { toast } from 'sonner';
import SubmitButton from '@/components/submit-button';
import { updatePermissionStatusAction } from '@/lib/action/permission';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '../ui/textarea';

interface PermissionStatusFormProps {
  session: Session;
  onSave: () => void;
  permission: Permission;
}

const PermissionStatusForm = ({
  session,
  onSave,
  permission,
}: PermissionStatusFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdatePermissionStatusFormValues>({
    resolver: zodResolver(updatePermissionStatusFormSchema),
    defaultValues: {
      status: permission.status,
      verificatorComment: permission.verificatorComment || '',
    },
  });

  const onSubmit = (values: UpdatePermissionStatusFormValues) => {
    startTransition(async () => {
      const response = await updatePermissionStatusAction(
        session,
        permission.id,
        values
      );
      if (!response.success) {
        toast.error(response.message);
      } else {
        setTimeout(onSave, 100);
        toast.success(response.message);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select user status" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      { label: 'Pending', value: 'PENDING' },
                      { label: 'Approved', value: 'APPROVED' },
                      { label: 'Rejected', value: 'REJECTED' },
                      { label: 'Revised', value: 'REVISED' },
                      { label: 'Cancelled', value: 'CANCELLED' },
                    ].map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="verificatorComment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verificator Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Input verificator comment"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton
          isPending={isPending}
          text="Save Changes"
          type="submit"
          size="lg"
          className="w-full"
        />
      </form>
    </Form>
  );
};

export default PermissionStatusForm;
