<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { Input, type Props } from '.';
	import { isHtmlElement } from '$lib/utils/helpers';

	type $$Props = Props & {
		debounceTime: number;
	};

	export let id: $$Props['id'];
	export let name: $$Props['name'];
	export let value: $$Props['value'] = '';
	export let debounceTime: $$Props['debounceTime'] = 0;

	let timer: ReturnType<typeof setTimeout>;
	const dispatch = createEventDispatcher();

	function handleInput(event: Event) {
		if (!isHtmlElement<HTMLInputElement>(event.target)) return;
		const newValue = event.target.value;

		value = newValue;
		dispatch('input', { value: newValue });

		if (debounceTime > 0) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				dispatch('debouncedValueChange', { value: newValue });
			}, debounceTime);
		} else {
			dispatch('debouncedValueChange', { value: newValue });
		}
	}

	onMount(() => {
		return () => {
			clearTimeout(timer);
		};
	});
</script>

<Input {...$$restProps} {id} {name} bind:value on:input={handleInput}>
	<slot name="icon-left" slot="icon-left" />
	<slot name="icon-right" slot="icon-right" />
</Input>
