<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { isHtmlElement } from '$lib/utils/helpers';

	export let type: 'single' | 'multiple' = 'single';

	let self: HTMLElement | undefined = undefined;
	let activeValues: Set<string> = new Set<string>();
	const dispatch = createEventDispatcher();

	onMount(() => {
		const buttons = self?.querySelectorAll('button');
		buttons?.forEach((button) => {
			button.addEventListener('click', handleToggleChange);
		});

		return () => {
			buttons?.forEach((button) => {
				button.removeEventListener('click', handleToggleChange);
			});
		};
	});

	function handleToggleChange(e: Event) {
		e.preventDefault();
		if (!isHtmlElement<HTMLButtonElement>(e.target)) return;

		const { value } = e.target;

		if (type === 'single') {
			activeValues.clear();
			if (!activeValues.has(value)) {
				activeValues.add(value);
			}
		} else {
			if (activeValues.has(value)) {
				activeValues.delete(value);
			} else {
				activeValues.add(value);
			}
		}

		activeValues = activeValues;

		updateButtons();
	}

	function updateButtons() {
		const buttons = self?.querySelectorAll('button');
		buttons?.forEach((button) => {
			const isActive = activeValues.has(button.value);
			button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
			button.setAttribute('data-state', isActive ? 'on' : 'off');
		});

		dispatch('valueChange', {
			values: Array.from(activeValues)
		});
	}
</script>

<div data-component="ToggleGroup" bind:this={self} role="group" dir="ltr">
	<slot />
</div>

<style lang="scss">
	@use '$lib/style/main' as *;

	$gap: var(--toggle-group-gap, 1rem);
	$width: var(--toggle-group-width, 100%);

	[data-component='ToggleGroup'] {
		@extend %flex-row;
		align-items: center;
		justify-content: center;
		gap: $gap;
		width: $width;
	}
</style>
