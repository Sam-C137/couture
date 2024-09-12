<script lang="ts">
	import avatar from '$lib/images/Avatar.png';
	import { SkeletonImage } from '$lib/components/ui/image';

	export let src: string | undefined = undefined;
	export let alt: string = '';
	export let size: number = 24;
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
