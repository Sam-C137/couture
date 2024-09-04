import { type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { requestPasswordResetSchema } from '$lib/utils/validations';
import { zod } from 'sveltekit-superforms/adapters';
import prisma from '$lib/server/prisma';
import RateLimiter from '$lib/server/rate-limiter';
import { createPasswordResetToken } from '$lib/server/auth-helpers';
import { EmailService } from '$lib/server/email';

export const load: PageServerLoad = async (event) => {
	await RateLimiter.passwordResetRequest.cookieLimiter?.preflight(event);
	const form = await superValidate(zod(requestPasswordResetSchema));

	return {
		form
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(requestPasswordResetSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { email } = form.data;

			const { limited, retryAfter } = await RateLimiter.passwordResetRequest.check(event);

			if (limited) {
				return message(
					form,
					`Too many requests. Please try again after ${retryAfter} seconds.`,
					{
						status: 429
					}
				);
			}

			const existingUser = await prisma.user.findFirst({
				where: {
					email
				}
			});

			if (!existingUser) {
				return setError(form, 'email', 'User with this email does not exist');
			}

			if (existingUser.googleId) {
				return message(form, 'You cannot reset the password for a Google account', {
					status: 400
				});
			}

			const resetToken = await createPasswordResetToken(existingUser.id);

			const { success } = await EmailService.sendPasswordReset(
				existingUser.email,
				resetToken
			);

			if (!success) {
				return message(
					form,
					'An error occurred trying to send you an email, please try again',
					{
						status: 500
					}
				);
			}

			return {
				form
			};
		} catch (e) {
			console.error(e);

			return message(form, 'Something went wrong. Please try again', {
				status: 500
			});
		}
	}
};
