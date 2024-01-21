import * as z from 'zod';

export const formSchema = z.object({
  firstName: z.string().min(3, { message: 'First name must be at least 3 characters' }),
  lastName: z.string().min(3, { message: 'Last name must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  repeatPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});