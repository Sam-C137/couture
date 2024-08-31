<script lang="ts">
	import Avatar from '$lib/images/Avatar.png';

	export let src: string | undefined = undefined;
	export let alt: string = '';
</script>

<button on:click>
	<img src={src || Avatar} {alt} />
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
