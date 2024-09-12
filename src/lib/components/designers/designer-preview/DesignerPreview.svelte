<script lang="ts">
	import { BlurImage } from '$lib/components/ui/image';

	export let name: string;
	export let largeImage: string;
	export let description: string;
	export let smallImage: string = '';
</script>

<a href="/designers/{name}">
	<BlurImage src={largeImage} fallback={smallImage} alt={name} />
	<p>{name}</p>
	<b>{description}</b>
</a>

<style lang="scss">
	@use '$lib/style/main' as *;

	p,
	b {
		font-family: $font-body;
		@extend %text-subtext;
		margin-top: 0.5rem;
		display: block;
	}

	p {
		font-weight: 500;
		color: $neutral-950;
		font-size: 1.125rem;
	}

	:global(.blur-image-wrapper),
	:global(.blur-image-wrapper > img) {
		aspect-ratio: 245 / 275;
		cursor: pointer;
		width: 245px;
		height: 275px;
	}
</style>
