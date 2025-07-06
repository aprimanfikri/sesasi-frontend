import { AxiosError } from 'axios';
import { ZodError } from 'zod';

export const errorHandler = (error: unknown) => {
  if (error instanceof AxiosError) {
    return {
      success: false,
      message: error.response?.data?.message || 'Request failed',
    };
  }

  if (error instanceof ZodError) {
    return {
      success: false,
      message: error.errors[0]?.message || 'Invalid input',
    };
  }

  return {
    success: false,
    message:
      error instanceof Error ? error.message : 'An unexpected error occurred',
  };
};
