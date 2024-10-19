import { ZodError } from 'zod';

export type Error = {
  error: string | ZodError;
};
