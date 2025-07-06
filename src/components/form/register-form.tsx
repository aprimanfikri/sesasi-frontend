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
import { Input } from '@/components/ui/input';
import { registerFormSchema, RegisterFormValues } from '@/lib/validation/auth';
import { useTransition } from 'react';
import { registerAction } from '@/lib/action/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import PasswordInputField from '@/components/password-input-field';
import SubmitButton from '@/components/submit-button';

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    startTransition(async () => {
      const response = await registerAction(values);
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        router.push('/login');
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  disabled={isPending}
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
                  placeholder="Input email"
                  {...field}
                  disabled={isPending}
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PasswordInputField disabled={isPending} />
        <SubmitButton
          isPending={isPending}
          text="Register"
          type="submit"
          size="lg"
          className="w-full"
        />
      </form>
    </Form>
  );
};

export default RegisterForm;
