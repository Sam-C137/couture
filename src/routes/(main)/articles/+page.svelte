<script lang="ts">
	import { ToggleGroup, ToggleGroupItem } from '$lib/components/ui/toggle';
	import SearchField from './SearchField.svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	function handleToggle(e: CustomEvent<{ values: string[] }>) {
		const params = new URLSearchParams();
		params.set('filter', e.detail.values.at(0) || '');
		goto(`?${params.toString()}`, { replaceState: true });
	}
</script>

<main>
	<header>Articles</header>

	<SearchField />

	<ToggleGroup on:valueChange={handleToggle}>
		<ToggleGroupItem
			value="top-picks"
			label="Top Picks Toggle"
			active={data.filter === 'top-picks'}>Top Picks</ToggleGroupItem
		>
		<ToggleGroupItem value="beauty" label="Beauty Toggle" active={data.filter === 'beauty'}
			>Beauty</ToggleGroupItem
		>
		<ToggleGroupItem value="culture" label="Culture Trigger" active={data.filter === 'culture'}
			>Culture</ToggleGroupItem
		>
	</ToggleGroup>
</main>

<style lang="scss">
	@use '$lib/style/main' as *;

	header {
		text-align: center;
		@extend %text-heading;
		margin-block: 2rem;
	}
</style>
