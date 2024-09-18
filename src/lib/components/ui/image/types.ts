import type { HTMLAttributes } from 'svelte/elements';
import type { DOMEl } from '$lib/types/helpers.types';

export type ImageProps = {
	width?: number;
	height?: number;
	src?: string;
	alt?: string;
	fallback: string | undefined;
} & HTMLAttributes<HTMLImageElement> &
	DOMEl<HTMLImageElement>;
