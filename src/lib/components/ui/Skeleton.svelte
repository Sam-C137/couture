<script lang="ts">
	let className: string = '';
	export { className as class };
</script>

<div class={className + ' skeleton'}>
	<slot />
</div>

<style lang="scss">
	@use '$lib/style/main' as *;

	div {
		border-radius: calc(1rem - 2px);
		@extend .animate-pulse;
		background: $shell-2;
		cursor: progress;
	}
</style>
