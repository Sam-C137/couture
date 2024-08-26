<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<main>
	<Navbar />
	<slot />
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-rows: auto 1fr auto;
	}
</style>
