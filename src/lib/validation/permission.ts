import z from 'zod';

export const permissionFormSchema = z.object({
  title: z
    .string({
      required_error: 'Title must be not empty',
    })
    .min(3, {
      message: 'Title must be at least 3 characters long',
    })
    .max(50, {
      message: 'Title must not be more than 50 characters long',
    }),
  description: z
    .string({
      required_error: 'Description must be not empty',
    })
    .min(3, {
      message: 'Description must be at least 3 characters long',
    })
    .max(500, {
      message: 'Description must not be more than 500 characters long',
    }),
  startDate: z
    .date({
      required_error: 'Start date must be not empty',
    })
    .refine((date) => date >= new Date(), {
      message: 'Start date must be at least today',
    }),
  endDate: z
    .date({
      required_error: 'End date must be not empty',
    })
    .refine((date) => date >= new Date(), {
      message: 'End date must be at least today',
    }),
});

export const updatePermissionStatusFormSchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'REVISED', 'CANCELLED'], {
    required_error: 'Status must be not empty',
  }),
  verificatorComment: z
    .string({
      required_error: 'Verificator comment must be not empty',
    })
    .min(3, {
      message: 'Verificator comment must be at least 3 characters long',
    })
    .max(500, {
      message: 'Verificator comment must not be more than 500 characters long',
    })
    .optional(),
});

export type PermissionFormValues = z.infer<typeof permissionFormSchema>;
export type UpdatePermissionStatusFormValues = z.infer<
  typeof updatePermissionStatusFormSchema
>;
