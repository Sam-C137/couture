import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.max(32, 'Why is your email 32 characters?')
		.email('Please enter a valid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters').trim()
});
