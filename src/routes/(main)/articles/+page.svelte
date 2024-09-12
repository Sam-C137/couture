<script lang="ts">
	import { ToggleGroup, ToggleGroupItem } from '$lib/components/ui/toggle';
</script>

<main>
	<header>Articles</header>

	<ToggleGroup on:valueChange>
		<ToggleGroupItem value="top-picks" label="Top Picks Toggle">Top Picks</ToggleGroupItem>
		<ToggleGroupItem value="beauty" label="Beauty Toggle">Beauty</ToggleGroupItem>
		<ToggleGroupItem value="culture" label="Culture Trigger">Culture</ToggleGroupItem>
	</ToggleGroup>
</main>
