import z from 'zod';
import { globalEntryLimit } from '../../globals/globalCharacterLimits';

export const nonEmptyString = z
  .string()
  .max(globalEntryLimit, { message: 'Field exceeds character limit' }) // Limit the string length
  .refine((value) => value.trim().length > 0, {
    message: 'Field cannot be empty or just whitespace',
  }); // Ensure the string is not just whitespace
