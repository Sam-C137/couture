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

<div class:loaded class="blur-load" style:background-image={!loaded ? `url(${fallback})` : null}>
	<img {src} {alt} bind:this={img} loading="lazy" on:load={() => handleLoad()} />
</div>

<style lang="scss">
	img {
		width: 100%;
		display: block;
		object-position: center;
		object-fit: cover;
	}

	.blur-load {
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
			animation: pulse 2.5s infinite;
		}
	}

	@keyframes pulse {
		0% {
			background-color: rgba(255, 255, 255, 0);
		}

		50% {
			background-color: rgba(255, 255, 255, 0.1);
		}

		100% {
			background-color: rgba(255, 255, 255, 0);
		}
	}
</style>
