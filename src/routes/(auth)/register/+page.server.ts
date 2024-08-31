import type { PageServerLoad } from './$types';
import { type Actions, fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { registerSchema } from '$lib/utils/validations';
import { hash } from 'bcrypt';
import { generateIdFromEntropySize } from 'lucia';
import prisma from '$lib/server/prisma';
import { lucia } from '$lib/server/auth';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(registerSchema));

	return {
		form
	};
};

export const actions: Actions = {
	register: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(registerSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { email, username, password } = form.data;

			const passwordHash = await hash(password, 10);

			const userId = generateIdFromEntropySize(10);

			const existingName = await prisma.user.findFirst({
				where: {
					username: {
						equals: username
					}
				}
			});

			if (existingName) {
				return setError(form, 'username', 'Username already taken');
			}

			const existingEmail = await prisma.user.findFirst({
				where: {
					email: {
						equals: email
					}
				}
			});

			if (existingEmail) {
				return setError(form, 'email', 'Email already exists');
			}

			await prisma.user.create({
				data: {
					id: userId,
					username,
					email,
					passwordHash
				}
			});

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} catch (e) {
			console.error(e);

			return setError(form, '', 'Something went wrong. Please try again', {
				status: 500
			});
		}

		return redirect(302, '/');
	}
};
