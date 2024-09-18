<script lang="ts">
	import { SkeletonImage } from '$lib/components/ui/image';
	import { createAvatar } from '@dicebear/core';
	import { notionists } from '@dicebear/collection';

	export let src: string | undefined = undefined;
	export let alt: string = '';
	export let size: number = 24;

	const avatar = createAvatar(notionists, { size, seed: alt }).toDataUri();
</script>

<SkeletonImage
	--skeleton-br="50vw"
	width={size}
	height={size}
	src={src || avatar}
	{alt}
	fallback={undefined}
/>

<style lang="scss">
	@use '$lib/style/main' as *;

	:global([data-component='skeleton']) {
		border-radius: 50vw;
	}
</style>
