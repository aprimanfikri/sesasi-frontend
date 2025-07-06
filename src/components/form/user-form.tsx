'use client';

import {
  createUserFormSchema,
  CreateUserFormValues,
  updateUserFormSchema,
  UpdateUserFormValues,
} from '@/lib/validation/user';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useTransition } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SubmitButton from '@/components/submit-button';
import { updateUserAction, createUserAction } from '@/lib/action/user';
import { Input } from '../ui/input';
import PasswordInputField from '../password-input-field';
import z from 'zod';

interface UserFormProps {
  session: Session;
  onSave: () => void;
  user?: User;
}

const UserForm = ({ session, onSave, user }: UserFormProps) => {
  const [isPending, startTransition] = useTransition();
  const isAdmin = session.role === 'ADMIN';
  const isVerificator = session.role === 'VERIFICATOR';

  const schema = user?.id
    ? isAdmin
      ? updateUserFormSchema
      : z.object({
          status: z.enum(['ACTIVE', 'INACTIVE'], {
            required_error: 'Status must not be empty',
          }),
        })
    : createUserFormSchema;

  const defaultValues = user?.id
    ? {
        name: user.name || '',
        email: user.email || '',
        password: '',
        status: user?.status || 'INACTIVE',
        role: user.role || 'USER',
      }
    : {
        name: '',
        email: '',
        password: '',
        status: 'INACTIVE',
        role: 'USER',
      };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as z.infer<typeof schema>,
  });

  const onSubmit = async (values: FieldValues) => {
    startTransition(async () => {
      let response;
      if (user?.id) {
        if (isAdmin) {
          response = await updateUserAction(
            session,
            user.id,
            values as UpdateUserFormValues
          );
        } else if (isVerificator) {
          response = await updateUserAction(session, user.id, {
            status: values.status,
          } as UpdateUserFormValues);
        } else {
          toast.error('You are not authorized to perform this action.');
          return;
        }
      } else {
        if (isAdmin) {
          response = await createUserAction(
            session,
            values as CreateUserFormValues
          );
        } else {
          toast.error('You are not authorized to create users.');
          return;
        }
      }

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {(isAdmin || !user?.id) && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Input name"
                    {...field}
                    disabled={isPending || isVerificator}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {(isAdmin || !user?.id) && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Input email"
                    {...field}
                    disabled={isPending || isVerificator}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {(isAdmin || !user?.id) && (
          <PasswordInputField
            placeholder={
              user?.id ? 'Leave blank to keep current' : 'Input password'
            }
            disabled={isPending || isVerificator}
          />
        )}
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
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {(isAdmin || !user?.id) && (
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                    disabled={isPending || isVerificator}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select user role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VERIFICATOR">Verificator</SelectItem>
                      <SelectItem value="USER">User</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <SubmitButton
          isPending={isPending}
          text="Save Changes"
          type="submit"
          className="w-full"
        />
      </form>
    </Form>
  );
};

export default UserForm;
