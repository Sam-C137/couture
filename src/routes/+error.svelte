<script lang="ts">
	import { page } from '$app/stores';
</script>

<main>
	{#if $page.status === 404}
		<h1>404 - Page Not Found</h1>
		<p>
			Oops! The page you're looking for does not exist. It might have been moved, renamed, or
			might never existed.
		</p>
		<p>Return to the <a href="/">home page</a>.</p>
	{:else}
		<h1>{$page.status} {$page.error?.message}</h1>
	{/if}
</main>

<style lang="scss">
	@use '$lib/style/main' as *;

	main {
		display: grid;
		place-items: center;
		gap: 1rem;
		text-align: center;
		padding-block: 10dvh;
	}

	h1 {
		@extend %text-heading;
		font-size: 2rem;
	}

	p {
		@extend %text-body;
		max-width: 50ch;
	}
</style>
