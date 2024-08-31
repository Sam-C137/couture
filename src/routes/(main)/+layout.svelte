<script>
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<main>
	<Navbar />
	<slot />
</main>

<style lang="scss">
	main {
		min-height: 100dvh;
		display: grid;
		grid-template-rows: auto 1fr auto;
	}
</style>
