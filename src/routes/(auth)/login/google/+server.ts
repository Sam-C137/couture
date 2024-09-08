import { generateCodeVerifier, generateState } from 'arctic';
import { google } from '$lib/server/auth';
import { dev } from '$app/environment';

export async function GET(event) {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();

	const url = await google.createAuthorizationURL(state, codeVerifier, {
		scopes: ['profile', 'email']
	});

	const response = new Response(null, {
		status: 302,
		headers: { Location: url.toString() }
	});

	response.headers.append(
		'Set-Cookie',
		event.cookies.serialize('state', state, {
			path: '/',
			secure: !dev,
			httpOnly: true,
			maxAge: 60 * 10,
			sameSite: 'lax'
		})
	);

	response.headers.append(
		'Set-Cookie',
		event.cookies.serialize('code_verifier', codeVerifier, {
			path: '/',
			secure: !dev,
			httpOnly: true,
			maxAge: 60 * 10,
			sameSite: 'lax'
		})
	);

	return response;
}
