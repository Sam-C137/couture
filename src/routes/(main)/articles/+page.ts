import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	const filter = url.searchParams.get('filter');
	console.log(filter);
	console.log('load run');

	return {
		filter
	};
};
