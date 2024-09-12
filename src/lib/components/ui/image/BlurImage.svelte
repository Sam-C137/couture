<script lang="ts">
	import { onMount } from 'svelte';

	export let src: string;
	export let fallback: string;
	export let alt: string;

	let loaded = false;
	let img: HTMLImageElement | undefined;

	onMount(() => {
		if (img?.complete) {
			loaded = true;
		}
	});

	function handleLoad() {
		loaded = true;
	}
</script>

<div
	class:loaded
	class="blur-image-wrapper"
	style:background-image={!loaded ? `url(${fallback})` : null}
>
	<img {src} {alt} bind:this={img} loading="lazy" on:load={() => handleLoad()} />
</div>

<style lang="scss">
	@use '$lib/style/main' as *;

	img {
		width: 100%;
		display: block;
		object-position: center;
		object-fit: cover;
	}

	.blur-image-wrapper {
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		position: relative;

		img {
			opacity: 0;
			transition: opacity 200ms ease-in-out;
		}

		&.loaded {
			img {
				opacity: 1;
			}

			&::before {
				content: none;
			}
		}

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			@extend .animate-pulse;
		}
	}
</style>
