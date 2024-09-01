<script lang="ts">
	let isOpen = false;
	import { moveDownOut } from '$lib/utils/animation';
	import { clickOutside } from '$lib/utils/actions';
</script>

<div
	class="wrapper"
	use:clickOutside={() => (isOpen ? (isOpen = false) : null)}
	role="menu"
	aria-orientation="vertical"
>
	<button on:click={() => (isOpen = !isOpen)}>
		<slot name="trigger" />
	</button>

	{#if isOpen}
		<div transition:moveDownOut={{}}>
			<slot name="content" />
		</div>
	{/if}
</div>

<style lang="scss">
	@use '$lib/style/main' as *;

	button {
		@extend %reset;
		@extend %flex-row;
		align-items: center;
	}

	.wrapper {
		position: relative;

		div {
			position: absolute;
			top: 150%;
			right: -20%;
			//right: -70%;
			background: $white;
			border-radius: 0.35rem;
			padding: 0.5rem;
			z-index: 1;
			font-size: 1rem;
			@extend %shadow-md;

			&::before {
				content: '';
				position: absolute;
				top: -10px;
				left: 50%;
				transform: translateX(-50%);
				border-width: 0 10px 10px 10px;
				border-style: solid;
				border-color: transparent transparent $white transparent;
			}
		}
	}
</style>
