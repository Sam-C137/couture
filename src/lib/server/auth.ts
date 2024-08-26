import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import prisma from '$lib/server/prisma';

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
