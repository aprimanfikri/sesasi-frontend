import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: 'Email must not be empty',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password must not be empty',
    })
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(30, {
      message: 'Password must not be more than 30 characters long',
    })
    .regex(/^[A-Za-z0-9@#!$%^&*]*$/, {
      message:
        'Password can only contain letters, numbers, and special characters (@#!$%^&*)',
    })
    .regex(/^\S*$/, {
      message: 'Password must not contain spaces',
    }),
});

export const registerFormSchema = z.object({
  name: z
    .string({
      required_error: 'Name must be not empty',
    })
    .min(3, {
      message: 'Name must be at least 3 characters long',
    })
    .max(50, {
      message: 'Name must not be more than 50 characters long',
    }),
  email: z
    .string({
      required_error: 'Email must not be empty',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password must not be empty',
    })
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(30, {
      message: 'Password must not be more than 30 characters long',
    })
    .regex(/^[A-Za-z0-9@#!$%^&*]*$/, {
      message:
        'Password can only contain letters, numbers, and special characters (@#!$%^&*)',
    })
    .regex(/^\S*$/, {
      message: 'Password must not contain spaces',
    }),
});

export const accountFormSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(3, {
      message: 'Name must be at least 3 characters',
    })
    .max(50, {
      message: 'Name must not exceed 50 characters',
    }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Invalid email format',
    }),
});

export const passwordFormSchema = z
  .object({
    password: z
      .string({
        required_error: 'Current password is required',
      })
      .min(8, {
        message: 'Current password must be at least 8 characters',
      }),
    newPassword: z
      .string({
        required_error: 'New password is required',
      })
      .min(8, {
        message: 'New password must be at least 8 characters',
      }),
    newConfirmPassword: z
      .string({
        required_error: 'Confirm password is required',
      })
      .min(8, {
        message: 'Confirm password must be at least 8 characters',
      }),
  })
  .refine(
    (data) => {
      if (data.newPassword || data.newConfirmPassword || data.password) {
        return data.newPassword === data.newConfirmPassword;
      }
      return true;
    },
    {
      message: 'New password does not match',
      path: ['newConfirmPassword'],
    }
  )
  .refine(
    (data) => {
      if (data.password || data.newPassword || data.newConfirmPassword) {
        return (
          !!data.password && !!data.newPassword && !!data.newConfirmPassword
        );
      }
      return true;
    },
    {
      message: 'All password fields are required to change password',
      path: ['password'],
    }
  );

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;
export type AccountFormValues = z.infer<typeof accountFormSchema>;
export type PasswordFormValues = z.infer<typeof passwordFormSchema>;
