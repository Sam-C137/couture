<script lang="ts">
	import { initials } from '$lib/helpers';

	export let src: string | undefined = undefined;
	export let fallback: string = '';
</script>

<button on:click>
	{#if src}
		<img {src} alt={fallback} />
	{:else}
		<p>{initials(fallback)}</p>
	{/if}
</button>

<style lang="scss">
	@use '$lib/style/main' as *;

	button {
		$size: var(--avatar-size, 2rem);

		@extend %reset;
		width: $size;
		height: $size;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 50vw;
	}
</style>
