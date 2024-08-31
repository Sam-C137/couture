import { writable } from 'svelte/store';
import type { User } from 'lucia';

/**
 {
	id: '123',
	username: 'kweku',
	displayName: 'Kweku Agbeshie',
	image: undefined,
	bio: 'I am a software engineer',
	email: 'agbeshi@gmail.com'
}
 */

export const user = writable<User | null>(null);
