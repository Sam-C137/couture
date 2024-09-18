<script lang="ts">
	import RatingStars from '$lib/components/ui/RatingStars.svelte';
	import { onMount } from 'svelte';

	export let src: string;
	export let ratingValue: number;
	export let headerText: string;
	export let description: string;

	let videoElement: HTMLVideoElement | undefined;
	let canplay = false;

	function handleMouseOver() {
		if (!videoElement) return;

		if (videoElement.readyState >= 2 && canplay) {
			videoElement.play();
		}
	}

	function handleMouseOut() {
		videoElement?.pause();
	}

	onMount(async () => {
		try {
			await videoElement?.play();
			canplay = true;
			videoElement?.pause();
		} catch {
			canplay = false;
		}
	});
</script>

<article data-component="VideoPlayerCard">
	<video
		muted
		playsinline
		preload="metadata"
		on:mouseover={handleMouseOver}
		on:focus={handleMouseOver}
		on:mouseout={handleMouseOut}
		on:blur={handleMouseOut}
		bind:this={videoElement}
	>
		<source {src} />
		<track src="/" kind="captions" />
	</video>
	<div>
		<p class="header">
			{headerText}
		</p>
		<p class="description">
			{description}
		</p>
		<RatingStars value={ratingValue} readonly />
	</div>
</article>

<style lang="scss">
	@use '$lib/style/main' as *;

	[data-component='VideoPlayerCard'] {
		padding: 0.85rem 0.65rem;
		display: grid;
		grid-template-rows: 2fr 1.5fr;
		background: $white;
		color: $neutral-900;
		min-width: 280px;
		border-radius: 0.25rem;

		video {
			object-fit: cover;
			width: 100%;
			height: 100%;
			aspect-ratio: 1 / 1;
			border-radius: 0.25rem;
		}

		div {
			display: grid;
			grid-template-rows: auto 1fr auto;

			.header {
				@extend %text-body;
				font-weight: 500;
				padding-block: 0.85rem;
			}

			.description {
				@extend %text-subtext;
				margin-bottom: 0.5rem;
				white-space: pre-line;
				overflow-wrap: break-word;
				overflow: hidden;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 8;
			}
		}
	}
</style>
