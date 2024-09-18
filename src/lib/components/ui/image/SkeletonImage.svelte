<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Skeleton from '$lib/components/ui/Skeleton.svelte';
	import type { Props } from '.';

	type $$Props = Props;

	export let width: $$Props['width'] = 24;
	export let height: $$Props['height'] = 24;

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
	<div data-component="SkeletonImage" transition:fade>
		<!-- svelte-ignore a11y-missing-attribute -->
		<img
			{...$$restProps}
			{width}
			{height}
			bind:this={img}
			loading="lazy"
			on:load={() => handleLoad()}
		/>
	</div>
{:else}
	<Skeleton class="SkeletonImage">
		<!-- svelte-ignore a11y-missing-attribute -->
		<img
			{...$$restProps}
			{width}
			{height}
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

	:global([data-component='skeleton'].SkeletonImage) {
		width: fit-content;
		height: fit-content;
		border-radius: $border-radius;

		img {
			opacity: 0;
		}
	}
</style>
