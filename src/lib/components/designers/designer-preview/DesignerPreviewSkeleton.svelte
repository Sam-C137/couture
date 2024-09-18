<script lang="ts">
	import Skeleton from '$lib/components/ui/Skeleton.svelte';
</script>

<div>
	<Skeleton class="card" />
	<Skeleton class="title" />
	<Skeleton class="description" />
	<Skeleton class="sub-text" />
</div>

<style lang="scss">
	@use '$lib/style/main' as *;

	div {
		@extend %flex-column;
		@extend .animate-pulse;
		width: 100%;
		gap: 0.65rem;

		:global([data-component='skeleton']) {
			width: 100%;
			border-radius: 0;
			height: 0.5rem;
		}

		:global(.card) {
			aspect-ratio: 245 / 275;
			width: 245px;
			height: 275px;
		}

		:global(.title) {
			width: 70%;
			height: 1rem;
		}

		:global(.description) {
			width: 60%;
		}

		:global(.sub-text) {
			width: 50%;
		}
	}
</style>
