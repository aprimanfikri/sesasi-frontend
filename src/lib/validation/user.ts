import { z } from 'zod';

export const createUserFormSchema = z.object({
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
  status: z.enum(['ACTIVE', 'INACTIVE'], {
    required_error: 'Status must be not empty',
  }),
  role: z.enum(['ADMIN', 'VERIFICATOR', 'USER'], {
    required_error: 'Role must be not empty',
  }),
});

export type CreateUserFormValues = z.infer<typeof createUserFormSchema>;

export const updateUserFormSchema = z.object({
  name: z
    .string({
      required_error: 'Name must be not empty',
    })
    .min(3, {
      message: 'Name must be at least 3 characters long',
    })
    .max(50, {
      message: 'Name must not be more than 50 characters long',
    })
    .optional(),
  email: z
    .string({
      required_error: 'Email must not be empty',
    })
    .email('Invalid email format')
    .optional(),
  password: z
    .string()
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
    })
    .optional()
    .or(z.literal(''))
    .transform((e) => (e === '' ? undefined : e)),
  status: z
    .enum(['ACTIVE', 'INACTIVE'], {
      required_error: 'Status must be not empty',
    })
    .optional(),
  role: z
    .enum(['ADMIN', 'VERIFICATOR', 'USER'], {
      required_error: 'Role must be not empty',
    })
    .optional(),
});

export type UpdateUserFormValues = z.infer<typeof updateUserFormSchema>;
