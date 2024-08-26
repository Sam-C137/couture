<script lang="ts">
	import Avatar from '$lib/components/ui/Avatar.svelte';
	import { user } from '$lib/stores/user.store';
</script>

<nav>
	<span class="logo"> couture </span>
	<ul>
		<li><a href="/archive">Archive</a></li>
		<li><a href="/articles">Articles</a></li>
		<li><a href="/designers">Designers</a></li>
		<li><a href="/shop">Shop</a></li>
		<li><a href="/shows">Shows</a></li>
	</ul>
	<span class="end">
		{#if $user}
			<Avatar src={$user.image} fallback={$user.displayName} />
		{:else}
			<a href="/newsletter">Newsletter</a>
			<a href="/login">Sign In</a>
		{/if}
	</span>
</nav>

<style lang="scss">
	@use '$lib/style/main' as *;

	nav {
		color: $dark;
		background: $white;
		margin-inline: auto;
		@extend %flex-row;
		justify-content: space-between;
		width: 100%;
		padding: 1.25rem 5vw;

		@include lg {
			padding: 1.25rem 2.5rem;
		}

		ul {
			@extend %flex-row;
		}
	}
</style>
