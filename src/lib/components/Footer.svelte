<script lang="ts">
	import { page } from '$app/stores';
	import type { User } from 'lucia';

	const { user } = $page.data as { user?: User };
</script>

<footer>
	{#if user}
		<p>Welcome, {user.displayName}!</p>
	{:else}
		<p>Sign in to access more features</p>
	{/if}
</footer>

<style lang="scss">
	@use '$lib/style/main' as *;

	footer {
		min-width: 100vw;
		padding-bottom: 5rem;
	}
</style>
