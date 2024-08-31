import { type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { loginSchema } from '$lib/utils/validations';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(loginSchema));

	return {
		form
	};
};

export const actions: Actions = {
	login: async ({ request }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		console.log(form.data);
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}
};
