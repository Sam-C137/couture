import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { user } from '$lib/stores/user.store';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) {
		throw redirect(302, '/login');
	}

	user.set(event.locals.user);

	return {
		user: event.locals.user
	};
};
