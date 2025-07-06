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
import { loginFormSchema, LoginFormValues } from '@/lib/validation/auth';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { loginAction } from '@/lib/action/auth';
import PasswordInputField from '@/components/password-input-field';
import SubmitButton from '@/components/submit-button';

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    startTransition(async () => {
      const response = await loginAction(values);
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        router.push(
          response.session.role === 'ADMIN'
            ? '/admin'
            : response.session.role === 'VERIFICATOR'
            ? '/verificator'
            : '/user'
        );
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          text="Login"
          type="submit"
          size="lg"
          className="w-full"
        />
      </form>
    </Form>
  );
};

export default LoginForm;
