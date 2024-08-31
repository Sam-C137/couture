import type { PageServerLoad } from './$types';
import { type Actions, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { registerSchema } from '$lib/utils/validations';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(registerSchema));

	return {
		form
	};
};

export const actions: Actions = {
	register: async ({ request }) => {
		const form = await superValidate(request, zod(registerSchema));

		if (!form.valid) {
			return fail(400, { form });
		}
	}
};
