<script lang="ts">
	export let variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' =
		'default';
	export let type: HTMLButtonElement['type'] = 'button';
	export let disabled: boolean = false;
	export let loading: boolean = false;
</script>

<button data-variant={variant} {type} {disabled} class:loading-button={loading}>
	{#if loading}
		<div class="load-wrapper">
			<slot />
			<iconify-icon
				icon="icomoon-free:spinner2"
				width="24"
				height="24"
				class="animate-spin"
				style="color: inherit; justify-self: flex-end"
			></iconify-icon>
		</div>
	{:else}
		<slot />
	{/if}
</button>

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

	button {
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

		&[data-variant='ghost'] {
			background: transparent;
			color: $neutral-950;

			&:hover {
				background: $neutral-950;
				color: $color-1;
			}
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
