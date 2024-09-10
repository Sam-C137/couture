<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<main>
	<Navbar />
	<slot />
	<Footer />
</main>

<style lang="scss">
	main {
		min-height: 100dvh;
		display: grid;
		grid-template-rows: auto 1fr auto;
	}
</style>
