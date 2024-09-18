<script lang="ts">
	import type { Props } from '.';

	type $$Props = Props;

	export let variant: $$Props['variant'] = 'default';
	export let type: $$Props['type'] = 'button';
	export let disabled: $$Props['disabled'] = false;
	export let loading: $$Props['loading'] = false;
	export let role: $$Props['role'] = 'button';
	export let href: $$Props['href'] = undefined;

	const attrs = {
		'aria-disabled': disabled,
		'data-variant': variant
	};
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{...attrs}
	{type}
	{disabled}
	{role}
	{href}
	on:click
	on:change
	on:keydown
	on:keyup
	on:mouseenter
	on:mouseleave
	on:mousedown
	on:pointerdown
	on:mouseup
	on:pointerup
	tabindex="0"
	class:loading-button={loading}
	{...$$restProps}
	data-component="Button"
>
	{#if loading}
		<div class="load-wrapper">
			<slot />
			<iconify-icon
				icon="icomoon-free:spinner2"
				width="18"
				height="18"
				class="animate-spin"
				style="color: inherit; justify-self: flex-end"
			></iconify-icon>
		</div>
	{:else}
		<slot />
	{/if}
</svelte:element>

<style lang="scss">
	@use '$lib/style/main' as *;

	$width: var(--button-width, fit-content);
	$font-family: var(--button-font-family, $font-body);
	$padding: var(--button-padding, 0.5rem 1rem);
	$color-1: var(--button-color, $white);
	$color-2: var(--button-color, $dark);

	.load-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	[data-component='Button'] {
		@extend %reset;
		padding: $padding;
		font-family: $font-family;
		border-radius: 0.5rem;
		width: $width;
		cursor: pointer;
		transition: all 0.3s;

		&[data-variant='default'] {
			background: $neutral-950;
			color: $color-1;
			&:hover {
				background: $neutral-900;
			}
		}

		//&[data-variant='destructive'] {
		//	background: $red-500;
		//	color: $color-2;
		//}

		&[data-variant='outline'] {
			background: transparent;
			border: 1px solid $neutral-200;
			color: $neutral-950;

			&:hover {
				background: $neutral-200;
			}
		}

		&[data-variant='secondary'] {
			background: $yellow-500;
			color: $color-2;

			&:hover {
				background: $yellow-400;
			}
		}

		&[data-variant='inverted'] {
			background: transparent;
			color: $neutral-950;

			&:hover {
				background: $neutral-950;
				color: $color-1;
			}
		}

		&[data-variant='ghost'] {
			background: transparent;
			color: inherit;
			padding: 0;
		}

		&[data-variant='link'] {
			background: transparent;
			color: $blue-500;

			&:hover {
				text-decoration: underline;
			}
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
</style>
