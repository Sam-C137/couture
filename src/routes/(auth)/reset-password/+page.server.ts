import type { Actions, PageServerLoad } from './$types';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { passwordResetSchema } from '$lib/utils/validations';
import { fail, redirect } from '@sveltejs/kit';
import { isSamePassword, verifyPasswordResetToken } from '$lib/server/auth-helpers';
import RateLimiter from '$lib/server/rate-limiter';
import { hash } from 'bcrypt';
import { lucia } from '$lib/server/auth';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async (event) => {
	await RateLimiter.passwordResetFormRequest.cookieLimiter?.preflight(event);
	const form = await superValidate(zod(passwordResetSchema));
	const token = event.url.searchParams.get('token');

	if (!token) throw redirect(301, '/login');

	const tokenStatus = await verifyPasswordResetToken(token);

	return {
		form,
		tokenStatus
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(passwordResetSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { limited, retryAfter } = await RateLimiter.passwordResetFormRequest.check(event);

			if (limited) {
				return message(
					form,
					`Too many requests. Please try again after ${retryAfter} seconds.`,
					{
						status: 429
					}
				);
			}

			const { newPassword, passwordResetToken } = form.data;

			if (!passwordResetToken) {
				return message(form, 'Invalid password reset token', {
					status: 400
				});
			}

			const {
				userId,
				success,
				message: resetMessage
			} = await verifyPasswordResetToken(passwordResetToken);

			if (!success) {
				return message(form, resetMessage, {
					status: 400
				});
			}

			if (userId) {
				if (await isSamePassword(userId, newPassword)) {
					return setError(
						form,
						'newPassword',
						'Your new password cannot be the same as your old password'
					);
				}

				const passwordHash = await hash(newPassword, 10);

				await lucia.invalidateUserSessions(userId);

				await prisma.$transaction(async (tx) => {
					await tx.passwordResetToken.deleteMany({
						where: {
							userId
						}
					});
					await tx.user.update({
						where: {
							id: userId
						},
						data: {
							passwordHash
						}
					});
				});
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
