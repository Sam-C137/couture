<script lang="ts">
	export let label: string;
	export let value: string;
	export let disabled: boolean = false;
	export let active: boolean = false;
</script>

<button
	type="button"
	dir="ltr"
	{disabled}
	aria-pressed={active}
	data-state={active ? 'on' : 'off'}
	{value}
	aria-label={label}
	tabindex="0"
	data-component="ToggleGroupItem"
>
	<slot />
</button>

<style lang="scss">
	@use '$lib/style/main' as *;

	$color: var(--togle-color, $neutral-950);
	$bg: var(--togle-bg, $neutral-50);
	$active-color: var(--togle-active-color, $white);
	$active-bg: var(--togle-color, $neutral-950);

	[data-component='ToggleGroupItem'] {
		@extend %reset;
		padding: 0.5rem 1rem;
		background: $bg;
		border-radius: 50vw;
		color: $color;
		@extend %text-subtext;
		cursor: pointer;
		transition: all 0.3s ease;

		&[data-state='on'] {
			color: $active-color;
			background: $active-bg;
		}

		&:disabled {
			opacity: 0.5;
		}
	}
</style>
