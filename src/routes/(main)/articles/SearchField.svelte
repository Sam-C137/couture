<script>
	import { DebouncedInput } from '$lib/components/ui/input';

	function handleSearch() {
		//
	}
</script>

<div>
	<DebouncedInput
		id="search"
		name="search"
		placeholder="Search articles"
		debounceTime={300}
		on:debouncedValueChange={handleSearch}
		class="dbs"
	>
		<iconify-icon
			icon="ic:baseline-search"
			width="24"
			height="24"
			style="color: var(--neutral-950)"
			slot="icon-left"
		></iconify-icon>
	</DebouncedInput>
</div>

<style lang="scss">
	@use '$lib/style/main' as *;

	:root {
		--input-padding-inline: 2.25rem;
		--input-width: min(50rem, 90vw);
	}

	div {
		display: grid;
		place-items: center;
	}

	iconify-icon {
		@extend %reset;
		display: block;
		position: absolute;
		left: 0.5rem;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;
	}
</style>
