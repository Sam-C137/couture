import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.max(32, 'Why is your email 32 characters?')
		.email('Please enter a valid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters').trim()
});

export const registerSchema = z
	.object({
		username: z
			.string()
			.min(1, 'Your name is required')
			.max(64, 'Your name seems a bit too long')
			.trim(),
		email: z
			.string()
			.min(1, 'Email is required')
			.max(32, 'Why is your email 32 characters?')
			.email('Please enter a valid email address'),
		password: z.string().min(8, 'Password must be at least 8 characters').trim(),
		passwordConfirm: z.string().min(8, 'Password must be at least 8 characters').trim()
	})
	.superRefine(({ password, passwordConfirm }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and password confirmation must match',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password and password confirmation must match',
				path: ['passwordConfirm']
			});
		}
	});

export const requestPasswordResetSchema = loginSchema.pick({ email: true });

export const passwordResetSchema = z
	.object({
		newPassword: z.string().min(8, 'Password must be at least 8 characters').trim(),
		confirmPassword: z.string().min(8, 'Password must be at least 8 characters').trim(),
		passwordResetToken: z.string().optional()
	})
	.refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, {
		message: 'Password and password confirmation must match',
		path: ['confirmPassword']
	});
