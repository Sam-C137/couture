import { env } from '$env/dynamic/private';
import { fileRouter } from '$lib/server/uploadthing';
import { createRouteHandler } from 'uploadthing/server';

const { GET, POST } = createRouteHandler({
	router: fileRouter,
	config: {
		uploadthingSecret: env.UPLOADTHING_SECRET
	}
});

export { GET, POST };
