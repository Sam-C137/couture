import { createUploadthing, UTApi } from 'uploadthing/server';
import type { FileRouter } from 'uploadthing/server';
import { validateRequest } from '$lib/server/validate-request';
import { PUBLIC_UPLOADTHING_APP_ID } from '$env/static/public';
import prisma from '$lib/server/prisma';

const f = createUploadthing();

export const fileRouter = {
	avatar: f({
		image: {
			maxFileSize: '512KB'
		}
	})
		.middleware(async ({ req }) => {
			const { user } = await validateRequest(req);
			if (!user) throw new Error('Unauthorized');

			return { user };
		})
		.onUploadComplete(async ({ metadata: { user }, file }) => {
			const oldUrl = user.image;
			if (oldUrl) {
				const key = oldUrl.split(`/a/${PUBLIC_UPLOADTHING_APP_ID}/`)[1];

				await new UTApi().deleteFiles(key);
			}

			const newUrl = file.url.replace('/f/', `/a/${PUBLIC_UPLOADTHING_APP_ID}/`);

			await prisma.user.update({
				where: {
					id: user.id
				},
				data: {
					image: newUrl
				}
			});

			return {
				image: newUrl
			};
		})
} satisfies FileRouter;

export type AppFileRouter = typeof fileRouter;
