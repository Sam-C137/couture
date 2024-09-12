<script lang="ts">
	import { SkeletonImage } from '$lib/components/ui/image';
	import { createAvatar } from '@dicebear/core';
	import { notionists } from '@dicebear/collection';

	export let src: string | undefined = undefined;
	export let alt: string = '';
	export let size: number = 24;

	const avatar = createAvatar(notionists, { size, seed: alt }).toDataUri();
</script>

<SkeletonImage width={size} height={size} src={src || avatar} {alt} />

<style lang="scss">
	@use '$lib/style/main' as *;

	:root {
		--skeleton-br: 50vw;
	}

	:global(.skeleton-image-wrapper > img) {
		height: 100%;
		border-radius: 50vw;
	}
</style>
