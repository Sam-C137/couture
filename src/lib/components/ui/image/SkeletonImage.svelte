<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Skeleton from '$lib/components/ui/Skeleton.svelte';

	export let src: string;
	export let alt: string;
	export let width: number = 24;
	export let height: number = 24;

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

{#if loaded}
	<div class="skeleton-image-wrapper" transition:fade>
		<img
			{src}
			{width}
			{height}
			{alt}
			bind:this={img}
			loading="lazy"
			on:load={() => handleLoad()}
		/>
	</div>
{:else}
	<Skeleton class="skeleton-image-wrapper">
		<img
			{src}
			{width}
			{height}
			{alt}
			bind:this={img}
			loading="lazy"
			on:load={() => handleLoad()}
		/>
	</Skeleton>
{/if}

<style lang="scss">
	@use '$lib/style/main' as *;

	$border-radius: var(--skeleton-br, 0.5rem);

	img {
		width: 100%;
		display: block;
		object-position: center;
		object-fit: cover;
		opacity: 1;
		transition: opacity 200ms ease-in-out;
	}

	:global(.skeleton.skeleton-image-wrapper) {
		width: fit-content;
		height: fit-content;
		border-radius: $border-radius;

		img {
			opacity: 0;
		}
	}
</style>
