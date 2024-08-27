<script lang="ts">
	import Avatar from '$lib/components/ui/Avatar.svelte';
	import { user } from '$lib/stores/user.store';
	import { page, navigating } from '$app/stores';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';

	NProgress.configure({
		minimum: 0.16
	});

	$: path = $page.url.pathname;

	$: {
		if ($navigating) {
			NProgress.start();
		}

		if (!$navigating) {
			NProgress.done();
		}
	}
</script>

<nav>
	<a class="logo" href="/"> couture </a>
	<ul>
		<li>
			<a href="/archive" class:active={path === '/archive'}>Archive</a>
		</li>
		<li>
			<a href="/articles" class:active={path === '/articles'}>Articles</a>
		</li>
		<li>
			<a href="/designers" class:active={path === '/designers'}>Designers</a>
		</li>
		<li>
			<a href="/shop" class:active={path === '/shop'}>Shop</a>
		</li>
		<li>
			<a href="/shows" class:active={path === '/shows'}>Shows</a>
		</li>
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
		--_gap: 1rem;

		color: $neutral-950;
		background: $white;
		margin-inline: auto;
		@extend %flex-row;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 1.25rem 5vw;
		font-family: $font-title;
		font-size: 1rem;
		text-transform: uppercase;

		@include lg {
			padding: 1.25rem 2.5rem;
		}

		ul,
		.end {
			@extend %flex-row;
			gap: 1rem;
		}

		li {
			overflow: hidden;
			position: relative;
			padding-block: calc(var(--_gap) / 2);
			padding-inline: 0.25rem;

			&:hover,
			&:focus-within,
			&:has(a.active) {
				--_width: 1;
			}

			&:not(.logo)::after {
				content: '';
				position: absolute;
				left: 0;
				bottom: 0;
				height: 2px;
				width: 100%;
				background: $neutral-950;
				translate: var(--_translate, 0);
				scale: var(--_width, 0) 1;
				transition:
					scale 300ms var(--_scale-delay, 0ms),
					translate 500ms var(--_translate-delay, 0ms);
			}

			@supports selector(:has(h1)) {
				&:hover + li {
					--_translate: -100%;
					--_scale-delay: 300ms;
					--_translate-delay: 200ms;
				}

				&:has(+ :hover) {
					--_translate: 100%;
					--_scale-delay: 300ms;
					--_translate-delay: 200ms;
				}
			}
		}

		.logo {
			font-family: $font-logo;
			font-size: 1.85rem;
			position: relative;
			z-index: 1;
			&:after {
				content: '';
				position: absolute;
				@include icon(
					"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='25' viewBox='0 0 24 25' fill='none'%3E%3Cpath d='M12 0L13.4893 7.95911L19.4164 2.38729L15.899 9.69357L24 8.63729L16.8195 12.5L24 16.3627L15.899 15.3064L19.4164 22.6127L13.4893 17.0409L12 25L10.5107 17.0409L4.58359 22.6127L8.10096 15.3064L0 16.3627L7.18053 12.5L0 8.63729L8.10096 9.69357L4.58359 2.38729L10.5107 7.95911L12 0Z' fill='%23EDB900'/%3E%3C/svg%3E"
				);
				right: -0.65rem;
				top: -0.5rem;
				z-index: -1;
			}
		}

		.end {
			a:last-child {
				position: relative;
				&:before {
					content: '|';
					width: 100%;
					height: 100%;
					margin-right: auto;
					position: absolute;
					left: -0.65rem;
				}
			}
		}
	}
</style>
