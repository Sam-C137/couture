import { OAuth2RequestError } from 'arctic';
import { google, lucia } from '$lib/server/auth';
import ky from '$lib/utils/ky';
import prisma from '$lib/server/prisma';
import { generateIdFromEntropySize } from 'lucia';
import { slugify } from '$lib/utils/helpers';

export async function GET({ cookies, url }) {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	const storedState = cookies.get('state');
	const storedCode = cookies.get('code_verifier');

	if (!code || !state || !storedState || !storedCode || state !== storedState) {
		return new Response(null, { status: 400 });
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, storedCode);
		const googleUser = await ky
			.get('https://www.googleapis.com/oauth2/v1/userinfo', {
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`
				}
			})
			.json<{
				id: string;
				name: string;
				email: string;
			}>();

		const existingUser = await prisma.user.findUnique({
			where: {
				googleId: googleUser.id
			}
		});

		async function createSessionAndRedirect(id: string) {
			const session = await lucia.createSession(id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
			return new Response(null, {
				status: 302,
				headers: {
					Location: '/'
				}
			});
		}

		if (existingUser) {
			return createSessionAndRedirect(existingUser.id);
		}

		const userId = generateIdFromEntropySize(10);
		const username = slugify(googleUser.name);

		await prisma.user.create({
			data: {
				id: userId,
				username,
				googleId: googleUser.id,
				email: googleUser.email
			}
		});

		return createSessionAndRedirect(userId);
	} catch (e) {
		console.error(e);
		if (e instanceof OAuth2RequestError) {
			return new Response(null, {
				status: 400
			});
		}

		return new Response(null, {
			status: 500
		});
	}
}
