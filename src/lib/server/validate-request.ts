import { lucia } from '$lib/server/auth';

export async function validateRequest(req: Request) {
	const cookieHeader = req.headers.get('cookie');
	const cookies = parseCookies(cookieHeader);

	const sessionId = cookies[lucia.sessionCookieName];
	if (!sessionId) {
		return { user: null, session: null };
	}

	const { session, user } = await lucia.validateSession(sessionId);

	const newCookies: string[] = [];

	if (session?.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		newCookies.push(
			`${sessionCookie.name}=${sessionCookie.value}; Path=/; ${Object.entries(
				sessionCookie.attributes
			)
				.map(([key, value]) => `${key}=${value}`)
				.join('; ')}`
		);
	}

	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		newCookies.push(
			`${sessionCookie.name}=${sessionCookie.value}; Path=/; ${Object.entries(
				sessionCookie.attributes
			)
				.map(([key, value]) => `${key}=${value}`)
				.join('; ')}`
		);
	}

	return { user, session, newCookies };
}

function parseCookies(cookieHeader: string | null): Record<string, string> {
	const cookies: Record<string, string> = {};

	if (cookieHeader) {
		cookieHeader.split(';').forEach((cookie) => {
			const [name, value] = cookie.split('=').map((c) => c.trim());
			cookies[name] = value;
		});
	}

	return cookies;
}
