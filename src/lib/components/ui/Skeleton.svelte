<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props['class'] = '';
	export { className as class };
</script>

<div class={className} data-component="skeleton" {...$$restProps}>
	<slot />
</div>

<style lang="scss">
	@use '$lib/style/main' as *;

	:where([data-component='skeleton']) {
		border-radius: calc(1rem - 2px);
		@extend .animate-pulse;
		background: $shell-2;
		cursor: progress;
	}
</style>
