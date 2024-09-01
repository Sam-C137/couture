import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import prisma from '$lib/server/prisma';
import { Google } from 'arctic';

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (databaseUserAttributes) => {
		return {
			id: databaseUserAttributes.id,
			email: databaseUserAttributes.email,
			username: databaseUserAttributes.username,
			displayName: databaseUserAttributes.displayName,
			bio: databaseUserAttributes.bio,
			image: databaseUserAttributes.image
		};
	}
});

interface DatabaseUserAttributes {
	id: string;
	email: string;
	username: string;
	displayName: string;
	bio: string;
	image?: string;
}

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

export const google = new Google(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	`${PUBLIC_BASE_URL}/api/auth/google`
);
