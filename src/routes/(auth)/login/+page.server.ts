import { type Actions, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { loginSchema } from '$lib/utils/validations';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import prisma from '$lib/server/prisma';
import { compare } from 'bcrypt';
import { lucia } from '$lib/server/auth';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(loginSchema));

	return {
		form
	};
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { email, password } = form.data;

			const existingUser = await prisma.user.findFirst({
				where: {
					email
				}
			});

			if (!existingUser) {
				return setError(form, 'email', 'User with this email does not exist');
			}

			const validPassword = await compare(password, existingUser.passwordHash);

			if (!validPassword) {
				return setError(form, 'password', 'Incorrect email or password');
			}

			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} catch (e) {
			console.error(e);

			return message(form, 'Something went wrong. Please try again', {
				status: 500
			});
		}

		return redirect(302, '/');
	}
};
