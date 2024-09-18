<script lang="ts">
	import Avatar from '$lib/components/ui/Avatar.svelte';
	import { page } from '$app/stores';
	import Dropdown from '$lib/components/ui/Dropdown.svelte';
	import type { User } from 'lucia';

	const { user } = $page.data as { user?: User };

	$: path = $page.url.pathname;
</script>

<nav data-component="Navbar">
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
		{#if user}
			<Dropdown>
				<span slot="trigger">
					<Avatar src={user.image} alt={user.displayName} size={36} />
					<iconify-icon
						icon="ic:baseline-keyboard-arrow-down"
						width="30"
						height="30"
						style="color: var(--neutral-950)"
					></iconify-icon>
				</span>
				<div slot="content">
					<a href="/profile" role="menuitem">Profile</a>
					<hr />
					<a href="/api/auth/logout">Logout</a>
				</div>
			</Dropdown>
		{:else}
			<a href="/newsletter">Newsletter</a>
			<a href="/login">Sign In</a>
		{/if}
	</span>
</nav>

<style lang="scss">
	@use '$lib/style/main' as *;

	[data-component='Navbar'] {
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

		a {
			cursor: pointer;
		}

		li {
			overflow: hidden;
			position: relative;
			padding-block: calc(var(--_gap) / 2);
			padding-inline: 0.25rem;
			cursor: pointer;

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
			a[href='/login'] {
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

			[slot='trigger'] {
				@extend %flex-row;
				align-items: center;
			}

			[slot='content'] {
				> *:not(hr) {
					padding: 0.25rem 0.5rem;
					display: block;
					&:hover {
						background: $neutral-100;
						border-radius: 0.5rem;
					}
				}
				hr {
					border: 1px solid $shell;
					margin-block: 0.25rem;
				}
			}
		}
	}
</style>
