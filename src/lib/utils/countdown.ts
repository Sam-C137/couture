import type { ActionResult } from '@sveltejs/kit';
import type { Writable } from 'svelte/store';

export function setCountdownMessage(
	result: ActionResult &
		Partial<{
			data: {
				form?: {
					message?: string;
				};
			};
		}>,
	message: Writable<string>
): void {
	const time = result.data?.form?.message?.match(/\d+/)?.at(0);

	if (!time) return;

	let count = parseInt(time);
	const interval = setInterval(() => {
		count--;
		message.set(`Too many requests. Please wait ${count} seconds before trying again.`);
		if (count === 0) {
			clearInterval(interval);
			message.set('');
		}
	}, 1000);
}
